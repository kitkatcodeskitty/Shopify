import { useDispatch, useSelector } from "react-redux";
import { base } from "../../app/mainApi";
import { Button } from "@heroui/button";
import { removeCart, setCart } from "./cartSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useCreateOrderMutation } from "../orders/orderApi";
import toast from "react-hot-toast";
export default function Cart() {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { carts } = useSelector(state => state.cartSlice);
  const totalAmount = carts.reduce((acc, cart) => acc + cart.price * cart.qty, 0);
  const user = useSelector(state => state.userSlice.user);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleOrder = async () => {
    try {
      await createOrder({
        token: user.token,
        data: {
          products: carts,
          totalAmount
        }
      }).unwrap();
      dispatch(removeCart());
      toast.success('Order created successfully');

    } catch (err) {
      toast.error(err.data.message);

    }
  }

  return (
    <div className="p-5">

      {
        !carts.length && <h1 className="text-red-500">Your cart is empty</h1>
      }


      {
        carts.map((cart, index) => {
          return (
            <div className="flex gap-10 p-5" key={index}>
              <img src={`${base}/${cart.image}`} className="w-20 h-20 object-cover" alt="" />
              <div className="space-y-2">
                <h1>{cart.title}</h1>
                <h1>Rs.{cart.price}</h1>
              </div>


              <div className="flex gap-3 items-center">
                <Button
                  onPress={() => {
                    dispatch(setCart({
                      ...cart,
                      qty: cart.qty - 1
                    }))
                  }}
                  disabled={cart.qty === 1}
                  isIconOnly aria-label="Like" color={cart.qty === 1 ? 'default' : 'danger'} size="sm">
                  <i className="fa-solid fa-minus"></i>
                </Button>
                <h1 className="text-xl">{cart.qty}</h1>
                <Button

                  onPress={() => {
                    dispatch(setCart({
                      ...cart,
                      qty: cart.qty + 1
                    }))
                  }}

                  disabled={cart.qty === cart.stock}

                  isIconOnly aria-label="Like"
                  color={cart.qty === cart.stock ? 'default' : 'danger'}
                  size="sm">
                  <i className="fa-solid fa-plus"></i>

                </Button>
                <Button onPress={() => dispatch(removeCart(cart.id))} size="sm" className="ml-10">Remove</Button>
              </div>

            </div>
          )
        })
      }


      {carts.length > 0 && <div className="mt-5 space-y-5">

        <h1>Total Amount: Rs.{totalAmount}</h1>
        <Button isLoading={isLoading} onPress={onOpen}>Checkout</Button>


        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                <ModalBody>
                  <p>
                    You want to buy !
                  </p>

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={() => {
                    handleOrder();
                    onClose();
                  }}>
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>


      </div>}






    </div>
  )
}

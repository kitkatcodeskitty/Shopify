import { useSelector } from "react-redux";
import { useRemoveProductMutation } from "../products/productApi";
import toast from "react-hot-toast";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function RemoveProduct({ id }) {
  const { user } = useSelector((state) => state.userSlice);
  const [removeProduct, { isLoading }] = useRemoveProductMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleRemove = async () => {
    try {
      await removeProduct({ id, token: user.token }).unwrap();
      toast.success('Product removed successfully');
    } catch (err) {
      toast.error(err.data.message);

    }
  }
  return (
    <>
      <Button
        onPress={onOpen}
        isLoading={isLoading}
        isIconOnly aria-label="Like" color="danger">
        <i className="fa-solid fa-trash"></i>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
              <ModalBody>
                <p>
                  You want to remove this product !
                </p>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={() => {
                  handleRemove();
                  onClose();
                }}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>


  )
}







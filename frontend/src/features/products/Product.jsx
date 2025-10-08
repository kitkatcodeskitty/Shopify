import { useNavigate, useParams } from "react-router"
import { useGetProductQuery } from "./productApi";
import { Button, Image } from "@heroui/react";
import { base } from "../../app/mainApi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../carts/cartSlice";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";


export default function Product() {
  const { carts } = useSelector(state => state.cartSlice);
  const { user } = useSelector(state => state.userSlice);
  const { id } = useParams();
  const nav = useNavigate();
  const cart = carts.find(cart => cart.id === id);
  const { isLoading, data, error } = useGetProductQuery(id);
  const [qty, setQty] = useState(cart ? cart?.qty : 1);
  const dispatch = useDispatch();

  if (isLoading) return <h1 className="flex justify-center items-center min-h-screen text-xl">Loading....</h1>
  if (error) return <h1 className="flex justify-center items-center min-h-screen text-red-500 text-xl">{error.message}</h1>

  const plusMinuceButton = 
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
        {/* image section */}
        <div className="w-full">
          <div className="aspect-square w-full max-w-md mx-auto lg:max-w-none">
            <Image
              alt={data.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              src={`${base}/${data.image}`}
            />
          </div>
        </div>

        {/* description section */}
        <div className="space-y-4 lg:space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {data.title}
          </h2>
          
          <div className="flex items-center flex-wrap gap-2">
            <Rater
              style={{ fontSize: "18px" }}
              total={5}
              interactive={false}
              rating={4.5}
            />
            <p className="text-sm text-gray-400">
              (150 reviews)
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm sm:text-base">
              <span className="font-bold">Availability:</span>{" "}
              {data.stock > 0 ? (
                <span className="text-green-600">In Stock ({data.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>

            <p className="text-sm sm:text-base">
              <span className="font-bold">Brand:</span> <span className="font-normal">{data.brand}</span>
            </p>

            <p className="text-sm sm:text-base">
              <span className="font-bold">Category:</span>{" "}
              <span className="font-normal">{data.category}</span>
            </p>
          </div>

          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-violet-900">
            Rs.{data.price}
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-gray-600">
            {data.description}
          </p>

          <div className="space-y-4">
            <div>
              <p className="pb-2 text-xs sm:text-sm text-gray-500 font-medium">Quantity</p>
              <div className="flex items-center">
                <button 
                  className={`${plusMinuceButton} text-sm sm:text-base`}
                  onClick={() => setQty(qty - 1)}
                  disabled={qty === 1}
                >
                  −
                </button>
                <div className="flex h-8 w-12 sm:w-16 cursor-text items-center justify-center border-t border-b text-sm sm:text-base font-medium">
                  {qty}
                </div>
                <button 
                  className={`${plusMinuceButton} text-sm sm:text-base`}
                  onClick={() => setQty(qty + 1)}
                  disabled={qty === data.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                className="flex-1 flex h-14 sm:h-16 items-center justify-center bg-violet-900 text-white text-base sm:text-lg font-medium rounded-lg duration-100 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed px-4 py-3"
                disabled={!user || user?.role === 'Admin' || data.stock === 0}
                onClick={() => {
                  dispatch(setCart({
                    id: data._id,
                    title: data.title,
                    image: data.image,
                    price: data.price,
                    stock: data.stock,
                    qty
                  }));
                  nav('/cart');
                }}
              >
                <BiShoppingBag className="mr-2 text-xl sm:text-2xl" />
                Add to cart
              </button>
              
              <button className="flex-1 flex h-14 sm:h-16 items-center justify-center bg-amber-400 text-gray-800 text-base sm:text-lg font-medium rounded-lg duration-100 hover:bg-yellow-300 px-4 py-3">
                <AiOutlineHeart className="mr-2 text-xl sm:text-2xl" />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

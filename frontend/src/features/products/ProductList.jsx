import { Button } from "@heroui/react";
import { useGetProductsQuery } from "./productApi";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, error, data } = useGetProductsQuery({
    page: searchParams.get('page') ?? 1
  });
  const nav = useNavigate();
  const [wishlist, setWishlist] = useState(new Set());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  const handleWishlistClick = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-xl font-semibold text-gray-600">Loading....</h1>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-red-500 text-xl font-semibold">{error.message}</h1>
    </div>
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-164px)]">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data && data?.products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onWishlistClick={handleWishlistClick}
              isWishlisted={wishlist.has(product._id)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 my-6">
        <Button
          onPress={() => setSearchParams({ page: Number(data.page) - 1 })}
          disabled={Number(data.page) === 1}
          variant="bordered"
          className="px-6 py-2"
        >
          Prev
        </Button>
        <span className="px-4 py-2 bg-violet-100 text-violet-800 rounded-lg font-medium">
          {data.page}
        </span>
        <Button
          onPress={() => setSearchParams({ page: Number(data.page) + 1 })}
          disabled={Number(data.page) === data.totalPages || data.totalPages === 0}
          variant="bordered"
          className="px-6 py-2"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

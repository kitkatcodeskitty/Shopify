import { useSearchParams } from "react-router"
import { useGetProductsQuery } from "../products/productApi";
import SearchInput from "./SearchInput";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { base } from "../../app/mainApi";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, error, data } = useGetProductsQuery({ search: searchParams.get('q') });

  if (isLoading) return <h1>Loading....</h1>
  if (error) return <h1 className="text-red-500">{error.message}</h1>

  return (
    <div className="p-5">

      <SearchInput setSearchParams={setSearchParams} />
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">

        {data && data.products.length > 0 ?
          data?.products.map((item, index) => (

            <Card

              key={index} isPressable shadow="sm" onPress={() => nav(`/product/${item._id}`)}>
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  radius="lg"
                  shadow="sm"
                  src={`${base}/${item.image}`}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
                <p className="text-default-500">Rs. {item.price}</p>
              </CardFooter>
            </Card>
          )) : <h1 className="text-center text-lg font-semibold">No results found</h1>}
      </div>


    </div>
  )
}

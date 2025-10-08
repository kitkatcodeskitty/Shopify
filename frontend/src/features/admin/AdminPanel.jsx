import { useGetProductsQuery } from "../products/productApi"

import {
  Avatar,
  Button,
  Card,
} from "@heroui/react";
import { useNavigate } from "react-router";
import { base } from "../../app/mainApi";
import RemoveProduct from "./RemoveProduct";


const TABLE_HEAD = ["Title", "CreatedAt", "Price", "Edit", "Remove"];





export default function AdminPanel() {
  const nav = useNavigate();
  const { isLoading, data, error } = useGetProductsQuery();
  if (isLoading) return <h1>Loading....</h1>
  if (error) return <h1 className="text-red-500">{error.message}</h1>



  return (
    <div className="p-5 space-y-4">
      <div className="flex justify-end">
        <Button onPress={() => nav('/add-form')}>Add Product</Button>
      </div>

      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >


                  {head}

                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.products.map(({ title, createdAt, price, _id, image }, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={_id}>
                  <td className={classes} >
                    <div className="flex items-center gap-4">

                      <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src={`${base}/${image}`}
                      />
                      <h1> {title}
                      </h1>

                    </div>



                  </td>
                  <td className={classes}>

                    {createdAt}

                  </td>
                  <td className={classes}>

                    Rs.{price}

                  </td>
                  <td className={classes}>

                    <Button
                      onPress={() => nav(`/edit-form/${_id}`)}
                      isIconOnly aria-label="Like" color="secondary">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>

                  </td>

                  <td className={classes}>
                    <RemoveProduct id={_id} />


                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>




    </div>
  )
}





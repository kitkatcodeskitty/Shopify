import { useNavigate } from "react-router";
import { useGetOrdersQuery } from "./orderApi";
import { Button, Card } from "@heroui/react";

const TABLE_HEAD = ["OrderId", "CreatedAt", "TotalAmount", "ViewDetail"];



export default function OrderHistory({ user }) {
  const nav = useNavigate();

  const { isLoading, data, error } = useGetOrdersQuery(user.token);

  if (isLoading) return <h1>Loading....</h1>
  if (error) return <h1 className="text-red-500">{error.message}</h1>


  return (
    <div className="p-5  col-span-2">

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
            {data.map(({ createdAt, totalAmount, _id, }, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={_id}>
                  <td className={classes} >

                    <h1> {_id} </h1>





                  </td>
                  <td className={classes}>

                    {createdAt}

                  </td>
                  <td className={classes}>

                    Rs.{totalAmount}

                  </td>
                  <td className={classes}>

                    <Button
                      onPress={() => nav(`/order/${_id}`)}
                      isIconOnly aria-label="Like" color="secondary">
                      <i className="fa-solid fa-circle-info"></i>
                    </Button>

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

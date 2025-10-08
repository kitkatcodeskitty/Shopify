import { useNavigate } from "react-router";
import { useGetOrdersQuery } from "./orderApi";
import { Button, Card } from "@heroui/react";

const TABLE_HEAD = ["OrderId", "CreatedAt", "TotalAmount", "ViewDetail"];

export default function OrderHistory({ user }) {
  const nav = useNavigate();

  const { isLoading, data, error } = useGetOrdersQuery(user.token);

  if (isLoading) return <h1 className="text-center text-lg font-semibold">Loading....</h1>
  if (error) return <h1 className="text-red-500 text-center">{error.message}</h1>

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Order History</h2>
      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-3 text-sm font-semibold text-gray-700"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(({ createdAt, totalAmount, _id }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast ? "p-3" : "p-3 border-b border-blue-gray-50";

                return (
                  <tr key={_id} className="hover:bg-gray-50">
                    <td className={`${classes} max-w-[150px]`}>
                      <div className="truncate text-sm font-medium text-gray-800">
                        {_id}
                      </div>
                    </td>
                    <td className={`${classes} text-sm text-gray-600`}>
                      {new Date(createdAt).toLocaleDateString()}
                    </td>
                    <td className={`${classes} text-sm font-semibold text-green-600`}>
                      Rs.{totalAmount}
                    </td>
                    <td className={classes}>
                      <Button
                        onPress={() => nav(`/order/${_id}`)}
                        isIconOnly 
                        aria-label="View Details" 
                        color="secondary"
                        size="sm"
                        className="min-w-8 h-8"
                      >
                        <i className="fa-solid fa-circle-info text-sm"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

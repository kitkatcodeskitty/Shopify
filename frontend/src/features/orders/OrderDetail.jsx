import { useParams } from "react-router"
import { useGetOrderQuery } from "./orderApi";
import { base } from "../../app/mainApi";

export default function OrderDetail() {
  const { id } = useParams();
  const { isLoading, data, error } = useGetOrderQuery(id);

  if (isLoading) return <h1 className="text-center text-lg font-semibold">Loading...</h1>;
  if (error) return <h1 className="text-red-500 text-center">{error.data?.message || "Something went wrong"}</h1>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      {data && (
        <>
          {/* Order Header */}
          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
            <p className="text-gray-500 text-sm mt-1">Order ID: {data._id}</p>
          </div>

          {/* User Info */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Customer</h2>
            <p className="text-gray-600">{data.user?.username || "N/A"}</p>
            <p className="text-gray-500 text-sm">{data.user?.email}</p>
          </div>

          {/* Products Table */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full border rounded-lg">
                <thead className="bg-gray-100 text-gray-700 text-left text-sm">
                  <tr>
                    <th className="p-3">Image</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Price</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {data.products?.map((p, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3">
                        <img
                          src={`${base}/${p.image}`}
                          alt={p.title}
                          className="h-14 w-14 object-cover rounded-md border"
                        />
                      </td>
                      <td className="p-3 font-medium text-gray-800">{p.title}</td>
                      <td className="p-3">{p.qty}</td>
                      <td className="p-3 font-semibold">Rs.{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-lg font-semibold text-gray-800">Total</span>
            <span className="text-xl font-bold text-green-600">Rs.{data.totalAmount}</span>
          </div>
        </>
      )}
    </div>
  );
}
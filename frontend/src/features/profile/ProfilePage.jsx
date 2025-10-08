import { useSelector } from "react-redux";
import OrderHistory from "../orders/OrderHistory";
import UserUpdate from "../user/UserUpdate";

export default function ProfilePage() {
  const { user } = useSelector(state => state.userSlice);
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserUpdate user={user} />
        </div>
        <div className="lg:col-span-2">
          <OrderHistory user={user} />
        </div>
      </div>
    </div>
  )
}

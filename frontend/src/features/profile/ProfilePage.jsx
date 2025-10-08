import { useSelector } from "react-redux";
import OrderHistory from "../orders/OrderHistory";
import UserUpdate from "../user/UserUpdate";

export default function ProfilePage() {
  const { user } = useSelector(state => state.userSlice);
  return (
    <div className="grid grid-cols-3">

      <UserUpdate user={user} />

      <OrderHistory user={user} />

    </div>
  )
}

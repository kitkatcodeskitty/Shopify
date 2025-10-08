import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./features/home/Home";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import AdminPanel from "./features/admin/AdminPanel";
import AddForm from "./features/admin/AddForm";
import EditForm from "./features/admin/EditForm";
import Product from "./features/products/Product";
import Cart from "./features/carts/Cart";
import ProfilePage from "./features/profile/ProfilePage";
import OrderDetail from "./features/orders/OrderDetail";
import SearchPage from "./features/search/SearchPage";

export default function App() {

  const router = createBrowserRouter([
    {

      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'profile',
          element: <ProfilePage />
        },
        {
          path: 'order/:id',
          element: <OrderDetail />
        },
        {
          path: 'cart',
          element: <Cart />

        },
        {
          path: 'product/:id',
          element: <Product />
        },
        {
          path: 'product/search',
          element: <SearchPage />

        },
        {
          path: 'admin-panel',
          element: <AdminPanel />
        },
        {
          path: 'add-form',
          element: <AddForm />
        },
        {
          path: 'edit-form/:id',
          element: <EditForm />
        }
      ]
    }

  ]);
  return <RouterProvider router={router} />
}

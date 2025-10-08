import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { removeUser } from "../features/user/userSlice";
import { base } from "../app/mainApi";
import { useGetUserQuery } from "../features/auth/authApi";

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate();

  return (
    <Navbar className="h-[70px]">
      <NavbarBrand>
        <p 
          className="font-bold text-inherit text-2xl cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={() => nav('/')}
        >
          SHOPIFY
        </p>
      </NavbarBrand>

      {user ? <UserNavContent user={user} /> : <NavbarContent justify="end">
        <NavbarItem>
          <NavLink to={'/login'}>Login</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to={'/register'}>
            Sign Up
          </NavLink>
        </NavbarItem>
      </NavbarContent>}
    </Navbar>
  )
}

export function UserNavContent({ user }) {
  const { isLoading, data, error } = useGetUserQuery(user.token);
  const nav = useNavigate();
  const dispatch = useDispatch();
  if (isLoading) return <h1>Loading....</h1>;
  if (error) return <h1 className="text-red-500">{error.message}</h1>;

  return (
    <NavbarContent as="div" justify="end">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src={`${base}/${data.image}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>

          {user.role === 'Admin' ? <>
            <DropdownItem
              onClick={() => nav('/profile')}
              key="profiles">Profile</DropdownItem>
            <DropdownItem
              onClick={() => nav('/admin-panel')}
              key="admin_panel">Admin Panel</DropdownItem>

          </> : <>
            <DropdownItem
              onClick={() => nav('/profile')}
              key="profile">Profile</DropdownItem>
            <DropdownItem
              onClick={() => nav('/cart')}
              key="carts">Carts</DropdownItem>
          </>}

          <DropdownItem
            onClick={() => dispatch(removeUser())}
            key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  )
}

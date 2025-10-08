import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { cartSlice } from "../features/carts/cartSlice";
import { mainApi } from "./mainApi";


export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [mainApi.reducerPath]: mainApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
    mainApi.middleware
  ])

})
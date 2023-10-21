import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import productReducer from "./Product/productsSlice";
import userReducer from "./auth/userSlice";
import notificationReducer from "./Notification/notifications";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

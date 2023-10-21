import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserCart, syncCart } from "./cartApi";
import { addNotification } from "../Notification/notifications";

const initialState = {
  cartProducts: [],
  batchingProduct: [],
  status: "idle",
  errorMsg: "",
};

export const cartSync = createAsyncThunk(
  "cart/cartSync",
  async (data, thunkApi) => {
    try {
      const response = await syncCart(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getCartAsync = createAsyncThunk(
  "cart/getCartItems",
  async (id, thunkApi) => {
    try {
      const response = await getUserCart(id);
      return response.data;
    } catch (error) {
      thunkApi.dispatch(
        addNotification({ message: error.response.data.error })
      );
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //fill cart with cart stored in localStorage
    setCart: (state) => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        state.cartProducts = cart;
      }
    },
    //add to cartProducts and set quantity 1
    addToCart: (state, { payload }) => {
      const { product, quantity } = payload;
      const modifiedCart = [
        {
          ...product,
          quantity: quantity || 1,
        },
        ...state.cartProducts,
      ];

      state.cartProducts = modifiedCart;
      localStorage.setItem("cart", JSON.stringify(modifiedCart));
      //adding to batch array
      state.batchingProduct.push({
        item: {
          product: product._id,
          quantity: quantity || 1,
        },
        type: "add",
      });
    },

    //find product by id and remove
    removeFromCart: (state, { payload }) => {
      const filteredProducts = state.cartProducts.filter(
        (product) => product._id !== payload._id
      );
      state.cartProducts = filteredProducts;
      localStorage.setItem("cart", JSON.stringify(filteredProducts));
      //adding remove product property to batch array
      state.batchingProduct.push({
        item: {
          product: payload._id,
          // quantity: quantity || 1,
        },
        type: "remove",
      });
    },

    increaseQuanity: (state, { payload, addition }) => {
      const modifiedCartProducts = [];

      for (const product of state.cartProducts) {
        if (product._id == payload._id) {
          const { quantity } = payload;
          const newQuantity = quantity + 1;
          const newProduct = { ...product, quantity: newQuantity };
          modifiedCartProducts.push(newProduct);
          //adding chnage qunantity property to  batch array
          state.batchingProduct.push({
            item: {
              product: payload._id,
              quantity: newProduct.quantity,
            },
            type: "quantityChange",
          });
        } else {
          modifiedCartProducts.push(product);
        }
      }
      state.cartProducts = modifiedCartProducts;
      localStorage.setItem("cart", JSON.stringify(modifiedCartProducts));
    },

    decreaseQuantity: (state, { payload }) => {
      const modifiedCartProducts = [];

      for (const product of state.cartProducts) {
        if (product._id == payload._id && product.quantity > 1) {
          const { quantity } = payload;

          const newProduct = { ...product, quantity: quantity - 1 };
          modifiedCartProducts.push(newProduct);
          //adding chnage qunantity property to  batch array
          state.batchingProduct.push({
            item: {
              product: payload._id,
              quantity: newProduct.quantity,
            },
            type: "quantityChange",
          });
        } else {
          modifiedCartProducts.push(product);
        }
      }
      state.cartProducts = modifiedCartProducts;
      localStorage.setItem("cart", JSON.stringify(modifiedCartProducts));
    },
  },
  extraReducers: (builder) => {
    builder

      //getting cart items
      .addCase(getCartAsync.fulfilled, (state, action) => {
        const { cart } = action.payload;
        state.cartProducts = cart;
      })
      .addCase(cartSync.fulfilled, (state, action) => {
        state.batchingProduct = [];
        state.status = "idle";
        state.errorMsg = "";
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuanity,
  decreaseQuantity,
  setCart,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchCategories, fetchProducts } from "./productApi";
import { addNotification } from "../Notification/notifications";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  //filters
  pages: "",
  pageNumber: "",
  totalItems: "",
  rating: 5,
  minPrice: 10,
  maxPrice: 1800,
  sort: "desc",
  category: "",
  brand: "",
};

export const fetchProductAsync = createAsyncThunk(
  "product/fetchProduct",
  async (filter, thunkApi) => {
    try {
      const response = await fetchProducts(filter);
      return response.data;
    } catch (error) {
      console.log(error);
      thunkApi.dispatch(
        addNotification({ message: error.response.data.error })
      );
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async (_, thunkApi) => {
    try {
      const response = await fetchCategories();
      return response.data;
    } catch (error) {
      thunkApi.dispatch(
        addNotification({ message: error.response.data.error })
      );
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async (_, thunkApi) => {
    try {
      const response = await fetchBrands();
      return response.data.brands;
    } catch (error) {
      thunkApi.dispatch(
        addNotification({ message: error.response.data.error })
      );
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeFilter: (state, { payload }) => {
      const { key, value } = payload;
      state[key] = value;
    },
    clearFilters: (state, action) => {
      state.rating = 5;
      state.minPrice = 0;
      state.maxPrice = 1800;
      state.sort = "desc";
      state.category = "";
      state.brand = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        const { products, pageNumber, pages, totalItems } = action.payload;
        state.status = "idle";
        state.products = products;
        (state.totalItems = totalItems),
          (state.pageNumber = pageNumber),
          (state.pages = pages);
      })
      .addCase(fetchProductAsync.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "error";
      })
      //fetch brands cases
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { changeFilter, clearFilters } = productSlice.actions;

export const selectProuduct = (state) => state.product;

export default productSlice.reducer;

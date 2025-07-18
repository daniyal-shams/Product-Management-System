import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const createProduct = createAsyncThunk(
  "/products/createProduct",
  async (formData) => {
    const result = await axios.post('http://localhost:5000/api/admin/products/add', formData, 
        {
          headers : {
          "Content-Type" : "application/json",
        },
     }
    );

    return result?.data ;

  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get('http://localhost:5000/api/admin/products/get');

    return result?.data ;

  }
);
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async (id,formData) => {
    const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, 
     {
            headers : {
            "Content-Type" : "application/json",
        },
     }
    );

    return result?.data ;

  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(`http://localhost:5000/api/admin/products/${id}`);

    return result?.data ;

  }
);

const AdminProdsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state)=> {
        state.isLoading = true;
    }).addCase(createProduct.fulfilled, (state, action)=> {
        console.log(action.payload);

        state.isLoading = false;
        state.productList = action.payload.data;
    }).addCase(createProduct.rejected, (state, action)=>{
        console.log(action.payload);

        state.isLoading = false;
        state.productList = [];

    })
  },
});

export default AdminProdsSlice.reducer ;

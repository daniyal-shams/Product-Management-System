import  { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import AdminProdsSlice from './admin/products-slice';


const store = configureStore ({
    reducer : {
        auth : authReducer ,
        adminProducts : AdminProdsSlice 
    }
})

export default store ; 
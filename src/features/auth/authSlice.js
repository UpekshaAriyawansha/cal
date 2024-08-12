import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

// const userDefaultState = {
//     _id:null,
//     firstname:null,
//     lastname:null,
//     email:null,
//     mobile:null,
//     token:null,
// };

const getUserfromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem
    ('user')) : null;

const initialState = {
    user:getUserfromLocalStorage,
    orders:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
};

export const login = createAsyncThunk("auth/admin-login", 
async (user, thunkAPI) => {
    try{
        return await authService.login(user);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk("orders/get-orders", 
async (id,thunkAPI) => {
    try{
        return await authService.getOrders(id);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrderByUser = createAsyncThunk("orders/get-order", 
async (thunkAPI) => {
    try{
        return await authService.getaOrder();
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});


export const authSlice = createSlice ({
    name:"auth",
    // initialState,
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            })


            .addCase(getOrders.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled,(state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "success";
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(getOrderByUser.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(getOrderByUser.fulfilled,(state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderbyuser = action.payload;
                state.message = "success";
            })
            .addCase(getOrderByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default authSlice.reducer;


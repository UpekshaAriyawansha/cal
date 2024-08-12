import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk("upload/product-image", 
async (data, thunkAPI) => {
    try{
        const formData = new FormData();
        for (let i=0; i<data.length; i++) {
            formData.append("image", data[i]);
        }
        return await uploadService.uploadImg(formData);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const DeleteImg = createAsyncThunk("delete/product-image", 
async (id, thunkAPI) => {
    try{
        return await uploadService.DeleteImg(id);
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    images:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
export const uploadSlice = createSlice({
    name: "images",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImg.pending,(state) => {
            state.isLoading = true;
        })
            .addCase(uploadImg.fulfilled,(state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.images = action.payload;
            })
            .addCase(uploadImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(DeleteImg.pending,(state) => {
                state.isLoading = true;
            })
            .addCase(DeleteImg.fulfilled,(state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.images = [];
            })
            .addCase(DeleteImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });
    },
});

export default uploadSlice.reducer;

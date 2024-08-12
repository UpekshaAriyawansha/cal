import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import enquiriesService from "./enquiriesService";

export const getEnquiries = createAsyncThunk("enquiry/get-enquiries", 
async (thunkAPI) => {
    try{
        return await enquiriesService.getEnquiries();
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});



export const getAEnquiry = createAsyncThunk("enquiry/get-enquiry", 
  async (id,thunkAPI) => {
      try{
          return await enquiriesService.getaEnquiry(id);
      } catch(error){
          return thunkAPI.rejectWithValue(error);
      }
  });


export const updateAEnquiry = createAsyncThunk("enquiry/update-enquiry",
  async (enquiry, thunkAPI) => {
    try {
      return await enquiriesService.updateEnquiry(enquiry);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

export const deleteAEnquiry = createAsyncThunk("enquiry/delete-enquiry", 
  async (id,thunkAPI) => {
      try{
          return await enquiriesService.deleteaEnquiry(id);
      } catch(error){
          return thunkAPI.rejectWithValue(error);
      }
  });


export const resetState = createAction("Reset_all");

const initialState = {
    enquiries:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
export const enquiriesSlice = createSlice({
    name: "enquiries",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getEnquiries.pending,(state) => {
            state.isLoading = true;
        })
            .addCase(getEnquiries.fulfilled,(state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiries = action.payload;
            })
            .addCase(getEnquiries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(getAEnquiry.pending,(state) => {
              state.isLoading = true;
              })
              .addCase(getAEnquiry.fulfilled,(state, action) => {
                  state.isLoading = false;
                  state.isError = false;
                  state.isSuccess = true;
                  state.enquiryName = action.payload.name;
                  state.enquiryEmail = action.payload.email;
                  state.enquiryMobile = action.payload.mobile;
                  state.enquiryComment = action.payload.comment;
                  state.enquiryStatus = action.payload.status;
              })
              .addCase(getAEnquiry.rejected, (state, action) => {
                  state.isLoading = false;
                  state.isError = true;
                  state.isSuccess = false;
                  state.message = action.error;
              })

              .addCase(updateAEnquiry.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(updateAEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updateaEnquiry = action.payload;
              })
              .addCase(updateAEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
              })

              .addCase(deleteAEnquiry.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(deleteAEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deleteEnquiry = action.payload;
              })
              .addCase(deleteAEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
              })
  
            .addCase(resetState,()=> initialState);
    },
});

export default enquiriesSlice.reducer;

import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import procategoryService from "./procategoryService";

export const getProcategories = createAsyncThunk("procategory/get-categories", 
async (thunkAPI) => {
    try{
        return await procategoryService.getProcategories();
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const createProcategories = createAsyncThunk("procategory/create-categories",
    async (categoryData, thunkAPI) => {
      try {
        return await procategoryService.createProcategories(categoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getAProcategory = createAsyncThunk("procategory/get-procategory", 
  async (id,thunkAPI) => {
      try{
          return await procategoryService.getaProcategory(id);
      } catch(error){
          return thunkAPI.rejectWithValue(error);
      }
  });

export const updateAProcategory = createAsyncThunk("procategory/update-procategory",
  async (category, thunkAPI) => {
    try {
      return await procategoryService.updateProcategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

export const deleteAProcategory = createAsyncThunk("procategory/delete-procategory", 
  async (id,thunkAPI) => {
      try{
          return await procategoryService.deleteaProcategory(id);
      } catch(error){
          return thunkAPI.rejectWithValue(error);
      }
  });

export const resetState = createAction("Reset_all");


const initialState = {
    procategories:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
export const procategorySlice = createSlice({
    name: "procategories",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getProcategories.pending,(state) => {
            state.isLoading = true;
        })
            .addCase(getProcategories.fulfilled,(state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.procategories = action.payload;
            })
            .addCase(getProcategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(createProcategories.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(createProcategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createcategory = action.payload;
              })
              .addCase(createProcategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
              })

              .addCase(getAProcategory.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(getAProcategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categoryName = action.payload.title;
              })
              .addCase(getAProcategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
              })

              .addCase(updateAProcategory.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(updateAProcategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updateacategory = action.payload;
              })
              .addCase(updateAProcategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
              })

              .addCase(deleteAProcategory.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(deleteAProcategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deleteacategory = action.payload;
              })
              .addCase(deleteAProcategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
              })

              .addCase(resetState,()=> initialState);
    },
});

export default procategorySlice.reducer;

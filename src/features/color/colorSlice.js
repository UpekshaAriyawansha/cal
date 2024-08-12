import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk("color/get-colors", 
async (thunkAPI) => {
    try{
        return await colorService.getColors();
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const createColors = createAsyncThunk("color/create-color",
    async (colorData, thunkAPI) => {
      try {
        return await colorService.createColors(colorData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    });

  export const getAColor = createAsyncThunk("color/get-color", 
  async (id,thunkAPI) => {
      try{
          return await colorService.getaColor(id);
      } catch(error){
          return thunkAPI.rejectWithValue(error);
      }
  });


export const updateAColor = createAsyncThunk("color/update-color",
  async (color, thunkAPI) => {
    try {
      return await colorService.updateColor(color);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

export const deleteAColor = createAsyncThunk("color/delete-color", 
  async (id,thunkAPI) => {
      try{
          return await colorService.deleteaColor(id);
      } catch(error){
          return thunkAPI.rejectWithValue(error);
      }
  });

export const resetState = createAction("Reset_all");

const initialState = {
    colors:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
export const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers:{
        // resetColorState(){
        //     initialState: initialState;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending,(state) => {
            state.isLoading = true;
        })
            .addCase(getColors.fulfilled,(state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colors = action.payload;
            })
            .addCase(getColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(createColors.pending,(state) => {
                state.isLoading = true;
            })
                .addCase(createColors.fulfilled,(state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createColor = action.payload;
                })
                .addCase(createColors.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                })

            .addCase(getAColor.pending,(state) => {
                    state.isLoading = true;
                })
                    .addCase(getAColor.fulfilled,(state, action) => {
                        state.isLoading = false;
                        state.isError = false;
                        state.isSuccess = true;
                        state.colorName = action.payload.title;
                    })
                    .addCase(getAColor.rejected, (state, action) => {
                        state.isLoading = false;
                        state.isError = true;
                        state.isSuccess = false;
                        state.message = action.error;
                    })

                .addCase(updateAColor.pending,(state) => {
                        state.isLoading = true;
                    })
                        .addCase(updateAColor.fulfilled,(state, action) => {
                            state.isLoading = false;
                            state.isError = false;
                            state.isSuccess = true;
                            state.updateacolor = action.payload;
                        })
                        .addCase(updateAColor.rejected, (state, action) => {
                            state.isLoading = false;
                            state.isError = true;
                            state.isSuccess = false;
                            state.message = action.error;
                        })

                        .addCase(deleteAColor.pending,(state) => {
                            state.isLoading = true;
                        })
                            .addCase(deleteAColor.fulfilled,(state, action) => {
                                state.isLoading = false;
                                state.isError = false;
                                state.isSuccess = true;
                                state.deleteacolor = action.payload.title;
                            })
                            .addCase(deleteAColor.rejected, (state, action) => {
                                state.isLoading = false;
                                state.isError = true;
                                state.isSuccess = false;
                                state.message = action.error;
                            })
    
                    .addCase(resetState,()=> initialState);
    },
});

export default colorSlice.reducer;

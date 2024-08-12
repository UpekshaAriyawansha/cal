import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import blogcategoryService from "./blogcategoryService";

export const getBlogcategories = createAsyncThunk("blogcategory/get-blogcategories", 
async (thunkAPI) => {
    try{
        return await blogcategoryService.getBlogcategories();
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlogcategories = createAsyncThunk("blogcategory/create-blogcategories",
    async (blogcategoryData, thunkAPI) => {
      try {
        return await blogcategoryService.createBlogcategories(blogcategoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getABlogCat = createAsyncThunk(
    "blogCategory/get-category",
    async (id, thunkAPI) => {
      try {
        return await blogcategoryService.getBlogCategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const updateABlogCat = createAsyncThunk(
    "blogCategory/update-category",
    async (blogCat, thunkAPI) => {
      try {
        return await blogcategoryService.updateBlogCategory(blogCat);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  
  export const deleteABlogCat = createAsyncThunk(
    "blogCategory/delete-category",
    async (id, thunkAPI) => {
      try {
        return await blogcategoryService.deleteBlogCategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const resetState = createAction("Reset_all");

const initialState = {
    bcategories:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
export const blogcategorySlice = createSlice({
    name: "bcategories",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogcategories.pending,(state) => {
            state.isLoading = true;
        })
            .addCase(getBlogcategories.fulfilled,(state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.bcategories = action.payload;
            })
            .addCase(getBlogcategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            
            .addCase(createBlogcategories.pending,(state) => {
                state.isLoading = true;
            })
                .addCase(createBlogcategories.fulfilled,(state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createblogcategory = action.payload;
                })
                .addCase(createBlogcategories.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                })


                .addCase(getABlogCat.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(getABlogCat.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.blogCatName = action.payload.title;
                  })
                  .addCase(getABlogCat.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                  })
                  .addCase(updateABlogCat.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(updateABlogCat.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.updatedBlogCategory = action.payload;
                  })
                  .addCase(updateABlogCat.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                  })
                  .addCase(deleteABlogCat.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(deleteABlogCat.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.deletedBlogCategory = action.payload;
                  })
                  .addCase(deleteABlogCat.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                  })
                .addCase(resetState,()=> initialState);
    },
});

export default blogcategorySlice.reducer;

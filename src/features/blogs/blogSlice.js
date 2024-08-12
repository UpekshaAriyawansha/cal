import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlogs = createAsyncThunk("blogs/get-blogs", 
async (thunkAPI) => {
    try{
        return await blogService.getBlogs();
    } catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlog = createAsyncThunk("blogs/create-blog",
    async (blogsData, thunkAPI) => {
      try {
        return await blogService.createBlog(blogsData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    });



    export const getABlog = createAsyncThunk("blog/get-blog", 
    async (id,thunkAPI) => {
        try{
            return await blogService.getaBlog(id);
        } catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    });
  
  
  export const updateABlog = createAsyncThunk("blog/update-blog",
    async (blog, thunkAPI) => {
      try {
        return await blogService.updateBlog(blog);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    });
  
  export const deleteABlog = createAsyncThunk("blog/delete-blog", 
    async (id,thunkAPI) => {
        try{
            return await blogService.deleteaBlog(id);
        } catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    });
  
  

export const resetState = createAction("Reset_all");

const initialState = {
    blogs:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending,(state) => {
            state.isLoading = true;
        })
            .addCase(getBlogs.fulfilled,(state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(createBlog.pending,(state) => {
                state.isLoading = true;
            })
                .addCase(createBlog.fulfilled,(state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.createblogs = action.payload;
                })
                .addCase(createBlog.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                })

                .addCase(getABlog.pending,(state) => {
                  state.isLoading = true;
                  })
                  .addCase(getABlog.fulfilled,(state, action) => {
                      state.isLoading = false;
                      state.isError = false;
                      state.isSuccess = true;
                      state.blogName = action.payload.title;
                      state.blogDescription = action.payload.description;
                      state.blogCategory = action.payload.procategory;
                      state.blogImage = action.payload.images;

                  })
                  .addCase(getABlog.rejected, (state, action) => {
                      state.isLoading = false;
                      state.isError = true;
                      state.isSuccess = false;
                      state.message = action.error;
                  })
  
                  .addCase(updateABlog.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(updateABlog.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.updateaBlog = action.payload;
                  })
                  .addCase(updateABlog.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                  })
  
                  .addCase(deleteABlog.pending, (state) => {
                    state.isLoading = true;
                  })
                  .addCase(deleteABlog.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.isSuccess = true;
                    state.deleteBlog = action.payload;
                  })
                  .addCase(deleteABlog.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                  })
                .addCase(resetState,()=> initialState);
    },
});

export default blogSlice.reducer;

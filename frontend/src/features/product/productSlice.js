import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState={
    productDetails:{},
    products:[],
    deleteProductInfo:{
        SuccessDelete:false,
        LoadingDelete:false,
        ErrorDelete:false,
        messageDelete:''
    },
    createProductInfo:{
        createdProduct: {},
        Successcreate:false,
        Loadingcreate:false,
        Errorcreate:false,
        messagecreate:''
    },
    updateProductInfo:{
        Successupdate:false,
        Loadingupdate:false,
        Errorupdate:false,
        messageupdate:''
    },
    createReviewInfo:{
        Successcreate:false,
        Loadingcreate:false,
        Errorcreate:false,
        messageErrorcreate:''
    },
    productTopRated:{
        TopProducts:[],
        LoadingTopProducts:false,
        ErrorTopProducts:false,
        messageErrorTopProducts:''
    },
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

//get all Products
export const listProducts=createAsyncThunk('products/getAll',async(keyword_pageNumber,thunkAPI)=>{
    try {
        return await productService.listProducts(keyword_pageNumber.keyword,keyword_pageNumber.pageNumber)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get product details
export const listProductDetails=createAsyncThunk('products/getOne',async(id,thunkAPI)=>{
    try {
        return await productService.listProductDetails(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete a product
export const deleteProduct=createAsyncThunk('product/delete',async(id,thunkAPI)=>{
    try {
         await productService.deleteProduct(id,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete a product
export const createProduct=createAsyncThunk('product/create',async(_,thunkAPI)=>{
    try {
       return  await productService.createProduct(thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update a product
export const updateProduct=createAsyncThunk('product/update',async(product,thunkAPI)=>{
    try {
       return  await productService.updateProduct(product,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update a product
export const productCreateReview=createAsyncThunk('product/review',async(productId_and_review,thunkAPI)=>{
    try {
         await productService.productCreateReview(productId_and_review,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get top Products
export const listTopProducts=createAsyncThunk('products/getTopProduct',async(_,thunkAPI)=>{
    try {
        return await productService.listTopProducts()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        reset:(state)=>{state.createProductInfo={
            createdProduct: {},
            Successcreate:false,
            Loadingcreate:false,
            Errorcreate:false,
            messagecreate:''
        }
        state.updateProductInfo.Successupdate=false
    },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(listProducts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(listProducts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.products=action.payload.products //cause we sed more data in payload (porductController.js)
            state.pages=action.payload.pages
            state.page=action.payload.page
        })
        .addCase(listProducts.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload 
        })

        .addCase(listProductDetails.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(listProductDetails.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.productDetails=action.payload
            
        })
        .addCase(listProductDetails.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload 

        })

        .addCase(deleteProduct.pending,(state)=>{
            state.deleteProductInfo.LoadingDelete=true
        })
            .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.deleteProductInfo.LoadingDelete=false
            state.deleteProductInfo.SuccessDelete= true       
    
        })
            .addCase(deleteProduct.rejected,(state,action)=>{
                state.deleteProductInfo.LoadingDelete=false
                state.deleteProductInfo.ErrorDelete= true  
                state.deleteProductInfo.messageDelete=action.payload 
        })

        .addCase(createProduct.pending,(state)=>{
            state.createProductInfo.Loadingcreate=true
        })
            .addCase(createProduct.fulfilled,(state,action)=>{
            state.createProductInfo.Loadingcreate=false
            state.createProductInfo.Successcreate= true       
            state.createProductInfo.createdProduct=action.payload
        })
            .addCase(createProduct.rejected,(state,action)=>{
                state.createProductInfo.Loadingcreate=false
                state.createProductInfo.Errorcreate= true  
                state.createProductInfo.messagecreate=action.payload 
        })


        .addCase(updateProduct.pending,(state)=>{
            state.updateProductInfo.Loadingupdate=true
        })
            .addCase(updateProduct.fulfilled,(state,action)=>{
            state.updateProductInfo.Loadingupdate=false
            state.updateProductInfo.Successupdate= true       
        })
            .addCase(updateProduct.rejected,(state,action)=>{
                state.updateProductInfo.Loadingupdate=false
                state.updateProductInfo.Errorupdate= true  
                state.updateProductInfo.messageupdate=action.payload 
        })


        .addCase(productCreateReview.pending,(state)=>{
            state.createReviewInfo.Loadingcreate=true
        })
            .addCase(productCreateReview.fulfilled,(state,action)=>{
            state.createReviewInfo.Loadingcreate=false
            state.createReviewInfo.Successcreate= true       
        })
            .addCase(productCreateReview.rejected,(state,action)=>{
                state.createReviewInfo.Loadingcreate=false
                state.createReviewInfo.Errorcreate= true  
                state.createReviewInfo.messageErrorcreate=action.payload
        })


        .addCase(listTopProducts.pending,(state)=>{
            state.productTopRated.LoadingTopProducts=true
        })
        .addCase(listTopProducts.fulfilled,(state,action)=>{
            state.productTopRated.LoadingTopProducts=false
            state.productTopRated.TopProducts =action.payload    
        })
        .addCase(listTopProducts.rejected,(state,action)=>{
                state.productTopRated.LoadingTopProducts=false
                state.productTopRated.ErrorTopProducts= true  
                state.productTopRated.messageErrorTopProducts=action.payload
        })
    }
})

export const {reset}=productSlice.actions
export default productSlice.reducer
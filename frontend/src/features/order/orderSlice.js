import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import orderService from './orderService'

//get orderCreate from local Storage
const orderCreate=JSON.parse(localStorage.getItem('orderCreate'))

const initialState={
    orderCreate:orderCreate?orderCreate:null,
    orderDetails:null,
    allOrders:[],
    orderPay:{
        SuccessPay:false,
        LoadingPay:false,
        ErrorPay:false,
        messagePay:''
    },
    myOrders:[],//orders of the logged in user
    orderDeliverdInfo:{
        SuccessDeliver:false,
        LoadingDeliver:false,
        ErrorDeliver:false,
        messageDeliver:''
    },
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const createOrder=createAsyncThunk('orders/create',async(orderdata,thunkAPI)=>{
    try {
    return await orderService.createOrder(orderdata,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get a single order
export const getOrderDetails=createAsyncThunk('orders/getOne',async(ordreId,thunkAPI)=>{
    try {
        return await orderService.getOrderDetails(ordreId,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
  
    }
    
})

export const payOrder=createAsyncThunk("orders/pay",async(orderId_and_paymentResult,thunkAPI)=>{
    try {
        return await orderService.payOrder(orderId_and_paymentResult,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
  
    }
})


export const listMyOrders=createAsyncThunk("orders/myorders",async(_,thunkAPI)=>{
    try {
        return await orderService.listMyOrders(thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
 
        return thunkAPI.rejectWithValue(message)
  
    }
})

//get All orders
export const listOrders=createAsyncThunk("orders/allOrders",async(_,thunkAPI)=>{
    try {
        return await orderService.listOrders(thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        console.log(error)
        return thunkAPI.rejectWithValue(message)
  
    }
})

//mark order as delivered
export const deliverOrder=createAsyncThunk("orders/deliver",async(order,thunkAPI)=>{
    try {
        return await orderService.deliverOrder(order,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
  
    }
})

export const orderSlice=createSlice({
    name:'order',
    initialState,
    reducers:{
        reset:(state)=>{
            state.orderPay={
            SuccessPay:false,
            LoadingPay:false,
            ErrorPay:false,
            messagePay:''
           }
           
           state.orderDetails={}
        
           state.orderDeliverdInfo={
            SuccessDeliver:false,
            LoadingDeliver:false,
            ErrorDeliver:false,
            messageDeliver:''
        }
    },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createOrder.pending,(state)=>{
            state.isLoading=true
        })
            .addCase(createOrder.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess= true       
            state.orderCreate=action.payload 
        })
            .addCase(createOrder.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload 
           
        })

        .addCase(getOrderDetails.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess= true       
            state.orderDetails=action.payload 
        })
        .addCase(getOrderDetails.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload 
           
        })

        .addCase(payOrder.pending,(state)=>{
            state.orderPay.LoadingPay=true
        })
        .addCase(payOrder.fulfilled,(state,action)=>{
            state.orderPay.LoadingPay=false
            state.orderPay.SuccessPay= true       
        })
        .addCase(payOrder.rejected,(state,action)=>{
            state.orderPay.LoadingPay=false
            state.orderPay.ErrorPay=true
            state.orderPay.messagePay=action.payload 
           
        })

        .addCase(listMyOrders.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(listMyOrders.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess= true       
            state.myOrders=action.payload 
        })
        .addCase(listMyOrders.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload 
           
        })
    
        .addCase(listOrders.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(listOrders.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess= true       
            state.allOrders=action.payload 
        })
        .addCase(listOrders.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload 
           
        })


        .addCase(deliverOrder.pending,(state)=>{
            state.orderDeliverdInfo.LoadingDeliver=true
        })
        .addCase(deliverOrder.fulfilled,(state,action)=>{
            state.orderDeliverdInfo.LoadingDeliver=false
            state.orderDeliverdInfo.SuccessDeliver= true       
        })
        .addCase(deliverOrder.rejected,(state,action)=>{
            state.orderDeliverdInfo.LoadingDeliver=false
            state.orderDeliverdInfo.ErrorDeliver=true
            state.orderDeliverdInfo.messageDeliver=action.payload 
           
        })
    }
})


export const {reset}=orderSlice.actions
export default orderSlice.reducer
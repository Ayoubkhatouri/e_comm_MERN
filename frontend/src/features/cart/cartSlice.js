import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "./cartService";


//get cart from local storage
const cartItems =JSON.parse(localStorage.getItem('cartItems')) // it gonna be always in the state cause
                                                    //we are geting it from local storage

//get shippingAdrees from local storage
const shippingAddress=JSON.parse(localStorage.getItem('shippingAddress'))

//get paymenMethod from local storage
const paymenMethod=JSON.parse(localStorage.getItem('paymenMethod'))

const initialState={
    shippingAddress:shippingAddress ? shippingAddress : {},
    paymentMethod:paymenMethod ? paymenMethod :'',
    cartItems:cartItems  ? cartItems :[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    qty:1,
}


//add to cart
export const addToCart=createAsyncThunk('cart/addToCart',async(id_qty,thunkAPI)=>{ //we can passe data only in the 
                                                                                //first arg we make an object
    try {
       
        const data= await cartService.addToCart(id_qty.id)
        const arr=[]
      //this is an idea but i have also another one use TunkAPI.dispach and then set it automatically

            let exist=false
            for (let i=0 ; i<thunkAPI.getState().cart.cartItems.length ; i++){
                if(thunkAPI.getState().cart.cartItems[i].product === data._id || 
                JSON.parse(localStorage.getItem('cartItems'))[i].product === data._id)
                exist=true
            }
            
            if(!exist){
        arr.push({
            product: data._id,
        name: data.name,
        image:data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty:id_qty.qty
        })}
        else{
            data._id=-1
        }
    
         let itemsLocal=[]
         if(JSON.parse(localStorage.getItem('cartItems')))
         itemsLocal=JSON.parse(localStorage.getItem('cartItems'))

        itemsLocal.push(...arr)
        localStorage.setItem('cartItems',JSON.stringify(itemsLocal))
        data.qty=id_qty.qty
        return data

    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
})


//update qty
export const changeQty=createAsyncThunk('/cart/updateqty',async(id_qty,thunkAPI)=>{
    try {
      
       const nouvTab= JSON.parse(localStorage.getItem('cartItems')).map((item)=>{
            if(item.product===id_qty.id){
            item.qty=id_qty.qty
            }
            return item
        })
        localStorage.setItem('cartItems',JSON.stringify(nouvTab))
        return JSON.parse(localStorage.getItem('cartItems'))  
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
    
        return thunkAPI.rejectWithValue(message)
    }
})

//remove Item
export const removeItem=createAsyncThunk('/cart/removeItem',async(id,thunkAPI)=>{
    try {
        const nouvTab=JSON.parse(localStorage.getItem('cartItems')).filter((item)=>item.product!==id)
        localStorage.setItem('cartItems',JSON.stringify(nouvTab))
        return JSON.parse(localStorage.getItem('cartItems'))  
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//save shipping address
export const saveShippingAddress=createAsyncThunk('cart/saveAddress',async(data,thunkAPI)=>{
    localStorage.setItem('shippingAddress',JSON.stringify(data))
    return  JSON.parse(localStorage.getItem('shippingAddress'))
})

//save payment Method
export const savePaymentMethod=createAsyncThunk('cart/savepymth',async(data,thunkAPI)=>{
    localStorage.setItem('paymenMethod',JSON.stringify(data))
    return  JSON.parse(localStorage.getItem('paymenMethod'))
})



export const carteSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addToCart.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            if(action.payload._id !==-1){
            state.cartItems.push({ 
                product: action.payload._id,
                name: action.payload.name,
                image:action.payload.image,
                price: action.payload.price,
                countInStock: action.payload.countInStock,
                qty:action.payload.qty
            }
                )}
             
        }
        )
        .addCase(addToCart.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
////////////////////////////
        .addCase(changeQty.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(changeQty.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.cartItems= action.payload
            }
            )       
        .addCase(changeQty.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload

        })
////////////////////////////
        .addCase(removeItem.pending,(state)=>{
         state.isLoading=true
        })
        .addCase(removeItem.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.cartItems= action.payload
            }
            )       
        .addCase(removeItem.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload

        })
////////////////////////////
        .addCase(saveShippingAddress.pending,(state)=>{
            state.isLoading=true
           })
           .addCase(saveShippingAddress.fulfilled,(state,action)=>{
                   state.isLoading=false
                   state.isSuccess=true
                   state.shippingAddress= action.payload
               }
               )       
           .addCase(saveShippingAddress.rejected,(state,action)=>{
               state.isLoading=false
               state.isError=true
               state.message=action.payload
   
           })
////////////////////////////
        .addCase(savePaymentMethod.pending,(state)=>{
            state.isLoading=true
           })
           .addCase(savePaymentMethod.fulfilled,(state,action)=>{
                   state.isLoading=false
                   state.isSuccess=true
                   state.paymentMethod= action.payload
               }
               )       
           .addCase(savePaymentMethod.rejected,(state,action)=>{
               state.isLoading=false
               state.isError=true
               state.message=action.payload
   
           })
    }
})


export const {reset}=carteSlice.actions
export default carteSlice.reducer
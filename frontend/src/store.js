import {configureStore} from '@reduxjs/toolkit'
import producReducer from './features/product/productSlice'
import  cartReducer  from './features/cart/cartSlice'
import userReducer from './features/user/userSlice'
import orderSlice from './features/order/orderSlice'



export const store =configureStore({
    reducer:{
        product:producReducer,
        cart:cartReducer,
        user:userReducer,
        order:orderSlice,
    },
}
)



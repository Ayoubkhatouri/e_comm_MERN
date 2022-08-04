import axios from "axios";


const createOrder=async(orderdata ,thunkAPI)=>{
     //get user info
     const state=thunkAPI.getState()
     const userInfo=state.user.userInfo


    const config={
        headers:{
            Authorization:`Bearer ${userInfo.token}`
        }
    }

    const {data}=await axios.post('/api/orders/',orderdata,config)
    if(data)
    localStorage.setItem('orderCreate',JSON.stringify(data))
    return data
}

//get order by ID
const getOrderDetails=async(orderId,thunkAPI)=>{
     //get user info
     const state=thunkAPI.getState()
     const userInfo=state.user.userInfo

    const config={
        headers:{
            Authorization:`Bearer ${userInfo.token}`
        }
    }
   
    const {data}=await axios.get(`/api/orders/${orderId}`,config)

    return data
}

     
const payOrder=async(orderId_and_paymentResult,thunkAPI)=>{
    //get user info
    const state=thunkAPI.getState()
    const userInfo=state.user.userInfo


   const config={
       headers:{
           Authorization:`Bearer ${userInfo.token}`
       }
   }
   
   const {data}=await axios.put(`/api/orders/${orderId_and_paymentResult.orderId}/pay`,orderId_and_paymentResult.paymentResult,config)

   return data
}




const listMyOrders=async(thunkAPI)=>{
    //get user info
    const state=thunkAPI.getState()
    const userInfo=state.user.userInfo


   const config={
       headers:{
           Authorization:`Bearer ${userInfo.token}`
       }
   }
   
   const {data}=await axios.get(`/api/orders/myorders`,config)

   return data
}

//list all Orders
const listOrders=async(thunkAPI)=>{
    //get user info
    const state=thunkAPI.getState()
    const userInfo=state.user.userInfo


   const config={
       headers:{
           Authorization:`Bearer ${userInfo.token}`
       }
   }
   
   const {data}=await axios.get(`/api/orders`,config)
   return data
}


    
const deliverOrder=async(order,thunkAPI)=>{
    //get user info
    const state=thunkAPI.getState()
    const userInfo=state.user.userInfo

   const config={
       headers:{
           Authorization:`Bearer ${userInfo.token}`
       }
   }
   
   const {data}=await axios.put(`/api/orders/${order._id}/deliver`,{},config)

   return data
}


const orderService= {
    createOrder,
    getOrderDetails,
    payOrder,
    listMyOrders,
    listOrders,
    deliverOrder,
}

export default orderService

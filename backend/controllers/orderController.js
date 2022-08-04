import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler' //this used to handlerror we can use try catch 

//@desc Create new order
//@route POST /api/orders
//@access Private 
export const addOrderItems=asyncHandler(async(req,resp)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body
    if(orderItems && orderItems.length===0)
    {
        resp.status(400)
        throw new Error('No order items')
        
    }
    else{
         const order=new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
         })

         const createdOrder=await order.save()
         resp.status(201).json(createdOrder)
    }
})

//@desc Get Order by ID
//@route GET /api/orders/:id
//@access Private 
export const getOrderById=asyncHandler(async(req,resp)=>{
   const order=await Order.findById(req.params.id).populate('user','name email')//to get name and email from user
   if(order){
    resp.json(order)
   }
   else{
    resp.status(404)
    throw new Error('Order not found')
   }

})

//@desc Update order to paid
//@route GET /api/orders/:id/pay
//@access Private 
export const updateOrderToPaid=asyncHandler(async(req,resp)=>{
    const order=await Order.findById(req.params.id)
    if(order){
     order.isPaid=true
     order.paidAt=Date.now()
     order.paymentResult={//this is comming from payal
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.payer.email_address
     }

     const updatedOrder=await order.save()
     resp.json(updatedOrder)
    }
    else{
     resp.status(404)
     throw new Error('Order not found')
    }
 
 })

//@desc Get logged in user orders
//@route GET /api/orders/myoreders
//@access Private 
export const getMyOrders=asyncHandler(async(req,resp)=>{
   const orders=await Order.find({user:req.user._id})
  
   resp.json(orders)
})

//@desc Get all  orders
//@route GET /api/orders 
//@access Private /admin
export const getOrders=asyncHandler(async(req,resp)=>{
   const orders=await Order.find({}).populate('user','id name')//we to order the some info of the user
   resp.json(orders)
})


//@desc Update order to delivered
//@route GET /api/orders/:id/delivere
//@access Private/admin
export const updateOrderToDelivered=asyncHandler(async(req,resp)=>{
   const order=await Order.findById(req.params.id)
   if(order){
    order.isDelivred=true
    order.delivredAt=Date.now()


    const updatedOrder=await order.save()
    resp.json(updatedOrder)
   }
   else{
    resp.status(404)
    throw new Error('Order not found')
   }

})

import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

   user: { //this is the user who buy the product 
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   orderItems: [
      {
         name: { type: String, required: true },
         qty: { type: Number, required: true },
         image: { type: String, required: true },
         price: { type: Number, required: true },
         product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
         },
         countInStock:{type:Number,required:true}
      }
   ],
   shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
   },
   paymentMethod: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_adress: { type: String },
   },
   taxPrice: {
      type: Number,
      required: true,
      default: 0.0
   },
   shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
   },
   totalPrice: {
      type: Number,
      required: true,
      default: 0.0
   },
   isPaid: {
      type: Boolean,
      required: true,
      default: false
   },
   paidAt: {
      type: Date,
   },
   isDelivred: {
      type: Boolean,
      required: true,
      default: false
   },
   delivredAt: {
      type: Date,
   },
   paymentResult:{}
}, {
   timestamps: true //with mongoose it will create the createdat and updated at fields automatically
})

const Order = mongoose.model('Order', orderSchema) //after schema we create a model of our user

export default Order
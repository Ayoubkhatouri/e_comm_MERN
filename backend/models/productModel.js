import mongoose from "mongoose";

const reviewSchema=mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User' //thats the relation between the review and the user who create made tha review    
    },
},{timestamps:true})


const productSchema=mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User' //thats the relation between the product and the user who create that product    
        },
        name:{
            type:String,
            required:true,
            unique:true
        },
        image:{
            type:String,
            required:true
        },
        brand:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        reviews:[reviewSchema],
        category:{
            type:String,
            required:true
        },
        rating:{//this is the average of all the rating
            type:Number,
            required:true,
            default:0
        },
        numReviews:{
            type:Number,
            required:true,
            default:0
        },
        price:{
            type:Number,
            required:true,
            default:0
        },
        countInStock:{
            type:Number,
            required:true,
            default:0
        },


    },{timestamps:true}
)

const Product=mongoose.model("Product", productSchema)

export default Product
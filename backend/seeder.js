import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from "./data/products.js";
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from "./models/orderModel.js";
import connectDB  from "./config/db.js";

dotenv.config()

connectDB()

const importData= async ()=>{//this actually replacing the data
    try {
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()

      const createdUsers= await User.insertMany(users)

    //add the admin user id for eachProduct
      const adminUser=createdUsers[0].id
      const sampleProducts=products.map(product=>{
        return {...product,user:adminUser}
      })
      await Product.insertMany(sampleProducts)
      
      console.log('Data Imported!'.green.inverse)
      process.exit()

    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1) //exit with 1 means exit with failure
    }
}

const destroyData= async ()=>{
    try {
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()

      console.log('Data Destroyed!'.red.inverse)
      process.exit()

    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1) //exit with 1 means exit with failure
    }
}

if(process.argv[2] === '-d'){ //cause we wanna do "node backend/seeder -d " and -d is the 3th argument 
    destroyData()               //look in packege.json
}
else{
    importData()
}
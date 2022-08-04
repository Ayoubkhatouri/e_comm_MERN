import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import colors from 'colors'//from here we use colors everywhere
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js' 
import cors from 'cors'



    dotenv.config()//so we can use the .env file

    connectDB()

    const app=express()



    app.use(express.json())//just to accept json data in the body postmen

    //this is for cors setup headers 
    app.use(cors({
        origin:'http://localhost:3000' //this is from frontend
    }))


        
    app.use('/api/products',productRoutes)//it gonna look in the / of the productRoutes file

    app.use('/api/users',userRoutes)

    app.use('/api/orders',orderRoutes)

    app.use('/api/upload',uploadRoutes)

    app.get('/api/config/paypal',(req,resp)=>resp.send(process.env.PAYPAL_CLIENT_ID))


    
    //making the upload file static to be acessible
    const __dirname=path.resolve()   //this not available in ES module we shoud add this line
    app.use('/uploads',express.static(path.join(path.join(__dirname, '/uploads'))))//__dirname pointe to the current directory
                                                                    


    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(path.join(__dirname,'/frontend/build')))

        app.get('*',(req,resp)=>resp.sendFile(path.resolve(__dirname,'frontend','build','index.html')))//* means any route thats not our api ('/api)
    }
    else{
        app.get('/',(req,resp)=>{
            resp.send('API is running...')
        })
    }


    //lets have a fallback for 404(not found error) using middleware
    app.use(notFound)

    //where gonna use this middleware to override a error handler so we don't get a html file but a json file
    app.use(errorHandler)

    const PORT=process.env.PORT || 5000
    app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `.yellow.bold))
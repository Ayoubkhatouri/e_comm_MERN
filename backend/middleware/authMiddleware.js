import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'


const protect =asyncHandler( async(req,resp,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       try {

        token =req.headers.authorization.split(" ")[1]
         const decoded=jwt.verify(token,process.env.JWT_SECRET)
         req.user=await User.findById(decoded.id).select('-password')
         next()//next means success
       } catch (error) {
        console.log(error)
        resp.status(401)
        throw new Error('Not authorized, token failed')
        
       }
    }
    if(!token){
        resp.status(401)
        throw new Error('not authorized no token')
    }
})

const admin=(req,resp,next)=>{ //only admin can see all users ...
    if(req.user && req.user.isAdmin){
        next() //next means success
    }
    else {
        resp.status(401)
        throw new Error('Not authorized as an Admin')
    }
}

export {protect,admin}

import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler' //this used to handlerror we can use try catch
import jwt from 'jsonwebtoken' 
import bcrypt from 'bcryptjs'

//@desc Auth user && get token
//@route Post /api/users/login
//@access Public 
export const authUser=asyncHandler(async(req,resp)=>{
   const {email,password}=req.body //we get this from the form input 

    const user =await User.findOne({email:email}) // this from database

    if(user && await user.matchPassword(password)){
        resp.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:genarateToken(user._id)
        })
    }
    else {
        resp.status(401)
        throw new Error('Invalid email or password')
    }
})


//@desc Register new user
//@route Post /api/users
//@access Public 
export const registerUser=asyncHandler(async(req,resp)=>{
    const {name,email,password}=req.body //we get this from the form input 
 
     const userExists =await User.findOne({email:email}) // this from database
    
     if(userExists){
        resp.status(400)
        throw new Error('User already exists')
     }

     //hash  password
     const salt=await bcrypt.genSalt(10)
     const hashedPassword=await bcrypt.hash(password,salt)

     const user =await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        resp.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:genarateToken(user._id)
        })
    }
    else{
        resp.status(400)
        throw new Error('Invalid user data')
    }
 })
 


//@desc GET user profile
//@route    GET /api/users/profile
//@access PRIVATE 

//im not using this cause in the state all of the info are there from Login 
export const getUserProfile=asyncHandler(async(req,resp)=>{ //we get the user profile from the token 
                                                        //cause we send the id in the token 
 const user=await User.findById(req.user._id)
    if(user){
        resp.json({
            _id:user._id,
            name:user.email,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }
    else {
        resp.status(404) 
        throw new Error('User not found')
    }

 })

 //@desc    Update user profile
//@route    PUT /api/users/profile
//@access PRIVATE 
export const updateUserProfile=asyncHandler(async(req,resp)=>{ //we get the user profile from the token 
            //cause we send the id in the token 
        const user=await User.findById(req.user._id)
        if(user){
         user.name=req.body.name || user.name //we check what we wanna change
         user.email=req.body.email || user.email
         if(req.body.password){
            //first lets hash the passsword
     const salt=await bcrypt.genSalt(10)
     const hashedPassword=await bcrypt.hash(req.body.password,salt)
     user.password=hashedPassword
         }
         const updatedUser=await user.save()
         resp.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:genarateToken(updatedUser._id)
        })

        }
        else {
            resp.status(404) 
        throw new Error('User not found')
        }
})


//@desc GET all users
//@route    GET /api/users
//@access PRIVATE/Admin
export const getUsers=asyncHandler(async(req,resp)=>{ 
const users=await User.find({})
resp.json(users)

})

//@desc Delete a  user
//@route  DELETE /api/users/:id
//@access PRIVATE/Admin
export const deleteUser=asyncHandler(async(req,resp)=>{ 
    const user=await User.findById(req.params.id)
    if(user){
        await user.remove()
        resp.json({message:'User removed'})
    }
    else{
        resp.status(404)
        throw new Error('User not found')
    }
    
    })


//@desc GET by Id
//@route    GET /api/users/:id
//@access PRIVATE/Admin
export const getUserById=asyncHandler(async(req,resp)=>{ 
    const user=await User.findById(req.params.id).select('-password')
    if(user)
        resp.json(user)
    else 
    resp.status(404)
        throw new Error('User not found')
    })


    
 //@desc    Update user 
//@route    PUT /api/users/:id
//@access PRIVATE /admin 
export const updateUser=asyncHandler(async(req,resp)=>{ //we get the user profile from the token 
        //cause we send the id in the token 
    const user=await User.findById(req.params.id)
    if(user){
        user.name=req.body.name || user.name //we check what we wanna change
        user.email=req.body.email || user.email
        if(req.body.isAdmin === false || req.body.isAdmin ===true)
        user.isAdmin=req.body.isAdmin 
        else
        user.isAdmin=user.isAdmin   


    const updatedUser=await user.save()
    resp.json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
    })
}
else {
    resp.status(404) 
throw new Error('User not found')
}
})




//Generate a token 
const genarateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET ,{expiresIn : '30d'})
}
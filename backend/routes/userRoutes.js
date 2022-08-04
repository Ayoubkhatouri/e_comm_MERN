import express from 'express'
import {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser,getUserById,updateUser} from '../controllers/userController.js'
const router=express.Router()
import {protect,admin} from '../middleware/authMiddleware.js'

router.post('/',registerUser)
router.post('/login',authUser)
router.get('/profile',protect ,getUserProfile)
router.put('/profile',protect ,updateUserProfile)
router.get('/',protect,admin,getUsers) //only admin can get all users 
router.delete('/:id',protect,admin,deleteUser)
router.get('/:id',protect,admin,getUserById)
router.put('/:id',protect,admin,updateUser)





export default router
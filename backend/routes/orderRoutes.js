import express from 'express'
import {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered} from '../controllers/orderController.js'
const router=express.Router()
import {protect,admin} from '../middleware/authMiddleware.js'

router.post('/',protect,addOrderItems)
router.get('/myorders',protect,getMyOrders)
router.get('/:id',protect,getOrderById)//we set this in the buttom
router.put('/:id/pay',protect,updateOrderToPaid)
router.get('/',protect,admin,getOrders)
router.put('/:id/deliver',protect,admin,updateOrderToDelivered)



export default router
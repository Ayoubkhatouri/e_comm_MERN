import express from 'express'
import {getProducts,getProductByTd,deleteProduct,createProduct,updateProduct,createProductReview,getTopProducts} from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

const router=express.Router()

router.get('/',getProducts)
router.get('/top',getTopProducts)//u should start with the routes that not contains :id for example
router.get('/:id',getProductByTd)
router.delete('/:id',protect,admin,deleteProduct)
router.post('/',protect,admin,createProduct)
router.put('/:id',protect,admin,updateProduct)
router.post('/:id/reviews',protect,createProductReview)




export default router
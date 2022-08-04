import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler' //this used to handlerror we can use try catch 



export const getProducts=asyncHandler(async(req,resp)=>{

    //make paginate
    const pageSize=10
    const page=Number(req.query.pageNumber) || 1 //if that not exist then we are in page one 
    

    //list the products in search
    const keyword=(req.query.keyword) ?{//query is how u can get a query string(? , = ...)
        name:new RegExp(req.query.keyword,'i')
    } : {} //in this case we return everything

    const count =await Product.countDocuments({...keyword})
    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize *(page-1)) //return everything from Product if keyword is empty
    resp.json({products,page,pages:Math.ceil(count/pageSize)})
})


export const getProductByTd=asyncHandler(async(req,resp)=>{
    const product=await Product.findById(req.params.id)
    if(product){
    resp.json(product) //what we wanna return
    }
    else{
       // resp.status(404).json({message:'Product not found'}) this old
       // now we have the error handler from express
       resp.status(404)
       throw Error('Product Not found')
    }
})


//@desc Delete a product
//@route DELETE /api/products/:id
//@access Private/Admin
export const deleteProduct=asyncHandler(async(req,resp)=>{
    const product=await Product.findById(req.params.id)
    if(product){
    await product.remove()
    resp.json({message:'Product removed'})
    }
    else{
       // resp.status(404).json({message:'Product not found'}) this old
       // now we have the error handler from express
       resp.status(404)
       throw Error('Product Not found')
    }
})


//@desc Create a product
//@route POST /api/products/
//@access Private/Admin
export const createProduct=asyncHandler(async(req,resp)=>{
    const product =new Product({
        name:'sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0,
        description:'sample description'
    })

    const createdProduct=await product.save()
    resp.status(201).json(createdProduct)
})


//@desc Update a product
//@route PUt /api/products/:id
//@access Private/Admin
export const updateProduct=asyncHandler(async(req,resp)=>{
       const {name,price,description,image,brand,category,countInStock}=req.body

       const product=await Product.findById(req.params.id)
       if(product){
        product.name=name
        product.price=price
        product.description=description
        product.image=image
        product.brand=brand
        product.category=category
        product.countInStock=countInStock

        const updatedProduct=await product.save()
        resp.json(updatedProduct)
       }
       else{
        resp.status(404)
        throw new Error('Product not found')
       }
})




//@desc Create new  review
//@route POST /api/products/:id/reviews
//@access Private
export const createProductReview=asyncHandler(async(req,resp)=>{
    const {rating,comment}=req.body

    const product=await Product.findById(req.params.id)
    if(product){
    const alreadyReviewd=product.reviews.find(r=>r.user.toString()===req.user._id.toString())
    if(alreadyReviewd){
        resp.status(400)
        throw new Error('Product already reviewed')
    }

    const review={
        name:req.user.name,
        rating:Number(rating),
        comment,
        user:req.user._id
    }

    product.reviews.push(review)

    product.numReviews=product.reviews.length

    product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length

    await product.save()
    resp.status(201).json({message:'Review added'})
    }
    else{
     resp.status(404)
     throw new Error('Product not found')
    }
})



//@desc Get top rated products
//@route GET /api/products/top
//@access Pulic
export const getTopProducts=asyncHandler(async(req,resp)=>{
    
    const products=await Product.find({}).sort({rating: -1}).limit(3)// -1 means w sort by acending order in rating
    resp.json(products)

})


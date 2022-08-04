import axios from "axios";

//get products
 const listProducts=async(keyword='',pageNumber)=>{
   
   let response
   
   if(keyword)
    response=await  axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
    else
    response=await  axios.get(`/api/products?pageNumber=${pageNumber}`)
    return response.data
 }

 //get a single product Details
const listProductDetails=async(id)=>{
    const response=await axios.get(`/api/products/${id}`)
    return response.data

}

//delete a product
const deleteProduct=async(id,thunkAPI)=>{
   //get user info
   const state=thunkAPI.getState()
   const userInfo=state.user.userInfo

   const config={
      headers:{
         Authorization:`Bearer ${userInfo.token}`
      }
   }

   await axios.delete(`/api/products/${id}`,config)
}

//create a product
const createProduct=async(thunkAPI)=>{
   //get user info
   const state=thunkAPI.getState()
   const userInfo=state.user.userInfo

   const config={
      headers:{
         Authorization:`Bearer ${userInfo.token}`
      }
   }

  const {data}= await axios.post(`/api/products`,{},config)
  return data
}

//upadre a product
const updateProduct=async(product,thunkAPI)=>{
   //get user info
   const state=thunkAPI.getState()
   const userInfo=state.user.userInfo

   const config={
      headers:{
         Authorization:`Bearer ${userInfo.token}`
      }
   }

  const {data}= await axios.put(`/api/products/${product._id}`,product,config)
  return data
}


//create a review
const productCreateReview=async(productId_and_review,thunkAPI)=>{
   //get user info
   const state=thunkAPI.getState()
   const userInfo=state.user.userInfo

   const config={
      headers:{
         Authorization:`Bearer ${userInfo.token}`
      }
   }

 await axios.post(`/api/products/${productId_and_review.productId}/reviews`,productId_and_review.review,config)
}

//get top products
const listTopProducts=async()=>{
   
   const  {data}=await axios.get(`/api/products/top`)
    return data
 }




 const productService={
    listProducts,
    listProductDetails,
    deleteProduct,
    createProduct,
    updateProduct,
    productCreateReview,
    listTopProducts,
 }

 export default productService
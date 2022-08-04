import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link, useNavigate, useLocation ,useParams} from "react-router-dom"
import {Form ,Button, Spinner} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails,updateProduct,reset} from '../features/product/productSlice'
import Loader from '../components/Loader'


 const ProductEditScreen  = () => {
    const params=useParams()
    const productId=params.id
   

    const [name,setName]=useState('')
    const [price,setPrice]=useState(0)
    const [image,setImage]=useState('')
    const [brand,setBrand]=useState('')
    const [category,setCategory]=useState('')
    const [countInStock,setCountInStock]=useState(0)
    const [description,setDescription]=useState('')
    const [uploading,setUploading]=useState(false)
   

    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const product=useSelector(state=>state.product)
    const {isLoading,isError,isSuccess,message,productDetails}=product
    
    const {Loadingupdate,Errorupdate,Successupdate,messageupdate,updatedProduct}=product.updateProductInfo
     


    useEffect(()=>{
        if(Successupdate){
            dispatch(reset())
            navigate('/admin/productList')
        }
else{
      if(!productDetails.name || productDetails._id !== productId){
        dispatch(listProductDetails(productId))
      }
      else{
        setName(productDetails.name)
        setPrice(productDetails.price)
        setImage(productDetails.image)
        setBrand(productDetails.brand)
        setCategory(productDetails.category)
        setCountInStock(productDetails.countInStock)
        setDescription(productDetails.description)
      }
    }
    },[dispatch,productDetails,productId,Successupdate,navigate])

    const uploadFileHandler=async(e)=>{
        const file=e.target.files[0]
        const formData=new FormData()
        formData.append('image',file)
        setUploading(true)
        try {
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            const {data}=await axios.post('/api/upload',formData,config)
            setImage(data) //cause we send back the path in the backend
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
 
    }
    

const submitHandler=(e)=>{

    dispatch(updateProduct({
        _id:productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock
    }))
    window.location.reload(true)
}

  if(isLoading)
  return <Spinner/>

  return (
    <>
    <Link to='/admin/productList' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
        <h1>Edit product</h1>
        {Loadingupdate && <Loader/>}
        {Errorupdate && <Message variant='danger'>{messageupdate}</Message>}
       
        {isLoading ? <Loader/> : isError ? <Message variant='danger'>{message}</Message>:(
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>Name </Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name}
                    onChange={(e)=>setName(e.target.value)}> 
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter Price' value={price}
                    onChange={(e)=>setPrice(e.target.value)}> 
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='image' >
                <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Enter Image Url' value={image}
                    onChange={(e)=>setImage(e.target.value)}> 
                     </Form.Control>
                     <Form.Control type='file' label='Choose File'  onChange={uploadFileHandler}></Form.Control>
                     {uploading && <Loader/>}
                </Form.Group>
                <Form.Group controlId='brand' >
                <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder='Enter Brand ' value={brand}
                    onChange={(e)=>setBrand(e.target.value)}> 
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock' >
                <Form.Label>countInStock</Form.Label>
                    <Form.Control type='number' placeholder='Enter countInStock ' value={countInStock}
                    onChange={(e)=>setCountInStock(e.target.value)}> 
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId='category' >
                <Form.Label>category</Form.Label>
                    <Form.Control type='text' placeholder='Enter category ' value={category}
                    onChange={(e)=>setCategory(e.target.value)}> 
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId='description' >
                <Form.Label>description</Form.Label>
                    <Form.Control type='text' placeholder='Enter description ' value={description}
                    onChange={(e)=>setDescription(e.target.value)}> 
                     </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
            </Form>
        )}
        

    </FormContainer>
    </>
   
  )
}

export default ProductEditScreen

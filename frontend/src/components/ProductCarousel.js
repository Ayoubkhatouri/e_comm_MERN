import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'



const ProductCarousel = () => {
    const dispatch=useDispatch()

    const productTopRated=useSelector(state=>state.product.productTopRated)
    const {TopProducts,LoadingTopProducts,ErrorTopProducts,messageErrorTopProducts}=productTopRated

    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])

  return <>
  <h1>Top Rated Products</h1> 
  {LoadingTopProducts? <Loader/> : ErrorTopProducts ? <Message variant='danger'>{messageErrorTopProducts}</Message> :(
    <Carousel pause='hover' className='bg-dark'>
        {TopProducts.map((product)=>(
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
        }
  </>
  
}


export default ProductCarousel
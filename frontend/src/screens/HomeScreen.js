import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row , Col} from 'react-bootstrap'
import Products from '../components/Products'
import { listProducts } from '../features/product/productSlice'
import Message from '../components/Message'
import  Loader  from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'


const HomeScreen = () => {

  const params=useParams()
  const keyword=params.keyword
  const pageNumber=params.pageNumber || 1


  const dispatch=useDispatch()

  //we use selector to get the products from our local storage cause there are there now because of store.js
   const productList=useSelector(state=>state.product)
   const {isLoading,isError,message,products,page,pages}=productList


  useEffect(()=>{
    const keyword_pageNumber={
      keyword,
      pageNumber
    }
    dispatch(listProducts(keyword_pageNumber)) //this just put things in the state  

  },[dispatch,isError,keyword,pageNumber])


 
  if(isLoading)
  return <Loader/>

  return (
    <>
    <Meta/>
    
    {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'>Go Back</Link>}
     <h1>Latest products</h1>
    {isError ?   <Message variant='danger'>{message}</Message> :
    <>
     <Row> 
        {products.map((product)=>(
            <Col  key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Products product={product}/>
            </Col>
        ))}
    </Row>
    <Paginate pages={pages} page={page} isAdmin={false} keyword={keyword ? keyword : ''}/>
    </>
  
    }
    </>
)
}

export default HomeScreen
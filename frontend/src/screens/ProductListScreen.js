import React,{useEffect} from 'react'
import {  useNavigate,useParams } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts,deleteProduct,createProduct,reset} from '../features/product/productSlice'
import Paginate from '../components/Paginate'
 

const ProductListScreen = () => {
    const params =useParams()
    const pageNumber=params.pageNumber || 1

    const dispatch=useDispatch()
    const product=useSelector(state=>state.product)
    const {isLoading,isError,message,products ,pages,page}=product

    const {LoadingDelete,ErrorDelete,messageDelete,SuccessDelete}=product.deleteProductInfo

    const user=useSelector(state=>state.user)
    const {userInfo}=user
    
    const {Loadingcreate,Errorcreate,messagecreate,Successcreate,createdProduct}=product.createProductInfo

    const navigate=useNavigate()
    useEffect(()=>{ 
        if( !userInfo.isAdmin){
            navigate('/login')
        }
       if(Successcreate){
        navigate(`/admin/product/${createdProduct._id}/edit`) //cause we create a product with simple data
        dispatch(reset())
       }
      else{
        const keyword_pageNumber={
            keyword:'',
            pageNumber
          }
        
        dispatch(listProducts(keyword_pageNumber))
      }
           
    },[dispatch,navigate,userInfo,SuccessDelete,Successcreate,createdProduct._id,page,pageNumber])

    const deleteHndler=(id)=>{
        if(window.confirm("Are you sure ?")){
        dispatch(deleteProduct(id))
    }
}

const createProductHandler=()=>{
    dispatch(createProduct())
}


  return (
    <>
    <Row className=''>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col>
            <Button className='my-3 moveright' onClick={createProductHandler}>
              <i className='fas fa-plus'></i> Create Product
            </Button>
        </Col>
    </Row>
    {LoadingDelete && <Loader/>}
    {ErrorDelete && <Message variant='danger'>{messageDelete}</Message>}
    {Loadingcreate && <Loader/>}
    {Errorcreate && <Message variant='danger'>{messagecreate}</Message>}
       
        {isLoading ? <Loader/> : isError ? <Message variant='danger'>{message}</Message> : (
            <>
            <Table striped bordered="true" hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>
                             {product.category}
                            </td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='ligth' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHndler(product._id)}>
                                <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true}/>
            </>
        )}
    </>
  )
}

export default ProductListScreen
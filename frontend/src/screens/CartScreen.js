import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import { Link ,useNavigate} from 'react-router-dom'
import { addToCart,changeQty,removeItem } from '../features/cart/cartSlice'
import { useParams,useLocation } from 'react-router-dom'

const CartScreen = () => {
  const params=useParams()
  const location=useLocation() // to get the ?qty
  const productId=params.id

  const qty=location.search ? Number(location.search.split('=')[1]) :1 //cause it like this ?qty=1

  const cart=useSelector(state=>state.cart)
  const {cartItems}=cart
 
  const navigate=useNavigate()

  const dispatch=useDispatch()
  const userLogin=useSelector(state=>state.user)
  const {userInfo}=userLogin

  useEffect(()=>{
     if(productId){
      const obj={
        id:productId,
        qty:qty
      }
      dispatch(addToCart(obj))
     }
  },[qty,dispatch,productId])
  
  const removeFromCartHandler = (id) => {
    dispatch(removeItem(id))
  }

 

 const checkOutHandler=()=>{
  if(userInfo)
  navigate('/shipping')
  else
  navigate('/login?redirect=shipping')
 }

  return (
    <Row>
      <Col md={9}>
      <h1>Shopping cart</h1>
      {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
        <ListGroup variant='flush'>
             {cartItems.map(item => (
              <ListGroup.Item key ={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control as='select' value={item.qty} onChange={(e)=>{
                      console.log(e.target.value)
                        const obj={
                          
                          id:item.product,
                          qty:Number(e.target.value)
                        }
                        dispatch(changeQty(obj))
                    }}>
                       {
                        [...Array(item.countInStock).keys()].map((x)=>(
                              <option key={x+1} value={x+1}>
                                   {x+1}
                              </option>
                            ))
                       }
                    </Form.Control>
                  </Col>  
                  <Col md={2}>
                    <Button type='button' variant='light'  onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
             ))}
        </ListGroup>
      )}
      </Col>
    <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Subtotal ({cartItems.reduce((acc,item )=>acc+Number(item.qty),0)}) items</h2>
                  ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type='button' className='btn_block' disabled={cartItems.length===0} 
                  onClick={checkOutHandler}>Proceed To checkOut</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
    </Col>

    </Row>
  )
}

export default CartScreen
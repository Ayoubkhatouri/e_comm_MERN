import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {  useNavigate,  useParams } from "react-router-dom"
import {Button,Row,Col,ListGroup,Image,Card } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import {  payOrder,reset ,deliverOrder} from '../features/order/orderSlice'

const OrderScreen = () => {

  

  const [sdkReady,setSdkReady]=useState(false ) //SDKs allow programmers to develop apps for a specific platform.

  const dispach=useDispatch()
  const navigate=useNavigate()
  const params=useParams()

  const orderId=params.id
  const userInfo=useSelector((state)=>state.user.userInfo)
  
  const [orderDetails,setorderDetails]=useState(null)
  const [loadingState,setLoadingState]=useState(true)

  //funct to get manually the order data
  const getOrderDetails=async(orderId)=>{
    setLoadingState(true)
    try {
      const config={
        headers:{
            Authorization:`Bearer ${userInfo.token}`
        }
    }
   
    const {data}=await axios.get(`/api/orders/${orderId}`,config)
    setorderDetails(data)
    setLoadingState(false)
    } catch (error) {
  
      console.log(error)
      setLoadingState(false)
    }
  }



  

  const order=useSelector((state)=>state.order)
  const {isSuccess,isError,message,isLoading}=order

  const {orderPay}=order
  const {LoadingPay,SuccessPay}=orderPay

  const {orderDeliverdInfo}=order
  const {LoadingDeliver,SuccessDeliver}=orderDeliverdInfo

    const addPaypalScript=async ()=>{
      
      //we adding dynamiclly that paypal script
      const {data:clientId}=await axios.get('/api/config/paypal') //we get this from paypal API
      const script=document.createElement('script')
      script.type='text/javascript'
      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}` //we get this from "paypal sdk script"
      script.async=true
      script.onload=()=>{
        setSdkReady(true)
      } 
    
      document.body.appendChild(script)
    }

    
  useEffect(()=>{
    if(!userInfo)
    navigate('/login')

    getOrderDetails(orderId)
    
    if(orderDetails && !orderDetails.isPaid){
      if(!window.paypal){
        addPaypalScript()
      }
      else{
        setSdkReady(true)
      }
    }
  },[orderId,orderDetails])
 

  const cart=useSelector((state)=>state.cart)

  const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
  }
  //calculate prices
  let itemsPrice
  if(orderDetails)
   itemsPrice=addDecimals(orderDetails.orderItems.reduce((acc,item)=>acc +item.price*item.qty,0))

  const SuccessPaymenntHandler=(paymentResult)=>{
      dispach(payOrder({orderId,paymentResult}))
      dispach(reset())
  }

  const deliverHndler=()=>{
    dispach(deliverOrder(orderDetails))
  }



  return loadingState && !orderDetails ? <Loader/> : isError ? <Message variant='danger'>message</Message>:(
    <>
    <h1>Order {orderDetails._id}</h1>
    <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
             <p> <strong>Name: </strong>{orderDetails.user.name}</p>
             <p><strong>Email: </strong> <a href={`mailto:${orderDetails.user.email}`}>{orderDetails.user.email}</a></p>
              <p>
                <strong>Address: </strong>
                {orderDetails.shippingAddress.address},{orderDetails.shippingAddress.city},{' '}
                {orderDetails.shippingAddress.postalCode},{' '}{orderDetails.shippingAddress.country}
              </p>
              {orderDetails.isDelivred ? <Message variant='success'>Delivered on {orderDetails.delivredAt}</Message> :
              <Message variant='danger'>Not Delivered</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
              </p>
              {orderDetails.isPaid ? <Message variant='success'>Paid on {orderDetails.paidAt}</Message> :
              <Message variant='danger'>Not paid</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderDetails.orderItems.length === 0 ? <Message>Order is empty</Message>: (
                <ListGroup variant='flush'>
                  {orderDetails.orderItems.map((item,index)=>(
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded/>
                        </Col>
                        <Col> 
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                        </Col>
                        <Col md={5}>
                          {item.qty} x ${item.price} = ${item.qty*item.price }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card >
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {LoadingPay && <Loader/>}
                  {!sdkReady ? <Loader/> :(
                    <PayPalButton amount={orderDetails.totalPrice} onSuccess={SuccessPaymenntHandler}/>
                  )}
                </ListGroup.Item>
              )}
              {LoadingDeliver && <Loader/>}
              {
               userInfo && userInfo.isAdmin && orderDetails.isPaid && !orderDetails.isDelivred && (
                  <ListGroup.Item>
                    <Button type='button' className='btn btn-block' onClick={deliverHndler}>
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
   
}

export default OrderScreen
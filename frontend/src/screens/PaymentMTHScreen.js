import React,{useState} from 'react'
import {  useNavigate } from "react-router-dom"
import {Form ,Button,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../features/cart/cartSlice'
import CheckoutSteps from '../components/ChekoutSteps'

const PaymentMTHScreen = () => {
    const navigate=useNavigate()

    const  cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart

    if(!shippingAddress){
        navigate('/shipping')
    }

    const [paymentMehod,setPaymentMehod]=useState('PayPal')
    
    const dispatch=useDispatch()
   

    const submitHandle=(e)=>{
        
      // e.prenventDefault()// it not gonna work if u did this
        dispatch(savePaymentMethod(paymentMehod))
        navigate('/placeorder')
       
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandle}>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
 
        <Col>
            <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' 
            name='paymentMethod' value='PayPal' checked onChange={(e)=>setPaymentMehod(e.target.value)}></Form.Check>
          
           {/*We can add another payment method if we want to*/ }
            {/* <Form.Check type='radio' label='Stripe' id='Stripe' 
            name='paymentMethod' value='Stripe'  onChange={(e)=>setPaymentMehod(e.target.value)}></Form.Check> */}
        </Col>
        </Form.Group>
            <Button type='submit' variant='primary' >
                Continue
            </Button>
        
        </Form>
    </FormContainer>
  )
}


export default PaymentMTHScreen
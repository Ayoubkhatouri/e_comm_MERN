import React,{useState} from 'react'
import {  useNavigate } from "react-router-dom"
import {Form ,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../features/cart/cartSlice'
import CheckoutSteps from '../components/ChekoutSteps'

const ShippingScreen = () => {

    const  cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart

    const [address,setAddress]=useState(shippingAddress.address ? shippingAddress.address :'')
    const [city,setCity]=useState(shippingAddress.city ? shippingAddress.city :'')
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode ? shippingAddress.postalCode :'')
    const [country,setCountry]=useState(shippingAddress.country ? shippingAddress.country :'')

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const submitHandle=()=>{
        
      //  e.prenventDefault() it not gonna work if u did this
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandle}>
        <Form.Group controlId='address'>
                <Form.Label>Address </Form.Label>
                <Form.Control type='text' placeholder='Enter address' value={address}
                onChange={(e)=>setAddress(e.target.value)}  required> 
                </Form.Control>
            </Form.Group>
        <Form.Group controlId='city'>
                <Form.Label>City </Form.Label>
                <Form.Control type='text' placeholder='Enter city' value={city}
                onChange={(e)=>setCity(e.target.value)}  required> 
                </Form.Control>
            </Form.Group>
        <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code </Form.Label>
                <Form.Control type='text' placeholder='Enter postal Code' value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}  required> 
                </Form.Control>
            </Form.Group>
        <Form.Group controlId='country'>
                <Form.Label>Country </Form.Label>
                <Form.Control type='text' placeholder='Enter country' value={country}
                onChange={(e)=>setCountry(e.target.value)}  required> 
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' >
                Continue
            </Button>
        
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
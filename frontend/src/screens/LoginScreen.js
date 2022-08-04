import React,{useState,useEffect} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import {Form ,Button, Row ,Col, Spinner} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import {login,reset} from '../features/user/userSlice'
import FormContainer from '../components/FormContainer'


 const LoginScreen = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userLogin=useSelector(state=>state.user)
    const {isLoading,isError,isSuccess,message,userInfo}=userLogin

    const redirect=location.search ? location.search.split('=')[1] :'/'
   
    useEffect(()=>{
      if(isSuccess || userInfo){ // means is logged in 
        navigate(redirect)
    }   
    dispatch(reset())
    },[navigate,userInfo,redirect,isSuccess,dispatch])

const submitHandler=(e)=>{
e.preventDefault()
  dispatch(login({email,password}))
 
}


  if(isLoading)
  return <Spinner/>

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {isError && <Message variant='danger'>{message}</Message>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email}
                onChange={(e)=>setEmail(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password </Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password}
                onChange={(e)=>setPassword(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Sign In</Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` :'/register'}>Register</Link>
          </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen

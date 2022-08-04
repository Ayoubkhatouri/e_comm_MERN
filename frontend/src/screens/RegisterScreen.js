import React,{useState,useEffect} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import {Form ,Button, Row ,Col, Spinner} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import {register,reset} from '../features/user/userSlice'
import FormContainer from '../components/FormContainer'


 const RegisterScreen = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [Message2,setMessage2]=useState(null)

    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userRegister=useSelector(state=>state.user)
    const {isLoading,isError,isSuccess,message,userInfo}=userRegister

    const redirect=location.search ? location.search.split('=')[1] :'/' 

    useEffect(()=>{
      if(isSuccess || userInfo){ // means is logged in 
        navigate('/')
    }   
    dispatch(reset())
    },[navigate,userInfo,redirect,isSuccess,dispatch])

const submitHandler=(e)=>{
 e.preventDefault()
 if(password !== confirmPassword){
    setMessage2('Passwords do not match')
 }
 else{
    dispatch(register({name,email,password})) 
 }

}


  if(isLoading)
  return <Spinner/>

  return (
    <FormContainer>
        <h1>Sign Up </h1>
        {Message2 && <Message variant='danger'>{Message2}</Message>}
        {isError && <Message variant='danger'>{message}</Message>}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name </Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name}
                onChange={(e)=>setName(e.target.value)}> 
                </Form.Control>
            </Form.Group>
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
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password </Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Register</Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` :'/login'}>Login</Link>
          </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen

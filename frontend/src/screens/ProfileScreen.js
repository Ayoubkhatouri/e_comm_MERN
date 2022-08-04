import React,{useState,useEffect} from 'react'
import {  useNavigate } from "react-router-dom"
import {Form ,Button, Row ,Col, Spinner, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import {updateUser} from '../features/user/userSlice'
import { listMyOrders } from '../features/order/orderSlice'
import Loader from '../components/Loader'



 const ProfileScreen = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [Message2,setMessage2]=useState(null)
    const dispatch=useDispatch()


    const navigate=useNavigate()
    const userDetails=useSelector(state=>state.user)
    const {isLoading,isError,isSuccess,message,userInfo}=userDetails

    const order=useSelector(state=>state.order)
    const {isLoading:isloadingOrders,isError:isErrorOrders,message:messageErrOrders,myOrders}=order //we rename thoose who match isLoading ...
    

    useEffect(()=>{
      if(! userInfo){ // means is not logged in 
        navigate('/login')
    }   
    else{
        setName(userInfo.name)
        setEmail(userInfo.email)
        dispatch(listMyOrders())
    }
    
   
    },[navigate,userInfo,dispatch,messageErrOrders])

const submitHandler=(e)=>{
 e.preventDefault()
 if(password !== confirmPassword){
    setMessage2('Passwords do not match')
 }
 else{
  const  id=userInfo._id
    
  dispatch(updateUser({id,name,email,password}))


 }

}


  if(isLoading)
  return <Spinner/>

  return <Row>
    <Col md={3}>
    <h2>User Profile</h2>
        {Message2 && <Message variant='danger'>{Message2}</Message>}
        {isError && <Message variant='danger'>{message}</Message>}
        {isSuccess && <Message variant='success'>{message}</Message>}
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
            <Button type='submit' variant='primary'>Update</Button>
        </Form>
    </Col>
    <Col md={9}>
<h2>My Orders</h2>
{isloadingOrders ? <Loader/> : isErrorOrders  ? <Message variant='danger'>{messageErrOrders}</Message> : (
    <Table striped bordered="true" hover responsive className='table-sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {myOrders && myOrders.map((order)=>(
                <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt && order.createdAt.substring(0,10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid && order.paidAt ? order.paidAt.substring(0,10) : <i className='fas fa-times' style={{color:'red'}}></i>}</td>
                    <td>{order.isDelivred &&  order.delivredAt ? order.delivredAt.substring(0,10) : <i className='fas fa-times' style={{color:'red'}}></i>}</td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>Details</Button>
                        </LinkContainer>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
)}
    </Col>
  </Row>
}

export default ProfileScreen

import React,{useEffect} from 'react'
import {  useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listOrders} from '../features/order/orderSlice'

const OrderListScreen = () => {

    const dispatch=useDispatch()
    const user=useSelector(state=>state.user)
    const {userInfo}=user

    const order=useSelector(state=>state.order)
    const {isLoading,isError,message,allOrders}=order
    
    const navigate=useNavigate()
    useEffect(()=>{ 
        console.log('hey')
        if(userInfo && userInfo.isAdmin){
           
        dispatch(listOrders())
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate,userInfo])


  return (
    <>
        <h1>Orders</h1> 
        {isLoading ? <Loader/> : isError ? <Message variant='danger'>{message}</Message> : (
            <Table striped bordered="true" hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID </th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (order.paidAt.substring(0,10)) :(
                                    <i className='fas fa-times' style={{coloe:'red'}}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivred ? (order.delivredAt.substring(0,10)) :(
                                    <i className='fas fa-times' style={{coloe:'red'}}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='ligth' className='btn-sm'>
                                       Details
                                    </Button>
                                </LinkContainer>
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default OrderListScreen
import React,{useState,useEffect} from 'react'
import { Link, useNavigate, useLocation ,useParams} from "react-router-dom"
import {Form ,Button, Spinner} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails,adminUpdateUser } from '../features/user/userSlice'
import Loader from '../components/Loader'


 const UserEditScreen = () => {
    const params=useParams()
    const userId=params.id
   

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [isAdmin,setisAdmin]=useState(false)
   

    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    const {isLoading,isError,isSuccess,message,userDetails}=user
    const  {LoadingUpdate,SuccessUpdate,ErrorUpdate,messageUpdate}=user.updateUser


    useEffect(()=>{
      if(!userDetails.name || userDetails._id!==userId){
        dispatch(getUserDetails(userId))
      }
      else{
        setName(userDetails.name)
        setEmail(userDetails.email)
        setisAdmin(userDetails.isAdmin)
      }
    },[dispatch,userDetails,userId])

const submitHandler=(e)=>{
 e.preventDefault()
 dispatch(adminUpdateUser({id:userId,name,email,isAdmin}))
 window.location.reload(true);
    navigate('/admin/userList')
}


  if(isLoading)
  return <Spinner/>

  return (
    <>
    <Link to='/admin/userList' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
        <h1>Edit user</h1>
        {LoadingUpdate && <Loader/>}
        {ErrorUpdate && <Message variant='danger'>{messageUpdate}</Message>}
        {isLoading ? <Loader/> : isError ? <Message variant='danger'>{message}</Message>:(
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
                <Form.Group controlId='isadmin' className='my-2'>
                    <Form.Check type='checkbox' label=' is Admin' checked={isAdmin}
                    onChange={(e)=>setisAdmin(e.target.checked)}> 
                    </Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
            </Form>
        )}
        

    </FormContainer>
    </>
   
  )
}

export default UserEditScreen

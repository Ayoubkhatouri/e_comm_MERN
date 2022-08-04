import React,{useEffect} from 'react'
import {  useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listUsers,deleteUser,reset} from '../features/user/userSlice'

const UsersListScreen = () => {

    const dispatch=useDispatch()
    const user=useSelector(state=>state.user)
    const {isLoading,isError,message,usersList}=user

    const {userInfo}=user
    

    const navigate=useNavigate()
    useEffect(()=>{ 
        if(userInfo && userInfo.isAdmin){
            dispatch(reset())
        dispatch(listUsers())
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate,userInfo])

    const deleteHndler=(id)=>{
        if(window.confirm("Are you sure ?")){
        dispatch(deleteUser(id))
        window.location.reload(true);
    }
}


  return (
    <>
        <h1>Users</h1> 
        {isLoading ? <Loader/> : isError ? <Message variant='danger'>{message}</Message> : (
            <Table striped bordered="true" hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((user)=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                {user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>) :(
                                    <i className='fas fa-times' style={{coloe:'red'}}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='ligth' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHndler(user._id)}>
                                <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default UsersListScreen
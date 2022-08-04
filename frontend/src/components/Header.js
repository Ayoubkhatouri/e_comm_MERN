import React, { useEffect } from 'react'
import { LinkContainer} from 'react-router-bootstrap'
import {Nav,Navbar,Container, NavDropdown } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import SearchBox from './SearchBox'

//rafce
const Header = () => {

  const dispatch=useDispatch()

  const userLogin=useSelector(state=>state.user)
  const {userInfo}=userLogin

  const navigate=useNavigate()

  const logoutHandler=()=>{
    localStorage.setItem('cartItems',JSON.stringify([]))

   dispatch(logout())
   navigate('/')
   window.location.reload();
  }

  return (
    <header>
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand >Proshop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox/>
          <Nav className="ml-auto navbar-links" >
            <LinkContainer to={'/cart'}>
            <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) :(
               <LinkContainer to="/login">
               <Nav.Link ><i className='fas fa-user'></i>Sign In</Nav.Link>
               </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin &&  (
               <NavDropdown title='Admin' id='adminmenue'>
               <LinkContainer to='/admin/userList'>
                 <NavDropdown.Item>Users</NavDropdown.Item>
               </LinkContainer>
               <LinkContainer to='/admin/productList'>
                 <NavDropdown.Item>Products</NavDropdown.Item>
               </LinkContainer>
               <LinkContainer to='/admin/orderList'>
                 <NavDropdown.Item>Orders</NavDropdown.Item>
               </LinkContainer>
             </NavDropdown>
            )}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
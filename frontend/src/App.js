import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import {Container} from 'react-bootstrap'
import{BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMTHScreen from "./screens/PaymentMTHScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UsersListScreen from "./screens/UsersListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
   


const  App=()=> {
  return (
    
      <>
    <Router>
    <Header/>
    <main className="py-3">
      <Container >
      <Routes>
          <Route path="/" element={<HomeScreen/>} exact/>
          <Route path='/product/:id' element={<ProductScreen/>}/>
          <Route path='/cart/:id' element={<CartScreen/>}/> 
          <Route path='/cart' element={<CartScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/register" element={<RegisterScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
          <Route path="/shipping" element={<ShippingScreen/>}/>
          <Route path="/login/shipping" element={<ShippingScreen/>}/>
          <Route path="/payment" element={<PaymentMTHScreen/>}/>
          <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
          <Route path="/order/:id" element={<OrderScreen/>}/>
          <Route path="/admin/userList" element={<UsersListScreen/>}/>
          <Route path="/admin/user/:id/edit" element={<UserEditScreen/>}/>
          <Route path="/admin/productList" element={<ProductListScreen/>} exact/>
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
          <Route path="/admin/orderList" element={<OrderListScreen/>}/>
          <Route path="/search/:keyword" element={<HomeScreen/>} exact />
          <Route path="/page/:pageNumber" element={<HomeScreen/>} exact />
          <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen/>} exact />
          <Route path="/admin/productList/:pageNumber" element={<ProductListScreen/>} exact/>
          
          </Routes>
    </Container>
    </main>
    <Footer/>
    </Router>
    </>
    
   
  );
}

export default App;

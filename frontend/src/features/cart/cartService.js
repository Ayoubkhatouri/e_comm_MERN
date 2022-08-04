import axios from "axios";

//add To Cart 
const addToCart=async(id)=>{
    const  response=await axios.get(`/api/products/${id}`)
    return response.data
}





const cartService={
    addToCart,
}



export default cartService
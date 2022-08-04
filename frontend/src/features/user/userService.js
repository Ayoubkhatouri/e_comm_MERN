import axios from "axios";


//Login user

const login=async(userdata)=>{

    const {data}=await axios.post('/api/users/login',userdata)//data here is {email,password}
    if(data){
        localStorage.setItem('userInfo',JSON.stringify(data))
    }
    return data
}

//Logout User

const logout=()=>{
    localStorage.removeItem('userInfo')
}

//get user details
const getUserDetails=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.get(`/api/users/${id}`,config)
    return data
}

//Register user
const register=async(userdata)=>{
    const {data}=await axios.post('/api/users',userdata)//data here is {name,email,password}
    if(data){
        localStorage.setItem('userInfo',JSON.stringify(data))
    }
    return data
}

//Update User Profile
const updateUser=async(userdata,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.put('/api/users/profile',userdata,config)
    if(data)
    localStorage.setItem('userInfo',JSON.stringify(data))
    return data
}


//List Users
const listUsers=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.get('/api/users',config)
    return data
}

//Delete User
const deleteUser=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    await axios.delete(`/api/users/${id}`,config)
}

//Update User
const adminUpdateUser=async(user,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
   const {data} =await axios.put(`/api/users/${user.id}`,user,config)
   return data
}


const userService={
    login,
    logout,
    getUserDetails,
    register,
    updateUser,
    listUsers,
    deleteUser,
    adminUpdateUser,
}

export default userService

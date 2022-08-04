
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import userService from "./userService";


//Get User From local storage
const userInfo=JSON.parse(localStorage.getItem('userInfo'))

const initialState={
    userInfo:userInfo  ? userInfo : null,
    userDetails:{},//this when we find user by id with getUserDetails
    usersList:[],
    deleteUserInfo:{
        SuccessDelete:false,    
        LoadingDelete:false,
        ErrorDelete:false,
        messageDelete:''
    },
    updateUser:{
        SuccessUpdate:false,
        LoadingUpdate:false,
        ErrorUpdate:false,
        messageUpdate:''
    },
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

//Login user
export const login=createAsyncThunk('user/login',async(userdata,thunkAPI)=>{
    try {
        
        return await  userService.login(userdata)//data here is {email,password}

    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout user
export const logout=createAsyncThunk('user/logout',async()=>{
    await userService.logout()
})

//get user profile
export const getUserDetails=createAsyncThunk('user/details',async(id,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userInfo.token
        return await userService.getUserDetails(id,token)//data here is {name,email,password}
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Register user
export const register=createAsyncThunk('user/register',async(userdata,thunkAPI)=>{
    try {
        return await userService.register(userdata)//data here is {name,email,password}
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Update User Profile
export const updateUser=createAsyncThunk('user/update',async(userdata,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userInfo.token
        return await userService.updateUser(userdata,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

//List Users
export const listUsers=createAsyncThunk('get/users',async(_,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userInfo.token
        return await userService.listUsers(token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

//Delete User
export const deleteUser=createAsyncThunk('delete/user',async(id,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userInfo.token
         await userService.deleteUser(id,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

//Update User
export const adminUpdateUser=createAsyncThunk('adminupdate/user',async(user,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userInfo.token
       return  await userService.adminUpdateUser(user,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})


export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.userDetails={}
          },
         
        },
    extraReducers:(builder)=>{
        builder
    .addCase(login.pending,(state)=>{
    state.isLoading=true
})
    .addCase(login.fulfilled,(state,action)=>{
    state.isLoading=false
    state.isSuccess= true       
    state.userInfo=action.payload //we got this from login fct in try
})
    .addCase(login.rejected,(state,action)=>{
    state.isLoading=false
    state.isError=true
    state.message=action.payload //we got this from login fct in catch
    state.userInfo=null
})
.addCase(register.pending,(state)=>{
    state.isLoading=true
})
    .addCase(register.fulfilled,(state,action)=>{
    state.isLoading=false
    state.isSuccess= true       
    state.userInfo=action.payload 
})
    .addCase(register.rejected,(state,action)=>{
    state.isLoading=false
    state.isError=true
    state.message=action.payload 
    state.userInfo=null
})
.addCase(updateUser.pending,(state)=>{
    state.isLoading=true
})
    .addCase(updateUser.fulfilled,(state,action)=>{
    state.isLoading=false
    state.isSuccess= true       
    state.userInfo=action.payload 
    state.message="User Updated"
})
    .addCase(updateUser.rejected,(state,action)=>{
    state.isLoading=false
    state.isError=true
    state.message=action.payload 
})
    .addCase(logout.fulfilled,(state)=>{
        state.userInfo=null
    })


    .addCase(listUsers.pending,(state)=>{
        state.isLoading=true
    })
        .addCase(listUsers.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess= true       
        state.usersList=action.payload 
    })
        .addCase(listUsers.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload 
    })
    
    .addCase(deleteUser.pending,(state)=>{
        state.deleteUserInfo.LoadingDelete=true
    })
        .addCase(deleteUser.fulfilled,(state,action)=>{
        state.deleteUserInfo.LoadingDelete=false
        state.deleteUserInfo.SuccessDelete= true       

    })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.deleteUserInfo.LoadingDelete=false
            state.deleteUserInfo.ErrorDelete= true  
            state.deleteUserInfo.messageDelete=action.payload 
    })



    .addCase(getUserDetails.pending,(state)=>{
        state.isLoading=true
    })
        .addCase(getUserDetails.fulfilled,(state,action)=>{
        state.isLoading=false    
        state.isSuccess=true
        state.userDetails=action.payload 
    })
        .addCase(getUserDetails.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload 
    })
    
    .addCase(adminUpdateUser.pending,(state)=>{
        state.updateUser.LoadingUpdate=true
    })
        .addCase(adminUpdateUser.fulfilled,(state,action)=>{
            state.updateUser.LoadingUpdate=false    
            state.updateUser.SuccessUpdate=true
    })
        .addCase(adminUpdateUser.rejected,(state,action)=>{
            state.updateUser.LoadingUpdate=false
            state.updateUser.ErrorUpdate=true
            state.updateUser.messageUpdate=action.payload 
    })
    
    }

})

export const {reset}=userSlice.actions
export default userSlice.reducer   
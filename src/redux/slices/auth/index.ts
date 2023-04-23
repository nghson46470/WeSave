import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "~/api";

interface IResponse {
    user:{
        id?:number;
        name?:string;
        email?:string;
        password?:string;
    }
    token: string;
}

interface IuserInfo{
    data:object;
    token:string | null;
}

interface IRequest{
    userInfo :  object
    token : null | string
    message : null | string
    loading : boolean
}
interface IState{
    userInfo :  {
        id?:number;
        name?:string;
        email?:string;
        password?:string;
    }
    token ?: string
    message : string
    loading : boolean
    statusResgister?: boolean
}
interface DUser{
    email : string;
    password : string;
}
const initialState:IState  = {
    userInfo : {},
    token : '',
    message : '',
    loading : false,
    statusResgister : false,
}

export const login = createAsyncThunk('auth/login', async(body:DUser,{rejectWithValue})=>{
    try {
        const res = await authApi.login(body)
        return res
    }
    catch (err) {  
        return rejectWithValue(err)
    }
})

export const register = createAsyncThunk('auth/register', async (body:object, { rejectWithValue }) => {
    try {
        const res = await authApi.register(body);
        return res;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const logout = createAsyncThunk('auth/logout', async (body, { rejectWithValue }) => {
    try {
        await authApi.logout();
        return;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (body, { rejectWithValue }) => {
    try {
        const res = await authApi.getCurrentUser();
        return res?.data;
    } catch (err) {
        return rejectWithValue(err);
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state:IState, action:PayloadAction<any>) => {
            state.loading = false;
            state.userInfo = action.payload?.data;
            state.token = action.payload?.token;
        });
        builder.addCase(register.fulfilled, (state, action:PayloadAction<any>) => {
            state.statusResgister = true;
            // state.userInfo = action.payload.data;
            // state.token = action.payload.token;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.userInfo = {};
            state.token = '';
        });
        builder.addCase(getUserInfo.fulfilled, (state,action:PayloadAction<any>) => {
            state.userInfo = action?.payload;
        });
    },
});
 

export default authSlice.reducer
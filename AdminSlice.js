import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const getall=createAsyncThunk('/add/getall',async ()=>{
try{
    const result=await axios.get('http://localhost:3001/empDetails')
    return result.data
}
catch(err){
    console.log(err)
}
})


const initialValue={
    Data:[],
    loading:true
}
const addSlice=createSlice({
    name:'add',

    initialState:{
        value:initialValue
    },

    reducers:{

        add:(state,action)=>{
            state.value.Data.push(action.payload)
        },
        remove:(state,action)=>{
            state.value.Data=state.value.Data.filter((item)=>item.id!==action.payload.userid)
        }

    },

    extraReducers:{
        [getall.pending]:(state,action)=>{
            console.log("pending",action)
            state.loading=true
        },
        [getall.fulfilled]:(state,action)=>{
            console.log('fullfiled',action)
            state.loading=false
            state.value.Data=[...state.value.Data,...action.payload]
            
        },
        [getall.rejected]:(state,action)=>{
            console.log('fullfiled',action)
            state.loading=false
        }
    }
})
export const {add,remove}=addSlice.actions
export default addSlice.reducer;
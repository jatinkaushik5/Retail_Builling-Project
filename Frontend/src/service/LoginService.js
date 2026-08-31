import axios from "axios"
import api from "../axiosConfig"

export const login=async (data)=>{
    return  await api.post("/user/login",data)
}

export const getCurrentUser=async ()=>{
    return await api.get("/user/me")
}
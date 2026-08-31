import api from "../axiosConfig"

export const createOrder= async(data,Id="Invalid")=>{
    
    return await api.post(`/order/Create/${Id}`,data)
}

export const fetchDetails=async()=>{
    return  api.get("/order/showDashboard")
} 
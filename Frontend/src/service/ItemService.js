import api from "../axiosConfig"

export const  getAll=async()=>{
    return await api.get("/item/getallItems")
}

export const deleteItem=async(id)=>{
    return await api.delete(`/item/deleteItem/${id}`)
}
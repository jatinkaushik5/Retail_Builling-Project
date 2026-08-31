import api from "../axiosConfig"

export const addUser=async (user)=>{
    return await api.post("/admin/register",user)
}

export const fetchUser= async()=>{
    return await api.get("/admin/getAllUser")
}

export const deleteUser=async(id)=>{
    return await api.delete(`/admin/deleteUser/${id}`)
}
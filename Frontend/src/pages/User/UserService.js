import api from "../../axiosConfig"

export const getUsers=async(number)=>{
    return await api.get(`/admin/getAllUser/${number}`)
}

export const saveUser=async(data)=>{
    return await api.post("/admin/register",data)
}

export const deleteuser=async (id)=>{
    return await api.delete(`/admin/deleteUser/${id}`)
}

export const updateuser=async (id)=>{
    return await api.get(`/admin/updateUser/${id}`)
}

export const getUser=async(name)=>{
    return await api.get(`/admin/getuser/${name}`)
}

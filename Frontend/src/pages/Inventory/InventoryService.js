import api from "../../axiosConfig"

export const saveCategory=async (data)=>{
    return await api.post("/admin/saveCategory",data)
}

export const getAllCategory=async(number)=>{
    return await api.get(`/category/getall/${number}`)
}

export const getCategory=async(id)=>{
    return await api.get(`/category/get/${id}`)
}

export const getallitem=async()=>{
    return await api.get("/item/getalltogether")
}

export const saveitem=async(data)=>{
    return await api.post("/item/save",data)
}

export const getitems=async(number)=>{
    return api.get(`/item/getallItems/${number}`)
}

export const deleteitem=async(id)=>{
    return api.delete(`/item/deleteItem/${id}`)
}

export const getitem=async(id)=>{
    return api.get(`/item/get/${id}`)
}

export const  deleteCategory=async(id)=>{
    return await api.delete(`/admin/delete/${id}`)
}

export const itemByName=async(name)=>{
    return await api.get(`/item/getbyname/${name}`)
}

export const savecart=async(data)=>{
    return await api.post("/item/saveCart",data)
}

export const getcart=async(name)=>{
    return await api.get(`/item/getcart/${name}`)
}

export const deletecart=async(name)=>{
    return await api.delete(`/item/deletecart/${name}`)
}

export const placeorder=async(data,sessionId)=>{
    return await api.post( `/order/Create/${sessionId}`,data)
}

export const getOrderDetails=async(number)=>{
    return api.get(`/order/showDashboard/${number}`)
}

export const deleteAllCart=async()=>{
    return api.delete("/item/deleteAllCart")
}

export const getAllOrders=async()=>{
    return await api.get("/order/getAllOrder")
}

export const getAllCategoryName=async()=>{
    return await api.get("/admin/getallCategory")
}
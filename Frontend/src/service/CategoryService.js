import axios from "axios"
import api from "../pages/axiosConfig";

export const addCategory= async (Category)=>{
    return await api.post("/admin/save",Category,
        {
        withCredentials:true
    }
    );
}

export const deleteCategory=async (id)=>{
    return await api.delete(`/admin/delete/${id}`,
        {
        withCredentials:true
    }
    );
}

export const fetchCategory=async ()=>{
    return await api.get("/category/getall",{
        withCredentials:true
    });
}

export const loginUser=async (user)=>{
    return await api.post("/user/login",user,
        {
        withCredentials:true
    }
    );
}

export const addItem=async (item)=>{
    return await api.post("/item/save",item,
        {
        withCredentials:true
    }
    )
}
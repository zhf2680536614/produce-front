import http from "@/utils/http";
/* eslint-disable */

// 用户登录
export const loginUser = async(user:any)=>{
    try{
        const response  = await http.post("/user/login",user)
        return response.data
    }catch(error){
        
    }
}

// 管理员登录
export const loginAdmin = async(admin:any)=>{
    try{
        const response  = await http.post("/admin/login",admin)
        return response.data
    }catch(error){
        
    }
}
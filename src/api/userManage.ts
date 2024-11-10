import http from "@/utils/http";
/* eslint-disable */

// 用户管理分页查询
export const pageQuery = async (
  pageNo: number,
  pageSize: number,
  username: string,
  phoneNumber: string,
  startCreateTime: string,
  endCreateTime: string
) => {
  const baseUrl = "/admin/user/page";

  try {
    const queryParams = new URLSearchParams();
    queryParams.append("pageNo", String(pageNo));
    queryParams.append("pageSize", String(pageSize));
    if (username != null && username != "") {
      queryParams.append("username", username);
    }
    if (phoneNumber != null && phoneNumber != "") {
      queryParams.append("phoneNumber", phoneNumber);
    }
    if (
      startCreateTime != null &&
      startCreateTime != "" &&
      endCreateTime != null &&
      endCreateTime != ""
    ) {

      const response = await http.get(
        `${baseUrl}?${
          queryParams.toString() +
          "&startCreateTime=" +
          startCreateTime +
          "&endCreateTime=" +
          endCreateTime
        }`
      );
      return response.data;
    }

    const response = await http.get(`${baseUrl}?${queryParams.toString()}`);
    return response.data;
  } catch (error) {}
};

// 用户管理新增用户
export const createUser = async(ruleForm:any)=>{
  try{
      const response  = await http.post("/admin/user/save",ruleForm)
      return response.data
  }catch(error){
      
  }
}

// 用户管理删除用户
export const deleteUser = async(id:number)=>{
  try{
      const response  = await http.delete(`/admin/user/${id}`)
      return response.data
  }catch(error){
      
  }
}

// 用户管理根据id查询用户
export const getByIdUser = async(id:number)=>{
  try{
      const response  = await http.get(`/admin/user/${id}`)
      return response.data
  }catch(error){
      
  }
}

// 用户管理修改用户
export const updateUser = async(user:any)=>{
  try{
      const response  = await http.put(`/admin/user/update`,user)
      return response.data
  }catch(error){
      
  }
}

// 用户端根据id查询用户
export const getByIdUserUser = async(id:number)=>{
  try{
      const response  = await http.get(`/user/user/${id}`)
      return response.data
  }catch(error){
      
  }
}

// 用户端修改用户
export const updateUserUser = async(user:any)=>{
  try{
      const response  = await http.put(`/user/user/update`,user)
      return response.data
  }catch(error){
      
  }
}

// 用户端修改用户收货地址
export const updateUserAddress = async(user:any)=>{
  try{
      const response  = await http.put(`/user/address/update`,user)
      return response.data
  }catch(error){
      
  }
}

// 用户端删除用户收货地址
export const deleteUserAddress = async(id:any)=>{
  try{
      const response  = await http.delete(`/user/address/${id}`)
      return response.data
  }catch(error){
      
  }
}
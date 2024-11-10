import http from "@/utils/http";
/* eslint-disable */

// 用户端添加到购物车
export const createShoppingCart = async (ruleForm: any) => {
  try {
    const response = await http.post("/user/shoppingCart/save", ruleForm);
    return response.data;
  } catch (error) {}
};

// 查询该用户购物车数据
export const queryShoppingCart = async (id: any) => {
  try {
    const response = await http.get(`/user/shoppingCart/${id}`);
    return response.data;
  } catch (error) {}
};

// 用户端删除购物车
export const deleteShoppingCart = async(id:any)=>{
  try{
      const response  = await http.delete(`/user/shoppingCart/${id}`)
      return response.data
  }catch(error){
      
  }
}
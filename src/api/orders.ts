import http from "@/utils/http";
/* eslint-disable */

// 订单管理分页查询
export const pageQuery = async (
  pageNo: number,
  pageSize: number,
  username: string,
  phoneNumber: string,
  status: string,
  startCreateTime: string,
  endCreateTime: string
) => {
  const baseUrl = "/admin/orders/page";

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
    if (status != null && status != "") {
      queryParams.append("status", status);
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

// 用户端订单分页查询
export const pageQueryUser = async (
  id:number,
  pageNo: number,
  pageSize: number,
  producesName: string,
  merchantName: string,
  status: string,
  startCreateTime: string,
  endCreateTime: string
) => {
  const baseUrl = "/user/orders/page";

  try {
    const queryParams = new URLSearchParams();
    queryParams.append("id", String(id));
    queryParams.append("pageNo", String(pageNo));
    queryParams.append("pageSize", String(pageSize));
    if (producesName != null && producesName != "") {
      queryParams.append("producesName", producesName);
    }
    if (merchantName != null && merchantName != "") {
      queryParams.append("merchantName", merchantName);
    }
    if (status != null && status != "") {
      queryParams.append("status", status);
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

// 用户端删除订单
export const deleteOrdersUser = async(id:any)=>{
  try{
      const response  = await http.delete(`/user/orders/${id}`)
      return response.data
  }catch(error){
      
  }
}

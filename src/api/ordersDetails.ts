import http from "@/utils/http";
/* eslint-disable */

// 订单管理根据id查询订单明细
export const getById = async (id: number) => {
  try {
    const response = await http.get(`/admin/ordersDetail/${id}`);
    return response.data;
  } catch (error) {}
};


import http from "@/utils/http";
/* eslint-disable */

// 用户新增交易产品
export const createMarketProduces = async (ruleForm: any) => {
  try {
    const response = await http.post("/user/marketProduces/save", ruleForm);
    return response.data;
  } catch (error) {}
};

// 用户查询所有上架产品
export const queryAll = async (condition: any) => {
  const queryParams = new URLSearchParams();
  if (condition.name != null && condition.name != "") {
    queryParams.append("name", condition.name);
  }
  if (condition.username != null && condition.username != "") {
    queryParams.append("username", condition.username);
  }
  if (condition.category != null && condition.category != "") {
    queryParams.append("category", condition.category);
  }
  if (condition.order != null && condition.order != "") {
    queryParams.append("order", condition.order);
  }
  if (condition.orderKind != null && condition.orderKind != "") {
    queryParams.append("orderKind", condition.orderKind);
  }
  const baseUrl = "/user/marketProduces/all";
  try {
    const response = await http.get(`${baseUrl}?${queryParams.toString()}`);
    return response.data;
  } catch (error) {}
};

// 用户根据id查询上架产品
export const getByIdMarketProducesUser = async (id: number) => {
  try {
    const response = await http.get(`/user/marketProduces/${id}`);
    return response.data;
  } catch (error) {}
};

// 用户端创建订单
export const createOrders = async (ruleForm: any) => {
  try {
    const response = await http.post("/user/orders/save", ruleForm);
    return response.data;
  } catch (error) {}
};

// 用户端创建订单明细
export const createOrdersDetails = async (ruleForm: any) => {
  try {
    const response = await http.post("/user/ordersDetail/save", ruleForm);
    return response.data;
  } catch (error) {}
};

// 用户端修改订单
export const updateUserOrders = async (orders: any) => {
  try {
    const response = await http.put(`/user/orders/update`, orders);
    return response.data;
  } catch (error) {}
};

// 用户端根据id查询订单
export const getOrdersByIdUser = async (id: number) => {
  try {
    const response = await http.get(`/user/orders/${id}`);
    return response.data;
  } catch (error) {}
};

// 用户端确认购买
export const updateUserOrdersConfirm = async (orders: any) => {
  try {
    const response = await http.put(`/user/orders/confirm`, orders);
    return response.data;
  } catch (error) {}
};

// 用户端取消购买
export const updateUserOrdersCancel = async (orders: any) => {
  try {
    const response = await http.put(`/user/orders/cancel`, orders);
    return response.data;
  } catch (error) {}
};

// 用户查询所有上架产品
export const queryProducesPlus = async () => {
  try {
    const response = await http.get('/user/producesPlus/all');
    return response.data;
  } catch (error) {}
};

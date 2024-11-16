import http from "@/utils/http";
/* eslint-disable */

// 静态资源管理修改手风琴
export const updateAccordion = async (item: any) => {
  try {
    const response = await http.put(`/admin/static/accordion/update`, item);
    return response.data;
  } catch (error) {}
};

// 静态资源管理查询手风琴
export const getAccordionAdmin = async () => {
  try {
    const response = await http.get(`/admin/static/accordion`);
    return response.data;
  } catch (error) {}
};

// 静态资源管理修改轮播图
export const updateCycle = async (item: any) => {
  try {
    const response = await http.put(`/admin/static/cycle/update`, item);
    return response.data;
  } catch (error) {}
};

// 静态资源管理查询轮播图
export const getCycleAdmin = async () => {
  try {
    const response = await http.get(`/admin/static/cycle`);
    return response.data;
  } catch (error) {}
};

// 静态资源管理修改精品展示
export const updateBoutique = async (item: any) => {
  try {
    const response = await http.put(`/admin/static/boutique/update`, item);
    return response.data;
  } catch (error) {}
};

// 静态资源管理查询精品展示
export const getBoutiqueAdmin = async () => {
  try {
    const response = await http.get(`/admin/static/boutique`);
    return response.data;
  } catch (error) {}
};

// 用户端查询手风琴
export const getAccordionUser = async () => {
  try {
    const response = await http.get(`/user/static/accordion`);
    return response.data;
  } catch (error) {}
};

//  用户端查询轮播图
export const getCycleUser = async () => {
  try {
    const response = await http.get(`/user/static/cycle`);
    return response.data;
  } catch (error) {}
};

// 用户端查询精品展示
export const getBoutiqueUser = async () => {
  try {
    const response = await http.get(`/user/static/boutique`);
    return response.data;
  } catch (error) {}
};

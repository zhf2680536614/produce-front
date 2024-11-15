import http from "@/utils/http";
/* eslint-disable */

// 查询分类销售额
export const queryCategory = async () => {
  try {
    const response = await http.get("/user/chart/category");
    return response.data;
  } catch (error) {}
};

// 管理端数据统计
export const queryAll = async (start: any, end: any) => {
  try {
    const response = await http.get(
      `/admin/chart/all?${"start=" + start + "&end=" + end}`
    );
    return response.data;
  } catch (error) {}
};

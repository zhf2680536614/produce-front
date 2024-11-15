import http from "@/utils/http";
/* eslint-disable */

// 查询所有分类
export const queryCategory = async () => {
  try {
    const response = await http.get(`/admin/category/queryCategory`);
    return response.data;
  } catch (error) {}
};

// 分类管理新增分类
export const createCategory = async (ruleForm: any) => {
  try {
    const response = await http.post("/admin/category/save", ruleForm);
    return response.data;
  } catch (error) {}
};

// 分类管理分页查询
export const pageQuery = async (
  pageNo: number,
  pageSize: number,
  name: string,
  startCreateTime: string,
  endCreateTime: string
) => {
  const baseUrl = "/admin/category/page";

  try {
    const queryParams = new URLSearchParams();
    queryParams.append("pageNo", String(pageNo));
    queryParams.append("pageSize", String(pageSize));
    if (name != null && name != "") {
      queryParams.append("name", name);
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

// 分类管理删除分类
export const deleteCategory = async (id: number) => {
  try {
    const response = await http.delete(`/admin/category/${id}`);
    return response.data;
  } catch (error) {}
};

// 分类管理根据id查询分类
export const getByIdCategory = async (id: number) => {
  try {
    const response = await http.get(`/admin/category/${id}`);
    return response.data;
  } catch (error) {}
};

// 分类管理修改分类
export const updatecategory = async (category: any) => {
  try {
    const response = await http.put(`/admin/category/update`, category);
    return response.data;
  } catch (error) {}
};


// 用户查询所有分类
export const queryCategoryUser = async () => {
  try {
    const response = await http.get(`/user/category/queryCategory`);
    return response.data;
  } catch (error) {}
};
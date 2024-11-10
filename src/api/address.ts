import http from "@/utils/http";
/* eslint-disable */

// 新增用户地址
export const createAddress = async (ruleForm: any) => {
    try {
      const response = await http.post("/user/address/save", ruleForm);
      return response.data;
    } catch (error) {}
  };
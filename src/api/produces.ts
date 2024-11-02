import http from "@/utils/http";
/* eslint-disable */

// 产品管理新增产品
export const createProduces = async (ruleForm: any) => {
  try {
    const response = await http.post("/admin/produces/save", ruleForm);
    return response.data;
  } catch (error) {}
};

// 产品管理分页查询
export const pageQuery = async (
  pageNo: number,
  pageSize: number,
  name: string,
  origin: string,
  category: number,
  startCreateTime: string,
  endCreateTime: string
) => {
  const baseUrl = "/admin/produces/page";

  try {
    const queryParams = new URLSearchParams();
    queryParams.append("pageNo", String(pageNo));
    queryParams.append("pageSize", String(pageSize));
    if (name != null && name != "") {
      queryParams.append("name", name);
    }
    if (origin != null && origin != "") {
      queryParams.append("origin", origin);
    }
    if (String(category) != null && String(category) != "") {
      queryParams.append("category", String(category));
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

// 产品管理删除产品
export const deleteProduces = async(id:number)=>{
  try{
      const response  = await http.delete(`/admin/produces/${id}`)
      return response.data
  }catch(error){
      
  }
}

// 产品管理根据id查询产品
export const getByIdProduces = async(id:number)=>{
  try{
      const response  = await http.get(`/admin/produces/${id}`)
      return response.data
  }catch(error){
      
  }
}

// 产品管理修改产品
export const updateProduces = async(produces:any)=>{
  try{
      const response  = await http.put(`/admin/produces/update`,produces)
      return response.data
  }catch(error){
      
  }
}

// 查询所有产品
export const queryAll = async()=>{
  try{
      const response  = await http.get('/user/produces/all')
      return response.data
  }catch(error){
      
  }
}

// 用户根据id查询产品
export const getByIdProducesUser = async(id:number)=>{
  try{
      const response  = await http.get(`/user/produces/${id}`)
      return response.data
  }catch(error){
      
  }
}
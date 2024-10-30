import axios from "axios";
import router from "@/router"; 

const service = axios.create({
  baseURL: "http://localhost:8081",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      config.headers.Authorizations = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          //跳转到登录页面
          router.push({name:'login'});
          break;
        case 403:
          //禁止访问处理
          router.push({name:'login'});
          break;
        case 404:
          //禁止访问处理
          router.push({name:'login'});
          return Promise.reject(error)
        default:
          //其他错误处理
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default service;

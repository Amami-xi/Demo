import axios from "axios"
import { ElLoading, ElMessage } from 'element-plus'
import store from "../store";

const service = axios.create({
  baseURL: "/apis",
  settimeout: 2000,
})

let loading, requestCount = 0;
const showLoading = () => {
  if (requestCount === 0) {
    loading = ElLoading.service({
      lock: true,
      text: '数据加载中',
      background: 'rgba(255, 255, 255, 0.5)',
    });
  }
  requestCount++;
}
const hideLoading = () => {
  requestCount--;
  if (requestCount === 0) {
    loading.close();
  }
}

// 添加请求拦截
service.interceptors.request.use(
  config => {
    showLoading();
    let userId = store.state.user.userId;
    let accountId = store.state.user.accountId;
    const token = store.state.acccessToken;
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (config.method == 'get') {
      //默认配置userId;
      config.params.userId = userId;
      config.params.accountId = accountId;
    } else {
      config.data.userId = userId;
      config.data.accountId = accountId;
    }
    // console.log('请求的数据', config);
    return config;
  },
  error => {
    hideLoading();
    ElMessage.error('请求错误：' + error.message);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    hideLoading();
    let data = response.data;
    // console.log("返回的数据", data);
    if (data.success) {
      return Promise.resolve(data);
    } else {
      ElMessage.error(data.msg);
      return Promise.reject(data);
    }
  },
  error => {
    hideLoading();
    // Do something with response error
    let msg = error.message;
    let status = error.response.status;
    if (status === 401) {
      msg = '当前会话已过期。'
      ElMessage.error(msg);
      location.href = import.meta.env.VITE_APP_LOGOUT_URL;
    } else {
      ElMessage.error("系统或网络异常，请联系系统管理员！");
    }
    return Promise.reject(error);
  }
);

export default service
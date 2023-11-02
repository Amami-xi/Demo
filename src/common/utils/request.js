//引入http.js文件
import http from "./http.js";

export function postRequest(url, params) {
  return http({
    method: 'post',
    url: url,
    data: params || {},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}

export function getRequest(url, params) {
  return http({
    method: 'get',
    params: params || {},
    url: url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'pragma': 'no-cache',
      'cache-control': 'no-cache'
    }
  });
}

export function uploadFileRequest(url, params) {
  return http({
    method: 'post',
    url: url,
    data: params || {},
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function putRequest(url, params) {
  return http({
    method: 'put',
    url: url,
    data: params || {},
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export function deleteRequest(url) {
  return http({
    method: 'delete',
    url: url
  });
}
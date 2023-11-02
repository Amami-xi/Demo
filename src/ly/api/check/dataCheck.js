//数据检查api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/ly/check";


/**
 * 发送前数据检查
 * 
 * @param {string} params 传参
 * @returns 
 */
 export const beforeSendDataCheck = (params) => {
  return postRequest(`${baseApi}/beforeSendDataCheck`, params);
}
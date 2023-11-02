//数据检查api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/check";

/**
 * 发送前表单检查
 * 
 * @param {string} flowinstid 流程实例ID
 * @returns
 */
export const beforeSendFormCheck = (flowinstid) => {
  return getRequest(`${baseApi}/beforeSendFormCheck`, { "flowinstid": flowinstid });
}

/**
 * 发送前数据检查
 * 
 * @param {string} params 传参
 * @returns 
 */
 export const beforeSendDataCheck = (params) => {
  return postRequest(`${baseApi}/beforeSendDataCheck`, params);
}
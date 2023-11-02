//审批事项管理api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/workflow";

/**
 * 获取拟办列表
 * 
 * @param {string} appCodes 业务子代码
 * @param {string} userId 用户ID
 * @returns 
 */
export const getNibanList = (appCodes) => {
  return postRequest(`${baseApi}/getNibanList`, { "appCodes": appCodes });
}

/**
 * 获取待办列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getDaibanList = (params) => {
  return postRequest(`${baseApi}/getWaitList`, params);
}

/**
 * 获取已办列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getYibanList = (params) => {
  params.state = "未办结";
  return postRequest(`${baseApi}/getHandledList`, params);
}

/**
 * 获取办结列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getBanjieList = (params) => {
  params.state = "已办结";
  return postRequest(`${baseApi}/getHandledList`, params);
}

/**
 * 批量选择
 * 
 * @param {object} params 
 * @returns 
 */
 export const batchSelect = (params) => {
  return postRequest(`${baseApi}/batchSelect`, params);
}


/**
 * 批量标记通过
 * 
 * @param {object} params 
 * @returns 
 */
 export const batchPass = (params) => {
  return postRequest(`${baseApi}/batchPass`, params);
}

/**
 * 批量标记通过
 * 
 * @param {object} jbxxSecs 
 * @returns 
 */
export const batchNoPass = (params) => {
  return postRequest(`${baseApi}/batchNoPass`, params);
}
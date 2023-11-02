//工作箱管理api接口

import { getRequest , postRequest  } from '@/common/utils/request'

let baseApi = "/api/jtap/workbox";

/**
 * 创建流程实例
 * 
 * @param {string} userId 用户ID
 * @param {string} flowId 流程定义ID
 * @returns 
 */
export const createFlowInstance = (flowId)=> {
  return getRequest(`${baseApi}/createFlowInstance`,{"flowId":flowId});
}

/**
 * 创建流程实例
 * 
 * @param {string} flowinstid 流程实例ID
 * @returns 
 */
 export const getFlowInstance = (flowinstid)=> {
  return getRequest(`${baseApi}/getFlowInstance`,{"flowinstid":flowinstid});
}

/**
 * 获取拟办列表
 * 
 * @param {string} appCodes 业务子代码
 * @param {string} userId 用户ID
 * @returns 
 */
export const getNibanList = (appCodes)=> {
  return postRequest(`${baseApi}/getNibanList`,{"appCodes":appCodes});
}

/**
 * 获取待办列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getDaibanList = (params)=> {
  return postRequest(`${baseApi}/getWaitList`,params);
}

/**
 * 获取已办列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getYibanList = (params)=> {
  params.state = "未办结";
  return postRequest(`${baseApi}/getHandledList`,params);
}

/**
 * 获取办结列表
 * 
 * @param {object} params 
 * @returns 
 */
 export const getBanjieList = (params)=> {
  params.state = "已办结";
  return postRequest(`${baseApi}/getHandledList`,params);
}

//业务管理api接口

import { getRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/business";

/**
 * 获取拟办列表
 * 
 * @param {string} appCode 业务子代码
 * @param {string} userId 用户ID
 * @returns 
 */
export const getBusinessList = (appCode)=> {
  return getRequest(`${baseApi}/getBusinessList`,{"appCode":appCode});
}

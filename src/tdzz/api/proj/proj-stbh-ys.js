//生态保护修复试点项目验收信息api接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzStbhYsxx"

/**
 * 初始化验收信息
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const init = (flowinstid)=> {
    return getRequest(`${baseApi}/init`, {"flowinstid":flowinstid});
  }

/**
 * 保存验收信息
 * 
 * @param {object} params 
 * @returns 
 */
 export const saveOrUpdate = (params)=> {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

//山水林田湖草和生态修复项目实施信息api接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzSsltSsxx"

/**
 * 初始化实施信息
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const init = (flowinstid)=> {
    return getRequest(`${baseApi}/init`, {"flowinstid":flowinstid});
  }

/**
 * 保存实施信息
 * 
 * @param {object} params 
 * @returns 
 */
 export const saveOrUpdate = (params)=> {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

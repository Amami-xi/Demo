//市级国土空间全域综合整治项目申报信息api接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzQyzzSbxx"

/**
 * 初始化申报信息
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const init = (flowinstid)=> {
    return getRequest(`${baseApi}/init`, {"flowinstid":flowinstid});
  }

/**
 * 保存申报信息
 * 
 * @param {object} params 
 * @returns 
 */
 export const saveOrUpdate = (params)=> {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除申报信息
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const deleteSb = (flowinstid)=> {
  return getRequest(`${baseApi}/delete`, {"flowinstid":flowinstid});
}

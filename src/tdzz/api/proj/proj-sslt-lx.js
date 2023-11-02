//山水林田湖草和生态修复项目立项信息api接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzSsltLxxx"

/**
 * 初始化立项信息
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const init = (flowinstid)=> {
    return getRequest(`${baseApi}/init`, {"flowinstid":flowinstid});
  }

/**
 * 保存立项信息
 * 
 * @param {object} params 
 * @returns 
 */
 export const saveOrUpdate = (params)=> {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除立项信息
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const deleteLx = (flowinstid)=> {
  return getRequest(`${baseApi}/delete`, {"flowinstid":flowinstid});
}

/**
 * 删除子项目信息
 * 
 * @param {string} zxmSec 流程标识
 * @returns 
 */
 export const deleteZxm = (zxmSec)=> {
  return getRequest(`${baseApi}/deleteZxm`, {"zxmSec":zxmSec});
}

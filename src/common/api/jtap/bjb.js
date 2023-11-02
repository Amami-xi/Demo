//审批意见api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/bjb";

/**
 * 获取详情
 * 
 * @param {*} params 
 * @returns 
 */
export const getBjb = (params) => {
  return postRequest(`${baseApi}/getBjb`, params);
}

/**
 * 获取详情
 * 
 * @param {*} params 
 * @returns 
 */
export const getDetail = (params) => {
  return postRequest(`${baseApi}/getDetail`, params);
}

/**
 * 获取列表
 * 
 * @param {*} params 
 * @returns 
 */
export const getBjbList = (params) => {
  return postRequest(`${baseApi}/getBjbList`, params);
}


/**
 * 获取列表
 * 
 * @param {*} params 
 * @returns 
 */
export const getBjbList_lysp = (params) => {
  return postRequest(`${baseApi}/getBjbList_lysp`, params);
}

/**
* 保存审核意见单
* 
* @param {object} params 
* @returns 
*/
export const saveOrUpdate = (params) => {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
* 保存审核意见单
* 
* @param {object} params 
* @returns 
*/
export const bjbSave = (params) => {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}


/**
 * 获取动态审批意见列表-基本信息获取最新审批意见-spyj
 * 
 * @param {*} params 
 * @returns 
 */
export const getBjbSpDtOptionList = (params) => {
  return postRequest(`${baseApi}/getBjbSpDtOptionList`, params);
}

// /**
//  * 获取动态审批意见列表-审批意见列表中动态审批-spyjList
//  * 
//  * @param {*} params 
//  * @returns 
//  */
// export const getDtSpOption = (params) => {
//   return postRequest(`${baseApi}/getDtSpOption`, params);
// }





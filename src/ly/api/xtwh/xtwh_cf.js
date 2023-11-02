//林木采伐许可审批事项api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/ly/xtwh/xtwh_cf"

/**
 * 初始化
 * 
 * @param {string} flowinstid 流程标识
 * @param {string} taskId 任务ID
 * @param {string} action 操作类型
 * @returns 
 */
export const init = (params) => {
  return postRequest(`${baseApi}/init`, params);
}

/**
 * 保存
 * 
 * @param {object} params 
 * @returns 
 */
export const saveOrUpdate = (params) => {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

export const findByXzqdmAndYear = (xzqdm,year) => {
  return getRequest(`${baseApi}/findByXzqdmAndYear`, {"xzqdm":xzqdm,"year":year});
}

/*验证是否为空*/
export function isNullorEmpty(str){
  if(typeof (str) == "undefined" || str == null || str === ""){
    return  true;
  }
  return false;
}
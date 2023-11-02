//野生动物野外猎捕审批事项api接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/ly/proj/lyglYsdwywlbBa"

/**
 * 初始化
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const init = (flowinstid)=> {
    return getRequest(`${baseApi}/init`, {"flowinstid":flowinstid});
  }

/**
 * 保存
 * 
 * @param {object} params 
 * @returns 
 */
 export const saveOrUpdate = (params)=> {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const deleteLx = (flowinstid)=> {
  return getRequest(`${baseApi}/delete`, {"flowinstid":flowinstid});
}

/**
 * 分页查询
 * 
 * @param {object} params 
 * @returns 
 */
 export const queryPage = (params)=> {
  return postRequest(`${baseApi}/queryPage`, params);
}


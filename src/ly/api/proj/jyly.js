//野生动物经营利用审批事项api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/ly/proj/lyglYsdwjyly"

/**
 * 初始化
 * 
 * @param {string} flowinstid 流程标识
 * @param {string} taskId 任务ID
 * @param {string} action 操作类型
 * @returns 
 */
 export const init = (flowinstid, taskId, action) => {
  return getRequest(`${baseApi}/init`, { "flowinstid": flowinstid, "taskId": taskId, "action": action });
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

/**
 * 删除
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
export const deleteLx = (flowinstid) => {
  return getRequest(`${baseApi}/delete`, { "flowinstid": flowinstid });
}

/**
 * 分页查询
 * 
 * @param {object} params 
 * @returns 
 */
export const queryPage = (params) => {
  return postRequest(`${baseApi}/queryPage`, params);
}


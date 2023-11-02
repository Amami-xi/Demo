//林木采伐许可审批事项api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/ly/proj/lyglLmcfxk"

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

/**
 * 获取指定行政区未完成流程数量
 * 
 * @param {string} xzqhdm 流程标识
 * @returns
 */
export const getWwjCf = (xzqhdm) => {
  return getRequest(`${baseApi}/getWwjCf`, { "xzqhdm": xzqhdm });
}


/*验证是否为空*/
export function isNullorEmpty(str){
  if(typeof (str) == "undefined" || str == null || str === ""){
    return  true;
  }
  return false;
}
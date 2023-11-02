//项目基本信息接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzJbxx"

/**
 * 获取项目详情-非批次
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
export const getDetail = (flowinstid) => {
  return getRequest(`${baseApi}/getDetail`, { "flowinstid": flowinstid });
}

/**
 * 获取项目详情-批次
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
export const getDetailById = (flowinstid) => {
  return getRequest(`${baseApi}/getDetailById`, { "jbxxSec": flowinstid });
}

/**
 * 临时保存
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
export const save = (flowinstid) => {
  return getRequest(`${baseApi}/save`, { "flowinstid": flowinstid });
}

/**
 * 更新
 * 
 * @param {string} jbxxSec 项目主键
* @param {string} spzt 审批状态
 * @returns 
 */
export const updateJbxx = (jbxxSec, spzt) => {
  return getRequest(`${baseApi}/updateJbxx`, { "jbxxSec": jbxxSec, "spzt": spzt });
}

/**
 * 更新验收审批状态
 * 
 * @param {string} jbxxSec 项目主键
* @param {string} ysSpzt 审批状态
 * @returns 
 */
export const updateJbxxYszt = (jbxxSec, ysSpzt) => {
  return getRequest(`${baseApi}/updateJbxxYszt`, { "jbxxSec": jbxxSec, "ysSpzt": ysSpzt });
}

/**
*根据批次号获取项目分页列表
* 
* @param {object} params 
* @returns 
*/
export const queryPageByPc = (params) => {
  return postRequest(`${baseApi}/queryPageByPc`, params);
}

/**
*根据批次号获取项目分页列表
* 
* @param {object} params 
* @returns 
*/
export const queryListByPc = (params) => {
  return postRequest(`${baseApi}/queryListByPc`, params);
}

/**
 * 获取项目分页列表
 * 
 * @param {object} params 
 * @returns 
 */
export const queryPage = (params) => {
  return postRequest(`${baseApi}/queryPage`, params);
}

/**
 * 批量移除
 * 
 * @param {object} jbxxSecs 
 * @returns 
 */
export const batchRemove = (params) => {
  return postRequest(`${baseApi}/batchRemove`, params);
}

/**
 * 批量删除
 * 
 * @param {object} params 
 * @returns 
 */
 export const batchDelete = (params) => {
  return postRequest(`${baseApi}/batchDelete`, params);
}

/**
 * 批量选择
 * 
 * @param {object} params 
 * @returns 
 */
 export const batchSelect = (params) => {
  return postRequest(`${baseApi}/batchSelect`, params);
}

/**
 * 更新项目立项受理时间
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
export const updateTimeStartByFlowinstid = (flowinstid,taskId,catalog) => {
  return getRequest(`${baseApi}/updateTimeStartByFlowinstid`, { "flowinstid": flowinstid,"taskId":taskId,"catalog":catalog});
}


/**
 * 批量删除附件
 * 
 * @param {object} params 
 * @returns 
 */
export const batchDeleteFj = (params) => {
  return postRequest(`${baseApi}/batchDeleteFj`, params);
}

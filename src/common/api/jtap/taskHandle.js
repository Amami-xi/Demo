//任务管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/taskhandle"

/**
 * 获取任务
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @returns 
 */
export const getTask = (flowinstid, taskId) => {
  return getRequest(`${baseApi}/getTask`, { "flowinstid": flowinstid, "taskId": taskId });
}

/**
 * 获取flowId
 * 
 * @param {string} flowinstid 流程实例ID
 * @returns 
 */
export const getFlowId = (flowinstid) => {
  return getRequest(`${baseApi}/getFlowId`, { "flowinstid": flowinstid });
}


/**
 * 打开任务
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @returns 
 */
export const openTask = (flowinstid, taskId, autoSign) => {
  if (autoSign == null || autoSign == undefined) { 
    autoSign = true;
  }
  return getRequest(`${baseApi}/openTask`, { "flowinstid": flowinstid, "taskId": taskId, "autoSign": autoSign });
}


/**
 * 签收任务
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @returns 
 */
export const signTask = (flowinstid, taskId) => {
  return getRequest(`${baseApi}/signTask`, { "flowinstid": flowinstid, "taskId": taskId });
}

/**
 * 获取流程发送页面初始化参数
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @returns 
 */
export const getSendTaskParam = (flowinstid, taskId) => {
  return getRequest(`${baseApi}/getSendTaskParam`, { "flowinstid": flowinstid, "taskId": taskId });
}

/**
* 获取流程发送页面初始化参数
* 
* @param {string} flowinstid 流程实例ID
* @param {string} taskId 任务ID
* @returns 
*/
export const getTransferTaskParam = (flowinstid, taskId) => {
  return getRequest(`${baseApi}/getTransferTaskParam`, { "flowinstid": flowinstid, "taskId": taskId });
}

/**
 * 发送
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @returns 
 */
export const sendTask = (flowinstid, taskId, nextNodeList) => {
  return postRequest(`${baseApi}/sendTask`, { "flowinstid": flowinstid, "taskId": taskId, "autoSign": true, "nextNodeList": nextNodeList });
}

/**
 * 获取流程退回页面初始化参数
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @returns 
 */
export const getBackTaskParam = (flowinstid, taskId) => {
  return getRequest(`${baseApi}/getBackTaskParam`, { "flowinstid": flowinstid, "taskId": taskId });
}

/**
 * 批量发送
 * 
 * @param {object} params
 * @returns 
 */
export const batchSendTask = (params) => {
  return postRequest(`${baseApi}/batchSendTask`, { "autoSign": true, "sendTaskFormList": params });
}

/**
 * 转件
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @param {Array} assis 参与者
 * @returns 
 */
export const transferTask = (flowinstid, taskId, assis) => {
  return postRequest(`${baseApi}/transferTask`, { "flowinstid": flowinstid, "taskId": taskId, "assis": assis });
}

/**
 * 标准退回
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @param {string} reason 退回原因
 * @returns 
 */
export const withdrawStandardTask = (flowinstid, taskId, reason) => {

  return postRequest(`${baseApi}/withdrawStandardTask`, { "autoSign": true, "flowinstid": flowinstid, "taskId": taskId, "reason": reason });
}

/**
 * 批量标准退回
 * 
 * @param {object} params
 * @returns 
 */
export const batchWithdrawStandardTask = (params, reason) => {

  return postRequest(`${baseApi}/batchWithdrawStandardTask`, { "autoSign": true, "withdrawTaskFormList": params, "reason": reason });
}

/**
 * 扩展退回(通过转件的方式执行退回)
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @param {string} reason 退回原因
 * @returns 
 */
export const extendWithdrewTask = (flowinstid, taskId, reason) => {
  return postRequest(`${baseApi}/extendWithdrewTask`, { "autoSign": true, "flowinstid": flowinstid, "taskId": taskId, "reason": reason });
}

/**
 * 批量扩展退回
 * 
 * @param {object} params
 * @returns 
 */
export const batchExtendWithdrewTask = (params) => {
  return postRequest(`${baseApi}/batchExtendWithdrewTask`, { "autoSign": true, "withdrawTaskFormList": params, "reason": reason });
}

/**
 * 撤回
 * 
 * @param {*} flowinstid 流程实例ID
 * @param {*} taskId 任务ID
 * @returns 
 */
export const drawbackTask = (flowinstid, taskId) => {
  return getRequest(`${baseApi}/drawbackTask`, { "flowinstid": flowinstid, "taskId": taskId });
}

/**
 * 流程信息查看
 * @param {*} flowInstId 
 * @param {*} businessId 
 * @param {*} taskId 
 * @param {*} flowId 
 */
export const handlingProcess = (flowInstId, flowId) => {
  let url =
    import.meta.env.VITE_JTAP_FLOWPROCESS_URL + "?flowInstId=" + flowInstId + "&flowId=" + flowId + "&rootFlowInstId=" + flowInstId + "&rootFlowId=" + flowId;
  window.open(url, "_blank");
}
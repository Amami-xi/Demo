//下载管理api接口

import { getRequest, postRequest, uploadFileRequest } from '@/common/utils/request'

let baseApi = "/apis/api/tdzz/download";


/**
 * 验收阶段市级验收扣减环节模板下载
 * 
 * @param {object} params 
 * @returns 
 */
export const batchImportSjkjMjTemplate = (flowinstid, taskId) => {
  var url = baseApi + "/batchImportSjkjMjTemplate" + "?flowinstid=" + flowinstid + "&taskId=" + taskId;
  window.open(url);
}

/**
 * 验收阶段县级确认环节模板下载
 * 
 * @param {object} params 
 * @returns 
 */
export const batchImportXjqrMjTemplate = (flowinstid, taskId) => {
  var url = baseApi + "/batchImportXjqrMjTemplate" + "?flowinstid=" + flowinstid + "&taskId=" + taskId;
  window.open(url);
}

/**
 * 批量导出动态意见
 * 
 * @param {object} params 
 * @returns 
 */
export const exportDtOptionList = (flowinstid, taskId, businessCode, catalog, list) => {
  var url = baseApi + "/exportDtOptionList" + "?flowinstid=" + flowinstid + "&taskId=" + taskId + "&businessCode=" + businessCode + "&catalog=" + catalog + "&list=" + list;
  window.open(url);
}
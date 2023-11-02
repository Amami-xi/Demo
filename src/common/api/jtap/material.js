//材料管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/material";

/**
 * 获取环节操作按钮列表
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @param {string} businessCode 业务编码
 * @param {string} materialType 材料类型
 * @param {string} action 操作类型
 * @returns 
 */
export const getBtnList = (flowinstid, taskId, businessCode, materialType, action) => {
  return getRequest(`${baseApi}/getBtnList`, { "flowinstid": flowinstid, "taskId": taskId, "businessCode": businessCode, "materialType": materialType, "action": action });
}

/**
 * 获取环节表单材料列表
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId  任务ID
 * @param {string} catalog  项目阶段
 * @returns
 */
export const getMaterialFormList = (flowinstid, taskId, catalog) => {
  return getRequest(`${baseApi}/getMaterialFormList`, { "flowinstid": flowinstid, "taskId": taskId, "catalog": catalog });
}

/**
 * 获取环节表单材料列表-根据项目阶段分组
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId  任务ID
 * @param {string} businessCode  业务编码
 * @param {string} materialType  材料类型
 * @param {string} jbxxSec  项目主键
 * @returns
 */
export const getMaterialFormMap = (flowinstid, taskId, businessCode, materialType, jbxxSec) => {
  return getRequest(`${baseApi}/getMaterialFormMap`, { "flowinstid": flowinstid, "taskId": taskId, "businessCode": businessCode, "materialType": materialType, "jbxxSec": jbxxSec });
}

/**
 * 获取环节附件材料列表
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} jbxxSec 项目主键
 * @param {string} taskId 任务ID
 * @param {string} businessCode 业务编码
 * @param {string} materialType 材料类型
 * @returns 
 */
export const getMaterialAttachList = (flowinstid, jbxxSec, taskId, catalog, businessCode, materialType) => {
  return getRequest(`${baseApi}/getMaterialAttachList`, { "flowinstid": flowinstid, "jbxxSec": jbxxSec, "taskId": taskId, "catalog": catalog, "businessCode": businessCode, "materialType": materialType });
}

/**
 * 获取环节附件材料列表
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @param {string} catalog  项目阶段
 * @returns 
 */
export const getMaterialAttachContentList = (flowinstid, taskId, catalog) => {
  return getRequest(`${baseApi}/getMaterialAttachContentList`, { "flowinstid": flowinstid, "taskId": taskId, "catalog": catalog });
}

/**
 * 获取环节可操作附件材料列表
 * @returns 
 */
export const getMaterialFj = (params) => {

  return postRequest(`${baseApi}/getMaterialFj`, params);
}
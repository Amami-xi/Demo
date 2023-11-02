//材料管理api接口

import { getRequest, postRequest, uploadFileRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/attach";

let materialapi = "/api/jtap/material";

/**
 * 上传附件
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @returns 
 */
export const uploadAttach = (params) => {
    return uploadFileRequest(`${baseApi}/uploadAttach`, params);
}

/**
 * 获取附件
 * 
 * @param {string} attachId 任务ID
 * @returns 
 */
export const getAttach = (attachId) => {
    return getRequest(`${baseApi}/getAttach`, { "attachId": attachId });
}

/**
 * 获取附件列表
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} referenceId 附件标识
 * @returns 
 */
export const getAttachList = (flowinstid, referenceId, catalog,projectId) => {
    const params = {
        flowinstid: flowinstid,
        referenceId: referenceId,
        catalog: catalog,
        projectId:projectId
    }
    return postRequest(`${baseApi}/getAttachList`, params);
}

/**
 * 删除附件
 * 
 * @param {string} attachId 附件ID
 * @returns 
 */
export const deleteAttach = (attachId) => {
    return getRequest(`${baseApi}/deleteAttach`, { "attachId": attachId });
}

/**
 * 删除附件列表
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} referenceId 附件标识
 * @returns 
 */
export const deleteAttachList = (flowinstid, referenceId) => {
    return getRequest(`${baseApi}/deleteAttachList`, { "flowinstid": flowinstid, "referenceId": referenceId });
}

/**
 * 下载附件
 * 
 * @param {string} attachId 附件ID
 * @returns 
 */
export const downloadAttach = (attachId) => {
    return getRequest(`${baseApi}/downloadAttach`, { "attachId": attachId });
}

/**
 * 获取环节附件材料
 * @param {*} flowinstid 
 * @param {*} taskId
 * @param {*} referenceId
 * @param {*} catalog 
 * @returns 
 */
export const getMaterialAttach = (flowinstid, taskId, referenceId, catalog) => {
    return getRequest(`${materialapi}/getMaterialAttach`, { "flowinstid": flowinstid, "taskId": taskId, "referenceId": referenceId, "catalog": catalog });
}

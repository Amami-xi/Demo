//数据字典管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/dict";

/**
 * 获取字段列表列表
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @returns 
 */
export const getDictList = (typeName) => {
    return getRequest(`${baseApi}/getDictList`, { "typeName": typeName });
}

/**
 * 获取字段列表列表
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @returns 
 */
export const getDictByCodeName = (typeName, codeName) => {
    return getRequest(`${baseApi}/getDictByCodeName`, { "typeName": typeName, "codeName": codeName });
}

/**
 * 获取字段列表列表
 * 
 * @param {string} flowinstid 流程实例ID
 * @param {string} taskId 任务ID
 * @returns 
 */
export const getDictByCodeValue = (typeName, codeValue) => {
    return getRequest(`${baseApi}/getDictByCodeValue`, { "typeName": typeName, "codeValue": codeValue });
}

/**
 * 新增字典内容
 * 
 * @param {object} params 参数
 * @returns 
 */
export const addDictionaryEntry = (params) => {
    return postRequest(`${baseApi}/addDictionaryEntry`, params);
}

/**
 * 更新字典内容
 * 
 * @param {object} params 参数
 * @returns 
 */
export const modifyDictionaryEntry = (params) => {
    return postRequest(`${baseApi}/modifyDictionaryEntry`, params);
}

/**
 * 删除字典内容
 * 
 * @param {object} params 参数
 * @returns 
 */
export const deleteDictionaryEntry = (codeId) => {
    return getRequest(`${baseApi}/deleteDictionaryEntry`, { "codeId": codeId });
}
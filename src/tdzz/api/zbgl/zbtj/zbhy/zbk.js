//指标管理-指标调剂-指标库api接口

import { postRequest, uploadFileRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/zbk";


/**
 * 指标库列表查询
 * 
 * @param {object} params 
 * @returns 
 */
export const getList = (params) => {
    return postRequest(`${baseApi}/findList`, params);
}

/**
 * 根据行政区查询指标库
 * 
 * @param {object} params 
 * @returns 
 */
export const getListByXzqdm = (params) => {
    return postRequest(`${baseApi}/findListByXzqdm`, params);
}

/**
 * 根据行政区查询指标库
 * 
 * @param {object} params 
 * @returns 
 */
export const getByXzqdm = (params) => {
    return postRequest(`${baseApi}/findByXzqdm`, params);
}

/**
 * 指标还原
 * 
 * @param {object} params 
 * @returns 
 */
export const zbhy = (params) => {
    return postRequest(`${baseApi}/restoreZb`, params);
}

/**
 * 指标划转
 * 
 * @param {object} params 
 * @returns 
 */
export const zbhz = (params) => {
    return postRequest(`${baseApi}/transferZb`, params);
}

/**
 * 确认后指标还原
 * 
 * @param {object} params 
 * @returns 
 */
export const confirmToHy = (params) => {
    return postRequest(`${baseApi}/confirmToRestore`, params);
}

/**
 * 确认后指标划转
 * 
 * @param {object} params 
 * @returns 
 */
export const confirmToHz = (params) => {
    return postRequest(`${baseApi}/confirmToTransfer`, params);
}

/**
 * 导入指标库
 * 
 * @param {file} file 
 * @returns 
 */
export const importZbk = (params) => {
    return uploadFileRequest(`${baseApi}/importZbByExcel`, params);
}

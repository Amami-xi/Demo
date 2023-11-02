//指标管理-指标库-指标明细api接口

import { postRequest, uploadFileRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/zbmx";


/**
 * 指标明细查询列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzZbmxList = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}

/**
 * 指标计算
 * 
 * @param {file} file 
 * @returns 
 */
export const calculateOfZb = (params) => {
    return uploadFileRequest(`${baseApi}/calculateOfZb`, params);
}

/**
 * 导入原指标库
 * 
 * @param {file} file 
 * @returns 
 */
export const importYzbk = (params) => {
    return postRequest(`${baseApi}/importYzbk`, params);
}

/**
 * 导入新指标库
 * 
 * @param {file} file 
 * @returns 
 */
export const importZbk = (params) => {
    return postRequest(`${baseApi}/importZbk`, params);
}

/**
 * 导入指标明细
 * 
 * @param {file} file 
 * @returns 
 */
export const importZbmx = (params) => {
    return uploadFileRequest(`${baseApi}/importZbmxByExcel`, params);
}

/**
 * 全量导入
 * 
 * @param {file} file 
 * @returns 
 */
export const importZbmxByFull = (params) => {
    return uploadFileRequest(`${baseApi}/importZbmxByFull`, params);
}
//指标管理-指标调剂-指标归还明细api接口

import { postRequest, getRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/zbghmx";


/**
 * 指标归还明细分页查询
 * 
 * @param {object} params 
 * @returns 
 */
 export const getPageList = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}

/**
 * 指标归还待办分页查询
 * 
 * @param {object} params 
 * @returns 
 */
 export const getPageWait = (params) => {
    return postRequest(`${baseApi}/findPageWait`, params);
}

/**
 * 指标归还
 * 
 * @param {object} params 
 * @returns 
 */
 export const zbgh = (params) => {
    return postRequest(`${baseApi}/returnZb`, params);
}

/**
 * 
 * 指标归还确认
 * @param {object} params
 * @returns 
 */
 export const confirmToGh = (params) => {
    return postRequest(`${baseApi}/confirmToReturnZb`, params);
}
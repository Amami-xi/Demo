//指标管理-指标调剂-指标划转明细api接口

import { postRequest, getRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/zbhzmx";


/**
 * 指标划转明细分页查询
 * 
 * @param {object} params 
 * @returns 
 */
 export const getPageList = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}

/**
 * 指标划转待办查询
 * 
 * @param {object} params 
 * @returns 
 */
 export const getPageDb = (params) => {
    return postRequest(`${baseApi}/findPageDb`, params);
}

/**
 * 查询待确认指标划转明细数量
 * 
 * @param {object} params 
 * @returns 
 */
 export const getHzCountWait = (params) => {
    return getRequest(`${baseApi}/findCountWait`, params);
}
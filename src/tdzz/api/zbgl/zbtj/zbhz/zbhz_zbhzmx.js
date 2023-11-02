//指标管理-指标调剂-指标划转api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/zbhz";


/**
 * 指标划转明细
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzZbhzmx = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}

/**
 * 指标划转统计
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzZbhztj = (params) => {
    return postRequest(`${baseApi}/statisticsAnalysis`, params);
}
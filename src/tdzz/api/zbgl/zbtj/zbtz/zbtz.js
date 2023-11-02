//指标管理-指标调剂-指标调整api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/zbtz";


/**
 * 指标调整明细
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzZbtzmx = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}

/**
 * 指标调整统计
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzZbtztj = (params) => {
    return postRequest(`${baseApi}/statisticsAnalysis`, params);
}
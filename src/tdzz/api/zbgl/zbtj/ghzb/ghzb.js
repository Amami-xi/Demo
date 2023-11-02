//指标管理-指标调剂-归还指标api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/ghzb";


/**
 * 归还指标明细
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzGhzbmx = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}

/**
 * 归还指标统计
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzGhzbtj = (params) => {
    return postRequest(`${baseApi}/statisticsAnalysis`, params);
}
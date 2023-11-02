//指标管理-指标调剂-借用指标api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/jyzb";


/**
 * 借用指标明细
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzJyzbmx = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}

/**
 * 借用指标统计
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzJyzbtj = (params) => {
    return postRequest(`${baseApi}/statisticsAnalysis`, params);
}
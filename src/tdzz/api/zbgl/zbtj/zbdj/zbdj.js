//指标管理-指标调剂-指标冻结api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/zbdj";


/**
 * 冻结明细
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzDjmx = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}

/**
 * 冻结统计
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzDjtj = (params) => {
    return postRequest(`${baseApi}/statisticsAnalysis`, params);
}

/**
 * 项目冻结明细
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzXmdjmx = (params) => {
    return postRequest(`${baseApi}/projectDetails`, params);
}
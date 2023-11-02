//指标管理-指标调剂-指标还原明细api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/zbhymx";


/**
 * 指标还原明细分页查询
 * 
 * @param {object} params 
 * @returns 
 */
export const getPageList = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}

/**
 * 查询待确认指标还原明细
 * 
 * @param {object} params 
 * @returns 
 */
 export const getPageWait = (params) => {
    return postRequest(`${baseApi}/findPageWait`, params);
}

/**
 * 查询待确认指标还原明细数量
 * 
 * @param {object} params 
 * @returns 
 */
 export const getHyCountWait = (params) => {
    return getRequest(`${baseApi}/findCountWait`, params);
}
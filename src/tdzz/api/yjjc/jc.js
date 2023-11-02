//监测管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/yjjc/jc"

let downloadApi = "/apis/api/yjjc/jc";

/**
 * 耕地流出监测
 * 
 * @param {object} params
 * @returns 
 */
export const getGdlcList = (params) => {
    return postRequest(`${baseApi}/getGdlcList`, params);
}

/**
 * 耕地流入监测
 * 
 * @param {object} params 
 * @returns 
 */
export const getGdlrList = (params) => {
    return postRequest(`${baseApi}/getGdlrList`, params);
}

/**
 * 永久基本农田及储备区流出监测
 * 
 * @param {object} params 
 * @returns 
 */
export const getYjjbntlcList = (params) => {
    return postRequest(`${baseApi}/getYjjbntlcList`, params);
}

/**
* 永久基本农田及储备区流入监测
* 
* @param {object} params 
* @returns 
*/
export const getYjjbntlrList = (params) => {
    return postRequest(`${baseApi}/getYjjbntlrList`, params);
}

/**
* 耕地后备资源监测（按年度监测）
* 
* @param {object} params 
* @returns 
*/
export const getHbzyList = (params) => {
    return postRequest(`${baseApi}/getHbzyList`, params);
}

/**
* 耕地质量等别监测（按年度监测）
* 
* @param {object} params 
* @returns 
*/
export const getGdzldbList = (params) => {
    return postRequest(`${baseApi}/getGdzldbList`, params);
}

/**
* 根据行政区获取历年质量等别数据
* 
* @param {object} params 
* @returns 
*/
export const getGdzldbByYear = (params) => {
    return postRequest(`${baseApi}/getGdzldbByYear`, params);
}

/**
* 土地整治项目监测
* 
* @param {object} params 
* @returns 
*/
export const getTdzzYsXmList = (params) => {
    return postRequest(`${baseApi}/getTdzzYsXmList`, params);
}

/**
* 获取批次列表
* 
* @param {object} params 
* @returns 
*/
export const getPcList = (year) => {
    return getRequest(`${baseApi}/getPcList`, { "year": year });
}

/**
* 历年图斑分析
* 
* @param {object} objectId 
* @returns 
*/
export const getHistoryAnalyse = (objectId) => {
    return getRequest(`${baseApi}/getHistoryAnalyse/` + objectId);
}

/**
* 汇总统计
* 
* @param {object} params 
* @returns 
*/
export const statistics = (params) => {
    return postRequest(`${baseApi}/statistics`, params);
}

/**
* 导出统计汇总
* 
* @param {object} params
* @returns 
*/
export const exportStatistics = (params) => {
    var url = downloadApi + "/exportStatistics" + "?tbPch=" + params;
    window.open(url);
    // return postRequest(`${baseApi}/exportStatistics`, params);
}

/**
* 获取耕地流程情形列表
* 
* @param {object} params 
* @returns 
*/
export const getGdlcQxList = (params) => {
    return getRequest(`${baseApi}/getGdlcQxList`, { "dlbm": params });
}


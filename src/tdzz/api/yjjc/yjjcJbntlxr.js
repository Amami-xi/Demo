//基本信息接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/yjjc/yjjcJbntlxr"

/**
 * 获取详情
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
export const getDetail = (lxId) => {
    return getRequest(`${baseApi}/init`, { "lxId": lxId });
}

/**
 * 保存立项信息
 * 
 * @param {object} params 
 * @returns 
 */
export const saveOrUpdate = (params) => {
    return postRequest(`${baseApi}/saveOrUpdate`, params);
}


/**
 * 获取分页列表
 * 
 * @param {object} params 
 * @returns 
 */
export const queryPage = (params) => {
    return postRequest(`${baseApi}/queryPage`, params);
}

/**
 * 获取详情
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
export const del = (lxId) => {
    return getRequest(`${baseApi}/delete`, { "lxId": lxId });
}

/**
 * 根据行政区代码和镇查询联系人与责任人
 * 
 * @param {object} params 
 * @returns 
 */
 export const findByRegion = (params) => {
    return postRequest(`${baseApi}/findByRegion`, params);
}

/**
 * 根据类型查询联系人与责任人
 * 
 * @param {object} params 
 * @returns 
 */
 export const findByType = (params) => {
    return postRequest(`${baseApi}/findByType`, params);
}

/**
 * 查询已选中的Id集合
 * 
 * @param {object} params 
 * @returns 
 */
 export const findDefaultKeys = (params) => {
    return postRequest(`${baseApi}/findDefaultKeys`, params);
}
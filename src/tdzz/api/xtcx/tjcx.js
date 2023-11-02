//系统查询-统计查询api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/tjcx";


/**
 * 统计查询-占补平衡
 * 
 * @param {object} params 
 * @returns 
 */
export const getTjcxZbph = (params) => {
    return postRequest(`${baseApi}/getTjcxZbph`, params);
}

/**
 * 统计查询-占补平衡导出excel
 * 
 * @param {object} params 
 * @returns 
 */
export const getTjcxZbph_export = (params) => {
    return postRequest(`${baseApi}/getTjcxZbph_export`, params);
}

/**
 * 统计查询-旱改水
 * 
 * @param {object} params 
 * @returns 
 */
export const getTjcxHgs = (params) => {
    return postRequest(`${baseApi}/getTjcxHgs`, params);
}

/**
 * 统计查询-旱改水导出excel
 * 
 * @param {object} params 
 * @returns 
 */
export const getTjcxHgs_export = (params) => {
    return postRequest(`${baseApi}/getTjcxHgs_export`, params);
}

/**
 * 统计查询-增减挂钩
 * 
 * @param {object} params 
 * @returns 
 */
export const getTjcxZjgg = (params) => {
    return postRequest(`${baseApi}/getTjcxZjgg`, params);
}

/**
 * 统计查询-增减挂钩导出excel
 * 
 * @param {object} params 
 * @returns 
 */
export const getTjcxZjgg_export = (params) => {
    return postRequest(`${baseApi}/getTjcxZjgg_export`, params);
}

/**
 * 统计查询-工矿废弃地复垦
 * 
 * @param {object} params 
 * @returns 
 */
export const getTjcxGkfqd = (params) => {
    return postRequest(`${baseApi}/getTjcxGkfqd`, params);
}

/**
 * 统计查询-工矿废弃地复垦导出excel
 * 
 * @param {object} params 
 * @returns 
 */
export const getTjcxGkfqd_export = (params) => {
    return postRequest(`${baseApi}/getTjcxGkfqd_export`, params);
}
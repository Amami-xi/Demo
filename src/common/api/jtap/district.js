//行政区管理api接口

import { getRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/district";

/**
 * 获取下级行政区列表
 * 
 * @param {string} xzqdm 行政区代码
 * @returns 
 */
export const getDistrictList = (xzqdm) => {
    if (xzqdm.length > 6) { 
        xzqdm = xzqdm.substring(0, 6);
    }
    return getRequest(`${baseApi}/getDistrictList`, { "xzqdm": xzqdm });
}

/**
 * 根据行政区获取镇代码
 * 
 * @param {string} xzqdm 行政区代码
 * @returns 
 */
export const getZhen = (xzqdm) => {
    return getRequest(`${baseApi}/getZhen`, { "xzqdm": xzqdm });
}


/**
 * 获取镇行政区名称
 * 
 * @param {string} xzqdm 行政区代码
 * @returns 
 */
 export const getDistrict = (xzqdm) => {
    return getRequest(`${baseApi}/getDistrict`, { "xzqdm": xzqdm });
}
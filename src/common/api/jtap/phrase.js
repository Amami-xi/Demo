//常用语api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/tool/phrase";

/**
 * 保存或修改常用语
 * 
 * @returns 
 */
export const saveOrUpdate = (params) => {
    return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除常用语
 * 
 * @returns 
 */
export const deletePhrase = (phSec) => {
    return getRequest(`${baseApi}/deletePhrase`, { "phSec": phSec });
}

/**
 * 增加使用频率
 * @param {*} phSec 
 * @returns 
 */
export const addTimes = (phSec) => {
    return getRequest(`${baseApi}/addTimes`, { "phSec": phSec });
}

/**
 * 查询相似常用语
 * 
 * @returns 
 */
export const querySearch = (params) => {
    return postRequest(`${baseApi}/querySearch`, params);
}


/**
 * 查询相似常用语
 * 
 * @returns 
 */
export const queryPage = (params) => {
    return postRequest(`${baseApi}/queryPage`, params);
}
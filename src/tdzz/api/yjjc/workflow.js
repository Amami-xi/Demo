//监测管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/yjjc/workflow"

/**
* 获取耕地流出图斑监测详情 
* 
* @param {object} params
* @returns 
*/
export const gdlcDetail = (flowinstid, businessCode) => {
    return getRequest(`${baseApi}/gdlcDetail`, { "flowinstid": flowinstid, "businessCode": businessCode });
}


/**
* 耕地流出图斑上报保存 
* 
* @param {object} params
* @returns 
*/
export const gdlcSaveOrUpdate = (params) => {
    return postRequest(`${baseApi}/gdlcSaveOrUpdate`, params);
}


/**
* 下发任务 
* 
* @param {object} params
* @returns 
*/
export const sendTask = (params) => {
    return postRequest(`${baseApi}/sendTask`, params);
}


//指标管理-公共api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/common";


/**
 * 行政区代码查询
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzRegionCode = (params) => {
    return postRequest(`${baseApi}/findRegionCode`, params);
}
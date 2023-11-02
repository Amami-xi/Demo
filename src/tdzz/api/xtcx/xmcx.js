//系统查询-项目查询api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/xmcx";


/**
 * 项目查询列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzXmcxList = (params) => {
    return postRequest(`${baseApi}/getTdzzXmcxList`, params);
}

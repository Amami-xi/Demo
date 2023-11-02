//指标管理-指标使用-使用台账api接口

import { postRequest } from '@/common/utils/request' 

let baseApi = "/api/tdzz/sytz";


/**
 * 使用台账查询列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzSytzList = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}
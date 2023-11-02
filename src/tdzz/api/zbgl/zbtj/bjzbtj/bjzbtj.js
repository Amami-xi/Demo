//指标管理-指标调剂-本级指标调剂api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/bjzbtj";


/**
 * 本级指标调剂
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzBjzbtj = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}
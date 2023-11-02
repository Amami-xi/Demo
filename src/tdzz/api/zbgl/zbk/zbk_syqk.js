//指标管理-指标库-剩余情况api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/yzbk";


/**
 * 剩余情况查询列表
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzSyqkList = (params) => {
    return postRequest(`${baseApi}/findList`, params);
}
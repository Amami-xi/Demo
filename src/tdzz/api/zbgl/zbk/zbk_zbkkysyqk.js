//指标管理-指标库-指标库可用剩余情况api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/zbkkysyqk";


/**
 * 指标库可用剩余情况查询列表
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzZbkkysyqkList = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}
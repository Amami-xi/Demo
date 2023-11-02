//指标管理-指标库-指标库对账单api接口

import { postRequest } from '@/common/utils/request'

let baseApi = '/api/tdzz/zbkdzd';


/**
 * 指标库对账单查询列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzZbkdzdList = (params) => {
    return postRequest(`${baseApi}/findPageList`, params);
}
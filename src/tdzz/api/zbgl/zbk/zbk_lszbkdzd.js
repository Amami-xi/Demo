//指标管理-指标库-历史指标库对账单api接口

import { postRequest } from '@/common/utils/request'

let baseApi = '/api/tdzz/zbkdzd';


/**
 * 历史指标库对账单查询列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzLszbkdzdList = (params) => {
    return postRequest(`${baseApi}/findPageHistory`, params);
}
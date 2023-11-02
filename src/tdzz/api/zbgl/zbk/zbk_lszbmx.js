//指标管理-指标库-历史指标明细api接口

import { postRequest, uploadFileRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/zbmx";


/**
 * 历史指标明细查询列表
 * 
 * @param {object} params 
 * @returns 
 */
export const getTdzzLszbmxList = (params) => {
    return postRequest(`${baseApi}/findPageHistory`, params);
}

/**
 * 导入历史指标明细
 * 
 * @param {file} file 
 * @returns 
 */
export const importLszbmx = (params) => {
    return uploadFileRequest(`${baseApi}/importLszbmxByExcel`, params);
}
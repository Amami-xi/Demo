//指标管理-指标使用-建设项目挂钩指标明细

import { postRequest } from "@/common/utils/request"

let baseApi = "/api/tdzz/jsxmggzbmx";


/**
 * 建设项目挂钩指标明细查询
 * 
 * @param {object} params 
 * @returns 
 */
 export const getTdzzJsxmList = (params) => {
    return postRequest(`${baseApi}/findJsxm`, params);
}
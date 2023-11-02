//土地整治项目监测api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/yjjc/yjjcTdzzxm"

/**
* 删除
* 
* @param {string} flowinstid 流程实例ID
* @returns 
*/
export const del = (flowinstid) => {
    return getRequest(`${baseApi}/delete`, { "flowinstid": flowinstid });
}
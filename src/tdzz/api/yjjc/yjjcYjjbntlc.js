//永久基本农田流出监测api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/yjjc/yjjcYjjbntlc"

/**
* 删除
* 
* @param {string} flowinstid 流程实例ID
* @returns 
*/
export const del = (flowinstid) => {
    return getRequest(`${baseApi}/delete`, { "flowinstid": flowinstid });
}
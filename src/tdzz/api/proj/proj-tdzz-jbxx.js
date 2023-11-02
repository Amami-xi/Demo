//工矿废弃地复垦项目立项信息api接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzJbxx"

/**
 * 初始化立项信息
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const init = (flowinstid)=> {
    return getRequest(`${baseApi}/init`, {"flowinstid":flowinstid});
  }

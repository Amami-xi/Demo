//预警管理api接口

import { postRequest } from '@/common/utils/request'

let baseApi = "/api/yjjc/yj"

/**
 * 新增耕地改变用途预警
 * 
 * @param {object} params
 * @returns 
 */
 export const getTdzzxmYjList = (params)=> {
    return postRequest(`${baseApi}/getTdzzxmYjList`, params);
  }

/**
 * 耕地流出预警
 * 
 * @param {object} params 
 * @returns 
 */
 export const getGdlcYjList = (params)=> {
  return postRequest(`${baseApi}/getGdlcYjList`, params);
}

/**
 * 违规占用永久基本农田预警-永农流出
 * 
 * @param {object} params 
 * @returns 
 */
 export const getYnlcYjList = (params)=> {
    return postRequest(`${baseApi}/getYnlcYjList`, params);
  }

  /**
 * 对各类补充耕地项目一年内实施完成率（面积）预警
 * 
 * @param {object} params 
 * @returns 
 */
 export const getSslylYjList = (params)=> {
    return postRequest(`${baseApi}/getSslylYjList`, params);
  }


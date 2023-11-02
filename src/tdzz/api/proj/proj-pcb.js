//项目基本信息接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzPcb"

/**
 * 获取批次详情
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const getDetail = (flowinstid)=> {
    return getRequest(`${baseApi}/getDetail`, {"flowinstid":flowinstid});
  }

/**
 * 新增、修改批次信息
 * 
 * @param {object} params 
 * @returns 
 */
 export const saveOrUpdate = (params)=> {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除
 * 
 * @param {string} flowinstid 流程标识
 * @returns 
 */
 export const del = (flowinstid)=> {
  return getRequest(`${baseApi}/delete`,{"flowinstid":flowinstid});
}

/**
 * 获取批次分页列表
 * 
 * @param {object} params 
 * @returns 
 */
 export const queryPage = (params)=> {
  return postRequest(`${baseApi}/queryPage`, params);
}


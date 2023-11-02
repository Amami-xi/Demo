//项目基本信息接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzHqgh"

/**
 * 获取批次详情
 * 
 * @param {string} hqSec 项目主键
 * @returns 
 */
 export const getDetail = (hqSec)=> {
    return getRequest(`${baseApi}/getDetail`, {"hqSec":hqSec});
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
 * 获取批次分页列表
 * 
 * @param {object} params 
 * @returns 
 */
 export const queryPage = (params)=> {
  return postRequest(`${baseApi}/queryPage`, params);
}

/**
 * 删除
 * 
 * @param {string} hqSec 项目主键
 * @returns 
 */
 export const del = (hqSec)=> {
  return getRequest(`${baseApi}/delete`,{"hqSec":hqSec});
}


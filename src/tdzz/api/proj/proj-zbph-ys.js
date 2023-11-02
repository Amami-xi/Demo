//占补平衡项目验收信息api接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzZbphYsxx"

/**
 * 初始化验收信息
 * 
 * @param {string} jbxxSec 基本信息主键
 * @returns 
 */
 export const init = (jbxxSec)=> {
    return getRequest(`${baseApi}/init`, {"jbxxSec":jbxxSec});
  }

/**
 * 保存验收信息
 * 
 * @param {object} params 
 * @returns 
 */
 export const saveOrUpdate = (params)=> {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除验收信息
 * 
 * @param {string} jbxxSec 基本信息主键
 * @returns 
 */
 export const deleteYs = (jbxxSec) => {
  return getRequest(`${baseApi}/delete`, {"jbxxSec":jbxxSec});
}
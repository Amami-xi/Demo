//旱改水项目实施信息api接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzHgsSsxx"

/**
 * 初始化实施信息
 * 
 * @param {string} jbxxSec 基本信息主键
 * @returns 
 */
 export const init = (jbxxSec)=> {
    return getRequest(`${baseApi}/init`, {"jbxxSec":jbxxSec});
  }

/**
 * 保存实施信息
 * 
 * @param {object} params 
 * @returns 
 */
 export const saveOrUpdate = (params)=> {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除实施信息
 * 
 * @param {string} jbxxSec 基本信息主键
 * @returns 
 */
 export const deleteSs = (jbxxSec) => {
  return getRequest(`${baseApi}/delete`, {"jbxxSec":jbxxSec});
}


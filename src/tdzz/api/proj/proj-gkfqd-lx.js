//工矿废弃地复垦项目立项信息api接口

import { getRequest , postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/tdzzGkfqdLxxx"

/**
 * 初始化立项信息
 * 
 * @param {string} jbxxSec 基本信息主键
 * @returns 
 */
 export const init = (jbxxSec)=> {
    return getRequest(`${baseApi}/init`, {"jbxxSec":jbxxSec});
  }

/**
 * 保存立项信息
 * 
 * @param {object} params 
 * @returns 
 */
 export const saveOrUpdate = (params)=> {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除立项信息
 * 
 * @param {string} jbxxSec 基本信息主键
 * @returns 
 */
 export const deleteLx = (jbxxSec)=> {
  return getRequest(`${baseApi}/delete`, {"jbxxSec":jbxxSec});
}

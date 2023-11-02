//山水林田实施资金

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/zSsZjsyqk"

/**
 * 新增、修改
 * 
 * @param {object} params 
 * @returns 
 */
export const zjSave = (params) => {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除
 * 
 * @param {string} gclSec 主键
 * @returns 
 */
export const zjDelete = (gclSec) => {
  return getRequest(`${baseApi}/delete`, { "gclSec": gclSec });
}

/**
 * 获取列表
 * 
 * @param {string} guid 外键
 * @returns 
 */
export const zjQueryList = (guid) => {
  return getRequest(`${baseApi}/queryList`, { "guid": guid });
}


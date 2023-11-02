//山水林田实施工程量

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/proj/zSsGcljd"

/**
 * 新增、修改
 * 
 * @param {object} params 
 * @returns 
 */
export const gclSave = (params) => {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除
 * 
 * @param {string} gclSec 主键
 * @returns 
 */
export const gclDelete = (gclSec) => {
  return getRequest(`${baseApi}/delete`, { "gclSec": gclSec });
}

/**
 * 获取批次分页列表
 * 
 * @param {string} gclSec 外键
 * @returns 
 */
export const gclQueryList = (guid) => {
  return getRequest(`${baseApi}/queryList`, { "guid": guid });
}


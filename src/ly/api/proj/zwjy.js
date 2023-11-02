//林木采伐许可审批事项api接口

import { getRequest, postRequest,uploadFileRequest } from '@/common/utils/request'

let baseApi = "/api/ly/proj/lyglZwjy";

/**
 * 初始化
 * 
 * @param {string} jyId 流程标识
 * @returns 
 */
export const init = (jyId) => {
  return getRequest(`${baseApi}/init`, { "jyId": jyId });
}

/**
 * 保存
 * 
 * @param {object} params 
 * @returns 
 */
export const saveOrUpdate = (params) => {
  return postRequest(`${baseApi}/saveOrUpdate`, params);
}

/**
 * 删除
 * 
 * @param {string} jyId 流程标识
 * @returns
 */
export const deleteLx = (jyId) => {
  return getRequest(`${baseApi}/delete`, { "jyId": jyId });
}

/**
 * 分页查询
 * 
 * @param {object} params 
 * @returns 
 */
export const queryPage = (params) => {
  return postRequest(`${baseApi}/queryPage`, params);
}

/**
 * 批量导入
 * 
 * @param {file} file 
 * @returns 
 */
export const batchImport = (params) => {
  return uploadFileRequest(`${baseApi}/batchImport`, params);
}

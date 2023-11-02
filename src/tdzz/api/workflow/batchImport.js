//批量导入管理api接口

import { getRequest, postRequest, uploadFileRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/workflow";

/**
 * 批量导入
 * 
 * @param {object} params 
 * @returns 
 */
export const batchImport = (params) => {
  return uploadFileRequest(`${baseApi}/batchImport`, params);
}


/**
 * 批量导入-验收阶段县级确认环节-导入新增耕地面积
 * 
 * @param {object} params 
 * @returns 
 */
export const batchImportMj = (params) => {
  return postRequest(`${baseApi}/batchImportMj`, params);
}

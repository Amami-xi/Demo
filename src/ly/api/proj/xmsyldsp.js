//野生动物野外猎捕审批事项api接口

import { getRequest, postRequest, uploadFileRequest } from '@/common/utils/request'

let baseApi = "/api/ly/proj/lyglXmsyldsp"
let baseApidownload = import.meta.env.VITE_DOWNLOAD_SERVER_URL + "/api/ly/proj/lyglXmsyldsp";


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
 * 删除
 * 
 * @param {string} spid 表单主键
 * @returns
 */
export const deleteLx = (spid) => {
  return getRequest(`${baseApi}/delete`, { "spid": spid });
}

/**
 * 项目使用林地审批事项模板下载
 * 
 * @returns 
 */
export const downLoadModel = (pType) => {
  var url = baseApidownload + "/downLoadModel";
  window.open(url);
}

/**
 * 项目使用林地审批事项导入
 * 
 * @param {file} file 
 * @returns 
 */
export const batchImport = (params) => {
  return uploadFileRequest(`${baseApi}/batchImport`, params);
}

/**
 * 初始化
 * 
 * @param {string} syId 流程标识
 * @returns 
 */
export const initTj = (syId) => {
  return getRequest(`${baseApi}/initTj`, { "syId": syId });
}

/**
 * 保存
 * 
 * @param {object} params 
 * @returns 
 */
export const saveOrUpdateTj = (params) => {
  return postRequest(`${baseApi}/saveOrUpdateTj`, params);
}


/**
 * 删除
 * 
 * @param {string} syId 流程标识
 * @returns
 */
export const deleteTj = (syId) => {
  return getRequest(`${baseApi}/deleteTj`, { "syId": syId });
}

/**
 * 分页查询
 * 
 * @param {object} params 
 * @returns 
 */
export const queryPageTj = (params) => {
  return postRequest(`${baseApi}/queryPageTj`, params);
}

/**
 * 批量导入
 * 
 * @param {file} file 
 * @returns 
 */
export const batchImportTj = (params) => {
  return uploadFileRequest(`${baseApi}/batchImportTj`, params);
}

//地块坐标导入api接口

import { uploadFileRequest } from '@/common/utils/request'

let baseApi = "api/plot/import";

/**
 * 土整地块shape文件的导入
 * 
 * @param {file} file 
 * @param {string} flowinstid 流程标识
 * @param {string} pType 地块类型
 * @returns 
 */
export const importShapePlot = (params) => {
  return uploadFileRequest(`${baseApi}/importShapePlot`, params);
}

/**
 * 林业地块shape文件的导入
 * 
 * @param {file} file 
 * @param {string} flowinstid 流程标识
 * @param {string} pType 地块类型
 * @returns 
 */
 export const importShapePlot_Ly = (params) => {
  return uploadFileRequest(`${baseApi}/importShapePlot_Ly`, params);
}


/**
 * 地块txt文件的导入
 * 
 * @param {file} file 
 * @param {string} flowinstid 流程标识
 * @param {string} pType 地块类型
 * @returns 
 */
export const importTxtPlot = (params) => {
  return uploadFileRequest(`${baseApi}/importTxtPlot`, params);
}

/**
* 地块excel文件的导入
* 
* @param {file} file 
* @param {string} flowinstid 流程标识
* @param {string} pType 地块类型
* @returns 
*/
export const importExcelPlot = (params) => {
  return uploadFileRequest(`${baseApi}/importExcelPlot`, params);
}

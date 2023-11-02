//地块坐标查询删除api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/plot/plotzb";

/**
 * 初始化地块坐标
 * 
 * @param {object} params 
 * @returns 
 */
export const init = (params) => {
  return postRequest(`${baseApi}/init`, params);
}

/**
 * 初始化地块坐标
 * 
 * @param {String} plSec 地块主键
 * @returns 
 */
export const getDetail = (params) => {
  return getRequest(`${baseApi}/getDetail`, { "plSec": plSec });
}

/**
 * 清空坐标（删除所有地块）
 * 
 * @param {string} flowinstid 流程标识
 * @param {string} plotType 地块类型
 * @returns 
 */
export const deleteAll = (flowinstid, plotType) => {
  return getRequest(`${baseApi}/deleteAll`, { "flowinstid": flowinstid, "plotType": plotType });
}

/**
 * 清空林业坐标（删除所有地块）
 * 
 * @param {string} flowinstid 流程标识
 * @param {string} plotType 地块类型
 * @returns 
 */
export const deleteAll_ly = (flowinstid, plotType) => {
  return getRequest(`${baseApi}/deleteAll_ly`, { "flowinstid": flowinstid, "plotType": plotType });
}


/**
 * 删除地块（删除单个地块）
 * 
 * @param {string} plsec 地块标识
 * @returns 
 */
export const deleteOne = (plsec) => {
  return getRequest(`${baseApi}/deleteOne`, { "plsec": plsec });
}

/**
 * 初始化地块分页列表
 * 
 * @param {string} tacSec 坐标系标识
 * @param {number} pageIndex 地块页码
 * @param {number} pageSize 地块每页行数
 * @returns 
 */
export const queryPagePlotList = (tacSec, pageIndex, pageSize) => {
  return postRequest(`${baseApi}/queryPagePlotList`,
    {
      "tacSec": tacSec,
      "pagination": {
        "pageIndex": pageIndex,
        "pageSize": pageSize
      }
    });
}

/**
 * 初始化坐标分页列表
 * 
 * @param {string} plSec 
 * @param {number} pageIndex 
 * @param {number} pageSize 
 * @returns 
 */
export const queryPageCoordList = (plSec, pageIndex, pageSize,plSecs) => {
  return postRequest(`${baseApi}/queryPageCoordList`,
    {
      "plSec": plSec,
      "pagination": {
        "pageIndex": pageIndex,
        "pageSize": pageSize
      },
      "plSecs": plSecs,
    });
}

/**
 * 获取地类列表
 * 
 * @param {string} type 类型 0：二调 1：三调
 * @returns 
 */
export const getDlList = (type) => {
  return getRequest(`${baseApi}/getDlList`, { "type": type });
}

/**
 * 获取允许地类提示
 * 
 * @param {string} businessCode 业务编码
 * @returns 
 */
export const getYxDlList = (businessCode) => {

  return getRequest(`${baseApi}/getYxDlList`, { "buisnessCode": businessCode });
}
//菜单管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/menu";

/**
 * 获取业务一级菜单列表
 * 
 * @param {string} appCodes 业务子代码
 * @param {string} accountId 账户ID
 * @returns 
 */
export const getTopMenuList = (appCodes) => {
  return getRequest(`${baseApi}/getTopMenuList`, { "appCodes": appCodes });
}

/**
 * 获取业务子菜单列表
 * 
 * @param {string} appCodes 业务子代码
 * @param {string} accountId 账户ID
 * @returns 
 */
export const getChildMenuList = (appCodes, parentMenuId) => {
  return getRequest(`${baseApi}/getChildMenuList`, { "appCodes": appCodes, "parentMenuId": parentMenuId });
}

/**
 * 获取业务菜单列表
 * 
 * @param {string} appCodes 业务子代码
 * @param {string} accountId 账户ID
 * @returns 
 */
export const getMenuList = (appCodes) => {
  return getRequest(`${baseApi}/getMenuList`, { "appCodes": appCodes });
}
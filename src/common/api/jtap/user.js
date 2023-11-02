//用户管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/user";

/**
 * 获取业务一级菜单列表
 * 
 * @returns 
 */
export const getAppCode = () => {
  return getRequest(`${baseApi}/getAppCode`, {});
}

/**
 * 修改密码
 * 
 * @returns 
 */
export const editPass = (params) => {
  return postRequest(`${baseApi}/editPass`, params);
}

/**
 * 查询用户
 * 
 * @returns 
 */
export const getUsers = (params) => {
  return postRequest(`${baseApi}/getUsers`, params);
}

/**
 * 新增用户
 * 
 * @returns 
 */
export const addUser = (params) => {
  return postRequest(`${baseApi}/addUser`, params);
}

/**
 * 修改用户
 * 
 * @returns 
 */
export const editUser = (params) => {
  return postRequest(`${baseApi}/editUser`, params);
}

/**
 * 删除用户
 * 
 * @returns 
 */
export const deleteUser = (params) => {
  return getRequest(`${baseApi}/deleteUser`, { "ids": params });
}

/**
 * 禁用用户
 * 
 * @returns 
 */
export const disableUser = (params) => {
  return getRequest(`${baseApi}/disableUser`, { "ids": params });
}
//角色管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/role";

/**
 * 查询角色
 * 
 * @param {*} attributes 扩展属性
 * @param {*} roleGroupId 角色群组ID
 * @param {*} roleName 角色名称
 * @param {*} roleType 角色类型
 * @returns 
 */
export const getRoles = (attributes, roleGroupId, roleName, roleType) => {
  return postRequest(`${baseApi}/getRoles`, { "attributes": attributes, "roleGroupId": roleGroupId, "roleName": roleName, "roleType": roleType });
}

/**
 * 查询角色
 * 
 * @param {*} roleType 角色类型
 * @returns 
 */
export const getRolesByType = (roleType) => {
  return postRequest(`${baseApi}/getRoles`, { "roleType": roleType });
}

/**
 * 新增角色
 * 
 * @returns 
 */
export const addRole = (params) => {
  return postRequest(`${baseApi}/addRole`, params);
}

/**
 * 修改角色
 * 
 * @returns 
 */
export const editRole = (params) => {
  return postRequest(`${baseApi}/editRole`, params);
}

/**
 * 删除角色
 * 
 * @returns 
 */
export const deleteRole = (params) => {
  return getRequest(`${baseApi}/deleteRole`, { "ids": params });
}
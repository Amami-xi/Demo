//部门管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/dept";

/**
 * 获取机构下部门信息
 * 
 * @param {*} orgId 机构ID
 * @param {*} containDisable 是否包含禁用数据
 * @param {*} appCode 子系统代码
 * @returns 
 */
export const getOrganizationDepartments = (orgId, containDisable, appCode) => {
  containDisable = false;
  return postRequest(`${baseApi}/getOrganizationDepartments`, { "orgId": orgId, "containDisable": containDisable, "appCode": appCode });
}

/**
 * 获取下级部门信息
 * 
 * @param {*} deptId 上级部门ID
 * @param {*} containDisable 是否包含禁用数据
 * @param {*} includeSelf 是否包含自己
 * @param {*} level 向下查询层级 1, 2, 3
 * @param {*} appCode 子系统代码
 * @returns 
 */
export const getChildrenDepartments = (deptId, containDisable, includeSelf, level, appCode) => {
  return postRequest(`${baseApi}/getChildrenDepartments`, { "deptId": deptId, "containDisable": containDisable, "includeSelf": includeSelf, "level": level, "appCode": appCode });
}

/**
 * 新增部门
 * 
 * @returns 
 */
export const addDept = (params) => {
  return postRequest(`${baseApi}/addDept`, params);
}

/**
 * 修改部门
 * 
 * @returns 
 */
export const editDept = (params) => {
  return postRequest(`${baseApi}/editDept`, params);
}

/**
 * 删除部门
 * 
 * @returns 
 */
export const deleteDept = (params) => {
  return getRequest(`${baseApi}/deleteDept`, { "ids": params });
}

/**
 * 禁用部门
 * 
 * @returns 
 */
export const disableDept = (params) => {
  return getRequest(`${baseApi}/disableDept`, { "ids": params });
}
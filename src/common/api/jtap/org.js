//机构管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/jtap/org";


/**
 * 获取顶级的机构信息
 * 
 * @returns 
 */
export const getRootOrganizations = () => {
  return getRequest(`${baseApi}/getRootOrganizations`, {});
}

/**
 * 获取下级机构信息
 * 
 * @param {*} deptId 上级机构ID
 * @param {*} containDisable 是否包含禁用数据
 * @param {*} includeSelf 是否包含自己
 * @param {*} level 向下查询层级
 * @param {*} appCode 子系统代码
 * @returns 
 */
export const getChildrenOrganizations = (orgId, containDisable, includeSelf, level, appCode) => {
  containDisable = false;
  includeSelf = false;
  level = 1;
  return postRequest(`${baseApi}/getChildrenOrganizations`, { "orgId": orgId, "containDisable": containDisable, "includeSelf": includeSelf, "level": level, "appCode": appCode });
}

/**
 * 新增机构
 * 
 * @returns 
 */
export const addOrg = (params) => {
  return postRequest(`${baseApi}/addOrg`, params);
}

/**
 * 修改机构
 * 
 * @returns 
 */
export const editOrg = (params) => {
  return postRequest(`${baseApi}/editOrg`, params);
}

/**
 * 删除机构
 * 
 * @returns 
 */
export const deleteOrg = (params) => {
  return getRequest(`${baseApi}/deleteOrg`, { "ids": params });
}

/**
 * 禁用机构
 * 
 * @returns 
 */
export const disableOrg = (params) => {
  return getRequest(`${baseApi}/disableOrg`, { "ids": params });
}
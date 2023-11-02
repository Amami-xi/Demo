//林业审批首页管理api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = "/api/ly/home";

/**
 * 项目使用林地统计数据
 * 
 * @param {string} grade 行政区等级 县局、市局
 * @param {string} xzqdm 行政区代码
 * @param {number} ldStartYear 
 * @param {number} ldEndYear 
 * @returns 
 */
export const getXmsyldList = (grade, xzqdm, ldStartYear, ldEndYear) => {
    return postRequest(`${baseApi}/getXmsyldData`, { "grade": grade, "xzqdm": xzqdm, "startYear": ldStartYear, "endYear": ldEndYear });
}

/**
 * 湿地占用征收统计数据
 * 
 * @param {string} grade 行政区等级 县局、市局
 * @param {string} xzqdm 行政区代码
 * @param {number} sdStartYear 
 * @param {number} sdEndYear 
 * @returns 
 */
export const getSdzyzsList = (grade, xzqdm, sdStartYear, sdEndYear) => {
    return postRequest(`${baseApi}/getSdzyzsData`, { "grade": grade, "xzqdm": xzqdm, "startYear": sdStartYear, "endYear": sdEndYear });
}

/**
 * 公益林统计数据
 * 
 * @param {string} grade 行政区等级 县局、市局
 * @param {string} xzqdm 行政区代码
 * @param {number} gylStartYear 
 * @param {number} gylEndYear 
 * @returns 
 */
export const getGylList = (grade, xzqdm, gylStartYear, gylEndYear) => {
    return postRequest(`${baseApi}/getGylData`, { "grade": grade, "xzqdm": xzqdm, "startYear": gylStartYear, "endYear": gylEndYear });
}

/**
 * 林木采伐统计数据
 * 
 * @param {string} grade 行政区等级 县局、市局
 * @param {string} xzqdm 行政区代码
 * @param {number} cfStartYear 
 * @param {number} cfEndYear 
 * @param {number} cfType 采伐类型,0:全部 1:公益林 2:商品林
 * @returns 
 */
export const getLmcfList = (grade, xzqdm, cfStartYear, cfEndYear, cfType) => {
    return postRequest(`${baseApi}/getLmcfData`, { "grade": grade, "xzqdm": xzqdm, "startYear": cfStartYear, "endYear": cfEndYear, "cfType": cfType });
}

/**
 * 野生动物统计数据
 * 
 * @param {string} grade 行政区等级 县局、市局
 * @param {string} xzqdm 行政区代码
 * @param {number} ysStartYear 
 * @param {number} ysEndYear 
 * @returns 
 */
export const getYsdwList = (grade, xzqdm, ysStartYear, ysEndYear) => {
    return postRequest(`${baseApi}/getYsdwData`, { "grade": grade, "xzqdm": xzqdm, "startYear": ysStartYear, "endYear": ysEndYear });
}

/**
 * 植物检疫统计数据
 * 
 * @param {string} grade 行政区等级 县局、市局
 * @param {string} xzqdm 行政区代码
 * @param {number} zwStartYear 
 * @param {number} zwEndYear 
 * @returns 
 */
export const getZwjyList = (grade, xzqdm, zwStartYear, zwEndYear) => {
    return postRequest(`${baseApi}/getZwjyData`, { "grade": grade, "xzqdm": xzqdm, "startYear": zwStartYear, "endYear": zwEndYear });
}

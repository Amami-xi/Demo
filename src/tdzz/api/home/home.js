//首页管理api接口

import { getRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/home";

/**
 * 在建项目规模统计
 * 
 * @param {string} xzqdm 行政区代码
 * @returns 
 */
 export const getLxgmData = (xzqdm,selectYear)=> {
    return getRequest(`${baseApi}/getLxgmData`,{"xzqdm":xzqdm,"year":selectYear});
  }

  /**
 * 验收项目规模统计
 * 
 * @param {string} xzqdm 行政区代码
 * @returns 
 */
 export const getYsgmData = (xzqdm,selectYear)=> {
  return getRequest(`${baseApi}/getYsgmData`,{"xzqdm":xzqdm,"year":selectYear});
}

/**
 * 在建项目数
 * 
 * @param {string} xzqdm 行政区代码
 * @returns 
 */
 export const getLxxmCount = (xzqdm,selectYear)=> {
  return getRequest(`${baseApi}/getLxxmCount`,{"xzqdm":xzqdm,"year":selectYear});
}

/**
 * 验收项目数
 * 
 * @param {string} xzqdm 行政区代码
 * @returns 
 */
 export const getYsxmCount = (xzqdm,selectYear)=> {
  return getRequest(`${baseApi}/getYsxmCount`,{"xzqdm":xzqdm,"year":selectYear});
}

/**
 * 入库项目统计
 * 
 * @param {string} xzqdm 行政区代码
 * @returns 
 */
 export const getLxxmData = (xzqdm,selectYear)=> {
  return getRequest(`${baseApi}/getLxxmData`,{"xzqdm":xzqdm,"year":selectYear});
}

/**
 * 验收项目统计
 * 
 * @param {string} xzqdm 行政区代码
 * @returns 
 */
 export const getYsxmData = (xzqdm,selectYear)=> {
  return getRequest(`${baseApi}/getYsxmData`,{"xzqdm":xzqdm,"year":selectYear});
}
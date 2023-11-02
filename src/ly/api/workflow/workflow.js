//审批事项管理api接口

import { getRequest,postRequest  } from '@/common/utils/request'

let baseApi = "/api/ly/workflow";

/**
 * 获取待办列表
 * 
 * @param {object} params 
 * @returns 
 */
 export const getDaibanList = (params)=> {
    return postRequest(`${baseApi}/getWaitList`,params);
  }
  
  /**
   * 获取已办列表
   * 
   * @param {object} params 
   * @returns 
   */
  export const getYibanList = (params)=> {
    params.state = "未办结";
    return postRequest(`${baseApi}/getHandledList`,params);
  }
  
  /**
   * 获取办结列表
   * 
   * @param {object} params 
   * @returns 
   */
   export const getBanjieList = (params)=> {
    params.state = "已办结";
    return postRequest(`${baseApi}/getHandledList`,params);
}
  
  /**
   * 
   * @param {String} flowinstid 
   * @returns 
   */
   export const findLastTask = (flowinstid)=> {
    return getRequest(`${baseApi}/findLastTask`,{"flowinstid":flowinstid});
}
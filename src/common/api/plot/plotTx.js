//图形api接口

import { getRequest, uploadFileRequest } from '@/common/utils/request'

let baseApi = "/api/tdzz/plot";
let baseApiLy = "/api/ly/plot";

/**
 * 图形查看-土整
 * 
 * @param {String} flowinstid 
 * @param {String} businessCode 
 * @param {String} type 
 */
export const getTxUrl = (flowinstid, businessCode,projectType) => {

    return getRequest(`${baseApi}/getTxUrl`, {
        flowinstid: flowinstid,
        businessCode: businessCode,
        projectType:projectType,
    });
}

//上图-土整
export const postOneMap = (flowinstid, pType, businessCode) => {
    return getRequest(`${baseApi}/postOneMap`, {
        flowinstid: flowinstid,
        pType: pType,
        businessCode: businessCode
    });
}

/**
 * 图形查看-林业
 * 
 * @param {String} flowinstid 
 * @param {String} businessCode 
 */
export const getTxUrl_Ly = (flowinstid, businessCode) => {

    return getRequest(`${baseApiLy}/getTxUrl_Ly`, {
        flowinstid: flowinstid,
        businessCode: businessCode,
    });
}


//上图-林业
export const postOneMapLy = (flowinstid, pType, businessCode) => {
    return getRequest(`${baseApiLy}/postOneMap`, {
        flowinstid: flowinstid,
        pType: pType,
        businessCode: businessCode
    });
}


//上图前检查基本信息是否保存
export const checkJbxx = (flowinstid, businessCode) => {
    return getRequest(`${baseApiLy}/checkJbxx`, {
        flowinstid: flowinstid,
        businessCode: businessCode
    });
}


/**
 * 坐标导出-shape
 * @param {流程标识} flowinstid 
 * @param {业务编码} businessCode 
 * @param {地块类型编码} pType 
 */
export const exportShapePlot = (flowinstid, businessCode, pType) => {
    getRequest(`${baseApi}/exportShapePlot`, {
        flowinstid: flowinstid,
        pType: pType,
        businessCode: businessCode
    }).then((res) => {
        window.open(res.data);
    });
}

/**
 * 坐标导出-txt
 * @param {流程标识} flowinstid 
 * @param {业务编码} businessCode 
 * @param {地块类型编码} pType 
 */
export const exportTxtPlot = (flowinstid, businessCode, pType) => {

    let url = import.meta.env.VITE_DOWNLOAD_SERVER_URL + `${baseApi}/exportTxtPlot?` + "flowinstid=" + flowinstid + "&pType=" + pType + "&businessCode=" + businessCode;
    window.open(url);

}

/**
 * 监测图斑shape数据导入
 * @param {*} params 
 * @returns 
 */
export const importShapePlotByJc = (params) => {
    return uploadFileRequest(`${baseApi}/importShapePlotByJc`, params);
}

/**
 * 监测图斑shape数据批量导入
 * @param {*} params 
 * @returns 
 */
export const importBatchShapePlotByJc = (params) => {
    return uploadFileRequest(`${baseApi}/importBatchShapePlotByJc`, params);
}
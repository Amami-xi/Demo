//材料管理api接口

import { getRequest, postRequest, uploadFileRequest } from '@/common/utils/request'

let baseApi = import.meta.env.VITE_DOWNLOAD_SERVER_URL + "/api/jtap/download";



/**
 * 模板下载（zip）
 * 
 * @param {string} filepath 模板路径
 * @returns 
 */
export const ggDownLoadModel = (filepath) => {
    var url = baseApi + "/ggDownLoadModel" + "?filepath=" + filepath;
    window.open(url);
}


/**
 * 模板下载
 * 
 * @param {string} filepath 模板路径
 * @returns 
 */
export const downLoadModel = (modelname, type) => {

    var url = baseApi + "/downLoadModel" + "?modelname=" + modelname + "&type=" + type;
    window.open(url);
}

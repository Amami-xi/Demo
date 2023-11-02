//地块坐标模板下载api接口

import { getRequest, postRequest } from '@/common/utils/request'

let baseApi = import.meta.env.VITE_DOWNLOAD_SERVER_URL + "/api/plot/downloadModel";
//"http://10.0.4.159:6810"

/**
 * 项目坐标模板模板下载
 * 
 * @returns 
 */
export const downLoadModel = (pType) => {
  var url = baseApi + "/downLoadXMModel"+"?pType="+pType;
  window.open(url);
}

import { TdzzXmstatus } from "./constant.ts";

/**
 * 表单权限-【复垦中心验收环节】-填写市级验收扣减面积
 */
export const F_sjyskj = (flowAction, xmStatus) => {
    if (flowAction == 'VIEW') {
        return true;
    } else {
        if (xmStatus == TdzzXmstatus.YS_FKZXYS) {
            return false;
        } else {
            return true;
        }
    }
};

/**
 * 表单权限-【县级确认环节、县级填写省厅扣减面积环节】-填写确认新增耕地面积
 */
export const F_qrxzgd = (flowAction, xmStatus) => {
    if (flowAction == 'VIEW') {
        return true;
    } else {
        if (xmStatus == TdzzXmstatus.YS_XJQR || xmStatus == TdzzXmstatus.YS_XJTX) {
            return false;
        } else {
            return true;
        }
    }
};

/**
 * 表单权限-【县级填写省厅扣减面积环节】-填写省厅核减
 */
export const F_stkj = (flowAction, xmStatus) => {
    if (flowAction == 'VIEW') {
        return true;
    } else {
        if (xmStatus == TdzzXmstatus.YS_XJTX) {
            return false;
        } else {
            return true;
        }
    }
};
import { ElMessage, ElMessageBox } from "element-plus";
import rules from '@/common/utils/rules';
export function getRules() {
  var validRules = {
    pcLx: [
      { required: true, message: '立项申请文件号不能为空', trigger: 'blur' },
    ],
    jbxxXmbh: [
      { required: true, message: '项目编号不能为空', trigger: 'blur' },
    ],
    xmmc: [
      { required: true, message: '项目名称不能为空', trigger: 'blur' },
    ],
    xmmcgz: [
      { required: true, message: '项目名称不能为空', trigger: 'blur' },
      { validator: checkXmmcgz, trigger: 'blur' },
    ],
    jbxxXzqdm: [
      { required: true, message: '请选择项目所属地区', trigger: 'blur' },
    ],
    jbxxXmxz: [
      { required: true, message: '项目性质不能为空', trigger: 'blur' },
    ],
    xmlx: [
      { required: true, message: '项目类型不能为空', trigger: 'blur' }
    ],
    xmnd: [
      { required: true, message: '项目年度不能为空', trigger: 'blur' }
    ],
    pfjg: [
      { required: true, message: '下达预算与计划机关不可为空', trigger: 'blur' }
    ],
    wjmc: [
      { required: true, message: '下达预算与计划文件名称不可为空', trigger: 'blur' }
    ],
    jbxxXmqssj: [
      { required: true, message: '项目起始时间不可为空', trigger: 'blur' },
    ],
    jbxxXmjssj: [
      { required: true, message: '项目结束时间不可为空', trigger: 'blur' },
    ],
    jsgm: [
      { required: true, message: '建设规模不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    zldb: [
      { required: true, message: '请填写质量等别！', trigger: 'blur' },
      { validator: checkZldb, trigger: 'blur' }
    ],
    xzgdmj: [
      { validator: xzgdmj, trigger: 'blur' }
    ],
    num: [
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    intNum: [
      { validator: rules.checkInterNum, trigger: 'blur' }
    ],
  };
  return validRules;
}

/*验证是否为空*/
function isNullorEmpty(str) {
  if (typeof (str) == "undefined" || str == null || str === "") {
    return true;
  }
  return false;
}

function checkJsq(rule, value, callback) {
  const reg = /(^\d+(\.\d+)?$)/;
  if (!isNullorEmpty(value)) {
    if (!reg.test(value)) {
      return callback(new Error('请输入正确的数字'));
    } else {
      if (parseInt(value) > 10 || parseInt(value) < 1) {
        return callback(new Error('建设期需介于1到10之间'));
      }
    }
  }
  return callback();
}
function checkXmmcgz(rule, value, callback) {
  const reg = /^[A-Z]/;
  if (!isNullorEmpty(value)) {
    if (!reg.test(value)) {
      return callback(new Error('填写格式错误,填写规范请参照:项目编号+项目名称,列如:FG20**01江苏****项目'));
    }
  }
  return callback();
}

function checkjhXznydMj(rule, value, callback){
  const reg = /(^\d+(\.\d+)?$)/;
    if (isNullorEmpty(value)) {
      return callback(new Error('新增农用地面积不可为空'));
    } else {
      if (!reg.test(value)) {
        return callback(new Error('请输入正确的数字'));
      } else {
        if (value <= 0) {
          return callback(new Error('新增农用地面积不可为0'));
        }
        else {
          return callback();
        }
      }

    }
}

function xzgdmj(rule, value, callback) {
  const reg = /(^\d+(\.\d+)?$)/;
  if (isNullorEmpty(value)) {
    return callback(new Error('新增耕地面积不可为空'));
  } else {
    if (!reg.test(value)) {
      return callback(new Error('请输入正确的数字'));
    } else {
      if (value <= 0) {
        return callback(new Error('新增耕地面积不可为0'));
      }
      else {
        return callback();
      }

    }

  }
}

function checkZldb(rule, value, callback) {
  const reg = /(^\d+(\.\d{1})?$)/;
  if (!isNullorEmpty(value)) {
    if (!reg.test(value)) {
      return callback(new Error('请输入小数位数位1位的数'));
    } else {
      if (parseFloat(value) > 15 || (parseFloat(value) < 1 && parseFloat(value) != 0)) {
        return callback(new Error('请输入正确的范围：1-15 默认为0'));
      }
    }
  }
  return callback();
}
function checkDate(rule, value, callback) {
  let date = new Date(value);

  let curDay = new Date();

  if (date > curDay) {

    return callback(new Error('批复日期必须小于等于今天'));
  }
  return callback();
}

function checkXzq(xzq) {
  if (xzq.substring(4, 2) == "00") {
    return false;
  }
  return true;
}

export const checkValidate = (context) => {
  let flag = true;
  let message = "";
  let xmksrq = context.entity.jbxx.jbxxXmqssj;
  let xmjsrq = context.entity.jbxx.jbxxXmjssj;
  if (!isNullorEmpty(xmksrq) && !isNullorEmpty(xmjsrq) && xmksrq > xmjsrq) {
    message += "项目结束时间不可早于开始时间！";
    flag = false;
  }
  if (message.length > 0) {
    ElMessageBox.alert(message, "错误提示", { type: "warning" })
      .then()
      .catch();
  }


  return flag;
}
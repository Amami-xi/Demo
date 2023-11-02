import { ElMessage, ElMessageBox } from "element-plus";
import rules from '@/common/utils/rules';
export function getRules() {
  var validRules = {
    num: [
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    intNum: [
      { validator: rules.checkInterNum, trigger: 'blur' }
    ],
    zldb: [
      { required: true, message: '质量等别不可为空！', trigger: 'blur' },
      { validator: checkZldb, trigger: 'blur' }
    ],
    jsgm: [
      { required: true, message: '建设规模不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    ghxzGdmj: [
      { required: true, message: '规划新增耕地面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    zykjGdmj: [
      { required: true, message: '自验扣减耕地面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    zykjGdmj: [
      { required: true, message: '自验扣减耕地面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    sjfhKjxzgdmj: [
      { required: true, message: '数据复核扣减新增耕地面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    qrXzgdStmj: [
      { required: true, message: '确认新增耕地-水田面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    qrXzgdSjdmj: [
      { required: true, message: '确认新增耕地-水浇地面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    qrXzgdHdmj: [
      { required: true, message: '确认新增耕地-旱地面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    lxGdmjhj: [
      { required: true, message: '立项耕地核减面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    ysGdmjhj: [
      { required: true, message: '验收耕地核减面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    sbysGdmj: [
      { required: true, message: '上报验收耕地面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
     qrXzgdmj: [
      { required: true, message: '确认新增耕地面积不可为空', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
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

function checkjhXznydMj(rule, value, callback) {
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

//转换百分比
function changeBfb(val) {
  let result = isNaN(val) ? val : 0;
  result = (result * 100).toFixed(2) + "%";
}

export function checkValidate(context) {
  let flag = true;
  let message = "";

  //(拟新增耕地面积-县级自扣面积-市级扣减面积）/（入库新增耕地面积-省级入库耕地扣减面积）>=90%
  let ghxzGdmj = isNullorEmpty(context.entity.ys.ghxzGdmj) ? 0 : context.entity.ys.ghxzGdmj;
  let zykjGdmj = isNullorEmpty(context.entity.ys.zykjGdmj) ? 0 : context.entity.ys.zykjGdmj;
  let sjfhKjxzgdmj = isNullorEmpty(context.entity.ys.sjfhKjxzgdmj) ? 0 : context.entity.ys.sjfhKjxzgdmj;

  let xzgdbl = (ghxzGdmj - zykjGdmj) / (ghxzGdmj);
  if (ghxzGdmj == 0 || xzgdbl < 0.9) {
    flag = false;
    message += "不满足（规划新增耕地面积-县级自验扣减耕地面积)/（规划新增耕地面积）>=90%";
  }

  if (message.length > 0) {
    ElMessageBox.alert(message, "错误提示", { type: "warning" })
      .then()
      .catch();
  }

  return flag;
}
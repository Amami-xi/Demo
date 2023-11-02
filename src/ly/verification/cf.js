import { ElMessage } from "element-plus";
import rules from '@/common/utils/rules';
export function getRules() {
  var validRules = {
    requiredField: [
      { required: true, message: '', trigger: 'blur' },
    ],
    requiredChange: [
      { required: true, message: '', trigger: 'change' },
    ],
    cfmjCj: [
      { required: true, message: '请选择公益林级别', trigger: 'change' },
    ],
    cfmjLevel: [
      { required: true, message: '请选择商品林级别', trigger: 'change' },
    ],
    zsqx: [
      { required: true, message: '请选择终审权限', trigger: 'change' },
    ],
    num: [
      { required: true, message: '必填项', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    intNum: [
      { required: true, message: '必填项', trigger: 'blur' },
      { validator: rules.checkInterNum, trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '联系方式不能为空', trigger: 'blur' },
      { validator: rules.checkPhone, trigger: 'blur' }
    ],
    spOption: [
      { required: true, message: '请填写审批意见！', trigger: 'blur' },
    ],
  };
  return validRules;
}


function checkDate(rule, value, callback) {
  let date = new Date(value);

  let curDay = new Date();

  if (date > curDay) {

    return callback(new Error('批复日期必须小于等于今天'));
  }
  return callback();
}

export function checkValidate(context) {
  let flag = true;
  let message = "";

  let xeGyl = isNullorEmpty(context.entity.jbxx.xeGyl) ? 0 : context.entity.jbxx.xeGyl;
  let xeSpl = isNullorEmpty(context.entity.jbxx.xeSpl) ? 0 : context.entity.jbxx.xeSpl;
  let cfmjGyl = isNullorEmpty(context.entity.jbxx.cfmjGyl) ? 0 : context.entity.jbxx.cfmjGyl;
  let cfmjSpl = isNullorEmpty(context.entity.jbxx.cfmjSpl) ? 0 : context.entity.jbxx.cfmjSpl;
  if (xeGyl < cfmjGyl) {
    flag = false;
    message += "公益林面积不能超过当前公益林限额;"
  }
  if (xeSpl < cfmjSpl) {
    message += "商品林面积不能超过当前商品林限额;"
    flag = false;
  }

  if (message.length > 0) {
    ElMessage.error(message);
  }

  return flag;
}

function isNullorEmpty(str) {
  if (typeof (str) == "undefined" || str == null || str === "") {
    return true;
  }
  return false;
}

import { ElMessage } from "element-plus";
import rules from '@/common/utils/rules';
export function  getRules() {
  var validRules = {
    requiredField: [
      { required: true, message: '', trigger: 'blur' },
    ],
    requiredChange: [
      { required: true, message: '', trigger: 'change' },
    ],
    requiredRadio: [
      { required: true, message: '必填项', trigger: 'change' },
    ],
    requiredSsqy: [
      { required: true, message: '请选择所属区域', trigger: 'change' },
    ],
    num: [
      { required: true, message: '', trigger: 'blur' }, 
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    intNum: [
      { required: true, message: '', trigger: 'blur' }, 
      {validator:rules.checkInterNum,trigger:'blur'}
    ],
    phone: [
      { required: true, message: '', trigger: 'blur' }, 
      {validator:rules.checkPhone,trigger:'blur'}
    ],
  };
  return validRules;
}

  
function checkDate(rule, value, callback) {
  let date = new Date(value);

  let curDay = new Date();

  if ( date > curDay) {

    return callback(new Error('批复日期必须小于等于今天'));
  }
  return callback();
}

export  function checkValidate(context) {
  let flag=true;
  return flag;
}
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
    num: [
      { required: true, message: '', trigger: 'blur' },
      { validator: rules.checkNum, trigger: 'blur' }
    ],
    intNum: [
      { required: true, message: '', trigger: 'blur' },
      { validator: rules.checkInterNum, trigger: 'blur' }
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
  let trhjmj = context.entity.jbxx.trhjmj;
  let tchjmj = context.entity.jbxx.tchjmj;
  let tzyjList = context.entity.tzyjList;
  let message = "";

  if (tzyjList != null && tzyjList != undefined) { 
    for (var i = 0; i < tzyjList.length; i++) { 
      let tclist = tzyjList[i].tcXbList;
      let trlist = tzyjList[i].trXbList;
      if (tclist == null || tclist == undefined || tclist.length == 0) { 
        message += "第" + (i + 1) + "条调整依据未填写调出小班！;"
        flag = false;
      }
      if (trlist == null || trlist == undefined || trlist.length == 0) { 
        message += "第" + (i + 1) + "条调整依据未填写调入小班！;"
        flag = false;
      }
      
    }
  }

  if (!isNullorEmpty(trhjmj) && !isNullorEmpty(tchjmj) && tchjmj > trhjmj) {
    message += "调出合计面积不可超过调入合计面积！"
    flag = false;
  }
  if (!isNullorEmpty(message)) { 
    ElMessage.error(message);
  }
 
  return flag;
}

/*验证是否为空*/
export function isNullorEmpty(str) {
  if (typeof (str) == "undefined" || str == null || str === "") {
    return true;
  }
  return false;
}


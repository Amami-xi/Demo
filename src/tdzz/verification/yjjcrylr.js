import rules from '@/common/utils/rules';
export function getRules() {
  var validRules = {
    userName: [
      { required: true, message: '姓名不能为空', trigger: 'blur' },
      { pattern: /^[^\s]*$/, message: "禁止输入空格" }
    ],
    phone: [
      { required: true, message: '电话不能为空', trigger: 'blur' },
      { validator: rules.checkPhone, trigger: 'blur' },
    ],
    job: [
      { required: true, message: '职务不能为空', trigger: 'blur' },
      { pattern: /^[^\s]*$/, message: "禁止输入空格" }
    ],
    managescope: [
      { required: true, message: '管护范围不能为空', trigger: 'blur' },
      { pattern: /^[^\s]*$/, message: "禁止输入空格" }
    ],
  };
  return validRules;
}

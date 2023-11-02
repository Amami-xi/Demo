import rules from '@/common/utils/rules';
export function getRules() {
  var validRules = {
    phone: [
      { required: true, message: '请填写填报人联系电话', trigger: 'blur' },
      { validator: rules.checkPhone, trigger: 'blur' }
    ],
    unit: [
      { required: true, message: '请填写填报人所属单位', trigger: 'blur' },
    ],
    bz: [
      { required: true, message: '请填写备注', trigger: 'blur' },
    ],
  };
  return validRules;
}

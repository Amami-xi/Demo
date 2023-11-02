import rules from '@/common/utils/rules';
export function getRules() {
  var validRules = {
    spqk: [
      { required: true, message: '请填写审批情况', trigger: 'blur' },
    ],
    wcqk: [
      { required: true, message: '请填写完成情况', trigger: 'blur' },
    ],
  };
  return validRules;
}

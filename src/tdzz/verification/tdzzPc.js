import rules from '@/common/utils/rules';
export function getRules() {
  var validRules = {
    pcNo: [
      { required: true, message: '申请文件号不能为空', trigger: 'blur' },
    ],
    pcName: [
      { required: true, message: '申请文件名称不能为空', trigger: 'blur' },
    ],
  };
  return validRules;
}

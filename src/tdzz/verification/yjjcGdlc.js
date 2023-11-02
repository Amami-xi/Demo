export function getRules() {
  var validRules = {
    checkState: [
      { required: true, message: '请填写核实状态', trigger: 'blur' },
    ],
    dlbm: [
      { required: true, message: '请填写变化地类', trigger: 'blur' },
    ],
    dlmj: [
      { required: true, message: '请填写变化地类面积', trigger: 'blur' },
    ],
    bhsj: [
      { required: true, message: '请选择地类变化时间', trigger: 'blur' },
    ],
    gdlcqx: [
      { required: true, message: '请选择地耕地流出情形', trigger: 'blur' },
    ],
    xcsj: [
      { required: true, message: '请选择巡查时间', trigger: 'blur' },
    ],
    fixState: [
      { required: true, message: '请填写整改状态', trigger: 'blur' },
    ],
    fixMj: [
      { required: true, message: '请填写部分整改面积', trigger: 'blur' },
    ],
  };
  return validRules;
}

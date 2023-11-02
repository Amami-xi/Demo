<template>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}审核明细表</el-col>
  </el-row>
  <span class="tlw-table-title">基本资料信息</span>
  <el-form ref="spform" :model="entity" :rules="rules">
    <table class="tlw-table">
      <tr>
        <th>申请文件号</th>
        <td>
          <el-input disabled v-model="entity.pc.pcNo" />
        </td>
        <th>申请文件名称</th>
        <td>
          <el-input disabled v-model="entity.pc.pcName" />
        </td>
      </tr>
      <tr>
        <th>项目类型</th>
        <td>
          <el-input disabled v-model="businessName" />
        </td>
        <th>所属行政区</th>
        <td>
          <el-input disabled v-model="entity.pc.xzqmc" />
        </td>
      </tr>
    </table>
    <table class="tlw-table" v-if="entity.bjbList.length == 0">
      <tr colspan="3">
        <td><div style="text-align: center">暂无审批意见</div></td>
      </tr>
    </table>
    <table class="tlw-table">
      <template v-for="(item, index) in entity.bjbList" :key="index">
        <tr>
          <th rowspan="3" style="width: 14.2%">
            <span>{{ item.stepName }}</span>
          </th>
          <th colspan="3">{{ item.deptName }}办理人意见</th>
        </tr>
        <tr>
          <td colspan="3" style="padding-bottom: 20px">
            <el-form-item
              :prop="`bjbList.${index}.spOption`"
              :rules="rules.spOption"
            >
              <template v-if="!disabled && item.taskId == taskId">
                <el-autocomplete
                  style="width: 100%"
                  type="textarea"
                  v-model="item.spOption"
                  :fetch-suggestions="F_querySearch"
                  @select="handleContent"
                  placeholder="请填写审批意见(双击可选择常用语)！"
                  @dblclick="openMsg"
                  :trigger-on-focus="false"
                >
                </el-autocomplete>
                <el-button
                  @click="saveMsg(item.spOption)"
                  style="margin-top: 10px"
                  >一键录入常用语</el-button
                >
              </template>
              <el-input
                v-else
                type="textarea"
                v-model="item.spOption"
                disabled
              />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <el-row>
              <el-col :span="24" class="col-right">
                <el-form-item label="签名:">
                  <el-input v-model="item.signName" disabled />
                </el-form-item>
                <el-form-item
                  v-if="sfShowQsTime(item.stepCode)"
                  label="签收时间:"
                >
                  <el-date-picker
                    type="date"
                    value-format="YYYY-MM-DD"
                    v-model="item.slTime"
                    disabled
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="办理时间:">
                  <el-date-picker
                    type="date"
                    value-format="YYYY-MM-DD"
                    v-model="item.blTime"
                    disabled
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </td>
        </tr>
      </template>
    </table>
  </el-form>
  <Phrase ref="phrase" :setOption="setOption"></Phrase>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import store from "@/common/store";
import moment from "moment";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { getBjbList, saveOrUpdate } from "@/common/api/jtap/bjb";
import { getDetail } from "@/tdzz/api/proj/proj-pcb";
import { getDictByCodeName } from "@/common/api/jtap/dict";
import Phrase from "@/common/components/msg/phrase.vue";
import { querySearch, addTimes } from "@/common/api/jtap/phrase";

//1.定义数据
const route = useRoute();
const params = route.query;
const phrase = ref(null);
const data = reactive({
  flowinstid: params.flowinstid, //流程实例ID
  businessName: params.businessName, //业务名称
  stepName: params.currentStepName, //环节名称
  taskId: params.taskId, //任务ID
  action: params.action,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  catalog: params.catalog, //项目阶段名称
  entity: {
    pc: {}, //批次信息
    bjbList: [], //审批意见表
  },
  rules: {
    spOption: [
      { required: true, validator: validateSpOption, trigger: "blur" },
    ],
  },
  phraseList: [],
});

const { businessName, catalog, taskId, entity, rules, disabled } = toRefs(data);
const spform = ref(null);

//2.定义方法
/**
 * 初始化
 */
const F_init = () => {
  F_getPcb();
  F_getBjbList();
};

/**
 * 获取批次信息
 */
const F_getPcb = () => {
  getDetail(data.flowinstid).then((res) => {
    data.entity.pc = res.data;
  });
};

/**
 * 获取审批意见列表
 */
const F_getBjbList = () => {
  const params = {
    flowinstid: data.flowinstid,
    taskId: data.taskId,
    catalog: data.catalog,
    action: data.action,
  };
  getBjbList(params).then((res) => {
    data.entity.bjbList = res.data;
  });
};

/**
 * 审批意见校验
 *
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
function validateSpOption(rule, value, callback) {
  if (value === "" || value == undefined || value.trim().length == 0) {
    callback(new Error("请填写审批意见！"));
  } else {
    callback();
  }
}

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await spform.value.validate((valid) => {
    flag = valid;
  });
  return flag;
};

/**
 * 保存
 */
const F_save = async () => {
  const _bjb = data.entity.bjbList.find((bjb) => bjb.taskId === data.taskId);
  //当前环节有审批意见
  if (_bjb != null && _bjb != undefined) {
    let flag = await F_beforeSave();
    if (flag) {
      await saveOrUpdate(_bjb).then((res) => {
        F_getBjbList();
      });
    }
    return flag;
  } else {
    //当前环节无审批意见
    return true;
  }
};

/**
 * 立项阶段-服务科审核，验收阶段-技术科审核 显示受理时间
 * @param {*} stepCode
 */
const sfShowQsTime = (stepCode) => {
  if (
    stepCode.indexOf("LXJD_FWKSH") > -1 ||
    stepCode.indexOf("YSJD_JSKSH") > -1
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * 打开常用语弹窗
 */
const openMsg = () => {
  phrase.value.handleOpen();
};

/**
 * 保存常用语
 * @param {*}
 */
const saveMsg = (val) => {
  phrase.value.savePhrase(val);
};

/**
 * 常用语查询
 */
const F_querySearch = (queryString, callback) => {
  const params = {
    content: queryString,
  };
  querySearch(params).then((res) => {
    data.phraseList = res.data.map((item) => {
      return { value: item.content, id: item.phSec };
    });
    callback(data.phraseList);
  });
};

/**
 * 点击选择意见赋值
 */
const setOption = (val) => {
  data.entity.bjbList.map((item) => {
    if (item.taskId == data.taskId) {
      item.spOption = val;
    }
  });
};

/**
 * 选择常用语新增次数
 *
 * @param {*} item
 */
const handleContent = (item) => {
  addTimes(item.id).then((res) => {});
};

//3.入口
onMounted(() => {
  //1.初始化
  F_init();
  //2.定义监听事件
  bus.on("spyj_save", async (callback) => {
    let flag = await F_save();
    if (callback) {
      callback(flag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("spyj_save");
});
</script>
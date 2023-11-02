<template>
  <el-dialog v-model="dialogVisible" :title="title" :before-close="handleClose">
    <el-card header="项目使用林地统计信息表" class="tlw-card">
      <el-form
        :model="entity"
        ref="zwjyform"
        label-width="auto"
        :inline-message="true"
      >
        <table class="tlw-table">
          <tr>
            <th style="width: 10%">审核事项</th>
            <th colspan="8">填报内容</th>
          </tr>
          <el-input v-model="entity.createdBy" v-show="false" />
          <tr>
            <td class="requireCol">行政区</td>
            <td colspan="8">
              <el-form-item label-width="0" prop="xzqhdm" :rules="rules.requiredChange">
                <el-select
                  v-model="entity.xzqhdm"
                  placeholder="请选择"
                  :disabled="disabled"
                >
                  <el-option
                    :label="item.name"
                    :value="item.code"
                    v-for="(item, index) in districtOptions"
                    :key="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="requireCol">年份</td>
            <td colspan="6" style="width: 35%">
              <el-form-item label-width="0" prop="year" :rules="rules.requiredField">
                <el-date-picker
                  type="year"
                  value-format="YYYY"
                  :disabled="disabled"
                  v-model="entity.year"
                  placeholder="请选择日期"
                ></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="requireCol">统计</td>
            <td class="requireCol">件数</td>
            <td colspan="3">
              <el-form-item label-width="0" prop="amount" :rules="rules.intNum">
                <el-input v-model="entity.amount" :disabled="disabled" />
              </el-form-item>
            </td>
            <td class="requireCol">面积</td>
            <td colspan="3">
              <el-form-item prop="mj" label-width="0" :rules="rules.num">
                <el-input v-model="entity.mj" :disabled="disabled" />
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="F_save" :disabled="disabled"
          >确认{{ title }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>


<script setup>
import { ref, reactive, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { getCurrentInstance, watch } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { initTj, saveOrUpdateTj } from "@/ly/api/proj/xmsyldsp";
import { getRules, checkValidate } from "@/ly/verification/xmsyldTj";
import { getDistrictList } from "@/common/api/jtap/district";
import store from "@/common/store";

//1. 定义数据
const currentInstance = getCurrentInstance();
const pcform = ref(null);
const data = reactive({
  title: "",
  dialogVisible: false,
  syId: "",
  flowinstid: "",

  disabled: false,
  xzqdm: "",
  entity: {
    //填报表单
  },
  districtOptions: [], //行政区列表
  monthOptions: [
    { codeName: "1", codeValue: "01" },
    { codeName: "2", codeValue: "02" },
    { codeName: "3", codeValue: "03" },
    { codeName: "4", codeValue: "04" },
    { codeName: "5", codeValue: "05" },
    { codeName: "6", codeValue: "06" },
    { codeName: "7", codeValue: "07" },
    { codeName: "8", codeValue: "08" },
    { codeName: "9", codeValue: "09" },
    { codeName: "10", codeValue: "10" },
    { codeName: "11", codeValue: "11" },
    { codeName: "12", codeValue: "12" },
  ],
  rules: getRules(),
});
const {
  title,
  districtOptions,
  dialogVisible,
  entity,
  monthOptions,
  disabled,
  rules,
} = toRefs(data);

const zwjyform = ref(null);
//2.定义方法

/**
 * 关闭弹窗
 */
const handleClose = () => {
  data.dialogVisible = false;
  data.entity = {};
};

/**
 * 打开弹窗-添加
 */
const F_ADD = (flowId, businessCode) => {
  data.title = "添加";
  data.entity.flowId = flowId;
  data.entity.businessCode = businessCode;
  data.dialogVisible = true;
};

/**
 * 打开弹窗-编辑
 */
const F_UPDATE = (syId) => {
  data.title = "编辑";
  data.syId = syId;
  F_getDetail();
  data.dialogVisible = true;
};

/**
 * 获取详情
 */
const F_getDetail = () => {
  F_getDistrictList();
  initTj(data.syId).then((res) => {
    if (res.data.syId) {
      data.entity = res.data;
    }
  });
};

/**
 * 获取行政区列表
 */
const F_getDistrictList = () => {
  if (store.state.user.organizationGrade == "市局") {
    data.xzqdm = store.state.user.regionCode.substring(0, 4) + "00";
    getDistrictList(data.xzqdm).then((res) => {
      data.districtOptions = res.data;
    });
  } else {
    data.xzqdm = store.state.user.regionCode;
    getDistrictList(data.xzqdm.substring(0, 4) + "00").then((res) => {
      data.districtOptions = res.data;
      data.districtOptions = data.districtOptions.filter(
        (item) => item.code == data.xzqdm
      );
    });
  }
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await zwjyform.value.validate((valid) => {
    flag = valid;
    //2. 自己的逻辑代码
    if (flag) {
      flag = checkValidate(data);
    } else {
      ElMessage.error("请检查表单填写内容是否完整！");
      flag = false;
    }
  });
  return flag;
};

/**
 * 保存
 */
const F_save = async () => {
  // data.entity.flowinstid = data.flowinstid;

  if (data.entity.createdBy == null || data.entity.createdBy == undefined) {
    data.entity.createdBy = store.state.user.userId;
  }
  let flag = await F_beforeSave();
  if (flag) {
    await saveOrUpdateTj(data.entity)
      .then((res) => {
        data.entity = res.data;
        emit("refresh");
        ElMessage.success(res.msg);
        handleClose();
      })
      .catch((res) => {
        flag = false;
      });
  }
  return flag;
};

onMounted(() => {
  F_getDistrictList();
});
//3.监听

const emit = defineEmits(["refresh"]);
defineExpose({ F_ADD, F_UPDATE });
</script>
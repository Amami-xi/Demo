<template>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}{{ catalog }}基本信息表</el-col>
  </el-row>
  <el-form
    class="tlw-form"
    :model="entity"
    ref="ssform"
    :rules="rules"
    label-width="auto"
    :inline-message="true"
  >
    <div class="flow-form">
      <panel title="实施信息">
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item label="项目名称" prop="jbxx.jbxxXmmc">
              <el-input disabled v-model="entity.jbxx.jbxxXmmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="批复工期" prop="ss.pfgq">
              <el-input
                :disabled="disabled"
                v-model="entity.ss.pfgq"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="批复时间" prop="ss.pfsj">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.ss.pfsj"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="拟开工时间" prop="ss.nkgsj">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.ss.nkgsj"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="批复预算" prop="ss.pfys">
              <el-input
                :disabled="disabled"
                v-model="entity.ss.pfys"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="拟验收时间" prop="ss.nyssj">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.ss.nyssj"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="拟竣工时间" prop="ss.njgsj">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.ss.njgsj"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="专项资金" prop="ss.zxzj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.ss.zxzj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="省级补助资金"
              prop="ss.sjbzzj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ss.sjbzzj"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="实施监管项目总体(%)"
              prop="ss.jgJd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.ss.jgJd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="子项目信息">
        <template v-for="(item, index) in entity.zxxxList" :key="index">
          <el-row>
            <el-col :span="10" :offset="4">
              <el-form-item label="项目名称">
                <el-input disabled v-model="item.xmmc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-button
                type="primary"
                @click="F_zbinfo(item.zxmSec, item.xmmc)"
                :disabled="item.zxmSec == 'undefined' || item.zxmSec == null"
                v-if="!disabled"
                >信息填报</el-button
              >
              <el-button
                type="primary"
                @click="F_zbinfo(item.zxmSec, item.xmmc)"
                v-if="disabled"
                >信息查看</el-button
              >
            </el-col>
          </el-row>
          <el-divider v-if="index < entity.zxxxList.length - 1" />
        </template>
      </panel>
    </div>
  </el-form>
  <ZxmDialog ref="zxmDialog" :disabled="disabled"></ZxmDialog>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { getRules, checkValidate } from "@/tdzz/verification/tdzzSs";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { init, saveOrUpdate } from "@/tdzz/api/proj/proj-sslt-ss";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import ZxmDialog from "./ssltSsxxZxm.vue";
//1. 定义数据

const route = useRoute();
const params = route.query;
const zxmDialog = ref(null);
const data = reactive({
  flowinstid: params.flowinstid,
  businessName: params.businessName,
  catalog: params.catalog,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  entity: {
    catalog: params.catalog,
    jbxx: { flowinstid: params.flowinstid },
    ss: { flowinstid: params.flowinstid },
  },
  rules: {},
});
const { businessName, catalog, disabled, entity, rules } = toRefs(data);
const ssform = ref(null);
//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  init(data.flowinstid).then((res) => {
    data.entity = res.data;
  });
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await ssform.value.validate((valid) => {
    flag = valid;
    //2. 自己的逻辑代码
    if (flag) {
      flag = checkValidate(data);
    }
  });
  return flag;
};

/**
 * 保存
 */
const F_save = async () => {
  data.entity.ss.flowinstid = data.flowinstid;
  let flag = await F_beforeSave();
  if (flag) {
    await saveOrUpdate(data.entity.ss)
      .then((res) => {
        data.entity.ss = res.data;
      })
      .catch((res) => {
        flag = false;
      });
  }
  return flag;
};

/**
 * 子项目信息填报、查看
 * @param {子项目主键} zxmSec
 */
const F_zbinfo = (zxmSec, xmmc) => {
  zxmDialog.value.handleOpen(zxmSec, xmmc);
};

//3.入口
onMounted(() => {
  //1.获取详情
  F_init();
  //2.定义监听事件
  bus.on("sslt_ssxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("sslt_ssxx_save");
});
</script>
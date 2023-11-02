<template>
  <el-tag class="tlw-tag">单位：公顷、万元</el-tag>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}{{ catalog }}基本信息表</el-col>
  </el-row>
  <el-form
    class="tlw-form"
    :model="entity"
    :rules="rules"
    ref="ssform"
    label-width="auto"
    :inline-message="true"
  >
    <panel title="项目周期">
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="开工时间" prop="ss.kgsj">
            <el-date-picker
              type="date"
              :disabled="disabled"
              v-model="entity.ss.kgsj"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="竣工时间" prop="ss.jgsj">
            <el-date-picker
              type="date"
              :disabled="disabled"
              v-model="entity.ss.jgsj"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="计划建成高标准基本农田规模" prop="ss.jhGbzntgm">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.jhGbzntgm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="已建成高标准基本农田规模" prop="ss.gbzntgm">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gbzntgm"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="高标准基本农田规模建设条件" prop="ss.gbzntjstj">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gbzntjstj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="高标准基本农田任务所属年度" prop="ss.gbznd">
            <el-date-picker
              type="year"
              value-format="YYYY"
              :disabled="disabled"
              v-model="entity.ss.gbznd"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item
            label="实施监管项目总体(%)"
            prop="ss.jgJd"
            :rules="rules.num"
          >
            <el-input :disabled="disabled" v-model="entity.ss.jgJd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="项目投资">
      <el-row>
        <el-col :span="8" :offset="2">
          <el-tag>所有当前到位资金和:</el-tag>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-tag>所有当前支出资金和:</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item
            label="累计到位资金"
            prop="ss.ljdwzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.ljdwzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item
            label="累计支出金额"
            prop="ss.ljzcje"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.ljzcje"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item
            label="当期到位资金"
            prop="ss.dqdwzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.dqdwzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item
            label="当期支出金额"
            prop="ss.dqzcje"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.dqzcje"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="规划设计单位">
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="单位名称" prop="ss.ghsjDwmc">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.ghsjDwmc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="单位代码" prop="ss.ghsjDwdm">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.ghsjDwdm"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="招标代理单位">
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="单位名称" prop="ss.zbdlDwmc">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.zbdlDwmc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="单位代码" prop="ss.zbdlDwdm">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.zbdlDwdm"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="监理单位">
      <el-row>
        <el-col :span="8" :offset="2">
          <el-form-item label="单位名称" prop="ss.jlDwmc">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.jlDwmc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-form-item label="单位代码" prop="ss.jlDwdm">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.jlDwdm"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
  </el-form>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { getRules, checkValidate } from "@/tdzz/verification/tdzzSs";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { init, saveOrUpdate } from "@/tdzz/api/proj/proj-stbh-ss";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import bus from "@/common/utils/bus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
//1. 定义数据

const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid,
  catalog: params.catalog,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  entity: {
    catalog: params.catalog,
    jbxx: { flowinstid: params.flowinstid },
    ss: { flowinstid: params.flowinstid },
  },
  rules: getRules(),
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
//3.入口
onMounted(() => {
  //1.获取详情
  F_init();
  //2.定义监听事件
  bus.on("stbh_ssxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("stbh_ssxx_save");
});
</script>
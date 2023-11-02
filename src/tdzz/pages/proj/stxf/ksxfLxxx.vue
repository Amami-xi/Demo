<template>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}{{ catalog }}基本信息表</el-col>
  </el-row>
  <el-form
    class="tlw-form"
    :model="entity"
    :rules="rules"
    ref="lxform"
    label-width="auto"
    :inline-message="true"
  >
    <div class="flow-form">
      <panel title="立项信息">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="项目名称"
              prop="jbxx.jbxxXmmc"
              :rules="rules.xmmc"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.jbxx.jbxxXmmc"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="项目预算编号"
              prop="lx.lxbh"
              :rules="rules.lxbh"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.lxbh"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="项目所在地"
              prop="jbxx.jbxxXzqdm"
              :rules="rules.jbxxXzqdm"
            >
              <el-select
                v-model="entity.jbxx.jbxxXzqdm"
                placeholder="请选择"
                :disabled="disabled"
                style="width: 100%"
              >
                <el-option
                  :label="item.superName + '.' + item.name"
                  :value="item.code"
                  v-for="(item, index) in districtOptions"
                  :key="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="下达预算计划机关"
              prop="lx.pfjg"
              :rules="rules.pfjg"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.pfjg"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="下达预算计划文号" prop="lx.pfwh">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.pfwh"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="下达预算计划文件名称" prop="lx.pfwj">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.pfwj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="批复日期" prop="lx.pfrq" :rules="rules.pfrq">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.lx.pfrq"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="建设期限" prop="lx.jsqx">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.jsqx"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="项目总投资" prop="lx.ztz" :rules="rules.num">
              <el-input :disabled="disabled" v-model="entity.lx.ztz"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="建设总规模" prop="lx.zgm" :rules="rules.jsgm">
              <el-input :disabled="disabled" v-model="entity.lx.zgm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="专项资金" prop="lx.zxzj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.zxzj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="省级补助资金"
              prop="lx.sjbzzj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.sjbzzj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="复垦面积" prop="lx.fkmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="转型利用面积"
              prop="lx.zxlymjj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.zxlymjj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="复绿面积" prop="lx.flmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.flmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="中央资金" prop="lx.zyzj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.zyzj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
    </div>
  </el-form>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel.vue";
import { getRules, checkValidate } from "@/tdzz/verification/tdzzLx";
import { ref, reactive, toRefs, toRef } from "@vue/reactivity";
import { init, saveOrUpdate, deleteLx } from "@/tdzz/api/proj/proj-ksxf-lx";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import bus from "@/common/utils/bus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import { getDistrictList } from "@/common/api/jtap/district.js";
import store from "@/common/store";
//1. 定义数据

const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid,
  businessCode: params.businessCode,
  businessName: params.businessName,
  catalog: params.catalog,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  entity: {
    catalog: params.catalog,
    jbxx: { flowinstid: params.flowinstid },
    lx: { flowinstid: params.flowinstid },
  },
  xzqdm: store.state.user.regionCode,
  districtOptions: [], //行政区列表
  rules: getRules(),
});
const { businessName, catalog, disabled, entity, rules, districtOptions } =
  toRefs(data);
const lxform = ref(null);
//2.定义方法

/**
 * 获取行政区列表
 */
const F_getDistrictList = () => {
  getDistrictList(data.xzqdm).then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 初始化
 */
const F_init = () => {
  init(data.flowinstid).then((res) => {
    data.entity = res.data;
    if (data.entity.jbxx.jbxxXzqdm) {
      data.xzqdm = data.entity.jbxx.jbxxXzqdm.substring(0, 6);
    }
    F_getDistrictList();
  });
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await lxform.value.validate((valid) => {
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
  data.entity.jbxx.flowinstid = data.flowinstid;
  data.entity.jbxx.businessCode = data.businessCode;
  data.entity.lx.flowinstid = data.flowinstid;
  let flag = await F_beforeSave();
  if (flag) {
    await saveOrUpdate(data.entity)
      .then((res) => {
        data.entity = res.data;
      })
      .catch((res) => {
        flag = false;
      });
  }
  return flag;
};

/**
 * 删除
 */
const F_delete = (callback) => {
  deleteLx(data.flowinstid).then((res) => {
    ElMessage.success(res.msg);
    if (callback) {
      callback();
    }
  });
};

//3.入口
onMounted(() => {
  //1.获取详情
  F_init();
  //2.定义监听事件
  bus.on("ksxf_lxxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
  bus.on("ksxf_lxxx_delete", (callback) => {
    F_delete(callback);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("ksxf_lxxx_save");
  bus.off("ksxf_lxxx_delete");
});
</script>




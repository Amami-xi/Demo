<template>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}{{ catalog }}基本信息表</el-col>
  </el-row>
  <el-form
    class="tlw-form"
    :model="entity"
    :rules="rules"
    label-width="auto"
    ref="lxform"
    :inline-message="true"
  >
    <panel title="立项信息">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="项目名称"
            prop="jbxx.jbxxXmmc"
            :rules="rules.jbxxXmmc"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.jbxx.jbxxXmmc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="项目预算编号" prop="lx.lxbh" :rules="rules.lxbh">
            <el-input :disabled="disabled" v-model="entity.lx.lxbh"></el-input>
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
            <el-input :disabled="disabled" v-model="entity.lx.pfjg"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="下达预算计划文号" prop="lx.pfwh">
            <el-input :disabled="disabled" v-model="entity.lx.pfwh"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="下达预算计划文件名称" prop="lx.pfwj">
            <el-input :disabled="disabled" v-model="entity.lx.pfwj"></el-input>
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
            <el-input :disabled="disabled" v-model="entity.lx.jsqx"></el-input>
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
            <el-input :disabled="disabled" v-model="entity.lx.zxzj"></el-input>
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
    </panel>
    <panel title="子项目信息">
      <el-row>
        <el-col colspan="12" :offset="2">
          <el-button
            type="primary"
            @click="F_addRowZxxx"
            v-if="disabled == false"
            >添加</el-button
          >
        </el-col>
      </el-row>
      <template v-for="(item, index) in entity.zxxxList" :key="index">
        <el-row>
          <el-col :span="10" :offset="4">
            <el-form-item
              label="项目名称"
              :prop="`zxxxList.${index}.xmmc`"
              :rules="rules.xmmc"
            >
              <el-input :disabled="disabled" v-model="item.xmmc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-button
              type="primary"
              @click="F_zbinfo(item.zxmSec, item.xmmc)"
              :disabled="item.zxmSec == 'undefined' || item.zxmSec == null"
              v-if="!disabled"
              >上传坐标</el-button
            >
            <el-button
              type="primary"
              @click="F_zbinfo(item.zxmSec, item.xmmc)"
              v-if="disabled"
              >查看坐标</el-button
            >
            <el-button
              v-if="index > 0 && disabled == false"
              type="danger"
              @click="F_delRowZxxx(item.zxmSec, index)"
              >删除</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="中心点坐标">
              <el-input :disabled="disabled" v-model="item.zxdzb"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="项目类型">
              <el-input :disabled="disabled" v-model="item.xmlx"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="项目承担单位">
              <el-input :disabled="disabled" v-model="item.xmcddw"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="项目实施单位">
              <el-input :disabled="disabled" v-model="item.xmssdw"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider v-if="index < entity.zxxxList.length - 1" />
      </template>
    </panel>
    <ZxmzbDialog ref="zxmzbDialog" :pType="pType" :disabled="disabled">
    </ZxmzbDialog>
  </el-form>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel.vue";
import { getRules, checkValidate } from "@/tdzz/verification/tdzzLx";
import { ref, reactive, toRefs } from "@vue/reactivity";
import {
  init,
  saveOrUpdate,
  deleteLx,
  deleteZxm,
} from "@/tdzz/api/proj/proj-sslt-lx";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import bus from "@/common/utils/bus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import { getDistrictList } from "@/common/api/jtap/district.js";
import store from "@/common/store";
import ZxmzbDialog from "@/tdzz/pages/plot/zxmzbDialog";
//1. 定义数据

const route = useRoute();
const params = route.query;
const zxmzbDialog = ref(null);
const data = reactive({
  flowinstid: params.flowinstid,
  businessCode: params.businessCode,
  businessName: params.businessName,
  catalog: params.catalog,
  pType: "LX_X",
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  entity: {
    catalog: params.catalog,
    jbxx: { flowinstid: params.flowinstid },
    lx: { flowinstid: params.flowinstid },
    zxxxList: [{}],
  },
  xzqdm: store.state.user.regionCode,
  districtOptions: [], //行政区列表
  rules: getRules(),
});
const {
  businessName,
  catalog,
  disabled,
  entity,
  rules,
  districtOptions,
  pType,
  zxxxList,
} = toRefs(data);
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
    //如未保存，不赋值，防止覆盖zxxxList: [{}]
    if (res.data.jbxx.flowinstid) {
      data.entity = res.data;
    }
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
 * 坐标上传、查看
 * @param {子项目主键} zxmSec
 */
const F_zbinfo = (zxmSec, xmmc) => {
  zxmzbDialog.value.handleOpen(zxmSec, xmmc);
};

//增加行
const F_addRowZxxx = () => {
  data.entity.zxxxList.push({});
};

//删除行
const F_delRowZxxx = (zxmSec, index) => {
  data.entity.zxxxList.splice(index, 1);
  //调后端删除接口
  if (zxmSec != null && zxmSec != undefined) {
    deleteZxm(zxmSec).then((res) => {
      ElMessage.success(res.msg);
    });
  }
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
  bus.on("sslt_lxxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
  bus.on("sslt_lxxx_delete", (callback) => {
    F_delete(callback);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("sslt_lxxx_save");
  bus.off("sslt_lxxx_delete");
});
</script>




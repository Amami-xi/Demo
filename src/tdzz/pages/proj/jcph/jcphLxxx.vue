<!--立项阶段基本信息-->
<template>
  <el-tag class="tlw-tag">单位：公顷、万元</el-tag>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}基本信息表</el-col>
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
      <panel title="项目基本信息">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="立项申请文件号" prop="pc.pcNo">
              <el-input disabled v-model="entity.pc.pcNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="立项申请文件名称" prop="pc.pcName">
              <el-input disabled v-model="entity.pc.pcName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="项目编号"
              prop="jbxx.jbxxXmbh"
              :rules="rules.jbxxXmbh"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.jbxx.jbxxXmbh"
              ></el-input>
            </el-form-item>
          </el-col>
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
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="所属地区"
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
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="项目性质"
              prop="jbxx.jbxxXmxz"
              :rules="rules.jbxxXmxz"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.jbxx.jbxxXmxz"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item label="项目位置" prop="jbxx.jbxxXmwz">
              <el-input
                :disabled="disabled"
                v-model="entity.jbxx.jbxxXmwz"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="图幅号" prop="jbxx.jbxxTfh">
              <el-input
                :disabled="disabled"
                v-model="entity.jbxx.jbxxTfh"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="图斑号" prop="jbxx.jbxxTbh">
              <el-input
                :disabled="disabled"
                v-model="entity.jbxx.jbxxTbh"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="项目起始时间" prop="jbxx.jbxxXmqssj" :rules="rules.jbxxXmqssj">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.jbxx.jbxxXmqssj"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="项目结束时间" prop="jbxx.jbxxXmjssj">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.jbxx.jbxxXmjssj"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="项目年度"
              prop="jbxx.jbxxNd"
              :rules="rules.xmnd"
            >
              <el-date-picker
                type="year"
                :disabled="disabled"
                v-model="entity.jbxx.jbxxNd"
                placeholder="请选择日期"
                style="width: 100%"
                value-format="YYYY"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="比对图斑年份" prop="jbxx.jbxxTbnf">
              <el-date-picker
                type="year"
                :disabled="disabled"
                v-model="entity.jbxx.jbxxTbnf"
                placeholder="请选择日期"
                style="width: 100%"
                value-format="YYYY"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="耕地转出信息-转出前现状地类">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="水田" prop="lx.gdzcqSt" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzcqSt"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="水浇地" prop="lx.gdzcqSjd" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzcqSjd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="旱地" prop="lx.gdzcqHd" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzcqHd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="耕地转出信息-转出后现状地类">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="(园地)果园"
              prop="lx.gdzchGy"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchGy"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="(园地)茶园"
              prop="lx.gdzchCy"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchCy"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="(园地)橡胶园"
              prop="lx.gdzchXjy"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchXjy"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="(园地)其他园地"
              prop="lx.gdzchQtyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchQtyd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="(林地)乔木林地"
              prop="lx.gdzchQmld"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchQmld"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="(林地)竹林地"
              prop="lx.gdzchZld"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchZld"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="(林地)灌木林地"
              prop="lx.gdzchGmld"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchGmld"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="(林地)其他林地"
              prop="lx.gdzchQtld"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchQtld"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="灌丛沼泽"
              prop="lx.gdzchGczz"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchGczz"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="沼泽草地"
              prop="lx.gdzchZzcd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchZzcd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="水库水面"
              prop="lx.gdzchSksm"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchSksm"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="坑塘水面"
              prop="lx.gdzchKtsm"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchKtsm"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="沟渠" prop="lx.gdzchGq" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchGq"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="农村道路"
              prop="lx.gdzchNcdl"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchNcdl"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="设施农用地"
              prop="lx.gdzchSsnyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzchSsnyd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="耕地转入信息-转入前现状地类">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="耕地" prop="lx.gdzrqGd" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrqGd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="园地" prop="lx.gdzrqYd" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrqYd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="林地" prop="lx.gdzrqLd" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrqLd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="草地" prop="lx.gdzrqCd" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrqCd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="城镇村及工矿用地"
              prop="lx.gdzrqCzcjgkyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrqCzcjgkyd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="交通运输用地"
              prop="lx.gdzrqJtysd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrqJtysd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="水域及水利设施用地"
              prop="lx.gdzrqSyslssyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrqSyslssyd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="其他农用地"
              prop="lx.gdzrqQtnyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrqQtnyd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="设施农用地"
              prop="lx.gdzrqSsnyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrqSsnyd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="其他土地"
              prop="lx.gdzrqQttd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrqQttd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="耕地转入信息-转入后现状地类">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="耕地" prop="lx.gdzrhGd" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrhGd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="园地" prop="lx.gdzrhYd" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrhYd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="林地" prop="lx.gdzrhLd" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrhLd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="草地" prop="lx.gdzrhCd" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrhCd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="城镇村及工矿用地"
              prop="lx.gdzrhCzcjgkyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrhCzcjgkyd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="交通运输用地"
              prop="lx.gdzrhJtysd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrhJtysd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="水域及水利设施用地"
              prop="lx.gdzrhSyslssyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrhSyslssyd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="其他农用地"
              prop="lx.gdzrhQtnyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrhQtnyd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="设施农用地"
              prop="lx.gdzrhSsnyd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrhSsnyd"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="其他土地"
              prop="lx.gdzrhQttd"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzrhQttd"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="新增耕地面积-转入前现状地类">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="水田" prop="lx.xzgdStmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.xzgdStmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="水浇地" prop="lx.xzgdSjdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.xzgdSjdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="旱地" prop="lx.xzgdHdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.xzgdHdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="质量等别" prop="lx.gdzldb" :rules="rules.zldb">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.gdzldb"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item label="备注" prop="lx.bz">
              <el-input
                type="textarea"
                :disabled="disabled"
                v-model="entity.lx.bz"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <Spyj
        v-if="entity.jbxx.xmStatus == 1.4"
        :flowinstid="flowinstid"
        :taskId="taskId"
        :jbxxSec="jbxxSec"
        :catalog="catalog"
        :businessCode = "businessCode"
        :disabled="flowAction == 'VIEW' || entity.jbxx.xmStatus != 1.4"
      ></Spyj>
    </div>
  </el-form>
</template>
<script setup>
import panel from "@/common/components/card/cardPanel.vue";
import { getRules, checkValidate } from "@/tdzz/verification/jcphLx";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { init, saveOrUpdate, deleteLx } from "@/tdzz/api/proj/proj-jcph-lx";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import bus from "@/common/utils/bus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import { getDistrictList } from "@/common/api/jtap/district.js";
import store from "@/common/store";
import Spyj from "@/tdzz/pages/spyj/spyj";

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
  jbxxSec: params.jbxxSec,
  entity: {
    pc: {},
    jbxx: {},
    lx: {},
  },
  xzqdm: store.state.user.regionCode,
  districtOptions: [], //行政区列表
  rules: getRules(),
});
const {
  businessCode,
  businessName,
  catalog,
  flowAction,
  disabled,
  entity,
  rules,
  districtOptions,
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
  init(data.jbxxSec).then((res) => {
    data.entity = res.data;
    if (data.entity.jbxx.xmStatus == 0) {
      data.entity.jbxx.pcLx = data.pcLx;
      data.entity.jbxx.pcLxName = data.pcLxName;
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
        data.entity.jbxx = res.data.jbxx;
        data.entity.lx = res.data.lx;
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
  deleteLx(data.jbxxSec).then((res) => {
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
  bus.on("jcph_lxxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
  bus.on("jcph_lxxx_delete", (callback) => {
    F_delete(callback);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("jcph_lxxx_save");
  bus.off("jcph_lxxx_delete");
});
</script>



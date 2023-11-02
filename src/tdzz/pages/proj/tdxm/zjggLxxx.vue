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
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="项目性质" prop="jbxx.jbxxXmxz">
            <el-select
              v-model="entity.jbxx.jbxxXmxz"
              placeholder="请选择"
              :disabled="disabled"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) in xmxzOptions"
                :label="item.codeName"
                :value="item.codeValue"
                :key="index"
              ></el-option>
            </el-select>
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
          <el-form-item label="项目年度" prop="jbxx.jbxxNd" :rules="rules.xmnd">
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
              value-format="YYYY"
              :disabled="disabled"
              v-model="entity.jbxx.jbxxTbnf"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="建设规模信息">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="建设规模" prop="lx.jsgm" :rules="rules.jsgm">
            <el-input :disabled="disabled" v-model="entity.lx.jsgm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="复垦前现状地类">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="耕地" prop="lx.fkqGdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqGdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="园地" prop="lx.fkqYdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqYdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="林地" prop="lx.fkqLdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqLdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="草地" prop="lx.fkqCdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqCdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="城镇村及工矿用地"
              prop="lx.fkqCzcjgkydmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqCzcjgkydmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="交通运输用地"
              prop="lx.fkqJtysydmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqJtysydmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="水域及水利设施用地"
              prop="lx.fkqSyslssydmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqSyslssydmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="其他土地"
              prop="lx.fkqQttdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqQttdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="复垦后现状地类">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="耕地" prop="lx.fkhGdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhGdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="园地" prop="lx.fkhYdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhYdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="林地" prop="lx.fkhLdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhLdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="草地" prop="lx.fkhCdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhCdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="城镇村及工矿用地"
              prop="lx.fkhCzcjgkydmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhCzcjgkydmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="交通运输用地"
              prop="lx.fkhJtysydmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhJtysydmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="水域及水利设施用地"
              prop="lx.fkhSyslssydmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhSyslssydmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="其他土地"
              prop="lx.fkhQttdmj"
              :rules="rules.num"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhQttdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
    <!-- <panel title="复垦前现状地类">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="工业用地" prop="lx.fkqGyydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqGyydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="采矿用地" prop="lx.fkqCkydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqCkydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="铁路用地" prop="lx.fkqTlydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqTlydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="公路用地" prop="lx.fkqGlydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqGlydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="街巷用地" prop="lx.fkqJxydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqJxydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="机场用地" prop="lx.fkqJcydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqJcydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="港口码头用地"
            prop="lx.fkqGkmtydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqGkmtydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="管道运输用地"
            prop="lx.fkqGddysydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqGddysydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="水库水面" prop="lx.fkqSksmmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqSksmmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="水工建筑和用地"
            prop="lx.fkqSgjzydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqSgjzydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="其他" prop="lx.fkqQtmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkqQtmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="复垦后现状地类">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="（农用地）耕地"
            prop="lx.fkhNydGdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkhNydGdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="（农用地）林地"
            prop="lx.fkhNydLdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkhNydLdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="（农用地）园地"
            prop="lx.fkhNydYdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkhNydYdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="（农用地）草地"
            prop="lx.fkhNydCdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkhNydCdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="（农用地）其他"
            prop="lx.fkhNydQtmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkhNydQtmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="其他用地"
            prop="lx.fkhQtydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkhQtydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel> -->
    <panel title="新增农用地面积">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="新增农用地面积"
            prop="lx.fkhXznydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkhXznydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="新增耕地面积">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="新增耕地面积"
            prop="lx.fkhXzgdmj"
            :rules="rules.xzgdmj"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkhXzgdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="水田" prop="lx.fkhXzgdStmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-number-only="4"
              v-model="entity.lx.fkhXzgdStmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="水浇地"
            prop="lx.fkhXzgdSjdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkhXzgdSjdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="旱地" prop="lx.fkhXzgdHdmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.fkhXzgdHdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="质量等别" prop="lx.xzgdZldb" :rules="rules.zldb">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.xzgdZldb"
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
  </el-form>
</template>
<script setup>
import panel from "@/common/components/card/cardPanel";
import { getRules, checkValidate } from "@/tdzz/verification/zjggLx";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { onMounted, onBeforeUnmount, computed } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { init, saveOrUpdate, deleteLx } from "@/tdzz/api/proj/proj-zjgg-lx.js";
import { getDistrictList } from "@/common/api/jtap/district.js";
import { getDictList } from "@/common/api/jtap/dict.js";
import store from "@/common/store";
import Spyj from "@/tdzz/pages/spyj/spyj";

//1. 定义数据
const route = useRoute();
const params = route.query;
const lxform = ref(null);
const data = reactive({
  flowinstid: params.flowinstid,
  taskId: params.taskId,
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
  xmxzOptions: [],
  fkhXzgdmj: null,
  xzqdm: store.state.user.regionCode,
  districtOptions: [], //行政区列表
  rules: getRules(),
});
const {
  flowinstid,
  taskId,
  jbxxSec,
  businessCode,
  businessName,
  catalog,
  flowAction,
  disabled,
  entity,
  xmxzOptions,
  fkhXzgdmj,
  districtOptions,
  rules,
} = toRefs(data);

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
 * 获取项目性质
 */
const F_getXmxzList = () => {
  getDictList("项目性质").then((res) => {
    data.xmxzOptions = res.data;
  });
};

/**
 * 初始化
 */
const F_init = () => {
  F_getXmxzList();
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
  // data.entity.lx.fkhXzgdmj = data.fkhXzgdmj;
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
  //1.初始化
  F_init();
  //2.定义监听事件
  bus.on("zjgg_lxxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
  bus.on("zjgg_lxxx_delete", (callback) => {
    F_delete(callback);
  });
});

//计算属性
data.fkhXzgdmj = computed(() => {
  // let xzgdmj =
  //   Number.parseFloat(data.entity.lx.fkhXzgdStmj || 0) +
  //   Number.parseFloat(data.entity.lx.fkhXzgdSjdmj || 0) +
  //   Number.parseFloat(data.entity.lx.fkhXzgdHdmj || 0);
  // return xzgdmj.toFixed(4);
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("zjgg_lxxx_save");
  bus.off("zjgg_lxxx_delete");
});
</script>
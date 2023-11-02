<!--立项阶段基本信息-->
<template>
  <el-tag class="tlw-tag">单位：公顷、万元</el-tag>
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
    <panel title="立项阶段基本信息">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="项目年度"
            prop="jbxx.jbxxNd"
            :rules="rules.jbxxNd"
          >
            <el-date-picker
              type="year"
              value-format="YYYY"
              :disabled="disabled"
              v-model="entity.jbxx.jbxxNd"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="项目批次" prop="jbxx.jbxxPch">
            <el-input
              :disabled="disabled"
              v-model="entity.jbxx.jbxxPch"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
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
        <el-col :span="7" :offset="3">
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
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="项目所属区域"
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
        <el-col :span="7" :offset="3">
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
        <el-col :span="7" :offset="3">
          <el-form-item label="下达预算计划文号" prop="lx.pfwh">
            <el-input :disabled="disabled" v-model="entity.lx.pfwh"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="下达预算计划文件名称" prop="lx.wjmc">
            <el-input :disabled="disabled" v-model="entity.lx.wjmc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
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
        <el-col :span="7" :offset="3">
          <el-form-item label="建设期" prop="lx.jsq">
            <el-input :disabled="disabled" v-model="entity.lx.jsq"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="计划投资信息">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="项目总投资" prop="lx.tzZtz" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.lx.tzZtz"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="中央支持资金"
            prop="lx.tzZyzczj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzZyzczj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="地方总投资" prop="lx.tzDfzj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzDfzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="中央分配新增费用"
            prop="lx.tzZyfpXzf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzZyfpXzf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="地方留成新增费用"
            prop="lx.tzDflcxzf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzDflcxzf"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="耕地开垦费用"
            prop="lx.tzGdKkf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzGdKkf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="自行补充耕地资金"
            prop="lx.tzZxbcgdzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzZxbcgdzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="用于农业土地开发的土地出让收入"
            prop="lx.tzTdcrsr"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzTdcrsr"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="土地复垦费" prop="lx.tzTdfkf" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzTdfkf"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="土地复垦义务人投资"
            prop="lx.tzTdfkywrtz"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzTdfkywrtz"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="其他资金" prop="lx.tzQtzj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzQtzj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="计划新增耕地">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="新增耕地平均质量等别"
            prop="lx.xzgdPjzldb"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.xzgdPjzldb"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="新增产能指标"
            prop="lx.xzgdCnzb"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.xzgdCnzb"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="新增耕地中水田面积"
            prop="lx.xzgdStmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.xzgdStmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="计划可用于占补平衡水田面积"
            prop="lx.xzgdKyyzbphstmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.xzgdKyyzbphstmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="新增耕地中水浇地面积"
            prop="lx.xzgdSjdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.xzgdSjdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="计划可用于占补平衡水浇地面积"
            prop="lx.xzgdKyyzbphsjdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.xzgdKyyzbphsjdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="新增耕地中旱地面积"
            prop="lx.xzgdHdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.xzgdHdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="计划可用于占补平衡旱地面积"
            prop="lx.xzgdKyyzbphhdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.xzgdKyyzbphhdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="计划提质改造">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="提质改造面积"
            prop="lx.tzgzMj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzgzMj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="提质改造前平均质量等别"
            prop="lx.tzgzQpjdb"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzgzQpjdb"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="改造为水田面积"
            prop="lx.tzgzStmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzgzStmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="提质改造后平均质量等别"
            prop="lx.tzgzHpjdb"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzgzHpjdb"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="改造为水浇地面积"
            prop="lx.tzgzSjdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzgzSjdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="提升产能指标"
            prop="lx.tzgzCnzb"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.tzgzCnzb"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="计划建设信息">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="建设总规模"
            prop="lx.jsgmZmj"
            :rules="rules.jsgm"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.jsgmZmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="整理规模" prop="lx.jsgmZlgm" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.jsgmZlgm"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="基本农田整理规模"
            prop="lx.jsgmJbntzlgm"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.jsgmJbntzlgm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="复垦规模" prop="lx.jsgmFkgm" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.jsgmFkgm"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="开发规模" prop="lx.jsgmKfgm" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.jsgmKfgm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="高标准基本农田任务所属年度"
            prop="lx.jsgmGbzjbntrwnd"
            :rules="rules.intNum"
          >
            <el-date-picker
              type="year"
              value-format="YYYY"
              :disabled="disabled"
              v-model="entity.lx.jsgmGbzjbntrwnd"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="计划建成高标准基本农田规模"
            prop="lx.jsgmJhgbzjbntgm"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.jsgmJhgbzjbntgm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="高标准基本农田任务建设条件"
            prop="lx.jsgmGbzjbntrwjstj"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.jsgmGbzjbntrwjstj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="新增耕地面积"
            prop="lx.jsgmXzgd"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.jsgmXzgd"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="计划可用于占补平衡面积"
            prop="lx.jsgmKyyzbph"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.jsgmKyyzbph"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="灾毁耕地面积"
            prop="lx.jsgmZhgd"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.jsgmZhgd"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="计划工程量信息">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="土地平整面积"
            prop="lx.gclTdpz"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.gclTdpz"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="土方工程量"
            prop="lx.gclTfgcl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.gclTfgcl"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="农田防护林工程量"
            prop="lx.gclNtfh"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.gclNtfh"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="泵站" prop="lx.gclBz" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.lx.gclBz"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="蓄水池" prop="lx.gclXsc" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.gclXsc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="农用井" prop="lx.gclNyj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.gclNyj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="农用桥、涵" prop="lx.gclNyq" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.lx.gclNyq"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="灌、排（渠）、管道"
            prop="lx.gclGd"
            :rules="rules.num"
          >
            <el-input :disabled="disabled" v-model="entity.lx.gclGd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="高压输配电线路"
            prop="lx.gclGyspdxl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.gclGyspdxl"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="低压输电线路"
            prop="lx.gclDyspdxl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.gclDyspdxl"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="田间道路工程量"
            prop="lx.gclTjd"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.lx.gclTjd"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
  </el-form>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel.vue";
import { getRules, checkValidate } from "@/tdzz/verification/tdzzLx";
import { ref, reactive, toRefs, toRef } from "@vue/reactivity";
import { init, saveOrUpdate } from "@/tdzz/api/proj/proj-qyzz-lx";
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
    await saveOrUpdate(data.entity.lx)
      .then((res) => {
        data.entity = res.data;
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
  bus.on("qyzz_lxxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("qyzz_lxxx_save");
});
</script>




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
    ref="sbform"
    label-width="auto"
    :inline-message="true"
  >
    <panel title="申报基本信息">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="项目年度" prop="jbxx.jbxxNd" :rules="rules.xmnd">
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
          <el-form-item
            label="项目批次"
            prop="jbxx.jbxxXmbh"
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
          <el-form-item label="项目类型" prop="jbxx.jbxxXmtype">
            <el-input
              :disabled="disabled"
              v-model="entity.jbxx.jbxxXmtype"
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
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="申报单位" prop="sb.sbdw">
            <el-input :disabled="disabled" v-model="entity.sb.sbdw"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="承担单位" prop="sb.cddw">
            <el-input :disabled="disabled" v-model="entity.sb.cddw"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17" :offset="3">
          <el-form-item label="建设地点" prop="sb.jsdd" :rules="rules.jsdd">
            <el-input
              type="textarea"
              :disabled="disabled"
              v-model="entity.sb.jsdd"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17" :offset="3">
          <el-form-item label="建设范围" prop="sb.jsfw">
            <el-input
              type="textarea"
              :disabled="disabled"
              v-model="entity.sb.jsfw"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17" :offset="3">
          <el-form-item label="建设目标" prop="sb.jsmb">
            <el-input
              type="textarea"
              :disabled="disabled"
              v-model="entity.sb.jsmb"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="建设规模" prop="sb.jsgm" :rules="rules.jsgm">
            <el-input :disabled="disabled" v-model="entity.sb.jsgm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="项目区面积" prop="sb.xmqmj" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.sb.xmqmj"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="涉及整治耕地面积"
            prop="sb.sjzzgdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.sjzzgdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="建设用地规模指标"
            prop="sb.jsydgmzb"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.jsydgmzb"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item
            label="实施期限"
            prop="sb.ssqxStart"
            :rules="rules.ssqxStart"
          >
            <el-date-picker
              type="date"
              :disabled="disabled"
              v-model="entity.sb.ssqxStart"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item
            label="至"
            prop="sb.ssqxEnd"
            label-width="40px"
            :rules="rules.ssqxEnd"
          >
            <el-date-picker
              type="date"
              :disabled="disabled"
              v-model="entity.sb.ssqxEnd"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>

    <panel title="新增耕地">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="水田" prop="sb.xzgdStmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.xzgdStmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="水浇地" prop="sb.xzgdSjdmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.xzgdSjdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="旱地" prop="sb.xzgdHdmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.xzgdHdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="质量等别" prop="sb.xzgdZldb" :rules="rules.zldb">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.xzgdZldb"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="占补平衡项目">
      <el-row :gutter="20">
        <el-col :span="13" :offset="3">
          <el-form-item
            label="占补平衡项目编号"
            prop="sb.zbphXmbh"
            :rules="rules.zbphXmbh"
          >
            <el-input disabled v-model="entity.sb.zbphXmbh"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-button
            type="primary"
            @click="openDialog('10130101', entity.sb.zbphXmbh)"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </panel>
    <panel title="城乡建设用地增减挂">
      <el-row :gutter="20">
        <el-col :span="13" :offset="3">
          <el-form-item
            label="增减挂项目编号"
            prop="sb.zjggXmbh"
            :rules="rules.zjggXmbh"
          >
            <el-input disabled v-model="entity.sb.zjggXmbh"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-button
            type="primary"
            @click="openDialog('10130201', entity.sb.zjggXmbh)"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </panel>
    <panel title="工矿废弃地复垦">
      <el-row :gutter="20">
        <el-col :span="13" :offset="3">
          <el-form-item
            label="工矿废弃地复垦项目编号"
            prop="sb.gkfqdXmbh"
            :rules="rules.gkfqdXmbh"
          >
            <el-input disabled v-model="entity.sb.gkfqdXmbh"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-button
            type="primary"
            @click="openDialog('10130301', entity.sb.gkfqdXmbh)"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </panel>
    <panel title="生态保护修复">
      <el-row :gutter="20">
        <el-col :span="13" :offset="3">
          <el-form-item
            label="生态保护修复项目编号"
            prop="sb.stbhXmbh"
            :rules="rules.stbhXmbh"
          >
            <el-input disabled v-model="entity.sb.stbhXmbh"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-button
            type="primary"
            @click="openDialog('10130601', entity.sb.stbhXmbh)"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </panel>
    <panel title="进出平衡项目">
      <el-row :gutter="20">
        <el-col :span="13" :offset="3">
          <el-form-item
            label="进行平衡项目编号"
            prop="sb.jcphXmbh"
            :rules="rules.jcphXmbh"
          >
            <el-input disabled v-model="entity.sb.jcphXmbh"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-button
            type="primary"
            @click="openDialog('10130701', entity.sb.jcphXmbh)"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </panel>
    <panel title="永久基本农田调整">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="调出面积"
            prop="sb.yjjbntTcmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.yjjbntTcmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="调入面积"
            prop="sb.yjjbntTrmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.yjjbntTrmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="新增面积比(%)"
            prop="sb.yjjbntTcbl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.yjjbntTcbl"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="新增面积比例(%)"
            prop="sb.yjjbntTrbl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.yjjbntTrbl"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="投资构成">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="总投资" prop="sb.tzZtz" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.sb.tzZtz"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="农用地整治" prop="sb.tzNydzz" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.tzNydzz"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="建设用地整治"
            prop="sb.tzJsydzz"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.tzJsydzz"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="生态保护修复"
            prop="sb.tzStbhxf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.tzStbhxf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="公共空间治理"
            prop="sb.tzGgkjzl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.tzGgkjzl"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="其他" prop="sb.tzQt" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.sb.tzQt"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="资金来源构成">
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="总资金" prop="sb.zjlyZzj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyZzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="补充耕地指标交易费"
            prop="sb.zjlyBcgdzbjyf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyBcgdzbjyf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="挂钩节余指标有偿调剂收益"
            prop="sb.zjlyGgjyzbyctjsy"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyGgjyzbyctjsy"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="新增费" prop="sb.zjlyXzf" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyXzf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="用于农村土地开发的土地出让"
            prop="sb.zjlyTdcr"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyTdcr"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="耕地开垦费"
            prop="sb.zjlyGdkkf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyGdkkf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="生态保护修复资金"
            prop="sb.zjlyStbhxfzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyStbhxfzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item
            label="整合其他部门资金"
            prop="sb.zjlyZhqtbmzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyZhqtbmzj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="地方自筹" prop="sb.zjlyDfzc" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyDfzc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="银行贷款" prop="sb.zjlyYhdk" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyYhdk"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="社会资金" prop="sb.zjlyShzj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyShzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="3">
          <el-form-item label="其他" prop="sb.zjlyQt" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.sb.zjlyQt"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="3">
          <el-form-item label="备注" prop="sb.bz">
            <el-input :disabled="disabled" v-model="entity.sb.bz"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
  </el-form>
  <XmDialog ref="xmDialog" @show="show"></XmDialog>
</template>
<script setup>
import panel from "@/common/components/card/cardPanel.vue";
import { getRules, checkValidate } from "@/tdzz/verification/tdzzSb";
import { reactive, ref, toRefs } from "vue";
import { init, saveOrUpdate, deleteSb } from "@/tdzz/api/proj/proj-qyzz-sb";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import bus from "@/common/utils/bus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import { getDistrictList } from "@/common/api/jtap/district.js";
import store from "@/common/store";
import XmDialog from "./xmDialog.vue";
//1. 定义数据

const route = useRoute();
const params = route.query;
const xmDialog = ref(null);
const data = reactive({
  flowinstid: params.flowinstid,
  businessCode: params.businessCode,
  businessName: params.businessName,
  catalog: params.catalog,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  entity: {
    catalog: params.catalog,
    jbxx: {},
    sb: {},
  },
  xzqdm: store.state.user.regionCode,
  districtOptions: [], //行政区列表
  rules: getRules(),
});
const { businessName, catalog, disabled, entity, rules, districtOptions } =
  toRefs(data);
const sbform = ref(null);
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
  sbform.value.validate((valid) => {
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
  data.entity.sb.flowinstid = data.flowinstid;
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
  deleteSb(data.flowinstid).then((res) => {
    ElMessage.success(res.msg);
    if (callback) {
      callback();
    }
  });
};

/**
 * 打开子项目弹窗
 */
const openDialog = (businessCode, xmbh) => {
  xmDialog.value.handleOpen(businessCode, xmbh);
};

/**
 * 项目编号回显
 */
const show = (val) => {
  switch (val.businessCode) {
    case "10130101":
      data.entity.sb.zbphXmbh = val.selectRow;
      break;
    case "10130201":
      data.entity.sb.zjggXmbh = val.selectRow;
      break;
    case "10130301":
      data.entity.sb.gkfqdXmbh = val.selectRow;
      break;
    case "10130601":
      data.entity.sb.stbhXmbh = val.selectRow;
      break;
    case "10130701":
      data.entity.sb.jcphXmbh = val.selectRow;
      break;
  }
};

//3.入口
onMounted(() => {
  //1.获取详情
  F_init();
  //2.定义监听事件
  bus.on("qyzz_sbxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
  bus.on("qyzz_sbxx_delete", (callback) => {
    F_delete(callback);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("qyzz_sbxx_save");
  bus.off("qyzz_sbxx_delete");
});
</script>

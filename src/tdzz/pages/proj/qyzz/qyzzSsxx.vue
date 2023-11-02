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
        <el-col :span="6" :offset="4">
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
        <el-col :span="6" :offset="4">
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
          <el-form-item
            label="项目预算编号"
            prop="ss.xmysbh"
            :rules="rules.xmysbh"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.xmysbh"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
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
        <el-col :span="6" :offset="4">
          <el-form-item label="前期工作费" prop="ss.qzgzf" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.qzgzf"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="拆迁补偿费" prop="ss.cqbcf" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.cqbcf"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="设备购置费" prop="ss.sbgzf" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.sbgzf"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="工程监理费" prop="ss.gcjlf" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gcjlf"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="工程施工费" prop="ss.gcsgf" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gcsgf"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="业主管理费" prop="ss.yzglf" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.yzglf"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="不可预见费" prop="ss.bkyjf" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.bkyjf"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="竣工验收费" prop="ss.jgysf" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.jgysf"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-tag>所有当前到位资金和:</el-tag>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-tag>所有当前支出资金和:</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
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
        <el-col :span="6" :offset="4">
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
        <el-col :span="6" :offset="4">
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
        <el-col :span="6" :offset="4">
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
    <panel title="工程施工费用">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="土地平整工程"
            prop="ss.fyTdpz"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.fyTdpz"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="渠道工程" prop="ss.fyQd" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.fyQd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="沟工程" prop="ss.fyG" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.fyG"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="田间道工程" prop="ss.fyTjd" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.fyTjd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="生产路工程" prop="ss.fyScl" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.fyScl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="桥工程" prop="ss.fyQ" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.fyQ"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="涵工程" prop="ss.fyH" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.fyH"
              :rules="rules.num"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="渡槽工程" prop="ss.fyDc">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.fyDc"
              :rules="rules.num"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="泵站工程" prop="ss.fyPz">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.fyPz"
              :rules="rules.num"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="闸工程" prop="ss.fyZ">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.fyZ"
              :rules="rules.num"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="绿化工程" prop="ss.fyLh">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.fyLh"
              :rules="rules.num"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="施工工程量">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="土地平整工程"
            prop="ss.gclTdpz"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclTdpz"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="渠道工程" prop="ss.gclQd" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gclQd"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="沟工程" prop="ss.gclG" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gclG"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="田间道工程" prop="ss.gclTjd" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclTjd"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="生产路工程" prop="ss.gclScl" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclScl"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="桥工程" prop="ss.gclQ" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gclQ"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="涵工程" prop="ss.gclH" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gclH"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="渡槽工程" prop="ss.gclDc" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gclDc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="泵站工程" prop="ss.gclPz" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gclPz"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="闸工程" prop="ss.gclZ" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gclZ"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="绿化工程" prop="ss.gclLh" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gclLh"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="规划设计单位">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="单位名称" prop="ss.ghsjDwmc">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.ghsjDwmc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
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
        <el-col :span="6" :offset="4">
          <el-form-item label="单位名称" prop="ss.zbdlDwmc">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.zbdwDwmc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="单位代码" prop="ss.zbdlDwdm">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.zbdwDwdm"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="施工单位">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="单位名称" prop="ss.sgdwDwmc">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.sgdwDwmc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="单位代码" prop="ss.sgdwDwdm">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.sgdwDwdm"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="监理单位">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="单位名称" prop="ss.jldwDwmc">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.jldwDwmc"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="单位代码" prop="ss.jldwDwdm">
            <el-input
              :disabled="disabled"
              v-model="entity.ss.jldwDwdm"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
  </el-form>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel.vue";
import { getRules, checkValidate } from "@/tdzz/verification/tdzzSs";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { init, saveOrUpdate } from "@/tdzz/api/proj/proj-qyzz-ss";
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
  ssform.value.validate((valid) => {
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
  bus.on("qyzz_ssxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("qyzz_ssxx_save");
});
</script>
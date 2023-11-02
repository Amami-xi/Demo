<!--实施阶段基本信息-->
<template>
  <el-tag class="tlw-tag">单位：公顷、万元</el-tag>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}基本信息表</el-col>
  </el-row>
  <el-form
    class="tlw-form"
    :model="entity"
    :rules="rules"
    ref="ssform"
    label-width="auto"
    :inline-message="true"
  >
    <panel title="项目基本信息">
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="实施申请文件号" prop="pc.pcNo">
            <el-input disabled v-model="entity.pc.pcNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="实施申请文件名称" prop="pc.pcName">
            <el-input disabled v-model="entity.pc.pcName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
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
        <el-col :span="10" :offset="1">
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
        <el-col :span="10" :offset="1">
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
        <el-col :span="10" :offset="1">
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
        <el-col :span="10" :offset="1">
          <el-form-item label="拟验收时间" prop="ss.yssj">
            <el-date-picker
              type="date"
              :disabled="disabled"
              v-model="entity.ss.yssj"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
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
        <el-col :span="10" :offset="1">
          <el-form-item label="批复工期" prop="ss.pfgq">
            <el-input :disabled="disabled" v-model="entity.ss.pfgq"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="实施监管项目总体进度(%)" prop="ss.jgJd">
            <el-input :disabled="disabled" v-model="entity.ss.jgJd"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="批复预算(万元)"
            prop="ss.pfys"
            :rules="rules.num"
          >
            <el-input :disabled="disabled" v-model="entity.ss.pfys"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="完成工程投资额估算(万元)"
            prop="ss.wcgctz"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.wcgctz"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="专项资金(万元)"
            prop="ss.tzZxzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZxzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="省级补助资金(万元)"
            prop="ss.tzSjbzzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzSjbzzj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="高标准基本农田建设条件"
            prop="ss.gbzjstj"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gbzjstj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="高标准基本农田任务所属年度"
            prop="ss.gmGbznd"
            :rules="rules.intNum"
          >
            <el-date-picker
              type="year"
              value-format="YYYY"
              :disabled="disabled"
              v-model="entity.ss.gmGbznd"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="计划建成高标准基本农田规模"
            prop="ss.gmGbl"
            :rules="rules.num"
          >
            <el-input :disabled="disabled" v-model="entity.ss.gmGbl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="已建成高标准基本农田规模"
            prop="ss.gmYgbl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gmYgbl"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="1">
          <el-form-item label="接收意见" prop="ss.jsyj">
            <el-input
              type="textarea"
              :disabled="disabled"
              v-model="entity.ss.jsyj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="累计到位资金">
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位资金"
            prop="ss.tzDwzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzDwzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位中央支持资金"
            prop="ss.tzZyzczj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZyzczj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位地方资金"
            prop="ss.tzDwdfzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzDwdfzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位中央分配的新增费资金"
            prop="ss.tzDfZyfpxzf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzDfZyfpxzf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位地方留成新增费资金"
            prop="ss.tzDfDflcxzf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzDfDflcxzf"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位耕地开垦费"
            prop="ss.tzDfGdkkf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzDfGdkkf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位自行补充耕地资金"
            prop="ss.tzDfZxbcgdzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzDfZxbcgdzj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位用于农业土地开发的土地出让收入"
            prop="ss.tzDfCrj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzDfCrj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位土地复垦费"
            prop="ss.tzDfFkf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzDfFkf"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位土地复垦义务人投资"
            prop="ss.tzDfFkywrtj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzDfFkywrtj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计到位其他资金"
            prop="ss.tzDfQtzj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzDfQtzj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="累计支出资金">
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计支出金额"
            prop="ss.tzZcje"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZcje"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计支出工程施工费"
            prop="ss.tzZcGcsgf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZcGcsgf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计支出设备购置费"
            prop="ss.tzZcSbgzf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZcSbgzf"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="前期工作费"
            prop="ss.tzZcQtQqgzf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZcQtQqgzf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="工程监理费"
            prop="ss.tzZcQtGcjlf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZcQtGcjlf"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="拆迁补偿费"
            prop="ss.tzZcQtCqbcf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZcQtCqbcf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="竣工验收费"
            prop="ss.tzZcQtJgysf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZcQtJgysf"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="业主管理费"
            prop="ss.tzZcQtYzglf"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZcQtYzglf"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计支出其他费用"
            prop="ss.tzZcQtfy"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.tzZcQtfy"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="施工工程量（公顷）">
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成建设规模"
            prop="ss.rwWcjsgm"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.rwWcjsgm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成耕地面积"
            prop="ss.rwWcGd"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.rwWcGd"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成基本农田整治面积"
            prop="ss.rwWcJbntzz"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.rwWcJbntzz"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成新增耕地面积"
            prop="ss.rwWcgdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.rwWcgdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成高标准基本农田面积"
            prop="ss.rwWcgbzmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.rwWcgbzmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计土地平整面积"
            prop="ss.gclTdpzmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclTdpzmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计土方工程量"
            prop="ss.gclTfgcl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclTfgcl"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计灌、排（渠）、管道（中央支持）"
            prop="ss.gclGd"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclGd"
              :rules="rules.num"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成骨干渠道"
            prop="ss.gclGdGgqd"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclGdGgqd"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成骨干管道"
            prop="ss.gclGdGggd"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclGdGggd"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计田间道路工程量"
            prop="ss.gclTjdlgcl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclTjdlgcl"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成田间道"
            prop="ss.gclTjdlgclTjd"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclTjdlgclTjd"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成生产路"
            prop="ss.gclTjdlgclScl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclTjdlgclScl"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计农田防护林工程量"
            prop="ss.gclNtfhlgcl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclNtfhlgcl"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="累计完成泵站" prop="ss.gclBz" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ss.gclBz"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成蓄水池"
            prop="ss.gclXsc"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclXsc"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成农用井"
            prop="ss.gclNyj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclNyj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成农用桥、涵"
            prop="ss.gclNyq"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclNyq"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成高压输配电线路"
            prop="ss.gclGyspdxl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclGyspdxl"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成低压输电线路"
            prop="ss.gclDyspdxl"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclDyspdxl"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成废弃居民点复垦面积"
            prop="ss.gclJmfqfk"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclJmfqfk"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item
            label="累计完成工矿废弃地复垦面积"
            prop="ss.gclGkfqfk"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ss.gclGkfqfk"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
  </el-form>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { getRules, checkValidate } from "@/tdzz/verification/gkfqdSs";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { init, saveOrUpdate } from "@/tdzz/api/proj/proj-gkfqd-ss";
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
  pcSs: params.pcNo,
  pcSsName: params.pcName,
  jbxxSec: params.jbxxSec,
  entity: {
    pc: {},
    jbxx: {},
    ss: {},
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
  init(data.jbxxSec).then((res) => {
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
  data.entity.ss.flowinstid = data.jbxxSec;
  data.entity.ss.flowinstidSs = data.flowinstid;
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
  bus.on("gkfqd_ssxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("gkfqd_ssxx_save");
});
</script>
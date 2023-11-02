<!--验收阶段基本信息-->
<template>
  <el-tag class="tlw-tag">单位：公顷、万元</el-tag>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}基本信息表</el-col>
  </el-row>
  <el-form
    class="tlw-form"
    :model="entity"
    :rules="rules"
    ref="ysform"
    label-width="auto"
    :inline-message="true"
  >
    <panel title="项目基本信息">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="验收申请文件号" prop="pc.pcNo">
            <el-input disabled v-model="entity.pc.pcNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="验收申请文件名称" prop="pc.pcName">
            <el-input disabled v-model="entity.pc.pcName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="项目编号" prop="jbxx.jbxxXmbh">
            <el-input disabled v-model="entity.jbxx.jbxxXmbh"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="项目名称" prop="jbxx.jbxxXmmc">
            <el-input disabled v-model="entity.jbxx.jbxxXmmc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="所属地区" prop="jbxx.jbxxXzqdm">
            <el-select
              v-model="entity.jbxx.jbxxXzqdm"
              placeholder="请选择"
              disabled
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
              disabled
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
            <el-input disabled v-model="entity.jbxx.jbxxXmwz"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="图幅号" prop="jbxx.jbxxTfh">
            <el-input disabled v-model="entity.jbxx.jbxxTfh"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="图斑号" prop="jbxx.jbxxTbh">
            <el-input disabled v-model="entity.jbxx.jbxxTbh"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="项目起始时间" prop="jbxx.jbxxXmqssj">
            <el-date-picker
              type="date"
              disabled
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
              disabled
              v-model="entity.jbxx.jbxxXmjssj"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="项目年度" prop="jbxx.jbxxNd">
            <el-date-picker
              type="year"
              value-format="YYYY"
              disabled
              v-model="entity.jbxx.jbxxNd"
              placeholder="请选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="比对图斑年份" prop="jbxx.jbxxTbnf">
            <el-date-picker
              type="year"
              value-format="YYYY"
              disabled
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
          <el-form-item label="建设规模" prop="ys.jsgm" :rules="rules.jsgm">
            <el-input :disabled="disabled" v-model="entity.ys.jsgm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="复垦前现状地类">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="工业用地" prop="ys.fkqGyydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqGyydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="采矿用地" prop="ys.fkqCkydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqCkydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="铁路用地" prop="ys.fkqTlydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqTlydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="公路用地" prop="ys.fkqGlydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqGlydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="街巷用地" prop="ys.fkqJxydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqJxydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="机场用地" prop="ys.fkqJxydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqJcydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="港口码头用地"
            prop="ys.fkqGkmtydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqGkmtydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="管道运输用地"
            prop="ys.fkqGddysydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqGddysydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="水库水面" prop="ys.fkqSksmmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqSksmmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="水工建筑和用地"
            prop="ys.fkqSgjzydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqSgjzydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="其他" prop="ys.fkqQtmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqQtmj"
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
            prop="ys.fkhNydGdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkhNydGdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="（农用地）林地"
            prop="ys.fkhNydLdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkhNydLdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="（农用地）园地"
            prop="ys.fkhNydYdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkhNydYdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="（农用地）草地"
            prop="ys.fkhNydCdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkhNydCdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="（农用地）其他"
            prop="ys.fkhNydQtmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkhNydQtmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="其他用地" prop="ys.fkhQtydmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkhQtydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="规划新增">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="农用地面积"
            prop="ys.ghxzNydmj"
            :rules="rules.ghxzNydmj"
          >
            <el-input :disabled="disabled" v-model="entity.ys.ghxzNydmj">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="耕地面积"
            prop="ys.ghxzGdmj"
            :rules="rules.ghxzGdmj"
          >
            <el-input :disabled="disabled" v-model="entity.ys.ghxzGdmj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="自验扣减">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="农用地面积"
            prop="ys.zykjNydmj"
            :rules="rules.zykjNydmj"
          >
            <el-input :disabled="disabled" v-model="entity.ys.zykjNydmj">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="耕地面积"
            prop="ys.zykjGdmj"
            :rules="rules.zykjGdmj"
          >
            <el-input :disabled="disabled" v-model="entity.ys.zykjGdmj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item label="县级自验扣减情况" prop="ys.zykjqk">
            <el-input
              type="textarea"
              :disabled="disabled"
              v-model="entity.ys.zykjqk"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="上报验收">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="农用地面积"
            prop="ys.sbysNydmj"
            :rules="rules.sbysNydmj"
          >
            <el-input :disabled="disabled" v-model="entity.ys.sbysNydmj">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="耕地面积"
            prop="ys.sbysGdmj"
            :rules="rules.sbysGdmj"
          >
            <el-input :disabled="disabled" v-model="entity.ys.sbysGdmj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="水田" prop="ys.sbysXzgdStmj" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ys.sbysXzgdStmj">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="水浇地"
            prop="ys.sbysXzgdSjdmj"
            :rules="rules.num"
          >
            <el-input :disabled="disabled" v-model="entity.ys.sbysXzgdSjdmj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="旱地" prop="ys.sbysXzgdHdmj" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ys.sbysXzgdHdmj">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="质量等别"
            prop="ys.qrXzgdZldb"
            :rules="rules.zldb"
          >
            <el-input :disabled="disabled" v-model="entity.ys.qrXzgdZldb">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="市级验收扣减">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="实地扣减新增农用地面积"
            prop="ys.sdkjxznydmj"
            :rules="sjyskjDisabled ? null : rules.sdkjxznydmj"
          >
            <el-input
              :disabled="sjyskjDisabled"
              v-model="entity.ys.sdkjxznydmj"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="实地扣减新增耕地面积"
            prop="ys.sdkjxzgdmj"
            :rules="sjyskjDisabled ? null : rules.sdkjxzgdmj"
          >
            <el-input :disabled="sjyskjDisabled" v-model="entity.ys.sdkjxzgdmj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item label="实地扣减情况" prop="ys.sdkjqk">
            <el-input
              type="textarea"
              :disabled="sjyskjDisabled"
              v-model="entity.ys.sdkjqk"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="省厅核减">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="立项农用地核减面积"
            prop="ys.lxNydmjhj"
            :rules="sjkjDisabled ? null : rules.lxNydmjhj"
          >
            <el-input :disabled="sjkjDisabled" v-model="entity.ys.lxNydmjhj">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="验收农用地核减面积"
            prop="ys.ysNydmjhj"
            :rules="sjkjDisabled ? null : rules.ysNydmjhj"
          >
            <el-input :disabled="sjkjDisabled" v-model="entity.ys.ysNydmjhj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="立项耕地核减面积"
            prop="ys.lxGdmjhj"
            :rules="sjkjDisabled ? null : rules.lxGdmjhj"
          >
            <el-input :disabled="sjkjDisabled" v-model="entity.ys.lxGdmjhj">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="验收耕地核减面积"
            prop="ys.ysGdmjhj"
            :rules="sjkjDisabled ? null : rules.ysGdmjhj"
          >
            <el-input :disabled="sjkjDisabled" v-model="entity.ys.ysGdmjhj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="确认新增">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="农用地面积"
            prop="ys.qrXznydmj"
            :rules="qrxzgdDisabled ? null : rules.qrXznydmj"
          >
            <el-input :disabled="qrxzgdDisabled" v-model="entity.ys.qrXznydmj">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="耕地面积"
            prop="ys.qrXzgdmj"
            :rules="qrxzgdDisabled ? null : rules.qrXzgdmj"
          >
            <el-input :disabled="qrxzgdDisabled" v-model="entity.ys.qrXzgdmj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="水田"
            prop="ys.qrXzgdStmj"
            :rules="qrxzgdDisabled ? null : rules.qrXzgdStmj"
          >
            <el-input :disabled="qrxzgdDisabled" v-model="entity.ys.qrXzgdStmj">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="水浇地"
            prop="ys.qrXzgdSjdmj"
            :rules="qrxzgdDisabled ? null : rules.qrXzgdSjdmj"
          >
            <el-input
              :disabled="qrxzgdDisabled"
              v-model="entity.ys.qrXzgdSjdmj"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="旱地"
            prop="ys.qrXzgdHdmj"
            :rules="qrxzgdDisabled ? null : rules.qrXzgdHdmj"
          >
            <el-input :disabled="qrxzgdDisabled" v-model="entity.ys.qrXzgdHdmj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="占准确上报百分比(%)">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="农用地" prop="ys.zqsbNyd" :rules="rules.num">
            <el-input disabled v-model="entity.ys.zqsbNyd"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="耕地" prop="ys.zqsbGd" :rules="rules.num">
            <el-input disabled v-model="entity.ys.zqsbGd"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="占入库百分比(%)">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="新增农用地" prop="ys.rkXznyd" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ys.rkXznyd"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="新增耕地" prop="ys.rkXzgd" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ys.rkXzgd"> </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <Spyj
      v-if="entity.jbxx.xmStatus == 3.4"
      :flowinstid="flowinstid"
      :taskId="taskId"
      :jbxxSec="jbxxSec"
      :catalog="catalog"
      :disabled="flowAction == 'VIEW' || entity.jbxx.xmStatus != 3.4"
    ></Spyj>
  </el-form>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { getRules, checkValidate } from "@/tdzz/verification/gkfqdYs";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { onMounted, onBeforeUnmount, computed } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { init, saveOrUpdate } from "@/tdzz/api/proj/proj-gkfqd-ys.js";
import { getDistrictList } from "@/common/api/jtap/district.js";
import { getDictList } from "@/common/api/jtap/dict.js";
import store from "@/common/store";
import Spyj from "@/tdzz/pages/spyj/spyj";
import { F_sjyskj, F_qrxzgd, F_stkj } from "@/tdzz/api/common/proj_ys.js";

//1. 定义数据
const route = useRoute();
const params = route.query;
const ysform = ref(null);
const data = reactive({
  flowinstid: params.flowinstid,
  taskId: params.taskId,
  businessName: params.businessName,
  catalog: params.catalog,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  sjyskjDisabled: params.disabled,
  sjkjDisabled: params.disabled,
  qrxzgdDisabled: params.disabled,
  jbxxSec: params.jbxxSec,
  entity: {
    pc: {},
    jbxx: {},
    ys: {},
  },
  businessName: params.businessName,
  fkhXzgdmj: null,
  xzqdm: store.state.user.regionCode,
  districtOptions: [], //行政区列表
  xmxzOptions: [],
  rules: getRules(),
});
const {
  flowinstid,
  taskId,
  jbxxSec,
  businessName,
  catalog,
  flowAction,
  disabled,
  sjyskjDisabled,
  sjkjDisabled,
  qrxzgdDisabled,
  entity,
  fkhXzgdmj,
  districtOptions,
  xmxzOptions,
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
    //获取表单
    data.entity = res.data;

    //获取行政区
    if (data.entity.jbxx.jbxxXzqdm) {
      data.xzqdm = data.entity.jbxx.jbxxXzqdm.substring(0, 6);
    }
    F_getDistrictList();

    //表单必填项设置
    let xmStatus = data.entity.jbxx.xmStatus;
    data.sjyskjDisabled = F_sjyskj(data.flowAction, xmStatus);
    data.qrxzgdDisabled = F_qrxzgd(data.flowAction, xmStatus);
    data.sjkjDisabled = F_stkj(data.flowAction, xmStatus);
  });
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await ysform.value.validate((valid) => {
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
  data.entity.ys.flowinstid = data.jbxxSec;
  data.entity.ys.flowinstidYs = data.flowinstid;
  let flag = await F_beforeSave();
  if (flag) {
    await saveOrUpdate(data.entity.ys)
      .then((res) => {
        data.entity.ys = res.data;
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
  bus.on("gkfqd_ysxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("gkfqd_ysxx_save");
});
</script>





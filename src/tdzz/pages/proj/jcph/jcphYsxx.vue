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
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="项目性质" prop="jbxx.jbxxXmxz">
            <el-input disabled v-model="entity.jbxx.jbxxXmxz"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item
            label="项目位置"
            prop="jbxx.jbxxXmwz"
            style="width: 100%"
          >
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
    <panel title="耕地转出信息-转出前现状地类">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="(园地)果园"
            prop="ys.gdzcqGymj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqGymj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="(园地)茶园"
            prop="ys.gdzcqCymj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqCymj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="(园地)橡胶园"
            prop="ys.gdzcqXjymj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqXjymj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="(园地)其他园地"
            prop="ys.gdzcqQtydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqQtydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="(林地)乔木林地"
            prop="ys.gdzcqQmldmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqQmldmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="(林地)竹林地"
            prop="ys.gdzcqZldmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqZldmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="(林地)灌木林地"
            prop="ys.gdzcqGmldmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqGmldmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="(林地)其他林地"
            prop="ys.gdzcqQtldmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqQtldmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="灌丛沼泽"
            prop="ys.gdzcqGczzmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqGczzmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="沼泽草地"
            prop="ys.gdzcqZzcdmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqZzcdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="水库水面"
            prop="ys.gdzcqSksmmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqSksmmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="坑塘水面"
            prop="ys.gdzcqKtsmmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqKtsmmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="沟渠" prop="ys.gdzcqGqmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqGqmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="农村道路"
            prop="ys.gdzcqNcdlmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqNcdlmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="设施农用地"
            prop="ys.gdzcqSsnydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzcqSsnydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="耕地转出信息-实际转出后现状地类">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="设施农用地"
            prop="ys.gdzchSsnydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzchSsnydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="林地" prop="ys.gdzchLdmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzchLdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="设施农用地"
            prop="ys.gdzchSsnyd1mj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzchSsnyd1mj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="林地" prop="ys.gdzchLd1mj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.gdzchLd1mj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
    </panel>
    <panel title="复垦前现状地类">
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="耕地" prop="ys.fkqGdmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqGdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="园地" prop="ys.fkqYdmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqYdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item label="林地" prop="ys.fkqLdmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqLdmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="草地" prop="ys.fkqCdmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqCdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="城镇村及工矿用地"
            prop="ys.fkqCzcjgkydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqCzcjgkydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="交通运输用地"
            prop="ys.fkqJtysydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqJtysydmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="4">
          <el-form-item
            label="水域及水利设施用地"
            prop="ys.fkqSyslssydmj"
            :rules="rules.num"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqSyslssydmj"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="4">
          <el-form-item label="其他土地" prop="ys.fkqQttdmj" :rules="rules.num">
            <el-input
              :disabled="disabled"
              v-model="entity.ys.fkqQttdmj"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="规划新增">
      <el-row>
        <!-- <el-col :span="6" :offset="4">
          <el-form-item
            label="农用地面积"
            prop="ys.ghxzNydmj"
            :rules="rules.num"
          >
            <el-input :disabled="disabled" v-model="entity.ys.ghxzNydmj">
            </el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6" :offset="4">
          <el-form-item label="耕地面积" prop="ys.ghxzGdmj" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ys.ghxzGdmj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="自验扣减">
      <el-row>
        <!-- <el-col :span="6" :offset="4">
          <el-form-item
            label="农用地面积"
            prop="ys.zykjNydmj"
            :rules="rules.num"
          >
            <el-input :disabled="disabled" v-model="entity.ys.zykjNydmj">
            </el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6" :offset="4">
          <el-form-item label="耕地面积" prop="ys.zykjGdmj" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ys.zykjGdmj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="上报验收">
      <el-row>
        <!-- <el-col :span="6" :offset="4">
          <el-form-item
            label="农用地面积"
            prop="ys.sbysNydmj"
            :rules="rules.num"
          >
            <el-input :disabled="disabled" v-model="entity.ys.sbysNydmj">
            </el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6" :offset="4">
          <el-form-item label="耕地面积" prop="ys.sbysGdmj" :rules="rules.num">
            <el-input :disabled="disabled" v-model="entity.ys.sbysGdmj">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="市级验收扣减">
      <el-row>
        <!-- <el-col :span="6" :offset="4">
          <el-form-item
            label="数据复核扣减新增农用地面积"
            prop="ys.sjfhKjxznyd"
            :rules="sjyskjDisabled ? null : rules.sjfhKjxznyd"
          >
            <el-input
              :disabled="sjyskjDisabled"
              v-model="entity.ys.sjfhKjxznyd"
            >
            </el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6" :offset="4">
          <el-form-item
            label="数据复核扣减新增耕地面积"
            prop="ys.sjfhKjxzgd"
            :rules="sjyskjDisabled ? null : rules.sjfhKjxzgd"
          >
            <el-input :disabled="sjyskjDisabled" v-model="entity.ys.sjfhKjxzgd">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item label="实地扣减情况" prop="ys.sdkjqk">
            <el-input :disabled="sjyskjDisabled" v-model="entity.ys.sdkjqk">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
    <panel title="省厅核减">
      <!-- <el-row>
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
      </el-row> -->
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
    <panel title="确认新增耕地面积">
      <el-row>
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
      </el-row>
      <el-row>
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
        <!-- <el-col :span="6" :offset="4">
          <el-form-item
            label="质量等别"
            prop="ys.qrXzgdZldb"
            :rules="qrxzgdDisabled ? null : rules.zldb"
          >
            <el-input :disabled="qrxzgdDisabled" v-model="entity.ys.qrXzgdZldb">
            </el-input>
          </el-form-item>
        </el-col> -->
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
import { getRules, checkValidate } from "@/tdzz/verification/jcphYs";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { init, saveOrUpdate } from "@/tdzz/api/proj/proj-jcph-ys";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import bus from "@/common/utils/bus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import { getDistrictList } from "@/common/api/jtap/district.js";
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
 * 初始化
 */
const F_init = () => {
  init(data.jbxxSec).then((res) => {
    data.entity = res.data;
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
  bus.on("jcph_ysxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("jcph_ysxx_save");
});
</script>



<!--立项阶段基本信息-->
<template>
  <div class="flow-form">
    <el-row class="tlw-title">
      <el-col :span="24">{{ businessName }}基本信息表</el-col>
    </el-row>
    <el-form
      class="tlw-form"
      :model="entity"
      ref="lxform"
      :rules="rules"
      label-width="auto"
      :inline-message="true"
    >
      <panel title="项目基本信息">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="立项申请文件号">
              <el-input disabled v-model="entity.pc.pcNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="立项申请文件名称">
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
                value-format="YYYY"
                :disabled="disabled"
                v-model="entity.jbxx.jbxxTbnf"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="实施起始时间" prop="jbxx.ssTimeStart">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.jbxx.ssTimeStart"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="实施结束时间" prop="jbxx.ssTimeEnd">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.jbxx.ssTimeEnd"
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
              <el-input
                :disabled="disabled"
                v-model="entity.lx.jsgm"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="开发整治前现状地类">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="水田（耕地）" prop="lx.fkqGdStmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqGdStmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="旱地（耕地）" prop="lx.fkqGdHdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqGdHdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="园地" prop="lx.fkqYdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqYdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="林地" prop="lx.fkqLdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqLdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="草地" prop="lx.fkqCdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkqCdmj"
              ></el-input>
            </el-form-item>
          </el-col>
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
        </el-row>
        <el-row>
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
        </el-row>
        <el-row>
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
      <panel title="开发整治后现状地类">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="水田（耕地）" prop="lx.fkhGdStmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhGdStmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="旱地（耕地）" prop="lx.fkhGdHdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhGdHdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="园地" prop="lx.fkhYdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhYdmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="林地" prop="lx.fkhLdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhLdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="草地" prop="lx.fkhCdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhCdmj"
              ></el-input>
            </el-form-item>
          </el-col>
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
        </el-row>
        <el-row>
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
        </el-row>
        <el-row>
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
      <panel title="新增耕地面积">
        <!-- <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="新增耕地面积"
              prop="lx.fkhXzgdmj"
              :rules="rules.xzgdmj"
            >
              <el-input disabled v-model="fkhXzgdmj"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="水田" prop="lx.fkhXzgdStmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhXzgdStmj"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item
              label="质量等别"
              prop="lx.xzgdZldb"
              :rules="rules.zldb"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.lx.xzgdZldb"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6" :offset="4">
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
          </el-col> -->
        </el-row>
        <!-- <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="旱地" prop="lx.fkhXzgdHdmj" :rules="rules.num">
              <el-input
                :disabled="disabled"
                v-model="entity.lx.fkhXzgdHdmj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
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
        :disabled="flowAction =='VIEW' || entity.jbxx.xmStatus != 1.4"
      ></Spyj>
    </el-form>
  </div>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { getRules, checkValidate } from "@/tdzz/verification/hgsLx";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { onMounted, onBeforeUnmount, computed } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { init, saveOrUpdate, deleteLx } from "@/tdzz/api/proj/proj-hgs-lx.js";
import { getDistrictList } from "@/common/api/jtap/district.js";
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
  fkhXzgdmj,
  districtOptions,
  rules,
} = toRefs(data);

//2.定义方法

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
  });
};

/**
 * 获取行政区列表
 */
const F_getDistrictList = () => {
  getDistrictList(data.xzqdm).then((res) => {
    data.districtOptions = res.data;
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
  data.entity.lx.fkhXzgdmj = data.fkhXzgdmj;
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
  //hgs_lxxx ：代表当前页面路由
  bus.on("hgs_lxxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
  bus.on("hgs_lxxx_delete", (callback) => {
    F_delete(callback);
  });
});

//计算属性
data.fkhXzgdmj = computed(() => {
  let xzgdmj =
    Number.parseFloat(data.entity.lx.fkhXzgdStmj || 0) +
    Number.parseFloat(data.entity.lx.fkhXzgdSjdmj || 0) +
    Number.parseFloat(data.entity.lx.fkhXzgdHdmj || 0);
  return xzgdmj.toFixed(4);
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("hgs_lxxx_save");
  bus.off("hgs_lxxx_delete");
});
</script>

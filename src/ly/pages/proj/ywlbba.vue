<template>
  <el-card
    header="野生动物省以上野外猎捕备案事项申报信息表"
    class="tlw-card tlw-lysp-form"
  >
    <el-form
      :model="entity"
      :rules="rules"
      ref="ywlbbaform"
      label-width="auto"
      :inline-message="true"
    >
      <table class="tlw-table">
        <tr>
          <th style="width: 10%">审核事项</th>
          <th colspan="6">填报内容</th>
        </tr>
        <tr>
          <td class="requireCol">项目名称</td>
          <td colspan="6">
            <el-form-item
              prop="jbxx.xmmc"
              label-width="0"
              :rules="rules.requiredField"
            >
              <el-input v-model="entity.jbxx.xmmc" :disabled="disabled" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>项目编号</td>
          <td colspan="6">
            <el-form-item prop="jbxx.xmbh" label-width="0">
              <el-input v-model="entity.jbxx.xmbh" disabled />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="requireCol">审批权限</td>
          <td colspan="6">
            <el-form-item prop="jbxx.spqx" :rules="rules.requiredChange">
              <el-radio-group
                v-model="entity.jbxx.spqx"
                :disabled="disabled"
                @change="F_bhjb(2)"
              >
                <el-radio
                  :label="parseInt(item.codeValue)"
                  v-for="(item, index) in spqxOptions"
                  :key="index"
                  >{{ item.codeName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="requireCol" :rowspan="entity.wzList.length + 5">
            事项概况
          </td>
          <td class="requireCol">申请人</td>
          <td colspan="5">
            <el-form-item prop="jbxx.sqrmc" :rules="rules.requiredField">
              <el-input v-model="entity.jbxx.sqrmc" :disabled="disabled" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="requireCol">联系方式</td>
          <td colspan="5">
            <el-form-item prop="jbxx.sqrlxfs" :rules="rules.phone" class="el-form-item__error_show">
              <el-input v-model="entity.jbxx.sqrlxfs" :disabled="disabled" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="requireCol">所属区域（多选）</td>
          <td colspan="5">
            <el-form-item prop="sqrssqy" :rules="rules.requiredSsqy"    class="el-form-item__error_show">
              <el-checkbox-group v-model="entity.sqrssqy" :disabled="disabled">
                <el-checkbox
                  :label="district.code"
                  v-for="(district, index) in districtOptions"
                  :key="index"
                  >{{ district.name }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="requireCol">拟猎捕物种</th>
          <th class="requireCol" colspan="2">猎捕数量</th>
          <th class="requireCol" colspan="2">保护级别</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in entity.wzList" :key="index">
          <td>
            <el-form-item
              :prop="`wzList.${index}.wzmc`"
              :rules="rules.requiredField"
            >
              <el-input v-model="item.wzmc" :disabled="disabled" />
            </el-form-item>
          </td>
          <td colspan="2">
            <el-form-item
              :prop="`wzList.${index}.amount`"
              :rules="rules.intNum"
              class="el-form-item__error_show"
            >
              <el-input v-model="item.amount" :disabled="disabled" />
            </el-form-item>
          </td>
          <td colspan="2">
            <el-form-item
              :prop="`wzList.${index}.proLevel`"
              :rules="rules.requiredChange"
            >
              <el-radio-group v-model="item.proLevel" :disabled="disabled">
                <el-radio
                  :label="parseInt(item.codeValue)"
                  v-for="(item, index) in bhjbOptions"
                  :key="index"
                  >{{ item.codeName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
          <td>
            <el-button
              type="primary"
              @click="F_addWz(index)"
              v-if="!disabled"
              >添加</el-button
            >
            <el-button
              type="danger"
              @click="F_deltWz(index)"
              v-if="!disabled && entity.wzList.length > 1"
              >删除</el-button
            >
          </td>
        </tr>
        <tr>
          <td class="requireCol">猎捕时间</td>
          <td colspan="2">
            <el-form-item prop="jbxx.lbsj" :rules="rules.requiredField">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.jbxx.lbsj"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </td>
          <td class="requireCol">猎捕工具</td>
          <td colspan="2">
            <el-form-item prop="jbxx.lbgj" :rules="rules.requiredField">
              <el-input v-model="entity.jbxx.lbgj" :disabled="disabled" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="requireCol" rowspan="2">审批事项</td>
          <td class="requireCol">批准文号</td>
          <td>
            <el-form-item prop="jbxx.pzwh" :rules="rules.requiredField">
              <el-input v-model="entity.jbxx.pzwh" :disabled="disabled" />
            </el-form-item>
          </td>
          <td class="requireCol">批准日期</td>
          <td>
            <el-form-item prop="jbxx.pzrq" :rules="rules.requiredField">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.jbxx.pzrq"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </td>
          <td class="requireCol">许可证号</td>
          <td>
            <el-form-item prop="jbxx.xkzh" :rules="rules.requiredField">
              <el-input v-model="entity.jbxx.xkzh" :disabled="disabled" />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <el-form-item prop="jbxx.spsxnr">
              <el-input
                v-model="entity.jbxx.spsxnr"
                type="textarea"
                placeholder="内容限制在300个汉字/600个英文字符内"
                :disabled="disabled"
              >
              </el-input>
            </el-form-item>
          </td>
          <td colspan="2">
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="ywlbba_spwj"
              :taskId="taskId"
              btnText="上传审批文件"
            >
            </AttachUpload>
          </td>
        </tr>
      </table>
    </el-form>
  </el-card>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { init, saveOrUpdate, deleteLx } from "@/ly/api/proj/ywlb-ba";
import { getDictList } from "@/common/api/jtap/dict";
import store from "@/common/store";
import moment from "moment";
import { getDistrictList } from "@/common/api/jtap/district";
import AttachUpload from "@/common/components/attach/upload/moreAttachUpload2";
import { getRules, checkValidate } from "@/ly/verification/ywlbba";

//1. 定义数据
const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid,
  businessCode: params.businessCode,
  taskId: params.taskId,
  currentStepName: params.currentStepName,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  xzqdm: store.state.user.regionCode.substring(0, 4) + "00",
  entity: {
    jbxx: {}, //填报表单
    wzList: [{}], //物种列表
    sqrssqy: [],
  },
  districtOptions: [], //行政区列表
  spqxOptions: [],
  bhjbOptions: [], //保护级别
  jylymdOptions: [], //经营利用目的
  rules: getRules(),
});
const {
  flowinstid,
  taskId,
  disabled,
  entity,
  districtOptions,
  spqxOptions,
  bhjbOptions,
  jylymdOptions,
  rules,
} = toRefs(data);

const ywlbbaform = ref(null);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getDict();
  F_getDetail();
};

/**
 * 获取详情
 */
const F_getDetail = () => {
  init(data.flowinstid).then((res) => {
    if (res.data.jbxx.flowinstid) {
      data.entity = res.data;
      F_bhjb(1);
      if (data.entity.jbxx.sqrssqy) {
        data.entity.sqrssqy = data.entity.jbxx.sqrssqy.split(",");
      }
    } else {
      data.entity.jbxx.spqx = 2;
      if (store.state.user.grade != 1) { 
        //县级用户默认当前用户行政区
        data.entity.jbxx.xzqhdm = store.state.user.regionCode;
      }
      F_bhjb(2);
    }
  });
};

/**
 * 获取数据字典
 */
const F_getDict = () => {
  getDictList("经营利用目的").then((res) => {
    data.jylymdOptions = res.data;
  });
  getDictList("备案_审批权限").then((res) => {
    data.spqxOptions = res.data;
  });
  getDistrictList(data.xzqdm).then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 经营利用物种-添加行
 */
const F_addWz = () => {
  //省级选省重点、三有
  let proLevel;
  if (data.entity.jbxx.spqx == 2) {
    proLevel = 13;
  }
  if (data.entity.jbxx.spqx == 1) {
    proLevel = 1;
  }
  data.entity.wzList.push({ proLevel: proLevel });
};

/**
 * 经营利用物种-删除行
 */
const F_deltWz = (index) => {
  if (data.entity.wzList.length > 1) data.entity.wzList.splice(index, 1);
  else {
    ElMessage.error("请至少保存一条数据！");
  }
};

/**
 * 根据审批权限调整保护级别
 */
const F_bhjb = (type) => {
  //type为一初始化，为2权限更改情况后初始化

  //省级选省重点、三有
  if (data.entity.jbxx.spqx == 2) {
    getDictList("经营猎捕_保护级别").then((res) => {
      data.bhjbOptions = res.data;
      if (type == 2) {
        //切换权限清空
        for (let i = 0; i < data.entity.wzList.length; i++) {
          if (data.entity.wzList[i].proLevel) {
            data.entity.wzList[i].proLevel = 13;
          }
        }
      }
    });
  }
  if (data.entity.jbxx.spqx == 1) {
    //国家选择十有
    getDictList("人工繁育_十有").then((res) => {
      data.bhjbOptions = res.data;
      if (type == 2) {
        //切换权限清空
        for (let i = 0; i < data.entity.wzList.length; i++) {
          if (data.entity.wzList[i].proLevel) {
            data.entity.wzList[i].proLevel = 1;
          }
        }
      }
    });
  }
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await ywlbbaform.value.validate((valid) => {
    flag = valid;
    //2. 自己的逻辑代码
    if (flag) {
      flag = checkValidate(data);
    } else {
      flag = false;
    }
  });
  return flag;
};

/**
 * 保存
 */
const F_save = async () => {
  data.entity.jbxx.flowinstid = data.flowinstid;
  if (data.entity.jbxx.xzqhdm==null||data.entity.jbxx.xzqhdm==undefined) { 
    data.entity.jbxx.xzqhdm = store.state.user.regionCode;
  }
  data.entity.jbxx.sqrssqy = data.entity.sqrssqy.toString();
  let flag = await F_beforeSave();
  if (flag) {
    await saveOrUpdate(data.entity)
      .then((res) => {
        F_getDetail();
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
  deleteLx(data.flowinstid).then((res) => {
    ElMessage.success(res.msg);
    if (callback) {
      callback();
    }
  });
};

//4.入口
onMounted(() => {
  //1.初始化
  F_init();
  //2.定义监听事件
  bus.on("ywlbba_save", async (obj) => {
    let flag;
    if (obj.val) {
      flag = await F_save(obj.val);
    }
    if (obj.callback) {
      obj.callback(flag);
    }
  });
  bus.on("ywlbba_delete", (callback) => {
    F_delete(callback);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("ywlbba_save");
  bus.off("ywlbba_delete");
});
</script>

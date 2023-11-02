<template>
  <el-card header="项目使用林地统计信息表" class="tlw-card tlw-lysp-form">
    <el-form
      :model="entity"
      ref="xmsyldform"
      label-width="auto"
      :inline-message="true"
    >
      <table class="tlw-table">
        <tr>
          <th style="width: 10%">审核事项</th>
          <th colspan="8">填报内容</th>
        </tr>

        <tr>
          <td>项目名称</td>
          <td colspan="8">
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
          <td colspan="8">
            <el-form-item prop="jbxx.xmbh" label-width="0">
              <el-input v-model="entity.jbxx.xmbh" disabled />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>行政区</td>
          <td colspan="8">
            <el-form-item label-width="0" prop="jbxx.xzqdm">
              <el-select
                v-model="entity.jbxx.xzqdm"
                placeholder="请选择"
                :disabled="disabled"
              >
                <el-option
                  :label="item.name"
                  :value="item.code"
                  v-for="(item, index) in districtOptions"
                  :key="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>日期</td>
          <td>年份</td>
          <td colspan="3" style="width: 35%">
            <el-form-item
              label-width="0"
              prop="year"
              :rules="rules.requiredRadio"
            >
            </el-form-item>
          </td>
          <td>月份</td>
          <td colspan="3" style="width: 35%">
            <el-form-item
              prop="year"
              label-width="0"
              :rules="rules.requiredRadio"
            >
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>办件量</td>
          <td>省内办件量</td>
          <td colspan="3">
            <el-form-item
              label-width="0"
              prop="amountin"
              :rules="rules.requiredRadio"
            >
            </el-form-item>
          </td>
          <td>省外办件量</td>
          <td colspan="3">
            <el-form-item
              prop="amountout"
              label-width="0"
              :rules="rules.requiredChange"
            >
            </el-form-item>
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
import { init, saveOrUpdate, deleteLx } from "@/ly/api/proj/zwjy";
import store from "@/common/store";
import { getDistrictList } from "@/common/api/jtap/district";
import AttachUpload from "@/common/components/attach/upload/moreAttachUpload2";
import { getRules, checkValidate } from "@/ly/verification/zwjy";

//1. 定义数据
const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid,
  taskId: params.taskId,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  xzqdm: store.state.user.regionCode.substring(0, 4) + "00",
  entity: {
    jbxx: {}, //填报表单
  },
  districtOptions: [], //行政区列表
  rules: getRules(),
});
const { flowinstid, taskId, disabled, entity, districtOptions, rules } =
  toRefs(data);

const xmsyldform = ref(null);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
 init(data.flowinstid, data.taskId, data.flowAction).then((res) => {
    if (res.data.jbxx.flowinstid) {
      data.entity = res.data;
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
  await xmsyldform.value.validate((valid) => {
    flag = valid;
    //2. 自己的逻辑代码
    if (flag) {
      flag = checkValidate(data);
    } else {
      ElMessage.error("请检查表单填写内容是否完整！");
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
  deleteLx(data.flowinstid).then((res) => {
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
  bus.on("zwjy_save", async (obj) => {
    let flag;
    if (obj.val) {
      flag = await F_save(obj.val);
    }
    if (obj.callback) {
      obj.callback(flag);
    }
  });
  bus.on("zyjy_delete", (callback) => {
    F_delete(callback);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("zwjy_save");
  bus.off("zyjy_delete");
});
</script>


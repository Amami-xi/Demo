<template>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}{{ catalog }}基本信息表</el-col>
  </el-row>
  <el-form
    class="tlw-form"
    :model="entity"
    ref="ysform"
    :rules="rules"
    label-width="auto"
    :inline-message="true"
  >
    <div class="flow-form">
      <panel title="验收信息">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="验收单位" prop="ys.ysdw">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.ysdw"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="验收文号" prop="ys.yswh">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.yswh"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="验收日期" prop="ys.ysrq">
              <el-date-picker
                type="date"
                :disabled="disabled"
                v-model="entity.ys.ysrq"
                placeholder="请选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="验收编号" prop="ys.ysbh">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.ysbh"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6" :offset="4">
            <el-form-item label="验收组长" prop="ys.yszz">
              <el-input
                :disabled="disabled"
                v-model="entity.ys.yszz"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-form-item label="项目总投资" prop="ys.ztz">
              <el-input :disabled="disabled" v-model="entity.ys.ztz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item label="项目总规模" prop="ys.zgm">
              <el-input :disabled="disabled" v-model="entity.ys.zgm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="子项信息">
        <template v-for="(item, index) in entity.zxxxList" :key="index">
          <el-row>
            <el-col :span="10" :offset="4">
              <el-form-item label="项目名称">
                <el-input :disabled="disabled" v-model="item.xmmc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button
                style="margin-right: 80px"
                type="primary"
                size="medium"
                v-if="disabled == false"
                @click="F_zbinfo(item.zxmSec)"
                >上传坐标</el-button
              >
              <el-button
                style="margin-right: 80px"
                type="primary"
                size="medium"
                v-if="disabled == true"
                @click="F_zbinfo(item.zxmSec)"
                >查看坐标</el-button
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="4">
              <el-form-item label="中心点坐标"
                ><el-input :disabled="disabled" v-model="item.zxdzb"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="4">
              <el-form-item label="项目类型"
                ><el-input :disabled="disabled" v-model="item.xmlx"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="4">
              <el-form-item label="项目承担单位"
                ><el-input
                  :disabled="disabled"
                  v-model="item.xmcddw"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6" :offset="4">
              <el-form-item label="项目实施单位"
                ><el-input
                  :disabled="disabled"
                  v-model="item.xmssdw"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </panel>
      <ZxmzbDialog ref="zxmzbDialog" :pType="pType" :disabled="disabled">
      </ZxmzbDialog>
    </div>
  </el-form>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { getRules, checkValidate } from "@/tdzz/verification/tdzzYs";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { init, saveOrUpdate } from "@/tdzz/api/proj/proj-sslt-ys";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import bus from "@/common/utils/bus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import ZxmzbDialog from "@/tdzz/pages/plot/zxmzbDialog";
//1. 定义数据

const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid,
  catalog: params.catalog,
  pType: "YS_X",
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  entity: {
    catalog: params.catalog,
    jbxx: { flowinstid: params.flowinstid },
    ys: { flowinstid: params.flowinstid },
    zxxxList: [{}],
  },
  rules: getRules(),
});
const { businessName, catalog, disabled, entity, rules, pType } = toRefs(data);
const ysform = ref(null);
const zxmzbDialog = ref(null);

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
  data.entity.ys.flowinstid = data.flowinstid;
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

/**
 * 坐标上传、查看
 * @param {子项目主键} zxmSec
 */
const F_zbinfo = (zxmSec) => {
  zxmzbDialog.value.handleOpen(zxmSec);
};

//3.入口
onMounted(() => {
  //1.获取详情
  F_init();
  //2.定义监听事件
  bus.on("sslt_ysxx_save", async (callback) => {
    let saveFlag = await F_save();
    if (callback) {
      callback(saveFlag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("sslt_ysxx_save");
});
</script>

<style lang="sass" scoped>
</style>>
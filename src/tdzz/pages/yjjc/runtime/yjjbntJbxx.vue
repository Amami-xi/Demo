<template>
  <el-form
    class="tlw-form"
    :model="entity"
    ref="yjjcform"
    label-width="auto"
    label-position="top"
  >
    <div class="flow-form">
      <panel title="基本信息">
        <el-row>
          <el-col :span="10">
            <el-form-item label="批次号">
              <el-input disabled v-model="entity.jbxx.tbPch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="图斑号">
              <el-input disabled v-model="entity.jbxx.tbh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="基本农田面积">
              <el-input disabled v-model="entity.jbxx.yjjbntMj"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="是否用地报批批准的数据">
              <el-input disabled v-model="entity.jbxx.sfydbppzsj"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="部分面积">
              <el-input disabled v-model="entity.jbxx.jcphbfmj"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="类型">
              <el-input disabled v-model="entity.jbxx.tblx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="类别">
              <el-input disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="位置" prop="jbxx.zldwmc">
              <el-input disabled v-model="entity.jbxx.zldwmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
      <panel title="核实情况" v-if="entity.sbxx.checkState != null">
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="核实状态"
              prop="sbxx.checkState"
              :rules="rules.checkState"
            >
              <el-radio-group
                v-model="entity.sbxx.checkState"
                :disabled="disabled"
              >
                <el-radio
                  v-for="(item, index) in hsOptions"
                  :key="index"
                  :label="parseInt(item.codeValue)"
                  >{{ item.codeName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="entity.sbxx.checkState == 2">
          <el-row v-for="(item, index) in entity.sbxx.bhdlList" :key="index">
            <el-col :span="10">
              <el-form-item
                :label="'变化地类' + (index + 1)"
                :prop="`sbxx.bhdlList.${index}.dlbm`"
                :rules="rules.dlbm"
              >
                <el-tree-select
                  v-model="item.dlbm"
                  :props="defaultProps"
                  :data="dlList"
                  filterable
                  :disabled="disabled"
                  style="width: 100%"
                  highlight-current
                  default-expand-all
                  placeholder="请选择变化地类"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="变化地类面积（公顷）"
                :prop="`sbxx.bhdlList.${index}.dlmj`"
                :rules="rules.dlmj"
              >
                <el-input :disabled="disabled" v-model="item.dlmj" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="operate" style="margin-top: 2.0625rem">
                <el-button
                  @click="addBhdl(index)"
                  size="small"
                  type="primary"
                  v-if="!disabled"
                >
                  <el-icon>
                    <Plus />
                  </el-icon>
                </el-button>
                <el-button
                  @click="deleteBhdl(index)"
                  size="small"
                  type="danger"
                  v-if="entity.sbxx.bhdlList.length > 1 && !disabled"
                >
                  <el-icon>
                    <Minus />
                  </el-icon>
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item
                label="地类变化时间"
                prop="sbxx.bhsj"
                :rules="rules.bhsj"
              >
                <el-date-picker
                  v-model="entity.sbxx.bhsj"
                  :disabled="disabled"
                  type="date"
                  placeholder="请选择地类变化时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="巡查人员">
                <el-input disabled v-model="entity.sbxx.userName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item
                label="巡查时间"
                prop="sbxx.bhsj"
                :rules="rules.bhsj"
              >
                <el-date-picker
                  v-model="entity.sbxx.xcsj"
                  :disabled="disabled"
                  type="datetime"
                  placeholder="请选择巡查时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="描述说明" prop="entity.sbxx.hsbz">
                <el-input
                  type="textarea"
                  :disabled="disabled"
                  v-model="entity.sbxx.hsbz"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </panel>
      <panel title="整改情况" v-if="entity.sbxx.checkState == 2">
        <el-row>
          <el-col :span="10">
            <el-form-item
              label="整改状态"
              prop="sbxx.fixState"
              :rules="rules.fixState"
            >
              <el-select
                v-model="entity.sbxx.fixState"
                filterable
                clearable
                :disabled="disabled"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in zgOptions"
                  :key="index"
                  :label="item.codeName"
                  :value="parseInt(item.codeValue)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="10"
            v-if="entity.sbxx.checkState == 2 && entity.sbxx.fixState == 2"
          >
            <el-form-item
              label="部分整改面积"
              prop="sbxx.fixMj"
              :rules="rules.fixMj"
            >
              <el-input
                :disabled="disabled"
                v-model="entity.sbxx.fixMj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="描述说明" prop="entity.sbxx.zgbz">
              <el-input
                type="textarea"
                :disabled="disabled"
                v-model="entity.sbxx.zgbz"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </panel>
    </div>
  </el-form>
</template>
<script setup>
import panel from "@/common/components/card/cardPanel.vue";
import { getRules } from "@/tdzz/verification/yjjcGdlc";
import { ref, reactive, toRefs } from "@vue/reactivity";
import bus from "@/common/utils/bus";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import store from "@/common/store";
import { Plus, Minus } from "@element-plus/icons-vue";
import { getDictList } from "@/common/api/jtap/dict";
import { gdlcDetail, gdlcSaveOrUpdate } from "@/tdzz/api/yjjc/workflow";
import { getDlList } from "@/common/api/plot/plotZb";

//1. 定义数据
//定义路由
const route = useRoute();
//定义Tree组件数据格式
const defaultProps = reactive({
  children: "childList",
  label: "name",
  value: "value",
});
const yjjcform = ref(null);
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid,
  taskId: params.taskId,
  businessCode: params.businessCode,
  businessName: params.businessName,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  entity: {
    jbxx: {},
    sbxx: {
      bhdlList: [],
    },
  },
  xzqdm: store.state.user.regionCode,
  rules: getRules(),
  hsOptions: [],
  zgOptions: [],
  dlList: [],
});
const {
  flowinstid,
  taskId,
  businessName,
  disabled,
  entity,
  rules,
  hsOptions,
  zgOptions,
  dlList,
} = toRefs(data);
const lxform = ref(null);
//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getDict();
  F_getDeatil();
  F_getDlList();
};

/**
 * 获取数据字典
 */
const F_getDict = () => {
  getDictList("核实状态").then((res) => {
    data.hsOptions = res.data;
  });
  getDictList("整改状态").then((res) => {
    data.zgOptions = res.data;
  });
};

/**
 * 获取地类列表
 */
const F_getDlList = () => {
  getDlList(1).then((res) => {
    data.dlList = res.data;
  });
};

/**
 * 获取详情
 */
const F_getDeatil = () => {
  gdlcDetail(data.flowinstid, data.businessCode).then((res) => {
    data.entity = res.data;
    if (
      data.entity.sbxx.bhdlList == null ||
      data.entity.sbxx.bhdlList.length == 0
    ) {
      data.entity.sbxx.bhdlList = [{}];
    }
  });
};

/**
 * 新增变化地类
 */
const addBhdl = (index) => {
  data.entity.sbxx.bhdlList.push({});
};

/**
 * 新增变化地类
 */
const deleteBhdl = (index) => {
  data.entity.sbxx.bhdlList.splice(index, 1);
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await yjjcform.value.validate((valid) => {
    flag = valid;
  });
  return flag;
};

/**
 * 保存
 */
const F_save = async () => {
  data.entity.sbxx.businessCode = data.businessCode;
  let flag = await F_beforeSave();
  if (flag) {
    await gdlcSaveOrUpdate(data.entity.sbxx)
      .then((res) => {
        F_getDeatil();
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
const F_delete = (callback) => {};

//3.入口
onMounted(() => {
  //1.初始化
  F_init();
  //2.定义监听事件
  bus.on("gdlcJbxx_save", async (obj) => {
    let flag = await F_save(obj.val);
    if (obj.callback) {
      obj.callback(flag);
    }
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("gdlcJbxx_save");
});
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="导入指标计算预览"
    width="60%"
    :before-close="handleClose"
  >
    <el-row class="tlw-row">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div>行政区当前指标</div>
            <el-button
              type="success"
              @click="F_importYzbk"
              style="margin-left: 560px"
              >导入原指标库</el-button
            >
            <el-button type="success" @click="F_importZbk"
              >导入新指标库</el-button
            >
          </template>
          <el-table :data="tableList" border stripe :row-style="zbRowStyle">
            <el-table-column prop="xzq" label="行政区" width="180" />
            <el-table-column
              prop="xzqdm"
              label="行政区代码（账户）"
              width="180"
            />
            <el-table-column prop="gdzb" label="耕地数量（公顷）" />
            <el-table-column prop="stzb" label="水田规模（公顷）" />
            <el-table-column prop="cnzb" label="粮食产能（万公斤）" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import { importYzbk, importZbk } from "@/tdzz/api/zbgl/zbk/zbk_zbmx";

//1.定义数据
const data = reactive({
  tableList: [],
  dialogVisible: false,
  params: {
    yzbkList: [],
    zbkList: [],
  },
});

const { tableList, dialogVisible, params } = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {};

/**
 * 打开弹窗-添加
 */
const handleOpen = (tableList) => {
  data.tableList = tableList;
  data.dialogVisible = true;
};

/**
 * 关闭弹窗
 */
const handleClose = () => {
  data.dialogVisible = false;
};

/**
 * 导入原指标库
 */
const F_importYzbk = () => {
  data.params.yzbkList = data.tableList;
  importYzbk(data.params).then((res) => {
    ElMessage.success(res.msg);
    handleClose();
  });
};

/**
 * 导入新指标库
 */
const F_importZbk = () => {
  data.params.zbkList = data.tableList;
  importZbk(data.params).then((res) => {
    ElMessage.success(res.msg);
    handleClose();
  });
};

/**
 * 格式化首尾行
 * @param {*} row
 */
const zbRowStyle = (row) => {
  if (row.rowIndex == 0 || row.rowIndex == data.tableList.length - 1) {
    return { "font-weight": "700" };
  }
};

defineExpose({ handleOpen });
</script>
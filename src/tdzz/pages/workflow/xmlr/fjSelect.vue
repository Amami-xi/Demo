<template>
  <el-dialog
    v-model="dialogVisible"
    :title="data.rowdata.catalog + '附件删除'"
    :before-close="handleClose"
    fullscreen
    append-to-body
  >
    <el-row class="tlw-row">
      <el-col :span="24">
        <el-button type="primary" size="small" @click="F_batchDeleteFj"
          >批量删除</el-button
        >
      </el-col>
    </el-row>
    <el-row class="tlw-row">
      <el-col :span="24">
        <el-table
          :data="tableData"
          row-key="id"
          @selection-change="F_handleSelectionChange"
          ref="table"
        >
          <el-table-column type="selection" border stripe width="55" />
          <el-table-column label="序号" width="120">
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="附件类型" prop="name"> </el-table-column>
          <el-table-column label="是否必须" prop="required" width="300">
            <template #default="scope">
              <el-tag :type="scope.row.required ? 'danger' : 'info'"
                >{{ scope.row.required ? "是" : "否" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { batchDeleteFj } from "@/tdzz/api/proj/proj-jbxx";
import Pagination from "@/common/components/pagination/index";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { CircleCheck } from "@element-plus/icons-vue";
import { getMaterialFj } from "@/common/api/jtap/material";

//1.定义路由
const router = useRouter();
const route = useRoute();
//2.定义数据
const data = reactive({
  tableData: [],
  selection: [],
  dialogVisible: false,
  rowdata: {},
});
const { selection, tableData, rowdata, dialogVisible } = toRefs(data);

//3.定义方法

/**
 * 初始化
 */
const F_init = (row) => {
  data.rowdata = row;
  F_getMaterialFj();
  data.dialogVisible = true;
};

/**
 * 获取附件材料列表
 */
const F_getMaterialFj = () => {
  const params = {
    flowinstid: data.rowdata.flowinstid,
    taskId: data.rowdata.taskId,
    catalog: data.rowdata.catalog,
    businessCode: data.rowdata.businessCode,
    materialType: data.rowdata.materialType,
  };

  getMaterialFj(params).then((res) => {
    data.tableData = res.data;
  });
};

/**
 * 关闭弹窗
 */
const handleClose = () => {
  data.dialogVisible = false;
};

/**
 * 复选框勾选事件
 *
 * @param {*} selection
 */
const F_handleSelectionChange = (selection) => {
  data.selection = [];
  selection.map((obj) => {
    data.selection.push(obj.code);
  });
};

/**
 * 批量选择
 */
const F_batchDeleteFj = () => {
  const params = {
    flowinstid: data.rowdata.flowinstid,
    taskId: data.rowdata.taskId,
    catalog: data.rowdata.catalog,
    materialType: data.rowdata.materialType,
    codes: data.selection,
    jbxxSecs: data.rowdata.jbxxSecs,
  };

  if (data.selection.length == 0) {
    ElMessage.error("请先勾选附件材料！");
  } else {
    batchDeleteFj(params).then((res) => {
      ElMessage.success(res.msg);
    });
  }
};

//3.入口
onMounted(() => {
  //定义监听事件，刷新待办
  // window.addEventListener("message", function (e) {
  //   if (e.data == "tdzz-daiban-refresh") {
  //     F_getTdzzXmcxList();
  //   }
  // });
});
const emit = defineEmits(["refresh"]);
defineExpose({ F_init });
</script>
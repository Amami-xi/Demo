<template>
  <el-row class="tlw-title">
    <el-col :span="24">{{ businessName }}附件</el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table
        :data="tableData"
        row-key="id"
        :row-class-name="getRowClassName"
        ref="table"
        class="attach-table"
      >
        <el-table-column type="expand">
          <template #default="scope">
            <el-table
              v-if="
                scope.row.attachList != undefined &&
                scope.row.attachList.length > 0
              "
              :data="scope.row.attachList"
              :header-cell-style="{ align: 'left' }"
            >
              <el-table-column label="文件名" prop="name"> </el-table-column>
              <el-table-column label="操作">
                <template #default="childScope">
                  <AttachOperate
                    :attach="childScope.row"
                    :material="scope.row"
                    :disabled="disabled"
                  ></AttachOperate>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
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
        <el-table-column label="已上传" width="300">
          <template #default="scope">
            <el-icon
              class="icon-success"
              :size="16"
              v-if="scope.row.attachList && scope.row.attachList.length > 0"
            >
              <Check />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" v-if="!disabled">
          <template #default="scope">
            <AttachUpload
              v-if="scope.row.action === 'EDIT'"
              :flowinstid="F_getFjFk()"
              :catalog="catalog"
              :referenceId="scope.row.code"
              @refresh="refreshRow(scope.row)"
            ></AttachUpload>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" width="200">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import AttachUpload from "@/common/components/attach/upload/index";
import AttachContent from "@/common/components/attach/query/index";
import { Check } from "@element-plus/icons-vue";
import { getMaterialAttachList } from "@/common/api/jtap/material";
import { getAttachList } from "@/common/api/jtap/attach";
import bus from "@/common/utils/bus";
import AttachOperate from "@/common/components/attach/index";

//1.定义数据
const route = useRoute();
const params = route.query;
const table = ref(null);
const data = reactive({
  materialType: params.materialType,
  flowinstid: params.flowinstid,
  jbxxSec: params.jbxxSec ? params.jbxxSec : "",
  taskId: params.taskId,
  businessCode: params.businessCode,
  businessName: params.businessName,
  catalog: params.catalog,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  tableData: [],
  dialogVisible: false,
});
const {
  flowinstid,
  jbxxSec,
  businessName,
  catalog,
  disabled,
  tableData,
  dialogVisible,
} = toRefs(data);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getMaterialAttachList();
};

const F_getFjFk = () => {
  return data.jbxxSec ? data.jbxxSec : data.flowinstid;
};

/**
 * 获取附件材料列表
 */
const F_getMaterialAttachList = () => {
  getMaterialAttachList(
    data.flowinstid,
    data.jbxxSec,
    data.taskId,
    data.catalog,
    data.businessCode,
    data.materialType
  ).then((res) => {
    data.tableData = res.data;
  });
};

/**
 * 刷新行
 *
 * @param {object} row
 */
const refreshRow = (row) => {
  let attach_fk = data.jbxxSec ? data.jbxxSec : data.flowinstid;
  getAttachList(attach_fk, row.id).then((res) => {
    row.attachList = res.data;
    if (row.attachList == undefined || row.attachList.length == 0) {
      table.value.toggleRowExpansion(row, false);
    } else {
      table.value.toggleRowExpansion(row, true);
    }
  });
};

const getRowClassName = ({ row }, rowIndex) => {
  if (row.attachList == undefined || row.attachList.length == 0) {
    return "row-expand-hidden";
  } else {
    return "row-expand-show";
  }
};

//3.入口
onMounted(() => {
  F_init();

  //注册刷新行监听事件
  bus.on("attach_refresh", (row) => {
    refreshRow(row);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("attach_refresh");
});
</script>
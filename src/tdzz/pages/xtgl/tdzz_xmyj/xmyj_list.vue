<template>
  <el-button type="primary" size="small" @click="F_ADD"
    ><el-icon class="el-icon--left"> <CirclePlus /> </el-icon>新增</el-button
  >
  <el-table
    :data="tableData"
    border
    max-height="600"
    class="tlw-row"
    :row-style="F_rowStyle"
  >
    <el-table-column type="index" width="80" label="序号" />
    <el-table-column prop="codeValue" label="意见编码" width="220">
      <template #default="scope">
        <div v-if="scope.row.saveFlag == 1">
          <el-input
            placeholder="请填写意见编码"
            size="small"
            v-model="scope.row.codeValue"
          ></el-input>
        </div>
        <div v-else>
          {{ scope.row.codeValue }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="codeName" label="意见类型" width="400">
      <template #default="scope">
        <div v-if="scope.row.saveFlag == 1">
          <el-input
            placeholder="请填写地类名称"
            size="small"
            v-model="scope.row.codeName"
          ></el-input>
        </div>
        <div v-else>
          {{ scope.row.codeName }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注">
      <template #default="scope">
        <div v-if="scope.row.saveFlag == 1">
          <el-input
            placeholder="请填写备注"
            size="small"
            v-model="scope.row.remark"
          ></el-input>
        </div>
        <div v-else>
          {{ scope.row.remark }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="codeOrder" label="排序" width="80">
      <template #default="scope">
        <div v-if="scope.row.saveFlag == 1">
          <el-input
            placeholder="请填写排序"
            size="small"
            v-model="scope.row.codeOrder"
          ></el-input>
        </div>
        <div v-else>
          {{ scope.row.codeOrder }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="280">
      <template #default="scope">
        <template v-if="scope.row.saveFlag == 1">
          <el-button @click="F_SAVE(scope.row)" type="success" size="small">
            <el-icon class="el-icon--left"> <Finished /> </el-icon>保存
          </el-button>
          <el-button @click="F_CANCEL(scope.row)" type="info" size="small">
            <el-icon class="el-icon--left"> <CircleClose /> </el-icon>取消
          </el-button>
        </template>
        <el-button
          @click="F_UPDATE(scope.row)"
          type="primary"
          size="small"
          v-else
        >
          <el-icon class="el-icon--left"> <Edit /> </el-icon>编辑
        </el-button>
        <el-button type="danger" size="small" @click="F_DELETE(scope.row)">
          <el-icon class="el-icon--left"> <Delete /> </el-icon>删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <xmyj_add ref="lydlAdd" :render="F_init"></xmyj_add>
</template>
    
<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import {
  getDictList,
  modifyDictionaryEntry,
  deleteDictionaryEntry,
} from "@/common/api/jtap/dict";
import {
  CirclePlus,
  Edit,
  Finished,
  Delete,
  CircleClose,
} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import xmyj_add from "./xmyj_add.vue";

//1.定义数据
const lydlAdd = ref(null);
const data = reactive({
  tableData: [],
  currentSelect: "",
});

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});

const { tableData } = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getTableData();
};

/**
 * 获取阈值列表
 */
const F_getTableData = () => {
  getDictList(props.name).then((res) => {
    data.tableData = res.data;
  });
};

/**
 * 编辑
 *
 * @param {Object} row
 */
const F_UPDATE = (row) => {
  row.saveFlag = 1;
};

/**
 * 新增
 *
 * @param {*}
 */
const F_ADD = () => {
  lydlAdd.value.handleOpen(props.name);
};

/**
 * 保存
 *
 * @param {Object} row
 */
const F_SAVE = (row) => {
  modifyDictionaryEntry(row).then((res) => {
    ElMessage.success("保存成功");
    F_init();
    row.saveFlag = 0;
  });
};

/**
 * 取消
 * @param {Object} row
 */
const F_CANCEL = (row) => {
  row.saveFlag = 0;
};

/**
 * 删除
 * @param {*} row
 */
const F_DELETE = (row) => {
  if (row.saveFlag == 1) {
    ElMessageBox.alert("正在编辑中无法删除！", { type: "warning" })
      .then()
      .catch();
  } else {
    data.currentSelect = row.id;
    ElMessageBox.confirm("是否确认删除【" + row.codeValue + "】？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        deleteDictionaryEntry(row.id).then((res) => {
          ElMessage.success("删除成功");
          F_init();
        });
      })
      .catch(() => {
        data.currentSelect = "";
      });
  }
};

/**
 * 表格行样式
 *
 * @param {Object} param0
 */
const F_rowStyle = ({ row }) => {
  if (data.currentSelect == row.id) {
    return { backgroundColor: "#F56C6C" };
  }
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
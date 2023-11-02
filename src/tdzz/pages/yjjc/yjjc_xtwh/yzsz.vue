<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：系统维护 > 预警阈值设置"></svg-icon>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border>
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="codeName" label="类型" />
        <el-table-column prop="codeValue" label="阈值">
          <template #default="scope">
            <div v-if="scope.row.saveFlag == 1">
              <el-input
                placeholder="请填写阈值"
                size="small"
                style="width: 12.5rem"
                v-model="scope.row.codeValue"
              ></el-input>
              <span v-if="scope.row.codeName == '农业建设违规改变耕地用途预警'"
                >%</span
              >
            </div>
            <div v-else>
              {{ scope.row.codeValue
              }}<span
                v-if="scope.row.codeName == '农业建设违规改变耕地用途预警'"
                >%</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button
              @click="F_SAVE(scope.row)"
              type="success"
              size="small"
              v-if="scope.row.saveFlag == 1"
            >
              <el-icon class="el-icon--left"> <Finished /> </el-icon>保存
            </el-button>
            <el-button
              @click="F_UPDATE(scope.row)"
              type="primary"
              size="small"
              v-else
            >
              <el-icon class="el-icon--left"> <Edit /> </el-icon>编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
    
<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { getDictList, modifyDictionaryEntry } from "@/common/api/jtap/dict";
import { Edit, Finished } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

//1.定义数据
const data = reactive({
  tableData: [],
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
 * 编辑
 *
 * @param {Object} row
 */
const F_UPDATE = (row) => {
  row.saveFlag = 1;
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
 * 获取阈值列表
 */
const F_getTableData = () => {
  getDictList("土整预警阈值").then((res) => {
    data.tableData = res.data;
  });
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
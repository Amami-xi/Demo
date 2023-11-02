<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：系统管理 > 地块面积阈值设置"></svg-icon>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border>
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="codeName" label="类型" width="300" />
        <el-table-column prop="codeValue" label="阈值" width="220">
          <template #default="scope">
            <div v-if="scope.row.saveFlag == 1">
              <el-input
                placeholder="请填写阈值"
                size="small"
                style="width: 12.5rem"
                v-model="scope.row.codeValue"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.codeValue }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template #default="scope">
            <div v-if="scope.row.saveFlag == 1">
              <el-input
                placeholder="请填写备注"
                size="small"
                style="width: 12.5rem"
                v-model="scope.row.remark"
              ></el-input>
            </div>
            <div v-else>
              {{ scope.row.remark }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
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
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
    
<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { getDictList, modifyDictionaryEntry } from "@/common/api/jtap/dict";
import { Edit, Finished, CircleClose } from "@element-plus/icons-vue";
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
 * 取消
 * @param {Object} row
 */
const F_CANCEL = (row) => {
  row.saveFlag = 0;
};

/**
 * 获取阈值列表
 */
const F_getTableData = () => {
  getDictList("土地整治阈值").then((res) => {
    data.tableData = res.data;
  });
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
<style scoped lang="scss">
.el-input {
  width: 100% !important;
}
</style>
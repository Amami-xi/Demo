<template>
  <el-row>
    <el-col :span="24">
      <el-button type="primary" size="small" @click="F_add"
        ><el-icon class="el-icon--left"> <CirclePlus /> </el-icon
        >添加</el-button
      >
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column label="信息填报人" prop="userName" />
        <el-table-column label="联系电话" prop="phone" />
        <el-table-column label="填报单位" prop="unit" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="F_update(scope.row)"
              ><el-icon class="el-icon--left"> <Edit /> </el-icon
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="F_del(scope.row.hqSec)"
              ><el-icon class="el-icon--left"> <Delete /> </el-icon
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="pages.totalRows"
        :pagesize="queryParams.pagination.pageSize"
        :pageIndex="queryParams.pagination.pageIndex"
        :render="render"
      ></pagination>
    </el-col>
  </el-row>
  <HqghDetail ref="hqghDetail" @refresh="F_init"></HqghDetail>
</template>

<script setup>
import { ref, reactive, toRefs } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import HqghDetail from "./hqgh_detail";
import { queryPage, del } from "@/tdzz/api/proj/proj-hqgh";
import { CirclePlus, Delete, Edit } from "@element-plus/icons-vue";
import Pagination from "@/common/components/pagination/index";

const route = useRoute();
const params = route.query;
const hqghDetail = ref(null);
const data = reactive({
  flowinstid: params.flowinstid,
  catalog: params.catalog,
  jbxxSec: params.jbxxSec,
  tableData: [],
  queryParams: {
    jbxxSec: params.jbxxSec,
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  pages: {
    totalRows: 0,
  },
});
const { flowinstid, catalog, jbxxSec, tableData, pages, queryParams } =
  toRefs(data);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_queryPage();
};

/**
 * 添加
 */
const F_add = () => {
  hqghDetail.value.F_ADD(data);
};

/**
 * 编辑
 */
const F_update = (row) => {
  const params = {
    flowinstid: data.flowinstid,
    catalog: data.catalog,
    jbxxSec: data.jbxxSec,
    hqSec: row.hqSec,
  };
  hqghDetail.value.F_UPDATE(params);
};

/**
 * 获取分页
 */
const F_queryPage = () => {
  queryPage(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_queryPage();
};

/**
 * 删除
 */
const F_del = (val) => {
  del(val).then((res) => {
    F_init();
    ElMessage.success(res.msg);
  });
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
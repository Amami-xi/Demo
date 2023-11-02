<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon
        name="wz"
        title="位置：系统维护 > 管护责任人信息录入"
      ></svg-icon>
    </el-col>
  </el-row>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="姓名">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入姓名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_search"
            >搜索
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-button id="btnSearch" type="primary" size="small" @click="F_ADD"
        ><el-icon class="el-icon--left" :size="14"> <CirclePlus /> </el-icon
        >添加
      </el-button>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="userName" label="姓名" width="180" />
        <el-table-column prop="phone" label="电话" width="180" />
        <el-table-column prop="job" label="职务" />
        <el-table-column prop="managescope" label="管护范围" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button @click="F_UPDATE(scope.row)" type="primary" size="small"
              ><el-icon class="el-icon--left"> <Edit /> </el-icon>编辑
            </el-button>
            <el-button @click="F_DELETE(scope.row)" type="danger" size="small"
              ><el-icon class="el-icon--left"> <Delete /> </el-icon>删除
            </el-button>
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
  <GhrlrAdd ref="ghrlrAdd" @refresh="F_refresh"></GhrlrAdd>
</template>
  <script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { getDaibanList } from "@/tdzz/api/workflow/workflow";
import { openTask } from "@/common/api/jtap/taskHandle";
import Pagination from "@/common/components/pagination/index";
import { onMounted } from "@vue/runtime-core";
import moment from "moment";
import {
  Plus,
  Delete,
  ArrowDown,
  CirclePlus,
  Back,
  Edit,
} from "@element-plus/icons-vue";
import { queryPage, del } from "@/tdzz/api/yjjc/yjjcJbntlxr";
import GhrlrAdd from "./ghrlrAdd.vue";
import { ElMessage, ElMessageBox } from "element-plus";

//1.定义路由

//2.定义数据
const ghrlrAdd = ref(null);
const data = reactive({
  tableData: [],
  queryParams: {
    type: 1,
    userName: null, //姓名
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  pages: {
    totalRows: 0,
  },
});
const { tableData, pages, queryParams } = toRefs(data);
//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getTableData();
};

/**
 * 获取列表
 */
const F_getTableData = () => {
  queryPage(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

/**
 * 新增
 */
const F_ADD = () => {
  ghrlrAdd.value.F_ADD(1);
};

/**
 * 编辑
 *
 * @param {Object} row
 */
const F_UPDATE = (row) => {
  ghrlrAdd.value.F_UPDATE(row.lxId);
};

/**
 * 删除
 *
 * @param {Object} row
 */
const F_DELETE = (row) => {
  ElMessageBox.confirm("是否确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      del(row.lxId).then((res) => {
        ElMessage.success(res.msg);
        F_init();
      });
    })
    .catch();
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_getTableData();
};

/**
 * 搜索
 */
const F_search = () => {
  F_getTableData();
};

const F_refresh = () => {
  F_getTableData();
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
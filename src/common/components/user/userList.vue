<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="机构">
          <el-tree-select
            v-model="queryParams.orgId"
            lazy
            :load="orgLoad"
            :props="propsData"
            check-strictly
            @change="orgChange"
          />
        </el-form-item>
        <el-form-item label="部门">
          <el-tree-select
            v-model="queryParams.deptId"
            :data="deptList"
            :props="propsData"
            clearable
          />
        </el-form-item>
        <el-form-item label="用户姓名或登录名">
          <el-input
            v-model="queryParams.keyword"
            placeholder="请输入用户姓名或登录名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="F_search">搜索 </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-button type="primary" size="small" @click="F_addUser"
        ><el-icon class="el-icon--left"> <CirclePlus /> </el-icon
        >新增</el-button
      >
      <el-button type="warning" size="small" @click="F_disableUser"
        ><el-icon class="el-icon--left"> <Delete /> </el-icon>禁用</el-button
      >
      <el-button type="danger" size="small" @click="F_deleteUser"
        ><el-icon class="el-icon--left"> <Delete /> </el-icon>删除</el-button
      >
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table
        :data="tableData"
        border
        max-height="550"
        @selection-change="F_handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="account.loginId" label="登录名" />
        <el-table-column prop="organiseAbbr" label="机构" />
        <el-table-column prop="departmentAbbr" label="部门" />
        <el-table-column prop="mobilePhone" label="手机号" />
        <el-table-column
          prop="account.createTime"
          label="创建时间"
          :formatter="dateFormat"
        />
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button
              @click="F_editUser(scope.row)"
              type="primary"
              size="small"
            >
              <el-icon class="el-icon--left"> <Edit /> </el-icon>编辑
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
  <UserCard ref="userCard" :appCode="appCode" :render="F_search"></UserCard>
</template>
      
<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import { CirclePlus, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getUsers, disableUser, deleteUser } from "@/common/api/jtap/user";
import { getChildrenOrganizations } from "@/common/api/jtap/org";
import { getOrganizationDepartments } from "@/common/api/jtap/dept";
import store from "@/common/store";
import moment from "moment";
import Pagination from "@/common/components/pagination/index";
import UserCard from "./userCard";

//1.定义数据
const props = defineProps({
  appCode: {
    type: String,
    default: "",
  },
});
const propsData = {
  label: "abbr",
  children: "children",
  value: "id",
  isLeaf: "isLeaf",
};
const userCard = ref(null);
const data = reactive({
  user: store.state.user,
  deptList: [],
  tableData: [],
  selection: [],
  queryParams: {
    appCode: props.appCode, //子系统代码
    orgId: store.state.user.organizationId,
    deptId: null,
    keyword: null,
    containDisable: false,
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  pages: {
    totalRows: 0,
  },
});

const { orgId, deptId, deptList, tableData, queryParams, pages } = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_search();
};

/**
 * 搜索
 */
const F_search = () => {
  data.queryParams.pagination.pageIndex = 1;
  getUsers(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

/**
 * 机构下拉事件
 *
 * @param {*} node
 * @param {*} resolve
 */
const orgLoad = (node, resolve) => {
  if (node.isLeaf) return resolve([]);
  if (node.data.length == 0) {
    resolve([
      {
        id: data.user.organizationId,
        abbr: data.user.organizationAbbr,
      },
    ]);
    F_getDepts(data.user.organizationId);
  } else {
    getChildrenOrganizations(node.data.id).then((res) => {
      resolve(res.data);
    });
  }
};

/**
 * 机构选中事件
 *
 * @param {*} orgId
 */
const orgChange = (orgId) => {
  F_getDepts(orgId);
};

/**
 * 获取机构下部门列表
 *
 * @param {*} orgId
 */
const F_getDepts = (orgId) => {
  getOrganizationDepartments(orgId, false, props.appCode).then((res) => {
    data.deptList = res.data;
  });
};

/**
 * 时间格式转换
 *
 * @param {*} row
 * @param {*} column
 */
const dateFormat = (row, column) => {
  let date = row.account.createTime;
  if (date === undefined || date == null) {
    return "";
  }
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  getUsers(data.queryParams).then((res) => {
    data.tableData = res.data.items;
    data.pages.totalRows = res.data.total;
  });
};

/**
 * 复选框勾选事件
 *
 * @param {*} selection
 */
const F_handleSelectionChange = (selection) => {
  data.selection = [];
  selection.map((obj) => {
    data.selection.push(obj.id);
  });
};

/**
 * 新增用户
 */
const F_addUser = () => {
  userCard.value.handleOpen();
};

/**
 * 修改用户
 */
const F_editUser = (row) => {
  userCard.value.handleOpen_update(row);
};

/**
 * 禁用用户
 */
const F_disableUser = () => {
  if (data.selection.length == 0) {
    ElMessageBox.alert("请先选择需要禁用的用户", { type: "warning" })
      .then()
      .catch();
  } else {
    ElMessageBox.confirm("是否确认禁用选中的用户？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        disableUser(data.selection).then((res) => {
          ElMessage.success("禁用成功");
          F_init();
        });
      })
      .catch();
  }
};

/**
 * 删除用户
 */
const F_deleteUser = () => {
  if (data.selection.length == 0) {
    ElMessageBox.alert("请先选择需要删除的用户", { type: "warning" })
      .then()
      .catch();
  } else {
    ElMessageBox.confirm("是否确认删除选中的用户？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        deleteUser(data.selection).then((res) => {
          ElMessage.success("删除成功");
          F_init();
        });
      })
      .catch();
  }
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
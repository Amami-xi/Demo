<template>
  <!-- <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="所属镇">
          <el-select
            placeholder="请选择"
            v-model="queryParams.jbxxXzqdm"
            style="width: 100%"
            filterable
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.code"
              v-for="(item, index) in districtOptions"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目编号">
          <el-input
            v-model="queryParams.jbxxXmbh"
            placeholder="请输入项目编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input
            v-model="queryParams.jbxxXmmc"
            placeholder="请输入项目名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button id="btnSearch" type="primary" @click="F_search"
            >搜索</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form> -->
  <!-- <el-row class="tlw-row">
    <el-col :span="24">
      <el-button id="btnSearch" type="primary" size="small" @click="F_batchFP"
        >批量发送
      </el-button>
    </el-col>
  </el-row> -->
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table
        :data="selection"
        border
        stripe
        max-height="600"
        @selection-change="F_handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" type="index" />
        <el-table-column prop="tbPch" label="批次号" />
        <el-table-column prop="tbh" label="图斑号" />
        <el-table-column
          prop="shapeArea"
          label="图斑总面积"
          :formatter="floatFormatter"
        />
        <el-table-column
          prop="shapeArea"
          label="待整改面积"
          :formatter="floatFormatter"
        />
        <el-table-column prop="zldwmc" label="位置" width="150" />
        <el-table-column label="分配人员">
          <template #default="scope">
            <el-select
              multiple
              v-model="scope.row.userId"
              @click="F_currentChange($event, scope.row)"
              size="small"
            >
              <el-option
                v-for="item in userList"
                :key="item.lxId"
                :label="(item.childrenXzq + '-' + item.userName)"
                :value="item.lxId"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { defineComponent, nextTick, onMounted } from "@vue/runtime-core";
import Pagination from "@/common/components/pagination/index";
import store from "@/common/store";
import { getDetail } from "@/tdzz/api/proj/proj-pcb";
import { getDistrictList } from "@/common/api/jtap/district.js";
import { queryPageByPc } from "@/tdzz/api/proj/proj-jbxx";
import { saveOrUpdate } from "@/tdzz/api/proj/proj-xmfp";
import { ElMessage, ElMessageBox } from "element-plus";
import { getTransferTaskParam } from "@/common/api/jtap/taskHandle";
import { queryPage, findByRegion } from "@/tdzz/api/yjjc/yjjcJbntlxr";
import UserSelect from "./userSelect.vue";

export default defineComponent({
  name: "xmfpList",
  components: { Pagination, UserSelect },
  props: {
    //流程实例ID
    flowinstid: {
      type: String,
      default: "",
    },
    //环节实例ID
    taskId: {
      type: String,
      default: "",
    },
    //环节实例ID
    selection: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    //1.定义数据
    const userSelect = ref(null);
    //定义Tree组件数据格式
    const defaultProps = {
      children: [],
      label: "userName",
      value: "lxId",
    };
    const data = reactive({
      xzqdm: 320621,
      pcbEntity: [],
      districtOptions: [],
      userList: [],
      selectUser: "",
      active: 0,
      stepType: 0,
      queryParams: {},
    });

    //3.定义方法

    /**
     * 初始化
     */
    const F_init = () => {
      // F_getDistrictList();
    };

    /**
     * 获取批次详情
     */
    const F_getPcDetail = () => {
      getDetail(props.flowinstid).then((res) => {
        data.pcbEntity = res.data;
        data.xzqdm = data.pcbEntity.xzqdm;
        F_getDistrictList();
      });
    };

    /**
     * 获取行政区列表
     */
    const F_getDistrictList = () => {
      getDistrictList(data.xzqdm).then((res) => {
        data.districtOptions = res.data;
      });
    };

    /**
     * 获取项目查询列表
     */
    const F_getTdzzXmcxList = () => {
      queryPage(data.queryParams).then((res) => {
        // data.tableData = res.data.items;
        // data.pages.totalRows = res.data.total;
      });
    };

    /**
     * 分页
     */
    const render = (val) => {
      data.queryParams.pagination = val;
      F_getTdzzXmcxList();
    };

    /**
     * 搜索
     */
    const F_search = () => {
      data.queryParams.pagination.pageIndex = 1;
      F_getTdzzXmcxList();
    };

    /**
     * 面积格式化（保留4位小数）
     * @param {*} row
     * @param {*} column
     */
    const floatFormatter = (row, column) => {
      var mj = row[column.property];
      if (mj === undefined || mj == null) {
        mj = 0;
      }
      return Number.parseFloat(mj).toFixed(4);
    };

    /**
     * 批量分配
     */
    const F_batchFP = () => {
      if (props.selection.length == 0) {
        ElMessageBox.alert("请选择需要分配的项目！", "提示", {
          type: "warning",
        })
          .then()
          .catch();
      } else {
        userSelect.value.handleOpen();
      }
    };

    /**
     * 批量选择用户
     * @param {*} selectUser
     */
    const userConfirm = (selectUser) => {
      // data.selectUser = selectUser;
      // const params = {
      //   flowinstid: props.flowinstid,
      //   selectUser: data.selectUser,
      //   jbxxSecs: data.selection,
      // };
      // F_fpSave(params);
    };

    /**
     * 复选框勾选事件
     *
     * @param {*} selection
     */
    const F_handleSelectionChange = (selection) => {
      // data.selection = [];
      // selection.map((obj) => {
      //   data.selection.push(obj.jbxxSec);
      // });
    };

    /**
     * 选择事件
     *
     * @param {*} val
     * @param {*} node
     */
    const F_currentChange = (val, row) => {
      const params = {
        xzqdm: row.zldwdm.substring(0, 6),
        childrenXzqdm: row.zldwdm.substring(0, 9),
      };
      findByRegion(params).then((res) => {
        console.log(res.data);
        nextTick(() => {
          data.userList = res.data;
        });
        console.log(data.userList);
      });
    };

    /**
     * 人员分配信息保存
     */
    const F_fpSave = (params) => {
      saveOrUpdate(params).then((res) => {
        ElMessage.success("分配成功");
        F_getTdzzXmcxList();
      });
    };

    /**
     * 切换步骤
     */
    const switchStep = () => {
      if (data.active++ > 2) data.active = 0;
    };

    //3.入口
    onMounted(() => {
      F_init();
    });

    return {
      ...toRefs(data),
      F_init,
      F_getTdzzXmcxList,
      render,
      F_search,
      F_batchFP,
      F_handleSelectionChange,
      F_currentChange,
      switchStep,
      userConfirm,
      floatFormatter,
      defaultProps,
      userSelect,
    };
  },
});
</script>
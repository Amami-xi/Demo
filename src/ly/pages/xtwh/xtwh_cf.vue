<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="4">
        <el-form-item label="年份">
          <el-date-picker
            type="year"
            v-model="queryParams.year"
            value-format="YYYY"
            placeholder="请选择日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button
            id="btnSearch"
            type="primary"
            @click="F_search"
            size="small"
            >查询</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column prop="xzqmc" label="行政区" width="140" />
        <el-table-column label="商品林" header-align="center">
          <el-table-column
            prop="splFycf"
            label="抚育采伐"
            :formatter="floatFormatter"
          >
            <template #default="scope">
              <el-form-item
                :prop="`tableData.${scope.$index}.splFycf`"
                class="inputwh"
                v-if="scope.row.xzqdm == data.currentSelect && editFlag"
              >
                <el-input type="txt" v-model="scope.row.splFycf"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="splZf"
            label="主伐"
            :formatter="floatFormatter"
          >
            <template #default="scope">
              <el-form-item
                :prop="`tableData.${scope.$index}.splZf`"
                class="inputwh"
                v-if="scope.row.xzqdm == data.currentSelect && editFlag"
              >
                <el-input type="txt" v-model="scope.row.splZf"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="splDclgz"
            label="低产林"
            :formatter="floatFormatter"
          >
            <template #default="scope">
              <el-form-item
                :prop="`tableData.${scope.$index}.splDclgz`"
                class="inputwh"
                v-if="scope.row.xzqdm == data.currentSelect && editFlag"
              >
                <el-input type="txt" v-model="scope.row.splDclgz"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="splQtcf"
            label="其他采伐"
            :formatter="floatFormatter"
          >
            <template #default="scope">
              <el-form-item
                :prop="`tableData.${scope.$index}.splQtcf`"
                class="inputwh"
                v-if="scope.row.xzqdm == data.currentSelect && editFlag"
              >
                <el-input type="txt" v-model="scope.row.splQtcf"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column prop="splHj" label="合计">
            <template #default="scope">
              {{
                (
                  Number.parseFloat(
                    isNullorEmpty(scope.row.splQtcf) ? 0 : scope.row.splQtcf
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.splDclgz) ? 0 : scope.row.splDclgz
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.splZf) ? 0 : scope.row.splZf
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.splFycf) ? 0 : scope.row.splFycf
                  )
                ).toFixed(4)
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="splYsy"
            label="已使用"
            :formatter="floatFormatter"
          >
          </el-table-column>
          <el-table-column label="剩余" :formatter="floatFormatter">
            <template #default="scope">
              {{
                (
                  Number.parseFloat(
                    isNullorEmpty(scope.row.splQtcf) ? 0 : scope.row.splQtcf
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.splDclgz) ? 0 : scope.row.splDclgz
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.splZf) ? 0 : scope.row.splZf
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.splFycf) ? 0 : scope.row.splFycf
                  ) -
                  Number.parseFloat(
                    isNullorEmpty(scope.row.splYsy) ? 0 : scope.row.splYsy
                  )
                ).toFixed(4)
              }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="公益林" header-align="center">
          <el-table-column
            prop="gylFycf"
            label="抚育采伐"
            :formatter="floatFormatter"
          >
            <template #default="scope">
              <el-form-item
                :prop="`tableData.${scope.$index}.gylFycf`"
                class="inputwh"
                v-if="scope.row.xzqdm == data.currentSelect && editFlag"
              >
                <el-input type="txt" v-model="scope.row.gylFycf"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="gylGxcf"
            label="更新采伐"
            :formatter="floatFormatter"
          >
            <template #default="scope">
              <el-form-item
                :prop="`tableData.${scope.$index}.gylGxcf`"
                class="inputwh"
                v-if="scope.row.xzqdm == data.currentSelect && editFlag"
              >
                <el-input type="txt" v-model="scope.row.gylGxcf"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="gylDxlgz"
            label="低效林"
            :formatter="floatFormatter"
          >
            <template #default="scope">
              <el-form-item
                :prop="`tableData.${scope.$index}.gylDxlgz`"
                class="inputwh"
                v-if="scope.row.xzqdm == data.currentSelect && editFlag"
              >
                <el-input type="txt" v-model="scope.row.gylDxlgz"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="gylQtcf"
            label="其他采伐"
            :formatter="floatFormatter"
          >
            <template #default="scope">
              <el-form-item
                :prop="`tableData.${scope.$index}.gylQtcf`"
                class="inputwh"
                v-if="scope.row.xzqdm == data.currentSelect && editFlag"
              >
                <el-input type="txt" v-model="scope.row.gylQtcf"></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column
            prop="gylHj"
            label="合计"
            :formatter="floatFormatter"
          >
            <template #default="scope">
              {{
                (
                  Number.parseFloat(
                    isNullorEmpty(scope.row.gylQtcf) ? 0 : scope.row.gylQtcf
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.gylDxlgz) ? 0 : scope.row.gylDxlgz
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.gylGxcf) ? 0 : scope.row.gylGxcf
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.gylFycf) ? 0 : scope.row.gylFycf
                  )
                ).toFixed(4)
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="gylYsy"
            label="已使用"
            :formatter="floatFormatter"
          >
          </el-table-column>
          <el-table-column label="剩余" :formatter="floatFormatter">
            <template #default="scope">
              {{
                (
                  Number.parseFloat(
                    isNullorEmpty(scope.row.gylQtcf) ? 0 : scope.row.gylQtcf
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.gylDxlgz) ? 0 : scope.row.gylDxlgz
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.gylGxcf) ? 0 : scope.row.gylGxcf
                  ) +
                  Number.parseFloat(
                    isNullorEmpty(scope.row.gylFycf) ? 0 : scope.row.gylFycf
                  ) -
                  Number.parseFloat(
                    isNullorEmpty(scope.row.gylYsy) ? 0 : scope.row.gylYsy
                  )
                ).toFixed(4)
              }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="100" v-if="editFlag">
          <template #default="scope">
            <el-button
              @click="F_save(scope.row)"
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
import { getCurrentInstance } from "@vue/runtime-core";
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Pagination from "@/common/components/pagination/index";
import moment from "moment";
import { onMounted } from "@vue/runtime-core";
import { init, saveOrUpdate, isNullorEmpty } from "@/ly/api/xtwh/xtwh_cf";
import { ElMessage, ElMessageBox } from "element-plus";
import { getDistrictList } from "@/common/api/jtap/district";
import store from "@/common/store";
import { Edit, Finished } from "@element-plus/icons-vue";
//1.定义路由
const router = useRouter();

//2.定义数据
const data = reactive({
  xzqdm: store.state.user.regionCode.substring(0, 4) + "00", //行政区代码
  editFlag: store.state.user.organizationGrade == "市局" ? true : false, //控制表格是否可编辑
  tableData: [{}, {}], //表格要展示的数据   请求数据 将数据给到他
  businessList: [],
  districtOptions: [], //行政区列表
  queryParams: {
    xzqdm: "",
    year: "",
  },
  currentSelect: "",
});
const {
  xzqdm,
  editFlag,
  currentSelect,
  tableData,
  queryParams,
  businessList,
  districtOptions,
} = toRefs(data);
const currentInstance = getCurrentInstance();
//3.定义方法

/**
 * 分页查询列表
 */
const F_init = () => {
  F_getDistrictList();
  F_search();
};

/**
 * 查询
 */
const F_search = () => {
  data.queryParams.year = new Date().getFullYear() + "";
  init(data.queryParams).then((res) => {
    data.tableData = res.data;
    if (store.state.user.organizationGrade != "市局") {
      data.tableData = data.tableData.filter(
        (val) => val.xzqdm == store.state.user.regionCode
      );
    }
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
 * 保存
 */
const F_save = (row) => {
  row.splHj = (
    Number.parseFloat(isNullorEmpty(row.splQtcf) ? 0 : row.splQtcf) +
    Number.parseFloat(isNullorEmpty(row.splDclgz) ? 0 : row.splDclgz) +
    Number.parseFloat(isNullorEmpty(row.splZf) ? 0 : row.splZf) +
    Number.parseFloat(isNullorEmpty(row.splFycf) ? 0 : row.splFycf)
  ).toFixed(4);
  row.gylHj = (
    Number.parseFloat(isNullorEmpty(row.gylQtcf) ? 0 : row.gylQtcf) +
    Number.parseFloat(isNullorEmpty(row.gylDxlgz) ? 0 : row.gylDxlgz) +
    Number.parseFloat(isNullorEmpty(row.gylGxcf) ? 0 : row.gylGxcf) +
    Number.parseFloat(isNullorEmpty(row.gylFycf) ? 0 : row.gylFycf)
  ).toFixed(4);

  saveOrUpdate(row).then((res) => {
    ElMessage.success("保存成功");
    data.currentSelect = "";
    row.whId = res.data.jbxx.whId;
    row.saveFlag = 0;
  });
};

/**
 * 编辑
 */
const F_UPDATE = (row) => {
  data.currentSelect = row.xzqdm;
  row.saveFlag = 1;
};

const floatFormatter = (row, column) => {
  var amount = row[column.property];
  if (amount === undefined || amount == null) {
    amount = 0;
  }
  return Number.parseFloat(amount).toFixed(4);
};

//4.入口
onMounted(() => {
  F_init();
});
</script>

<style lang="scss" scoped>
.inputwh {
  margin-top: 8px;
  text-align: center;
}
</style>

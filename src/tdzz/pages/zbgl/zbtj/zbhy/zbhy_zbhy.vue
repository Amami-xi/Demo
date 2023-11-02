<template>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-form-item v-if="data.grade == '市局'">
        <el-upload
          :show-file-list="false"
          :before-upload="F_beforeUpload"
          :http-request="F_import"
          :limit="1"
          ref="upload"
        >
          <el-button
            #="trigger"
            type="primary"
            style="float: left; margin-bottom: 10px"
            >导入</el-button
          >
        </el-upload>
      </el-form-item>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="xzq" label="行政区" width="180" />
        <el-table-column prop="xzqdm" label="行政区代码（账户）" width="180" />
        <el-table-column prop="gdzb" label="耕地数量（公顷）">
          <template #default="scope">
            <div v-if="scope.row.xzqdm === tabClickIndex">
              <el-input
                v-model="data.params.gdzb"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.gdzb }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="stzb" label="水田规模（公顷）">
          <template #default="scope">
            <div v-if="scope.row.xzqdm === tabClickIndex">
              <el-input
                v-model="data.params.stzb"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.stzb }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="cnzb" label="粮食产能（万公斤）">
          <template #default="scope">
            <div v-if="scope.row.xzqdm === tabClickIndex">
              <el-input
                v-model="data.params.cnzb"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.cnzb }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          v-if="state == 1 && grade != '市局'"
        >
          <template #default="scope">
            <div v-if="scope.row.xzqdm === tabClickIndex">
              <el-input
                v-model="data.params.remark"
                placeholder="请输入备注"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="info"
              @click="handleEditor(scope.row)"
              v-if="state == 0"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="success"
              @click="handleSave(scope.row)"
              v-if="state == 1 && scope.row.xzqdm === tabClickIndex"
              >{{ data.buttonName }}</el-button
            >
            <el-button
              size="small"
              type="warning"
              @click="handleCancel(scope.row)"
              v-if="state == 1 && scope.row.xzqdm === tabClickIndex"
              >取消</el-button
            >
          </template>
        </el-table-column>
        <!-- <template #default="scope"> </template> -->
        <!-- <el-table-column label="指标明细" width="100">
          </el-table-column> -->
      </el-table>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import { ElMessage, ElMessageBox } from "element-plus";
import { getListByXzqdm, zbhy, importZbk } from "@/tdzz/api/zbgl/zbtj/zbhy/zbk";

//1.定义数据
const upload = ref();
const data = reactive({
  xzqdm: store.state.user.regionCode,
  grade: store.state.user.organizationGrade,
  tableData: [
    // { codeName: "南通市", codeValue: 320600, gdzb: 10, stzb: 20, cnzb: 30 },
    // { codeName: "崇川区", codeValue: 320602, gdzb: 10, stzb: 20, cnzb: 30 },
    // { codeName: "通州区", codeValue: 320612, gdzb: 10, stzb: 20, cnzb: 30 },
    // { codeName: "海安市", codeValue: 320621, gdzb: 10, stzb: 20, cnzb: 30 },
    // { codeName: "如东县", codeValue: 320623, gdzb: 10, stzb: 20, cnzb: 30 },
    // { codeName: "启东市", codeValue: 320681, gdzb: 10, stzb: 20, cnzb: 30 },
    // { codeName: "如皋市", codeValue: 320682, gdzb: 10, stzb: 20, cnzb: 30 },
    // { codeName: "海门区", codeValue: 320684, gdzb: 10, stzb: 20, cnzb: 30 },
    // { codeName: "高新区", codeValue: 320687, gdzb: 10, stzb: 20, cnzb: 30 },
    // {
    //   codeName: "经济技术开发区",
    //   codeValue: 320604,
    //   gdzb: 10,
    //   stzb: 20,
    //   cnzb: 30,
    // },
    // { codeName: "苏锡通园区", codeValue: 320688, gdzb: 10, stzb: 20, cnzb: 30 },
    // {
    //   codeName: "通州湾示范区",
    //   codeValue: 320699,
    //   gdzb: 10,
    //   stzb: 20,
    //   cnzb: 30,
    // },
  ],
  tabClickIndex: null, // 点击的单元格
  tabClickColumn: null,
  tabClickLabel: "", // 当前点击的列名
  // 需要编辑的属性
  editProp: ["gdzb", "stzb", "cnzb"],
  // 保存进入编辑的cell
  clickCellMap: {},
  buttonName: "",
  state: 0,
  params: {
    xzqdm: store.state.user.regionCode,
    gdzb: 0,
    stzb: 0,
    cnzb: 0,
    remark: "",
  },
});

const {
  xzqdm,
  grade,
  tableData,
  tabClickIndex,
  tabClickColumn,
  tabClickLabel,
  editProp,
  clickCellMap,
  buttonName,
  state,
  params,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_load();
  F_getList();
};

const F_load = () => {
  if (data.grade == "市局") {
    data.buttonName = "保存";
  } else {
    data.buttonName = "确认提交";
  }
};

/**
 * 列表查询
 */
const F_getList = () => {
  getListByXzqdm(data.params).then((res) => {
    data.tableData = res.data;
  });
};

/**
 * 上传前检查
 * @param {*} file
 */
const F_beforeUpload = (file) => {
  let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
  if (extension !== "xlsx") {
    ElMessageBox.alert("暂只支持xlsx格式的文件", "提示", { type: "warning" })
      .then()
      .catch();
    upload.value.clearFiles();
    return false;
  }
};

/**
 * 导入
 */
const F_import = (param) => {
  const formData = new FormData();
  formData.append("file", param.file);
  // formData.append("userId", store.state.user.userId);
  importZbk(formData)
    .then((res) => {
      F_init();
    })
    .catch(() => {});
  upload.value.clearFiles();
};

const handleEditor = (row) => {
  data.tabClickIndex = row.xzqdm;
  data.state = 1;
};

const handleSave = (row, event, column) => {
  data.tabClickIndex = null;
  data.tabClickLabel = "";
  data.state = 0;
  data.params.xzqdm = row.xzqdm;
  zbhy(data.params).then((res) => {
    F_init();
  });
};

const handleCancel = () => {
  data.tabClickIndex = null;
  data.tabClickLabel = "";
  data.state = 0;
};

//3.入口
onMounted(() => {
  F_init();
});
</script>

<style lang='scss'>
</style>
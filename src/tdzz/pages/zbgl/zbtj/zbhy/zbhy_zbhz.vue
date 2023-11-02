<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="划出行政区">
          <el-select
            v-model="params.xzqdm"
            clearable
            @clear="handleClear"
            @change="changeHc"
          >
            <el-option
              v-for="(item, index) in hcxzq"
              :key="index"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="F_getList">查询</el-button>
        </el-form-item>
        <el-form-item label="划入行政区">
          <el-select v-model="params.hrxzqdm" clearable>
            <el-option
              v-for="(item, index) in hrxzq"
              :key="index"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="F_init">查询</el-button>
        <el-button type="primary" @click="F_init">划转</el-button>
      </el-col>
    </el-row> -->
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column prop="xzq" label="行政区" />
        <el-table-column prop="xzqdm" label="行政区代码（账户）" />
        <el-table-column label="耕地数量（公顷）">
          <el-table-column prop="gdzb" label="剩余" />
          <el-table-column label="划出">
            <template #default="scope">
              <div
                v-if="scope.row != null && scope.row.xzqdm === tabClickIndex"
              >
                <el-input
                  v-model="scope.row.hcgdzb"
                  @input="checkGd(scope.row)"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单价（万元）">
            <template #default="scope">
              <div v-if="scope.row.xzqdm === tabClickIndex">
                <el-input v-model="scope.row.hcgddj"></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="水田规模（公顷）">
          <el-table-column prop="stzb" label="剩余" />
          <el-table-column label="划出">
            <template #default="scope">
              <div v-if="scope.row.xzqdm === tabClickIndex">
                <el-input
                  v-model="scope.row.hcstzb"
                  @input="checkSt(scope.row)"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单价（万元）">
            <template #default="scope">
              <div v-if="scope.row.xzqdm === tabClickIndex">
                <el-input v-model="scope.row.hcstdj"></el-input>
              </div> </template
          ></el-table-column>
        </el-table-column>
        <el-table-column label="粮食产能（万公斤）">
          <el-table-column prop="cnzb" label="剩余" />
          <el-table-column label="划出">
            <template #default="scope">
              <div v-if="scope.row.xzqdm === tabClickIndex">
                <el-input
                  v-model="scope.row.hccnzb"
                  @input="checkCn(scope.row)"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单价（万元）">
            <template #default="scope">
              <div v-if="scope.row.xzqdm === tabClickIndex">
                <el-input v-model="scope.row.hccndj"></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-model="params.zje" label="总金额（万元）">
          <template #default="scope">
            {{
              Number.parseInt(isNaN(scope.row.hcgdzb) ? 0 : scope.row.hcgdzb) *
                Number.parseInt(
                  isNaN(scope.row.hcgddj) ? 0 : scope.row.hcgddj
                ) +
              Number.parseInt(isNaN(scope.row.hcstzb) ? 0 : scope.row.hcstzb) *
                Number.parseInt(
                  isNaN(scope.row.hcstdj) ? 0 : scope.row.hcstdj
                ) +
              Number.parseInt(isNaN(scope.row.hccnzb) ? 0 : scope.row.hccnzb) *
                Number.parseInt(isNaN(scope.row.hccndj) ? 0 : scope.row.hccndj)
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
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
              @click="handleConfirm(scope.row)"
              v-if="state == 1 && scope.row.xzqdm === tabClickIndex"
              >划转</el-button
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
import { ref } from "@vue/reactivity";
import store from "@/common/store";
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import { getDistrictList } from "@/common/api/jtap/district";
import { getByXzqdm, zbhz } from "@/tdzz/api/zbgl/zbtj/zbhy/zbk";

//1.定义数据
const data = reactive({
  xzqdm: store.state.user.regionCode.substring(0, 4) + "00",
  grade: store.state.user.organizationGrade,
  xzq: [],
  hcxzq: [],
  hrxzq: [],
  tableData: [],
  tabClickIndex: null,
  state: 0,
  queryParams: {
    xzqdm: "",
    hrxzqdm: "",
  },
  params: {
    xzqdm: "",
    hrxzqdm: "",
    hcgdzb: "",
    hcgddj: "",
    hcstzb: "",
    hcstdj: "",
    hccnzb: "",
    hccndj: "",
    zje: 0,
  },
});

const {
  xzqdm,
  grade,
  xzq,
  hcxzq,
  hrxzq,
  tableData,
  tabClickIndex,
  state,
  queryParams,
  params,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getTdzzRegionCode();
};

/**
 * 查询行政区代码
 */
const F_getTdzzRegionCode = () => {
  getDistrictList(data.xzqdm).then((res) => {
    data.xzq = res.data;
    //市级可选行政区
    if (data.grade == "市局") {
      let arr = res.data.filter((item) => {
        if (item.name == "海安市") {
          return;
        }
        if (item.name == "如皋市") {
          return;
        }
        if (item.name == "启东市") {
          return;
        }
        if (item.name == "海门市") {
          return;
        }
        return item;
      });
      data.hcxzq = arr;
    } else {
      //县级可选行政区
      let arr = res.data.filter((item) => {
        if (item.code == store.state.user.regionCode) {
          return item;
        }
      });
      data.hcxzq = arr;
    }
  });
};

/**
 * 列表查询
 */
const F_getList = () => {
  getByXzqdm(data.params).then((res) => {
    data.tableData = [];
    data.tableData.push(res.data);
  });
};

const handleEditor = (row) => {
  data.tabClickIndex = row.xzqdm;
  data.state = 1;
};

const handleConfirm = (row) => {
  if (data.params.hrxzqdm == "") {
    ElMessage.error("请选择划入行政区");
    return;
  }
  if (isNaN(parseFloat(row.hcgdzb)) || isNaN(parseFloat(row.hcgddj))) {
    ElMessage.error("请输入划出耕地信息");
    return;
  }
  if (isNaN(parseFloat(row.hcstzb)) || isNaN(parseFloat(row.hcstdj))) {
    ElMessage.error("请输入划出水田信息");
    return;
  }
  if (isNaN(parseFloat(row.hccnzb)) || isNaN(parseFloat(row.hccndj))) {
    ElMessage.error("请输入划出产能信息");
    return;
  }
  row.hcxzqdm = data.params.xzqdm;
  row.hrxzqdm = data.params.hrxzqdm;
  row.zje =
    Number.parseInt(isNaN(row.hcgdzb) ? 0 : row.hcgdzb) *
      Number.parseInt(isNaN(row.hcgddj) ? 0 : row.hcgddj) +
    Number.parseInt(isNaN(row.hcstzb) ? 0 : row.hcstzb) *
      Number.parseInt(isNaN(row.hcstdj) ? 0 : row.hcstdj) +
    Number.parseInt(isNaN(row.hccnzb) ? 0 : row.hccnzb) *
      Number.parseInt(isNaN(row.hccndj) ? 0 : row.hccndj);
  zbhz(row).then((res) => {
    data.params.xzqdm = "";
    data.params.hrxzqdm = "";
    data.params.xzqdm = "";
    data.hrxzq = [];
    data.tableData = [];
    ElMessage.success(res.msg);
  });
};

const handleCancel = () => {
  data.tabClickIndex = null;
  data.state = 0;
};

const handleClear = () => {
  data.tableData = [];
};

const checkGd = (row) => {
  if (parseFloat(row.hcgdzb).toString() == "NaN") {
    row.hcgdzb = "";
    ElMessage.error("请输入一个数字");
  }
  if (row.hcgdzb >= row.gdzb) {
    row.hcgdzb = row.gdzb;
  }
};

const checkSt = (row) => {
  if (parseFloat(row.hcstzb).toString() == "NaN") {
    row.hcstzb = "";
    ElMessage.error("请输入一个数字");
  }
  if (row.hcstzb >= row.stzb) {
    row.hcstzb = row.stzb;
  }
};

const checkCn = (row) => {
  if (parseFloat(row.hccnzb).toString() == "NaN") {
    row.hccnzb = "";
    ElMessage.error("请输入一个数字");
  }
  if (row.hccnzb >= row.cnzb) {
    row.hccnzb = row.cnzb;
  }
};

const changeHc = (val) => {
  if (val == "") {
    return;
  }
  data.params.hrxzqdm = "";
  data.hrxzq = [];
  data.tableData = [];
  const obj = data.hcxzq.find(function (i) {
    return i.code === val;
  });
  //如东县
  if (obj.code === "320623") {
    data.xzq.find(function (i) {
      if (i.code === "320699") {
        data.hrxzq.push(i);
      }
    });
  }
  //通州区
  if (obj.code === "320612") {
    data.xzq.find(function (i) {
      if (i.code === "320699" || i.code === "320688" || i.code === "320687") {
        data.hrxzq.push(i);
      }
    });
  }
  //崇川区
  if (obj.code === "320602") {
    data.xzq.find(function (i) {
      if (i.code === "320604" || i.code === "320688") {
        data.hrxzq.push(i);
      }
    });
  }
  //通州湾示范区
  if (obj.code === "320699") {
    data.xzq.find(function (i) {
      //如东县和通州区
      if (i.code === "320623" || i.code === "320612") {
        data.hrxzq.push(i);
      }
    });
  }
  //苏锡通园区
  if (obj.code === "320688") {
    data.xzq.find(function (i) {
      //崇川区和通州区
      if (i.code === "320602" || i.code === "320612") {
        data.hrxzq.push(i);
      }
    });
  }
  //高新区
  if (obj.code === "320687") {
    data.xzq.find(function (i) {
      //通州区
      if (i.code === "320612") {
        data.hrxzq.push(i);
      }
    });
  }
  //经济技术开发区
  if (obj.code === "320604") {
    data.xzq.find(function (i) {
      //崇川区
      if (i.code === "320602") {
        data.hrxzq.push(i);
      }
    });
  }
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
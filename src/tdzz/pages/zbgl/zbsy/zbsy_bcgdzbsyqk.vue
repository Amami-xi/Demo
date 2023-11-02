<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon
        name="wz"
        title="位置：指标使用 > 补充耕地指标使用情况"
      ></svg-icon>
    </el-col>
  </el-row>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="预算编号/验收编号/项目名称/JBXX_SEC：">
          <el-input
            v-model="queryParams.qrxxh"
            placeholder="请输入内容"
            clearable
            style="width: 30vw"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="tlw-row-table">
    <el-row><el-col :span="24">补充耕地项目基本信息（Z_JBXX）</el-col></el-row>
    <el-row>
      <el-col :span="6">JBXX_SEC: </el-col><el-col :span="18"></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">建设项目情况(B_JSXM): </el-col>
      <el-col :span="18"></el-col
    ></el-row>
  </div>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="占补关系数据（B_ZBGX）">
          <el-table-column prop="" label="建设项目名称" />
          <el-table-column prop="" label="确认信息号" />
          <el-table-column prop="" label="挂钩时间" />
          <el-table-column prop="" label="指标所属行政区" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
          <el-table-column prop="" label="是否边占边补" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="占补关系数据（B_ZBGX）">
          <el-table-column prop="" label="建设项目名称" />
          <el-table-column prop="" label="确认信息号" />
          <el-table-column prop="" label="挂钩时间" />
          <el-table-column prop="" label="指标所属行政区" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
          <el-table-column prop="" label="是否边占边补" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="占补关系提质改造数据（B_ZBGXGZ）">
          <el-table-column prop="" label="建设项目名称" />
          <el-table-column prop="" label="确认信息号" />
          <el-table-column prop="" label="挂钩时间" />
          <el-table-column prop="" label="指标所属行政区" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
          <el-table-column prop="" label="是否边占边补" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="授权数据（B_SQMX）">
          <el-table-column prop="" label="授出行政区" />
          <el-table-column prop="" label="授入行政区" />
          <el-table-column prop="" label="授权时间" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="授权提质改造数据（B_SQMXGZ）">
          <el-table-column prop="" label="授出行政区" />
          <el-table-column prop="" label="授入行政区" />
          <el-table-column prop="" label="授权时间" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <div class="tlw-row-table">
    <el-row><el-col :span="24">占补平衡补录项目（HC_JDYS）</el-col></el-row>
    <el-row>
      <el-col :span="6">DATA_SEC: </el-col><el-col :span="18"></el-col>
    </el-row>
  </div>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="核查结果反馈（HC_ZBJGFK）">
          <el-table-column prop="" label="预算编号" />
          <el-table-column prop="" label="验收编号" />
          <el-table-column prop="" label="项目名称" />
          <el-table-column prop="" label="行政区代码" />
          <el-table-column prop="" label="当前状态" />
          <el-table-column prop="" label="数据类型" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="指标核减（HC_ZBHJ）">
          <el-table-column prop="" label="备案项目编号" />
          <el-table-column prop="" label="当前状态" />
          <el-table-column prop="" label="核减类别" />
          <el-table-column prop="" label="填报时间" />
          <el-table-column prop="" label="审核时间" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="出入库记录（B_ZBCRKJL）">
          <el-table-column prop="" label="行政区名称" />
          <el-table-column prop="" label="操作时间" />
          <el-table-column prop="" label="指标类型" />
          <el-table-column prop="" label="指标摘要" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="边占边补项目设置（Z_BZBBXM）">
          <el-table-column prop="" label="设置次数" />
          <el-table-column prop="" label="操作时间" />
          <el-table-column prop="" label="指标类型" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="报件表（Z_BJB）">
          <el-table-column prop="" label="报件阶段" />
          <el-table-column prop="" label="项目状态" />
          <el-table-column prop="" label="初始行政区" />
          <el-table-column prop="" label="来源行政区" />
          <el-table-column prop="" label="流转行政区" />
          <el-table-column prop="" label="操作时间" />
          <el-table-column prop="" label="是否正在阅读" />
          <el-table-column prop="" label="是否退件" />
          <el-table-column prop="" label="是否撤件" />
          <el-table-column prop="" label="是否可编辑" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import Pagination from "@/common/components/pagination/index";

//1.定义数据
const data = reactive({
  tableData: [],
  districtOptions: [], //行政区列表
  queryParams: {
    qrxxh: "", //确认信息号
    xmmc: "", //建设项目名称
    xzqdm: "", //项目所在地
    pzStartTime: "", //批准日期开始时间
    pzEndTime: "", //批准日期结束时间
    hxStartTime: "", //核销日期开始时间
    hxEndTime: "", //核销日期结束时间
    ggStartTime: "", //挂钩日期开始时间
    ggEndTime: "", //挂钩日期结束时间
    sfkcn: "", //是否可承诺
    sfbzbb: "", //是否边占边补
    sfhx: "", //是否核销
    xmzt: "", //项目状态
    pagination: {
      pageIndex: 1,
      pageSize: 10,
    },
  },
  pages: {
    totalRows: 0,
    totalPages: 0,
  },
  sfOptions: [
    { name: "否", value: 0 },
    { name: "是", value: 1 },
  ],
  xmztOptions: [
    { name: "拟件", value: "拟件" },
    { name: "待审", value: "待审" },
    { name: "备案", value: "备案" },
    { name: "撤件", value: "撤件" },
    { name: "省级退件", value: "省级退件" },
    { name: "省级解挂", value: "省级解挂" },
    { name: "市级待审", value: "市级待审" },
    { name: "市级退回", value: "市级退回" },
  ],
});

const {
  tableData,
  districtOptions,
  sfOptions,
  xmztOptions,
  queryParams,
  pages,
} = toRefs(data);

//2.定义方法

/**
 * 初始化页面
 */
const F_init = () => {
  F_getSytzList();
};

/**
 * 获取台账信息
 */
const F_getSytzList = () => {};

//3.入口
onMounted(() => {
  F_init();
});
</script>

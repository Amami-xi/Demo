<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon name="wz" title="位置：指标使用 > 使用台账"></svg-icon>
    </el-col>
  </el-row>
  <el-form :inline="true" class="tlw-search tlw-search-more">
    <el-row>
      <el-col :span="24">
        <el-form-item label="确认信息号">
          <el-input
            v-model="queryParams.qrxxh"
            placeholder="补充耕地确认信息编号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="建设项目名称">
          <el-input
            v-model="queryParams.xmmc"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目所在地">
          <el-select
            v-model="queryParams.xzqdm"
            placeholder="请选择"
            style="width: 100%"
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
        <el-form-item label="批准日期">
          <el-date-picker
            v-model="queryParams.pzStartTime"
            type="date"
            placeholder="请选择"
            clearable
            value-format="YYYY-MM-DD HH:mm:ss"
          />
          <span style="margin: 0 10px">至</span>
          <el-date-picker
            v-model="queryParams.pzEndTime"
            type="date"
            placeholder="请选择"
            clearable
            value-format="YYYY-MM-DD 59:59:59"
          />
        </el-form-item>
        <el-form-item label="核销日期">
          <el-date-picker
            v-model="queryParams.hxStartTime"
            type="date"
            placeholder="请选择"
            clearable
            value-format="YYYY-MM-DD HH:mm:ss"
          />
          <span style="margin: 0 10px">至</span>
          <el-date-picker
            v-model="queryParams.hxEndTime"
            type="date"
            placeholder="请选择"
            clearable
            value-format="YYYY-MM-DD 59:59:59"
          />
        </el-form-item>
        <el-form-item label="挂钩日期">
          <el-date-picker
            v-model="queryParams.hxStartTime"
            type="date"
            placeholder="请选择"
            clearable
            value-format="YYYY-MM-DD HH:mm:ss"
          />
          <span style="margin: 0 10px">至</span>
          <el-date-picker
            v-model="queryParams.hxEndTime"
            type="date"
            placeholder="请选择"
            clearable
            value-format="YYYY-MM-DD 59:59:59"
          />
        </el-form-item>
        <el-form-item label="是否可承诺">
          <el-select
            v-model="queryParams.sfkcn"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in sfOptions"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 是否边占边补">
          <el-select
            v-model="queryParams.sfbzbb"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in sfOptions"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 是否核销">
          <el-select
            v-model="queryParams.sfhx"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in sfOptions"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 项目状态">
          <el-select
            v-model="queryParams.xmzt"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="(item, index) in xmztOptions"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="F_getSytzList">查询</el-button>
        <el-button type="primary">导出本页</el-button>
        <el-button type="primary">导出全部</el-button>
      </el-col>
    </el-row>
  </el-form>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column label="建设项目信息">
          <el-table-column prop="1" label="建设用地项目名称" />
          <el-table-column prop="2" label="补充耕地信息确认单编号" />
          <el-table-column prop="3" label="项目所在地" />
          <el-table-column prop="4" label="挂钩时间" />
          <el-table-column prop="5" label="核销时间" />
          <el-table-column prop="6" label="批准机关" />
          <el-table-column prop="7" label="批复文号" />
          <el-table-column prop="11" label="批准时间" />
          <el-table-column prop="12" label="建设用地总面积" />
          <el-table-column prop="13" label="占用耕地面积" />
          <el-table-column prop="14" label="占用水田面积" />
          <el-table-column prop="" label="占用粮食产能" />
        </el-table-column>
        <el-table-column label="补充指标情况">
          <el-table-column prop="" label="指标类型" />
          <el-table-column prop="" label="指标账户/项目编号" />
          <el-table-column prop="" label="指标所在行政区" />
          <el-table-column prop="" label="补充耕地面积" />
          <el-table-column prop="" label="补充水田面积" />
          <el-table-column prop="" label="补充粮食产能" />
          <el-table-column prop="" label="计划新增耕地面积" />
          <el-table-column prop="" label="计划补充粮食产能" />
          <el-table-column prop="" label="计划平均质量等别" />
          <el-table-column prop="" label="实际新增耕地面积" />
          <el-table-column prop="" label="实际补充粮食产能" />
          <el-table-column prop="" label="验收平均质量等别" />
          <el-table-column prop="" label="当前阶段" />
          <el-table-column prop="" label="当前状态" />
          <el-table-column prop="" label="项目是否入库" />
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
</template>

<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { getTdzzSytzList } from "@/tdzz/api/zbgl/zbsy/zbsy_sytz"
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
const F_getSytzList = () => {
  getTdzzSytzList(data.queryParams).then((res) => {
    data.tableData = res.data.lists;
    data.pages.totalPages = res.data.totalPages;
    data.pages.totalRows = res.data.rows;
  });
};

/**
 * 分页
 */
const render = (val) => {
  data.queryParams.pagination = val;
  F_init();
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
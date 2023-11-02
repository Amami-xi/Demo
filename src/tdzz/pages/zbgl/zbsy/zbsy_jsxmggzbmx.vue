<template>
  <el-row class="tlw_bar">
    <el-col>
      <svg-icon
        name="wz"
        title="位置：指标使用 > 建设项目挂钩指标明细"
      ></svg-icon>
    </el-col>
  </el-row>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="预算编号/验收编号/项目名称/JBXX_SEC：">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入内容"
            clearable
            style="width: 30vw"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="F_getJsxmList">查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="tlw-row-table">
    <el-row>
      <el-col :span="6">检查结果: </el-col><el-col :span="18"></el-col>
    </el-row>
    <el-row><el-col :span="24">建设项目情况（B_JSXM）</el-col></el-row>
    <el-row>
      <el-col :span="6">建设项目情况(B_JSXM): </el-col>
      <el-col :span="18"></el-col
    ></el-row>
    <el-row>
      <el-col :span="6">JSXM_SEC：</el-col>
      <el-col :span="18">{{tableData.JSXM_SEC}}</el-col
    ></el-row>
    <el-row>
      <el-col :span="6">确认信息号: </el-col>
      <el-col :span="6">{{tableData.JSXM_QRXX}}</el-col>
      <el-col :span="6">操作时间: </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">项目名称: </el-col>
      <el-col :span="6">{{tableData.JSXM_XMMC}}</el-col>
      <el-col :span="6">项目性质: </el-col>
      <el-col :span="6">{{tableData.XMXZ}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">项目所在地: </el-col>
      <el-col :span="18">{{tableData.JSXM_REGIONNAME}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">项目状态: </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4">是否核销: </el-col>
      <el-col :span="4">{{tableData.JSXM_SFHX}}</el-col>
      <el-col :span="4">是否备案: </el-col>
      <el-col :span="4">{{tableData.JSXM_SFBA}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">版本号: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">核销时间: </el-col>
      <el-col :span="4">{{tableData.JSXM_HXSJ}}</el-col>
      <el-col :span="4">挂钩时间: </el-col>
      <el-col :span="4">{{tableData.JSXM_HXSJ}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">稳增长项目: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">可承诺项目: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">国家重点建设项目: </el-col><el-col :span="4"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">承诺期限: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">承诺兑现期限: </el-col><el-col :span="12"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">建设用地总面积: </el-col>
      <el-col :span="4">{{tableData.JSXM_JSYDZMJ}}</el-col>
      <el-col :span="4">占用耕地中水浇地面积: </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4">占用耕地中旱地面积 : </el-col
      ><el-col :span="4"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="gdmj">占用耕地面积: </el-col>
      <el-col :span="4">{{tableData.JSXM_ZYGDMMJ}}</el-col>
      <el-col :span="4" class="stmj">占用耕地中水田面积: </el-col>
      <el-col :span="4">{{tableData.JSXM_ZYSTMJ}}</el-col>
      <el-col :span="4" class="lscn">需补充粮食产能: </el-col>
      <el-col :span="4"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="gdmj">已补充耕地指标: </el-col>
      <el-col :span="4"> </el-col>
      <el-col :span="4" class="stmj">已补充水田指标: </el-col>
      <el-col :span="4"> </el-col>
      <el-col :span="4" class="lscn">已补充粮食产能: </el-col>
      <el-col :span="4"> </el-col>
    </el-row>
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
      <el-col :span="6">检查结果: </el-col><el-col :span="18"></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">建设项目情况(B_JSXM): </el-col>
      <el-col :span="18"></el-col
    ></el-row>
    <el-row>
      <el-col :span="6">确认信息号: </el-col><el-col :span="6"></el-col>
      <el-col :span="6">操作时间: </el-col><el-col :span="6"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">项目名称: </el-col><el-col :span="6"></el-col>
      <el-col :span="6">项目性质: </el-col><el-col :span="6"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">项目所在地: </el-col> <el-col :span="18"></el-col>
    </el-row>
    <el-row>
      <el-col :span="4">项目状态: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">是否核销: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">是否备案: </el-col><el-col :span="4"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">版本号: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">核销时间: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">挂钩时间: </el-col><el-col :span="4"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">稳增长项目: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">可承诺项目: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">国家重点建设项目: </el-col><el-col :span="4"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">承诺期限: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">承诺兑现期限: </el-col><el-col :span="8"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">建设用地总面积: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">占用耕地中水浇地面积: </el-col
      ><el-col :span="4"> </el-col>
      <el-col :span="4">占用耕地中旱地面积 : </el-col
      ><el-col :span="4"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">占用耕地面积: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">占用耕地中水田面积: </el-col
      ><el-col :span="4"> </el-col> <el-col :span="4">需补充粮食产能: </el-col
      ><el-col :span="4"> </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">已补充耕地指标: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">已补充水田指标: </el-col><el-col :span="4"> </el-col>
      <el-col :span="4">已补充粮食产能: </el-col><el-col :span="4"> </el-col>
    </el-row>
  </div>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="指标库挂钩情况（B_ZBHX）">
          <el-table-column prop="" label="账户代码" />
          <el-table-column prop="" label="账户名称" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
          <el-table-column prop="" label="国家统筹" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="承诺兑现指标情况（B_ZBCNDX）">
          <el-table-column prop="" label="账户代码" />
          <el-table-column prop="" label="账户名称" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
          <el-table-column prop="" label="是否兑现" />
          <el-table-column prop="" label="兑现类型" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="承诺项目挂钩情况（B_ZBCNHX）">
          <el-table-column prop="" label="预算编号" />
          <el-table-column prop="" label="项目名称" />
          <el-table-column prop="" label="行政区名称" />
          <el-table-column prop="" label="行政区代码" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="粮食产能" />
          <el-table-column prop="" label="是否可承诺" />
          <el-table-column prop="" label="是否锁定" />
          <el-table-column prop="" label="项目阶段" />
          <el-table-column prop="" label="项目状态" />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row class="tlw-row">
    <el-col :span="24">
      <el-table :data="tableData" border stripe>
        <el-table-column label="补充耕地项目挂钩情况（B_ZBGX）">
          <el-table-column prop="" label="验收编号" />
          <el-table-column prop="" label="预算编号" />
          <el-table-column prop="" label="项目名称" />
          <el-table-column prop="" label="所属行政区" />
          <el-table-column prop="" label="耕地指标" />
          <el-table-column prop="" label="水田指标" />
          <el-table-column prop="" label="产能指标" />
          <el-table-column prop="" label="边占边补" />
          <el-table-column prop="" label="是否锁定" />
          <el-table-column prop="" label="项目阶段" />
          <el-table-column prop="" label="项目状态" />
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
import { getTdzzJsxmList } from "@/tdzz/api/zbgl/zbsy/zbsy_jsxmggzbmx";
import Pagination from "@/common/components/pagination/index";

//1.定义数据
const data = reactive({
  tableData: [],
  districtOptions: [], //行政区列表
  queryParams: {
    name: "", //确认信息号
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
  // F_getJsxmList();
};

/**
 * 获取建设项目挂钩指标明细
 */
const F_getJsxmList = () => {
  getTdzzJsxmList(data.queryParams).then((res) => {
    data.tableData = res.data.B_JSXM;
  });
};

//3.入口
onMounted(() => {
  F_init();
});
</script>
<style lang="scss" scoped>
.gdmj {
  background: none !important;
  color: #008000;
}
.stmj {
  background: none !important;
  color: #145fb4;
}
.lscn {
  background: none !important;
  color: #a3b414;
}
</style>
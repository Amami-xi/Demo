<template>
<el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="pageIndex"
      :page-sizes="pageSizes"
      :page-size="pagesize"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Pagination",
  props: {
    pageSizes: {
      type: Array,
      default: [10, 20, 30],
    },
    //每页显示条目数
    pagesize: {
      type: Number,
      default: 10,
    },
    //当前页数
    pageIndex: {
      type: Number,
      default: 1,
    },
    //总条目数
    total: {
      type: Number,
      default: 0,
    },
    //总页数
    pagecount: {
      type: Number,
      default: 0,
    },
    // 跳转触发的请求
    render: {
      type: Function,
    },
    layout: {
      type: String,
      default: "sizes, prev, pager, next, jumper,total",
    },
  },
  setup(props, context) {
    // 分页导航
    const handlePageChange = (val) => {
      props.render({ pageIndex: val, pageSize: props.pagesize });
    };
    //切换分页条数
    const handleSizeChange = (val) => {
      props.render({ pageIndex: props.pageIndex, pageSize: val });
    };
    return {
      handlePageChange,
      handleSizeChange,
    };
  },
});
</script>
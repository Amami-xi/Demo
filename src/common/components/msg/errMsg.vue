<template>
  <el-dialog
    v-model="dialogVisible"
    title="错误信息"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    width="60%"
  >
    <el-table
      :data="tableData"
      max-height="600"
      border
      :span-method="objectSpanMethod"
    >
      <el-table-column
        prop="xmbh"
        label="检查项目"
        v-show="F_pcsbFlow()"
        width="180"
      />
      <el-table-column prop="name" label="检查内容" width="300" />
      <el-table-column prop="errMsg" label="错误信息" />
    </el-table>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">确认</el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script>
import {
  defineComponent,
  nextTick,
  onMounted,
  onUpdated,
  reactive,
  toRefs,
} from "@vue/runtime-core";
export default defineComponent({
  name: "errMsg",
  props: {
    //错误信息
    tableData: {
      type: Array,
      default: [],
    },
    //业务编码
    businessCode: {
      type: String,
      default: "",
    },
    //材料类型
    materialType: {
      type: String,
      default: "",
    },
  },
  emits() {},
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({
      dialogVisible: false,
      mergeObj: {}, // 用来记录需要合并行的下标
      mergeArr: ["xmbh"], // 表格中的列名
    });

    //2.定义方法

    /**
     * 打开弹窗
     */
    const handleOpen = () => {
      data.mergeObj = {};
      data.dialogVisible = true;
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
    };

    /**
     * 判断是否是批次上报流程
     */
    const F_pcsbFlow = () => {
      if (
        props.businessCode == "10130801" ||
        props.businessCode == "10130601" ||
        props.businessCode == "10130901" ||
        props.businessCode == "10130501"
      ) {
        return false;
      } else {
        if (props.materialType == "项目材料") {
          return false;
        } else {
          return true;
        }
      }
    };

    /**
     * 标记需要合并的行
     *
     * @param {*} val
     */
    const getSpanArr = (val) => {
      data.mergeObj = {};
      data.mergeArr.forEach((key, index1) => {
        let count = 0; // 用来记录需要合并行的起始位置
        data.mergeObj[key] = []; // 记录每一列的合并信息
        val.forEach((item, index) => {
          // index == 0表示数据为第一行，直接 push 一个 1
          if (index === 0) {
            data.mergeObj[key].push(1);
          } else {
            // 判断当前行是否与上一行其值相等 如果相等 在 count 记录的位置其值 +1 表示当前行需要合并 并push 一个 0 作为占位
            if (item[key] === val[index - 1][key]) {
              data.mergeObj[key][count] += 1;
              data.mergeObj[key].push(0);
            } else {
              // 如果当前行和上一行其值不相等
              count = index; // 记录当前位置
              data.mergeObj[key].push(1); // 重新push 一个 1
            }
          }
        });
      });
    };

    /**
     * 合并行
     *
     * @param {Object} param0
     */
    const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
      // 判断列的属性
      if (data.mergeArr.indexOf(column.property) !== -1) {
        // 判断其值是不是为0
        if (data.mergeObj[column.property][rowIndex]) {
          return [data.mergeObj[column.property][rowIndex], 1];
        } else {
          // 如果为0则为需要合并的行
          return [0, 0];
        }
      }
    };

    //3.入口
    onUpdated(() => {
      if (JSON.stringify(data.mergeObj) === "{}") {
        getSpanArr(props.tableData);
      }
    });

    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
      objectSpanMethod,
      getSpanArr,
      F_pcsbFlow,
    };
  },
});
</script>
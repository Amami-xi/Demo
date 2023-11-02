<!-- 常用语 -->
<template>
  <el-dialog
    v-model="dialogVisible"
    title="常用语"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    fullscreen
    width="60%"
  >
    <el-form :inline="true" class="tlw-search">
      <el-row>
        <el-col :span="24">
          <el-form-item label="常用语">
            <el-input
              v-model="queryParams.content"
              placeholder="请输入常用语"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button id="btnSearch" type="primary" @click="F_queryPage"
              >搜索
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col class="tlw-row">
        <el-table
          :data="tableData"
          max-height="600"
          border
          @row-dblclick="choose"
        >
          <el-table-column label="序号" type="index" width="80" />
          <el-table-column label="常用语" prop="content">
            <template #default="scope">
              <div v-if="scope.row.saveFlag == 1">
                <el-input
                  type="textarea"
                  placeholder="请填写常用语"
                  size="small"
                  style="margin: 0.25rem"
                  v-model="scope.row.content"
                ></el-input>
              </div>
              <div v-else>
                {{ scope.row.content }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button
                @click="F_SAVE(scope.row)"
                type="success"
                size="small"
                v-if="scope.row.saveFlag == 1"
                :disabled="
                  scope.row.content == scope.row.oldContent ||
                  scope.row.content.length == 0
                "
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
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row)"
                ><el-icon class="el-icon--left"><Delete /></el-icon
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <pagination
      :total="pages.totalRows"
      :pagesize="queryParams.pagination.pageSize"
      :pageIndex="queryParams.pagination.pageIndex"
      :render="render"
    ></pagination>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import {
  saveOrUpdate,
  deletePhrase,
  queryPage,
  addTimes,
} from "@/common/api/jtap/phrase";
import store from "@/common/store";
import { ElMessage } from "element-plus";
import Pagination from "@/common/components/pagination/index";
import { Delete, Edit, Finished } from "@element-plus/icons-vue";
export default defineComponent({
  name: "errMsg",
  props: {
    setOption: {
      type: Function,
    },
  },
  emits() {},
  components: { Pagination, Delete, Edit, Finished },
  setup(props) {
    //1.定义数据
    const data = reactive({
      tableData: [],
      dialogVisible: false,
      userId: store.state.user.userId,
      queryParams: {
        content: "",
        pagination: {
          pageIndex: 1,
          pageSize: 10,
        },
      },
      pages: {
        totalRows: 0,
      },
    });

    //2.定义方法

    /**
     * 打开弹窗
     */
    const handleOpen = () => {
      data.dialogVisible = true;
      F_queryPage();
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
    };

    /**
     * 查询常用语列表
     */
    const F_queryPage = () => {
      queryPage(data.queryParams).then((res) => {
        data.tableData = res.data.items;
        data.tableData.map((obj) => (obj.oldContent = obj.content));
        data.pages.totalRows = res.data.total;
      });
    };

    /**
     * 编辑
     *
     * @param {Object} row
     */
    const F_UPDATE = (row) => {
      row.saveFlag = 1;
    };

    /**
     * 保存
     *
     * @param {Object} row
     */
    const F_SAVE = (row) => {
      if (row.content.length == 0) {
        ElMessage.error("请填写常用语");
      } else {
        saveOrUpdate(row).then((res) => {
          ElMessage.success("保存成功");
          row.saveFlag = 0;
          F_queryPage();
        });
      }
    };

    /**
     * 保存常用语
     */
    const savePhrase = (content) => {
      const params = {
        content: content,
      };
      saveOrUpdate(params).then((res) => {
        ElMessage.success("常用语添加成功");
      });
    };

    /**
     * 点击选择常用语
     * @param {*} row
     */
    const choose = (row) => {
      props.setOption(row.content);
      addTimes(row.phSec).then((res) => {});
      handleClose();
    };

    /**
     * 删除常用语
     * @param {*} row
     */
    const handleDelete = (row) => {
      deletePhrase(row.phSec).then((res) => {
        ElMessage.success("删除成功");
        F_queryPage();
      });
    };

    /**
     * 分页
     */
    const render = (val) => {
      data.queryParams.pagination = val;
      F_queryPage();
    };

    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
      F_queryPage,
      F_UPDATE,
      F_SAVE,
      savePhrase,
      handleDelete,
      choose,
      render,
    };
  },
});
</script>
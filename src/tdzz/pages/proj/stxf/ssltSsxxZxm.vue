<template>
  <el-dialog
    v-model="dialogVisible"
    :title="zxmmc"
    :before-close="handleClose"
    fullscreen
  >
    <el-row>
      <el-col :span="24">
        <el-card header="工程量情况">
          <el-table :data="gclList" border show-summary max-height="335">
            <el-table-column width="80" v-if="!disabled">
              <template #header>
                <el-button size="small" type="primary" circle @click="F_GCL_ADD"
                  ><el-icon><Plus /></el-icon
                ></el-button>
              </template>
              <template #default="scope">
                <el-button
                  size="small"
                  type="danger"
                  circle
                  @click="F_GCL_DELETE(scope.$index, scope.row)"
                  ><el-icon><Minus /></el-icon
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column prop="month" label="月报">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.month }}
                </div>
                <el-input v-else size="small" v-model="scope.row.month">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="jd" label="总体进度">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.jd }}
                </div>
                <el-input v-else size="small" v-model="scope.row.jd">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="wrtr" label="国体废弃污染土壤">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.wrtr }}
                </div>
                <el-input v-else size="small" v-model="scope.row.wrtr">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="dxs" label="地下水">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.dxs }}
                </div>
                <el-input v-else size="small" v-model="scope.row.dxs">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="fxgk" label="风险管控">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.fxgk }}
                </div>
                <el-input v-else size="small" v-model="scope.row.fxgk">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="qt" label="其他">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.qt }}
                </div>
                <el-input v-else size="small" v-model="scope.row.qt">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" v-if="!disabled">
              <template #default="scope">
                <el-button
                  v-if="scope.row.flag == 1"
                  @click="F_GCL_UPDATE(scope.row)"
                  type="primary"
                  size="small"
                  ><el-icon class="el-icon--left"><Edit /></el-icon
                  >编辑</el-button
                >
                <el-button
                  v-else
                  @click="F_GCL_SAVE(scope.row)"
                  type="success"
                  size="small"
                  ><el-icon class="el-icon--left"><Check /></el-icon
                  >保存</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="tlw-row">
      <el-col :span="24">
        <el-card header="资全使用情况(单位万元)">
          <el-table :data="zjList" border show-summary max-height="335">
            <el-table-column width="80" v-if="!disabled">
              <template #header>
                <el-button size="small" type="primary" circle @click="F_ZJ_ADD"
                  ><el-icon><Plus /></el-icon
                ></el-button>
              </template>
              <template #default="scope">
                <el-button
                  size="small"
                  type="danger"
                  circle
                  @click="F_ZJ_DELETE(scope.$index, scope.row)"
                  ><el-icon><Minus /></el-icon
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column prop="month" label="月报">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.month }}
                </div>
                <el-input v-else size="small" v-model="scope.row.month">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="wrtr" label="国体废弃污染土壤">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.wrtr }}
                </div>
                <el-input v-else size="small" v-model="scope.row.wrtr">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="dxs" label="地下水">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.dxs }}
                </div>
                <el-input v-else size="small" v-model="scope.row.dxs">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="fxgk" label="风险管控">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.fxgk }}
                </div>
                <el-input v-else size="small" v-model="scope.row.fxgk">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="qt" label="其他">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.qt }}
                </div>
                <el-input v-else size="small" v-model="scope.row.qt">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="gcqtfy" label="工程其他费用">
              <template #default="scope">
                <div v-if="scope.row.flag == 1">
                  {{ scope.row.gcqtfy }}
                </div>
                <el-input v-else size="small" v-model="scope.row.gcqtfy">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" v-if="!disabled">
              <template #default="scope">
                <el-button
                  v-if="scope.row.flag == 1"
                  @click="F_ZJ_UPDATE(scope.row)"
                  type="primary"
                  size="small"
                  ><el-icon class="el-icon--left"><Edit /></el-icon
                  >编辑</el-button
                >
                <el-button
                  v-else
                  @click="F_ZJ_SAVE(scope.row)"
                  type="success"
                  size="small"
                  ><el-icon class="el-icon--left"><Check /></el-icon
                  >保存</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { Plus, Minus, Check, Edit } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { gclSave, gclDelete, gclQueryList } from "@/tdzz/api/proj/proj-ssgcl";
import { zjSave, zjDelete, zjQueryList } from "@/tdzz/api/proj/proj-sszj";

export default defineComponent({
  name: "zxmzbDialog",
  components: { Plus, Minus, Check, Edit },
  props: {
    disabled: {
      type: Boolean,
      default: true,
    }
  },
  setup(props, ctx) {
    //1.定义数据
    const data = reactive({
      dialogVisible: false,
      zxmSec: "",
      zxmmc: "",
      gclList: [],
      zjList: [],
    });
    const {} = toRefs(data);
    //2.定义方法
    /**
     * 打开弹窗
     */
    const handleOpen = (zxmSec, zxmmc) => {
      data.dialogVisible = true;
      data.zxmSec = zxmSec;
      data.zxmmc = zxmmc;
      F_GCL_QUERY(zxmSec);
      F_ZJ_QUERY(zxmSec);
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
    };

    /**
     * 添加
     */
    const F_GCL_ADD = () => {
      data.gclList.push({});
    };

    /**
     * 保存
     */
    const F_GCL_SAVE = (row) => {
      row.flag = 1;
      row.guid = data.zxmSec;
      gclSave(row).then((res) => {
        row = res.data;
        ElMessage.success("保存成功");
      });
    };

    /**
     * 编辑
     */
    const F_GCL_UPDATE = (row) => {
      row.flag = 2;
    };

    /**
     * 删除
     */
    const F_GCL_DELETE = (index, row) => {
      ElMessageBox.confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (row.gclSec) {
            gclDelete(row.zjSec).then((res) => {
              ElMessage.success("删除成功");
              data.gclList.splice(index, 1);
            });
          } else {
            data.gclList.splice(index, 1);
          }
        })
        .catch();
    };

    /**
     * 查询
     */
    const F_GCL_QUERY = (guid) => {
      gclQueryList(guid).then((res) => {
        data.gclList = res.data;
        data.gclList.forEach((s) => {
          s.flag = 1;
        });
      });
    };

    /**
     * 添加
     */
    const F_ZJ_ADD = () => {
      data.zjList.push({});
    };

    /**
     * 保存
     */
    const F_ZJ_SAVE = (row) => {
      row.flag = 1;
      row.guid = data.zxmSec;
      zjSave(row).then((res) => {
        row = res.data;
        ElMessage.success("保存成功");
      });
    };

    /**
     * 编辑
     */
    const F_ZJ_UPDATE = (row) => {
      row.flag = 2;
    };

    /**
     * 删除
     */
    const F_ZJ_DELETE = (index, row) => {
      ElMessageBox.confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (row.zjsyqkSec) {
            zjDelete(row.zjsyqkSec).then((res) => {
              ElMessage.success("删除成功");
              data.zjList.splice(index, 1);
            });
          } else {
            data.zjList.splice(index, 1);
          }
        })
        .catch();
    };

    /**
     * 查询
     */
    const F_ZJ_QUERY = (guid) => {
      zjQueryList(guid).then((res) => {
        data.zjList = res.data;
        data.zjList.forEach((s) => {
          s.flag = 1;
        });
      });
    };

    //3.入口
    onMounted(() => {});
    return {
      ...toRefs(data),
      handleOpen,
      handleClose,
      F_GCL_ADD,
      F_GCL_SAVE,
      F_GCL_UPDATE,
      F_GCL_DELETE,
      F_ZJ_ADD,
      F_ZJ_SAVE,
      F_ZJ_UPDATE,
      F_ZJ_DELETE,
    };
  },
});
</script>
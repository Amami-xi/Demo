<template>
  <el-dialog
    v-model="dialogVisible"
    title="地块详情"
    :before-close="handleClose"
    destroy-on-close
    fullscreen
  >
    <el-container class="plot-detail-containter">
      <el-main class="tlw-main-left">
        <FwjMap :flowinstid="flowinstid" :disabled="disabled"></FwjMap>
      </el-main>
      <el-main class="tlw-main-right">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="现场照片" name="first">
            <div v-if="activeName == 'first'">
              <panel title="县级初验现场照片" v-if="defaultActive1 == 'list'">
                <ImageUpload
                  :flowinstid="flowinstid"
                  referenceId="YSJD_FJ_CYZP"
                  catalog="验收阶段"
                  :projectId ="entity.plSec"
                  :disabled="disabled"
                  type="1"
                  :render="openDetail"
                ></ImageUpload>
              </panel>
              <el-card class="zpDetail" shadow="never" v-else>
                <template #header>
                  <el-button @click="openList(1)" type="primary" size="small">
                    <el-icon class="el-icon--left"> <Back /> </el-icon>返回
                  </el-button>
                </template>
                <ImageDetail
                  :flowinstid="flowinstid"
                  :projectId="entity.plSec"
                  referenceId="YSJD_FJ_CYZP"
                  catalog="验收阶段"
                  :attachId="attachId"
                ></ImageDetail>
              </el-card>
              <panel title="市级验收现场照片" v-if="defaultActive2 == 'list'">
                <ImageUpload
                  :flowinstid="flowinstid"
                  referenceId="YSJD_FJ_SJCYZP"
                  catalog="验收阶段"
                  :projectId ="entity.plSec"
                  :disabled="disabled"
                  type="2"
                  :render="openDetail"
                ></ImageUpload>
              </panel>
              <el-card class="zpDetail" shadow="never" v-else>
                <template #header>
                  <el-button @click="openList(2)" type="primary" size="small">
                    <el-icon class="el-icon--left"> <Back /> </el-icon>返回
                  </el-button>
                </template>
                <ImageDetail
                  :flowinstid="flowinstid"
                  :projectId="entity.plSec"
                  referenceId="YSJD_FJ_SJCYZP"
                  catalog="验收阶段"
                  :attachId="attachId"
                ></ImageDetail>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="地块详情" name="second">
            <el-form
              :model="entity"
              label-width="auto"
              :inline-message="true"
              v-if="activeName == 'second'"
            >
              <panel title="基本信息">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="地块号">
                      <el-input disabled v-model="entity.dikuaiNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="12">
                    <el-form-item label="地块名称">
                      <el-input disabled v-model="entity.plName"></el-input>
                    </el-form-item>
                  </el-col> -->
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="图层面积">
                      <el-input disabled v-model="entity.dikuaiArea"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="坐标计算面积">
                      <el-input disabled v-model="entity.txArea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="图斑类型">
                      <el-input disabled v-model="entity.patchtype"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="地类">
                      <el-input disabled v-model="entity.landtype"></el-input>
                    </el-form-item>
                    
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="耕地质量等别">
                      <el-input disabled v-model="entity.avggrade1"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </panel>
              <panel title="现场核查备注">
                <el-input
                  type="textarea"
                  disabled
                  v-model="entity.remark"
                ></el-input>
              </panel>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import panel from "@/common/components/card/cardPanel";
import { ElMessage, ElMessageBox } from "element-plus";
import { getDetail } from "@/common/api/plot/plotZb";
import { getAttachList } from "@/common/api/jtap/attach";
import { getDetailById } from "@/tdzz/api/proj/proj-jbxx";
import bus from "@/common/utils/bus";
import FwjMap from "@/common/components/map/fwjMap";
import { Back } from "@element-plus/icons-vue";
import ImageUpload from "@/common/components/attach/upload/moreImageUpload_ysplot";
import ImageDetail from "@/common/components/attach/preview/imageDetail";
export default defineComponent({
  name: "plotDetail",
  components: { panel, FwjMap, ImageUpload, ImageDetail, Back },
  props: {
    //项目主键
    flowinstid: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: "",
    },
  },
  setup(props, context) {
    //1.定义数据
    const data = reactive({
      dialogVisible: false,
      entity: {},
      defaultActive1: "list",
      defaultActive2: "list",
      attachId: "", //当前点击照片ID,
      activeName: "first",
    });

    //2.定义方法

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
      data.entity = {};
    };

    /**
     * 打开弹窗
     */
    const handleOpen = (row) => {
      //1.获取基本信息
      data.entity = row;
      //2.获取现场照片
      F_getAttachList(row.plSec);
      //3.打开弹窗
      data.dialogVisible = true;
    };

    /**
     * 显示照片详情
     */
    const openDetail = (file,type) => {
      data.attachId = file.id;
      if (type == "1") {
        data.defaultActive1 = "detail";
      } else { 
        data.defaultActive2 = "detail";
      }
     
    };

    /**
     * 显示照片列表
     */
    const openList = (type) => {
      if (type == "1") {
        data.defaultActive1 = "list";
      } else { 
        data.defaultActive2 = "list";
      }
    };

    /**
     * 获取现场照片
     */
    const F_getAttachList = (plSec) => {
      // //1. 先判断app端是否发送
      // getDetailById(props.flowinstid).then((res) => {
      //   if (res.data.sfAppSend == 1) {
      //     //2. 获取现场照片
      //     getAttachList(props.flowinstid, plSec).then((res) => {
      //       data.srcList = res.data.map((item) => item.filePath);
      //     });
      //   }
      // });
    };

    return {
      ...toRefs(data), 
      handleOpen,
      handleClose, 
      openDetail,
      openList,
    };
  },
});
</script>
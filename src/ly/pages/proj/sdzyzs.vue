<template>
  <el-card
    header="湿地占用征收审批事项申报信息表"
    class="tlw-card tlw-lysp-form"
  >
    <el-form
      :model="entity"
      ref="sdzyzsform"
      label-width="auto"
      :inline-message="true"
      class="lysp-sd-form"
    >
      <table class="tlw-table">
        <tr>
          <th style="width: 10%">审核事项</th>
          <th colspan="8">填报内容</th>
          <th style="width: 15%">上传附件</th>
        </tr>

        <tr>
          <td class="requireCol">项目名称</td>
          <td colspan="8">
            <el-form-item
              prop="jbxx.xmmc"
              label-width="0"
              :rules="rules.requiredField"
            >
              <el-input v-model="entity.jbxx.xmmc" :disabled="disabled" />
            </el-form-item>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="requireCol">项目编号</td>
          <td colspan="8">
            <el-form-item prop="jbxx.xmbh" label-width="0">
              <el-input v-model="entity.jbxx.xmbh" disabled />
            </el-form-item>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="requireCol">项目位置（多选）</td>
          <td colspan="8">
            <el-form-item
              prop="xmwz"
              label-width="0"
              :rules="rules.requiredChange"
            >
              <el-checkbox-group
                v-model="entity.xmwz"
                :disabled="disabled || grade == 2"
              >
                <el-checkbox
                  :label="district.code"
                  v-for="(district, index) in districtOptions"
                  :key="index"
                  >{{ district.name }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="requireCol">基本情况</td>
          <td colspan="8">
            <el-form-item
              prop="jbxx.xmgk"
              label-width="0"
              :rules="rules.requiredField"
            >
              <el-input
                v-model="entity.jbxx.xmgk"
                type="textarea"
                placeholder="内容限制在300个汉字/600个英文字符内"
                :disabled="disabled"
              />
            </el-form-item>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="sdzyzs_sdsq"
              :taskId="taskId"
              btnText="上传项目占用征收（临时占用）湿地申请pdf"
            >
            </AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">项目批复情况</td>
          <td colspan="4">
            <el-form-item
              prop="jbxx.pfqk"
              label-width="0"
              :rules="rules.requiredField"
            >
              <el-input
                v-model="entity.jbxx.pfqk"
                type="textarea"
                :disabled="disabled"
              />
            </el-form-item>
          </td>
          <td class="requireCol">审批级别</td>
          <td colspan="3">
            <el-form-item prop="jbxx.gjszdxm" :rules="rules.requiredChange">
              <el-select
                v-model="entity.jbxx.gjszdxm"
                filterable
                clearable
                :disabled="disabled"
              >
                <el-option
                  v-for="(item, index) in spjbOptions"
                  :key="index"
                  :label="item.codeName"
                  :value="parseInt(item.codeValue)"
                />
              </el-select>
            </el-form-item>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="sdzyzs_xmlxwj"
              :taskId="taskId"
              btnText="上传项目立项文件pdf"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <th class="requireCol">所在区域</th>
          <th class="requireCol">占用征收情况</th>
          <th colspan="2" class="requireCol">湿地类</th>
          <th class="requireCol">湿地级别</th>
          <th class="requireCol">面积（公顷）</th>
          <th colspan="2" class="requireCol">中心点坐标</th>
          <th style="width: 8.75rem">操作</th>
          <td></td>
        </tr>
        <tr v-for="(zyzsqk, index) in entity.zyzsqkList" :key="index">
          <td v-if="grade == 1">
            <el-form-item :prop="`zyzsqkList.${index}.xzqdm`" label-width="0">
              <el-select
                v-model="zyzsqk.xzqdm"
                placeholder="请选择所在区域"
                :disabled="disabled || store.state.user.grade != 1"
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
          </td>
          <td
            :rowspan="entity.zyzsqkList.length"
            v-if="grade == 2 && index == 0"
          >
            <el-form-item :prop="`zyzsqkList.${index}.xzqdm`" label-width="0">
              <el-select
                v-model="zyzsqk.xzqdm"
                placeholder="请选择所在区域"
                :disabled="disabled || store.state.user.grade != 1"
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
          </td>
          <td>
            <el-form-item
              :prop="`zyzsqkList.${index}.zsqk`"
              :rules="rules.requiredChange"
              label-width="0"
            >
              <el-select
                v-model="zyzsqk.zsqk"
                filterable
                clearable
                :disabled="disabled"
              >
                <el-option
                  v-for="(item, index) in zyzsqkOptions"
                  :key="index"
                  :label="item.codeName"
                  :value="parseInt(item.codeValue)"
                />
              </el-select>
            </el-form-item>
          </td>
          <td colspan="2">
            <el-form-item
              :prop="`zyzsqkList.${index}.sdl`"
              :rules="rules.requiredChange"
              label-width="0"
            >
              <el-select
                v-model="zyzsqk.sdl"
                filterable
                clearable
                :disabled="disabled"
              >
                <el-option
                  v-for="(item, index) in sdlbOptions"
                  :key="index"
                  :label="item.codeName"
                  :value="parseInt(item.codeValue)"
                />
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item
              :prop="`zyzsqkList.${index}.sdjb`"
              :rules="rules.requiredChange"
              label-width="0"
            >
              <el-select
                v-model="zyzsqk.sdjb"
                filterable
                clearable
                :disabled="disabled || grade == 2"
              >
                <el-option
                  v-for="(item, index) in sdjbOptions"
                  :key="index"
                  :label="item.codeName"
                  :value="parseInt(item.codeValue)"
                />
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item
              :prop="`zyzsqkList.${index}.sdmj`"
              :rules="rules.num"
              label-width="0"
              class="el-form-item__error_show"
            >
              <el-input v-model="zyzsqk.sdmj" :disabled="disabled" />
            </el-form-item>
          </td>
          <td>
            <el-form-item
              label-width="0"
              :prop="`zyzsqkList.${index}.zxdzbx`"
              :rules="rules.requiredField"
            >
              <el-input
                v-model="zyzsqk.zxdzbx"
                :disabled="disabled"
                @input="F_changeX"
              />
            </el-form-item>
          </td>
          <td>
            <el-form-item
              label-width="0"
              :prop="`zyzsqkList.${index}.zxdzby`"
              :rules="rules.requiredField"
            >
              <el-input
                v-model="zyzsqk.zxdzby"
                :disabled="disabled"
                @input="F_changeY"
              />
            </el-form-item>
          </td>
          <td>
            <el-button
              type="primary"
              @click="F_addZyzs(index)"
              v-if="!disabled"
              size="small"
              circle
            >
              <el-icon>
                <Plus />
              </el-icon>
            </el-button>
            <el-button
              type="danger"
              @click="F_deltZyzs(index)"
              v-if="!disabled && entity.zyzsqkList.length > 1"
              size="small"
              circle
            >
              <el-icon>
                <Minus />
              </el-icon>
            </el-button>
          </td>
          <td v-if="index == 0" :rowspan="entity.zyzsqkList.length">
            <el-button
              type="primary"
              size="small"
              @click="F_download"
              v-if="!disabled"
              ><el-icon class="el-icon--left">
                <Download /> </el-icon
              >shp坐标模板下载
            </el-button>
            <el-divider v-if="!disabled"/>
            <ZbAttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="sdzyzs_slsj"
              :taskId="taskId"
              pType="LX_X"
              :businessCode="10140101"
              btnText="上传项目矢量数据（shp格式）"
            ></ZbAttachUpload>
            <el-divider />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="sdzyzs_qksyt"
              :taskId="taskId"
              btnText="项目区与湿地图斑对比情况示意图jpg"
            >
            </AttachUpload>
          </td>
        </tr>
        <tr>
          <th class="requireCol">所在区域</th>
          <th class="requireCol">占补平衡湿地情况</th>
          <th colspan="2" class="requireCol">湿地类</th>
          <th class="requireCol">湿地级别</th>
          <th class="requireCol">面积（公顷）</th>
          <th colspan="2" class="requireCol">中心点坐标</th>
          <th></th>
          <td></td>
        </tr>
        <tr v-for="(zbphsdqk, index) in entity.zbphsdqkList" :key="index">
          <td v-if="grade == 1">
            <el-form-item :prop="`zbphsdqkList.${index}.xzqdm`" label-width="0">
              <el-select
                v-model="zbphsdqk.xzqdm"
                placeholder="请选择所在区域"
                :disabled="disabled || grade == 2"
                :rules="rules.requiredChange"
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
          </td>
          <td
            :rowspan="entity.zbphsdqkList.length"
            v-if="grade == 2 && index == 0"
          >
            <el-form-item :prop="`zbphsdqkList.${index}.xzqdm`" label-width="0">
              <el-select
                v-model="zbphsdqk.xzqdm"
                placeholder="请选择所在区域"
                :disabled="disabled || grade == 2"
                :rules="rules.requiredChange"
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
          </td>
          <td>
            <el-form-item
              :prop="`zbphsdqkList.${index}.zsqk`"
              :rules="rules.requiredChange"
              label-width="0"
            >
              <el-select
                v-model="zbphsdqk.zsqk"
                filterable
                clearable
                :disabled="disabled"
              >
                <el-option
                  v-for="(item, index) in zyzsqkOptions"
                  :key="index"
                  :label="item.codeName"
                  :value="parseInt(item.codeValue)"
                />
              </el-select>
            </el-form-item>
          </td>
          <td colspan="2">
            <el-form-item
              :prop="`zbphsdqkList.${index}.sdl`"
              :rules="rules.requiredChange"
              label-width="0"
            >
              <el-select
                v-model="zbphsdqk.sdl"
                filterable
                clearable
                :disabled="disabled"
              >
                <el-option
                  v-for="(item, index) in sdlbOptions"
                  :key="index"
                  :label="item.codeName"
                  :value="parseInt(item.codeValue)"
                />
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item
              :prop="`zbphsdqkList.${index}.sdjb`"
              :rules="rules.requiredChange"
              label-width="0"
            >
              <el-select
                v-model="zbphsdqk.sdjb"
                filterable
                clearable
                :disabled="disabled || grade == 2"
              >
                <el-option
                  v-for="(item, index) in sdjbOptions"
                  :key="index"
                  :label="item.codeName"
                  :value="parseInt(item.codeValue)"
                />
              </el-select>
            </el-form-item>
          </td>
          <td>
            <el-form-item
              :prop="`zbphsdqkList.${index}.sdmj`"
              label-width="0"
              :rules="rules.num"
              class="el-form-item__error_show"
            >
              <el-input v-model="zbphsdqk.sdmj" :disabled="disabled" />
            </el-form-item>
          </td>
          <td>
            <el-form-item
              label-width="0"
              :prop="`zbphsdqkList.${index}.zxdzbx`"
              :rules="rules.requiredField"
            >
              <el-input v-model="zbphsdqk.zxdzbx" :disabled="disabled" />
            </el-form-item>
          </td>
          <td>
            <el-form-item
              label-width="0"
              :prop="`zbphsdqkList.${index}.zxdzby`"
              :rules="rules.requiredField"
            >
              <el-input v-model="zbphsdqk.zxdzby" :disabled="disabled" />
            </el-form-item>
          </td>
          <td></td>
          <td v-if="index == 0" :rowspan="entity.zbphsdqkList.length">
            <el-button
              type="primary"
              size="small"
              @click="F_download"
              v-if="!disabled"
              ><el-icon class="el-icon--left">
                <Download /> </el-icon
              >shp坐标模板下载
            </el-button>
            <el-divider v-if="!disabled"/>
            <ZbAttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="sdzyzs_sdslsj"
              pType="LX_S"
              :taskId="taskId"
              :businessCode="10140101"
              btnText="上传占补平衡湿地矢量数据（shp格式）"
            >
            </ZbAttachUpload>
            <el-divider />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="sdzyzs_wzsyt"
              :taskId="taskId"
              btnText="位置示意图jpg"
            ></AttachUpload>
            <el-divider />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="sdzyzs_kqxmyj"
              :taskId="taskId"
              btnText="跨区项目意见"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td rowspan="2" class="requireCol">湿地保护与恢复方案</td>
          <td class="requireCol">编制情况</td>
          <td colspan="7">
            <el-row>
              <el-col :span="24">
                <div>该方案由</div>
                <el-form-item
                  prop="jbxx.bzry"
                  label-width="0"
                  :rules="rules.requiredField"
                  class="td-left"
                >
                  <el-input v-model="entity.jbxx.bzry" :disabled="disabled" />
                </el-form-item>
                <div class="td-left">完成</div>
              </el-col>
            </el-row>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="sdzyzs_scfawb"
              :taskId="taskId"
              btnText="上传方案文本pdf"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">专家论证</td>
          <td colspan="7">
            <el-row>
              <el-col :span="24">
                <el-form-item
                  prop="jbxx.tgsj"
                  :rules="rules.requiredField"
                  label-width="0"
                >
                  <el-date-picker
                    type="date"
                    :disabled="disabled"
                    v-model="entity.jbxx.tgsj"
                    placeholder="请选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <div>，由</div>
                <el-form-item
                  prop="jbxx.zzry"
                  label-width="0"
                  :rules="rules.requiredField"
                  class="td-left"
                >
                  <el-input v-model="entity.jbxx.zzry" :disabled="disabled" />
                </el-form-item>
                <div class="td-left">组织专家评审会，通过专家论证</div>
              </el-col>
            </el-row>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="sdzyzs_zjyjwb"
              :taskId="taskId"
              btnText="上传专家意见文本pdf"
            ></AttachUpload>
          </td>
        </tr>
        <template v-for="(item, index) in entity.bjbList" :key="index">
          <tr>
            <td
              :rowspan="entity.bjbList.length * 3"
              v-if="index === 0"
            >
              <span class="requireCol">审查意见</span>
            </td>
            <th colspan="8">
              {{ item.stepName }}
            </th>
            <td rowspan="3">
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="sdzyzs_xjscyj"
                :taskId="item.taskId"
                :catalog="item.taskId"
                btnText="上传县级审查意见pdf"
                v-if="item.stepCode == 'SDZYZSSP_XQLYSC'"
              ></AttachUpload>
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="sdzyzs_yjjtj_z"
                :taskId="item.taskId"
                :catalog="item.taskId"
                btnText="同意占的意见及图件（pdf,jpg）"
                v-if="item.stepCode == 'SDZYZSSP_QTXJSL'"
              >
              </AttachUpload>
              <el-divider v-if="item.stepCode == 'SDZYZSSP_QTXJSL'" />
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="sdzyzs_yjjtj_b"
                :taskId="item.taskId"
                :catalog="item.taskId"
                btnText="同意补的意见及图件（pdf,jpg）"
                v-if="item.stepCode == 'SDZYZSSP_QTXJSL'"
              >
              </AttachUpload>
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="sdzyzs_sjscyj"
                :taskId="item.taskId"
                :catalog="item.taskId"
                btnText="上传市级审查意见pdf"
                v-if="item.stepCode == 'SDZYZSSP_SJSC'"
              ></AttachUpload>
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="sdzyzs_sjscyj1"
                :taskId="taskId"
                :catalog="item.taskId"
                btnText="上传省级审查意见pdf"
                v-if="item.stepCode == 'SDZYZSSP_SLYJSC'"
              >
              </AttachUpload>
            </td>
          </tr>
          <tr>
            <td colspan="8">
              <el-form-item
                :prop="`bjbList.${index}.spOption`"
                label-width="0"
                :rules="rules.spOption"
              >
                <el-input
                  type="textarea"
                  :rules="rules.spOption"
                  v-model="item.spOption"
                  placeholder="请填写审批意见"
                  :disabled="F_getAction(item.taskId)"
                />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="8">
              <el-row>
                <el-col :span="24" class="col-right">
                  <div>签名：</div>
                  <el-input v-model="item.signName" disabled />
                  <div>时间：</div>
                  <el-input v-model="item.blTime" disabled />
                </el-col>
              </el-row>
            </td>
          </tr>
        </template>
      </table>
    </el-form>
  </el-card>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { init, saveOrUpdate, deleteLx } from "@/ly/api/proj/sdzyzs";
import { bjbSave } from "@/common/api/jtap/bjb";
import { getDictList } from "@/common/api/jtap/dict";
import store from "@/common/store";
import moment from "moment";
import { getDistrictList } from "@/common/api/jtap/district";
import AttachUpload from "@/common/components/attach/upload/moreAttachUpload2";
import ZbAttachUpload from "@/common/components/attach/upload/zbAttachUpload";
import { getRules, checkValidate } from "@/ly/verification/sdzyzs";
import { Plus, Minus } from "@element-plus/icons-vue";
import { ggDownLoadModel } from "@/common/api/jtap/download";

//1. 定义数据
const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid,
  taskId: params.taskId,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  entity: {
    jbxx: {}, //填报表单
    zyzsqkList: [
      {
        xzqdm: store.state.user.grade == 2 ? store.state.user.regionCode : "",
        sdjb: 1,
      },
    ], //占用征收情况
    zbphsdqkList: [
      {
        xzqdm: store.state.user.grade == 2 ? store.state.user.regionCode : "",
        sdjb: 1,
      },
    ], //占补平衡湿地情况
    bjbList: [], //审批意见
    bjb: {}, //当前审批人意见
    xmwz: [],
    userLever: "",
  },
  zyzsqkOptions: [], //占用征收情况
  sdlbOptions: [], //湿地类别
  sdjbOptions: [], //湿地级别
  spjbOptions: [], //审批级别
  sfOptions: [], //是否
  szqyOptions: [], //所在区域
  districtOptions: [], //行政区列表
  user: store.state.user,
  grade: store.state.user.grade,
  rules: getRules(),
});
const {
  flowinstid,
  taskId,
  disabled,
  entity,
  sdlbOptions,
  sdjbOptions,
  sfOptions,
  zyzsqkOptions,
  szqyOptions,
  districtOptions,
  spjbOptions,
  rules,
  grade,
  userLever,
} = toRefs(data);

const sdzyzsform = ref(null);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getDict();
  F_getDetail();
};

/**
 * 获取数据字典
 */
const F_getDict = () => {
  getDictList("占用征收情况").then((res) => {
    data.zyzsqkOptions = res.data;
  });
  if (store.state.user.organizationGrade == "市局" || disabled) {
    getDictList("湿地级别").then((res) => {
      data.sdjbOptions = res.data;
    });
  } else {
    data.sdjbOptions = [{ codeName: "一般湿地", codeValue: "1" }];
  }

  getDictList("湿地类别").then((res) => {
    data.sdlbOptions = res.data;
  });
  getDictList("是否").then((res) => {
    data.sfOptions = res.data;
  });
  getDictList("所在区域").then((res) => {
    data.szqyOptions = res.data;
  });
  getDictList("审批级别").then((res) => {
    data.spjbOptions = res.data;
  });
};

/**
 * 获取详情
 */
const F_getDetail = () => {
  init(data.flowinstid, data.taskId, data.flowAction).then((res) => {
    if (res.data.jbxx.flowinstid) {
      data.entity = res.data;
      if (data.entity.jbxx.xmwz) {
        data.entity.xmwz = data.entity.jbxx.xmwz.split(",");
      }
    } else {
      data.entity.jbxx.sfbz = 0;
      data.entity.jbxx.sflz = 0;
      if (store.state.user.grade != 1) {
        //县级用户默认当前用户行政区
        data.entity.jbxx.xzqhdm = store.state.user.regionCode;
      }

      data.entity.bjbList = res.data.bjbList;
      if (data.grade == 2) {
        data.entity.xmwz = [data.user.regionCode];
      }
    }
    F_getDistrictList();
  });
};

/**
 * 获取县区行政区列表
 */
const F_getDistrictList = () => {
  getDistrictList("320600").then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 占用征收情况-添加行
 */
const F_addZyzs = () => {
  //占用征收情况
  const param1 = {};
  if (data.grade == 2) {
    param1.xzqdm = data.user.regionCode;
    param1.sdjb = 1;
  }
  param1.zxdzbx = data.entity.zyzsqkList[0].zxdzbx;
  param1.zxdzby = data.entity.zyzsqkList[0].zxdzby;
  data.entity.zyzsqkList.push(param1);
  //占补平衡湿地情况
  const param2 = {};
  if (data.grade == 2) {
    param2.xzqdm = data.user.regionCode;
    param2.sdjb = 1;
  }
  data.entity.zbphsdqkList.push(param2);
};

/**
 * 占用征收情况-删除行
 */
const F_deltZyzs = (index) => {
  if (data.entity.zyzsqkList.length > 1) {
    data.entity.zyzsqkList.splice(index, 1);
    data.entity.zbphsdqkList.splice(index, 1);
  } else {
    ElMessage.error("请至少保存一条数据！");
  }
};

/**
 * x坐标联动事件
 *
 * @param {*} value
 */
const F_changeX = (value) => {
  for (let i = 0; i < data.entity.zyzsqkList.length; i++) {
    data.entity.zyzsqkList[i].zxdzbx = value;
  }
};

/**
 * y坐标联动事件
 *
 * @param {*} value
 */
const F_changeY = (value) => {
  for (let i = 0; i < data.entity.zyzsqkList.length; i++) {
    data.entity.zyzsqkList[i].zxdzby = value;
  }
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await sdzyzsform.value.validate((valid) => {
    flag = valid;
    //2. 自己的逻辑代码
    if (flag) {
      flag = checkValidate(data);
    } else {
      flag = false;
    }
  });
  return flag;
};

/**
 * 保存
 */
const F_save = async () => {
  data.entity.jbxx.flowinstid = data.flowinstid;
  if (data.entity.jbxx.xzqhdm == null || data.entity.jbxx.xzqhdm == undefined) {
    data.entity.jbxx.xzqhdm = store.state.user.regionCode;
  }
  data.entity.jbxx.xmwz = data.entity.xmwz.toString();
  data.entity.bjb = data.entity.bjbList.find(
    (bjb) => bjb.taskId === data.taskId
  );
  data.entity.userLever = store.state.user.organizationGrade;
  let flag = await F_beforeSave();
  if (flag) {
    await saveOrUpdate(data.entity)
      .then((res) => {
        F_getDetail();
      })
      .catch((res) => {
        flag = false;
      });
  }
  return flag;
};

/**
 * 保存审查意见
 *
 */
const F_saveSpyj = async (val) => {
  let _bjb = data.entity.bjbList.find((bjb) => bjb.taskId === data.taskId);
  let flag = await F_beforeSave();
  if (flag) {
    await bjbSave(_bjb)
      .then((res) => {
        F_getDetail();
      })
      .catch((res) => {
        flag = false;
      });
  }
  return flag;
};

/**
 * 删除
 */
const F_delete = (callback) => {
  deleteLx(data.flowinstid).then((res) => {
    ElMessage.success(res.msg);
    if (callback) {
      callback();
    }
  });
};

//获取审批附件编辑权限
const F_getAction = (val) => {
  if (data.flowAction == "EDIT" && val == data.taskId) {
    return false;
  } else {
    return true;
  }
};

/**
 * shp坐标模板下载
 */
 const F_download = () => {
   let path = "/usr/tdzzly/files/api-ly/templateFilePath/湿地模板.zip";
   ggDownLoadModel(path);
};


//3.入口
onMounted(() => {
  //1.初始化
  F_init();
  //2.定义监听事件
  bus.on("sdzyzs_save", async (obj) => {
    let flag;
    if (obj.val) {
      flag = await F_save(obj.val);
    } else {
      flag = await F_saveSpyj(obj.val);
    }
    if (obj.callback) {
      obj.callback(flag);
    }
  });
  bus.on("sdzyzs_delete", (callback) => {
    F_delete(callback);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("sdzyzs_save");
  bus.off("sdzyzs_delete");
});
</script>


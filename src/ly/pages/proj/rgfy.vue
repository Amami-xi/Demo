<template>
  <el-card
    header="野生动物人工繁育审批事项申报信息表"
    class="tlw-card tlw-lysp-form"
  >
    <el-form
      :model="entity"
      :rules="rules"
      ref="rgfyform"
      label-width="0"
      :inline-message="true"
    >
      <table class="tlw-table">
        <tr>
          <th style="width: 10%">审核事项</th>
          <th colspan="6">填报内容</th>
          <th style="width: 15%">上传附件（pdf）</th>
        </tr>
        <tr>
          <td class="requireCol">项目名称</td>
          <td colspan="6">
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
          <td>项目编号</td>
          <td colspan="6">
            <el-form-item prop="jbxx.xmbh" label-width="0">
              <el-input v-model="entity.jbxx.xmbh" disabled />
            </el-form-item>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="requireCol">基本情况</td>
          <td colspan="6">
            <el-form-item prop="jbxx.mc" :rules="rules.requiredField">
              <el-input
                v-model="entity.jbxx.mc"
                type="textarea"
                placeholder="内容限制在300个汉字/600个英文字符内"
                :disabled="disabled"
              >
              </el-input>
            </el-form-item>
          </td>
          <td rowspan="2">
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_sqs"
              :taskId="taskId"
              btnText="申请书"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">审批权限</td>
          <td colspan="6">
            <el-row>
              <el-col :span="24">
                <el-form-item
                  prop="jbxx.spqx"
                  :rules="rules.requiredRadio"
                  class="el-form-item__error_show"
                >
                  <el-radio-group v-model="entity.jbxx.spqx" @change="F_clear">
                    <el-radio
                      :label="parseInt(item.codeValue)"
                      v-for="(item, index) in spqxOptions"
                      :key="index"
                      :disabled="disabled"
                      >{{ item.codeName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td class="requireCol" :rowspan="entity.wzList.length + 5">
            事项概况
          </td>
          <td class="requireCol">申请单位/个人</td>
          <td colspan="5">
            <el-form-item prop="jbxx.sqrmc" :rules="rules.requiredField">
              <el-input
                v-model="entity.jbxx.sqrmc"
                placeholder="填写单位/个人名称"
                :disabled="disabled"
              />
            </el-form-item>
          </td>
          <td :rowspan="entity.wzList.length + 5">
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_yyzz"
              :taskId="taskId"
              btnText="营业执照"
            ></AttachUpload>
            <el-divider />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_wts"
              :taskId="taskId"
              btnText="委托书"
            ></AttachUpload>
            <el-divider />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_frsfz"
              :taskId="taskId"
              btnText="法人身份证"
            ></AttachUpload>
            <el-divider />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_jbrsfz"
              :taskId="taskId"
              btnText="经办人身份证"
            ></AttachUpload>
            <el-divider />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_xzxksx"
              :taskId="taskId"
              btnText="野生动物保护管理行政许可事项申请表"
            ></AttachUpload>
            <el-divider v-if="data.entity.jbxx.spqx == 1" />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_jylysqb"
              :taskId="taskId"
              v-if="data.entity.jbxx.spqx == 1"
              btnText="江苏省国家级陆生野生动物及其产品经营利用申请表"
            >
            </AttachUpload>
            <el-divider v-if="data.importPro" />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_jylysqb"
              :taskId="taskId"
              v-if="data.importPro"
              btnText="江苏省重点保护陆生野生动物及其产品经营利用申请表"
            >
            </AttachUpload>
            <el-divider v-if="data.threeKind" />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_bab"
              :taskId="taskId"
              v-if="data.threeKind"
              btnText="国家保护的“三有”陆生野生动物经营利用备案表"
            >
            </AttachUpload>
            <el-divider v-if="data.entity.jbxx.spqx == 3" />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_sjylysqb"
              :taskId="taskId"
              v-if="data.entity.jbxx.spqx == 3"
              btnText="市级陆生野生动物及其产品经营利用申请表"
            >
            </AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">申请人联系电话</td>
          <td colspan="5">
            <el-form-item
              prop="jbxx.sqrlxdh"
              :rules="rules.phone"
              class="el-form-item__error_show"
            >
              <el-input
                v-model="entity.jbxx.sqrlxdh"
                placeholder="填写联系方式"
                :disabled="disabled"
              />
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="requireCol">所属区域（多选）</td>
          <td colspan="5" style="width: 50%">
            <el-form-item
              prop="sqrssqy"
              :rules="rules.requiredSsqy"
              class="el-form-item__error_show"
            >
              <el-checkbox-group v-model="entity.sqrssqy">
                <el-checkbox
                  :label="district.code"
                  v-for="(district, index) in districtOptions"
                  :key="index"
                  :disabled="disabled"
                  >{{ district.name }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <th class="requireCol">拟人工繁育物种</th>
          <th class="requireCol" colspan="4" style="width: 40%">保护级别</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in entity.wzList" :key="index">
          <td>
            <el-form-item
              :prop="`wzList.${index}.wzmc`"
              :rules="rules.requiredField"
            >
              <el-input v-model="item.wzmc" :disabled="disabled" />
            </el-form-item>
          </td>
          <td colspan="4">
            <el-form-item
              :prop="`wzList.${index}.proLevel`"
              :rules="rules.requiredRadio"
              class="el-form-item__error_show"
            >
              <el-radio-group
                v-model="item.proLevel"
                :disabled="disabled"
                @change="F_getFjqx"
              >
                <el-radio
                  :label="parseInt(item.codeValue)"
                  v-for="(item, index) in bhjbOptions"
                  :key="index"
                  >{{ item.codeName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </td>
          <td>
            <el-button
              type="primary"
              size="small"
              @click="F_addWz(index)"
              v-if="!disabled"
              circle
              ><el-icon><Plus /></el-icon
            ></el-button>
            <el-button
              type="danger"
              size="small"
              @click="F_deltWz(index)"
              v-if="!disabled && entity.wzList.length > 1"
              circle
              ><el-icon><Minus /></el-icon>
            </el-button>
          </td>
        </tr>
        <tr>
          <td class="requireCol">人工繁育目的</td>
          <td colspan="4">
            <el-form-item
              prop="jbxx.fymd"
              :rules="rules.requiredFymd"
              class="el-form-item__error_show"
            >
              <el-radio-group v-model="entity.jbxx.fymd">
                <el-radio
                  :label="parseInt(item.codeValue)"
                  v-for="(item, index) in rgfymdOptions"
                  :key="index"
                  :disabled="disabled"
                  >{{ item.codeName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              prop="jbxx.fymdQt"
              :rules="rules.requiredField"
              v-if="entity.jbxx.fymd === '4'"
            >
              <el-input v-model="entity.jbxx.fymdQt" :disabled="disabled" />
            </el-form-item>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="requireCol">动物来源</td>
          <td colspan="6">
            <el-form-item prop="jbxx.dwly" :rules="rules.requiredField">
              <el-input
                v-model="entity.jbxx.dwly"
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
              referenceId="rgfy_zgbmpw"
              :taskId="taskId"
              btnText="购买合同及供货方所在地野生动物主管部门批文"
            >
            </AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">繁育计划</td>
          <td colspan="6">
            <el-form-item prop="jbxx.fyjh" :rules="rules.requiredField">
              <el-input
                v-model="entity.jbxx.fyjh"
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
              referenceId="rgfy_scxkz"
              :taskId="taskId"
              btnText="与申请经营利用野生动物相匹配的生产经营场所、设施、设备，场所权属证明、租赁合同、药品生产许可证"
            >
            </AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">繁育场所</td>
          <td colspan="6">
            <el-row>
              <el-col :span="24">
                <div>用地性质：</div>
                <el-form-item prop="jbxx.ydxz" :rules="rules.requiredField">
                  <el-input
                    v-model="entity.jbxx.ydxz"
                    style="width: 12.5rem"
                    :disabled="disabled"
                  ></el-input>
                </el-form-item>
                <div class="td-left">用地面积：</div>
                <el-form-item
                  prop="jbxx.cdmj"
                  :rules="rules.num"
                  class="el-form-item__error_show"
                >
                  <el-input
                    v-model="entity.jbxx.cdmj"
                    style="width: 12.5rem"
                    :disabled="disabled"
                  />
                </el-form-item>
                <div>(平方米)</div>
              </el-col>
            </el-row>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_fjsc"
              :taskId="taskId"
              btnText="附件上传"
            >
            </AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">技术力量</td>
          <td colspan="6">
            <el-form-item prop="jbxx.jsll" :rules="rules.requiredField">
              <el-input
                v-model="entity.jbxx.jsll"
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
              referenceId="rgfy_syzgzs"
              :taskId="taskId"
              btnText="兽医资格证书"
            >
            </AttachUpload>
            <el-divider />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_syrysfz"
              :taskId="taskId"
              btnText="兽医人员身份证"
            >
            </AttachUpload>
            <el-divider />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="rgfy_pyht"
              :taskId="taskId"
              btnText="聘用合同"
            >
            </AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">防疫防逃措施</td>
          <td colspan="6">
            <el-form-item prop="jbxx.fycs" :rules="rules.requiredField">
              <el-input
                v-model="entity.jbxx.fycs"
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
              referenceId="rgfy_csfa"
              :taskId="taskId"
              btnText="防疫防逃措施方案"
            >
            </AttachUpload>
          </td>
        </tr>
        <template v-for="(item, index) in entity.bjbList" :key="index">
          <tr>
            <td :rowspan="entity.bjbList.length * 4" v-if="index === 0">
              <span class="requireCol">审查意见</span>
            </td>
            <th colspan="6">{{ item.stepName }}</th>
            <td :rowspan="3">
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="rgfy_xjcswj"
                :taskId="taskId"
                :catalog="item.taskId"
                btnText="县级初审文件pdf"
                v-if="item.stepCode == 'YSDWRGFYSP_XJZG'"
              >
              </AttachUpload>
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="rgfy_sjspwj"
                :taskId="taskId"
                :catalog="item.taskId"
                btnText="审批文件pdf"
                v-if="item.stepCode == 'YSDWRGFYSP_SJZG'"
              >
              </AttachUpload>
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="province_spwj"
                :taskId="taskId"
                :catalog="item.taskId"
                btnText="省级审批文件pdf"
                v-if="item.stepCode == 'YSDWRGFYSP_SJSC'"
              >
              </AttachUpload>
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="gjj_spwj"
                :taskId="taskId"
                :catalog="item.taskId"
                btnText="国家级审批文件pdf"
                v-if="item.stepCode == 'YSDWRGFYSP_GJJSC'"
              >
              </AttachUpload>
            </td>
          </tr>

          <tr v-if="item.stepCode == 'YSDWRGFYSP_BFCLXJ'">
            <td colspan="6" class="spyj-image">
              <ImageUpload
                :flowinstid="flowinstid"
                :taskId="taskId"
                :disabled="F_getAction(item.taskId)"
                :catalog="item.taskId"
                referenceId="lyk_fj"
              ></ImageUpload>
            </td>
          </tr>
          <tr v-else-if="item.stepCode == 'YSDWRGFYSP_BFCLSJ'">
            <td colspan="6" class="spyj-image">
              <ImageUpload
                :flowinstid="flowinstid"
                :taskId="taskId"
                :disabled="F_getAction(item.taskId)"
                :catalog="item.taskId"
                referenceId="slc_fj"
              ></ImageUpload>
            </td>
          </tr>
          <tr v-else>
            <td colspan="6">
              <el-form-item
                :prop="`bjbList.${index}.spOption`"
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
            <td colspan="6">
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
          <tr v-if="spqxMap.get(entity.jbxx.spqx) === item.stepCode">
            <td class="requireCol">批准文号</td>
            <td>
              <el-form-item prop="jbxx.pzwh" :rules="rules.requiredField">
                <el-input
                  v-model="entity.jbxx.pzwh"
                  :disabled="F_getAction(item.taskId)"
                />
              </el-form-item>
            </td>
            <td class="requireCol">批准日期</td>
            <td colspan="1">
              <el-form-item prop="jbxx.pzrq" :rules="rules.requiredField">
                <el-date-picker
                  type="date"
                  v-model="entity.jbxx.pzrq"
                  placeholder="请选择日期"
                  style="width: 100%"
                  :disabled="F_getAction(item.taskId)"
                ></el-date-picker>
              </el-form-item>
            </td>
            <td class="requireCol">许可证号</td>
            <td>
              <el-form-item prop="jbxx.xkzh" :rules="rules.requiredField">
                <el-input
                  v-model="entity.jbxx.xkzh"
                  :disabled="F_getAction(item.taskId)"
                />
              </el-form-item>
            </td>
            <td></td>
          </tr>
        </template>
      </table>
    </el-form>
  </el-card>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { init, saveOrUpdate, deleteLx } from "@/ly/api/proj/rgfy";
import { bjbSave } from "@/common/api/jtap/bjb";
import { getDictList } from "@/common/api/jtap/dict";
import store from "@/common/store";
import moment from "moment";
import { getDistrictList } from "@/common/api/jtap/district";
import AttachUpload from "@/common/components/attach/upload/moreAttachUpload2";
import { getRules, checkValidate } from "@/ly/verification/rgfy";
import ImageUpload from "@/common/components/attach/upload/moreImageUpload";
import { Plus, Minus } from "@element-plus/icons-vue";

//1. 定义数据
const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid,
  taskId: params.taskId,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  xzqdm: store.state.user.regionCode.substring(0, 4) + "00",
  entity: {
    jbxx: {}, //填报表单
    wzList: [{}], //物种列表
    bjbList: [], //审批意见
    bjb: {}, //当前审批人意见
    sqrssqy: [],
  },
  importPro: false, //省重点文件
  threeKind: false, //三有文件
  districtOptions: [], //行政区列表
  spqxOptions: [],
  bhjbOptions: [], //保护级别
  rgfymdOptions: [], //人工繁育目的
  sfOptions: [], //是否
  rules: getRules(),
  spqxMap: new Map([
    [1, "YSDWRGFYSP_GJJSC"], //国家级
    [2, "YSDWRGFYSP_SJSC"], //省级
    [3, "YSDWRGFYSP_SJZG"], //市级
  ]),
});
const {
  importPro,
  threeKind,
  flowinstid,
  taskId,
  disabled,
  entity,
  districtOptions,
  spqxOptions,
  bhjbOptions,
  rgfymdOptions,
  sfOptions,
  spqxMap,
  rules,
} = toRefs(data);

const rgfyform = ref(null);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getDict();
  F_getDetail();
};

/**
 * 获取详情
 */
const F_getDetail = () => {
  init(data.flowinstid, data.taskId, data.flowAction).then((res) => {
    if (res.data.jbxx.flowinstid) {
      data.entity = res.data;
      F_bhjb(1);
      if (data.entity.jbxx.sqrssqy) {
        data.entity.sqrssqy = data.entity.jbxx.sqrssqy.split(",");
      }
    } else {
      data.entity.jbxx.spqx = 3;
      data.entity.bjbList = res.data.bjbList;
      if (store.state.user.grade != 1) {
        //县级用户默认当前用户行政区
        data.entity.jbxx.xzqhdm = store.state.user.regionCode;
      }
      F_bhjb(2);
    }
    F_getFjqx();
  });
};

/**
 * 获取数据字典
 */
const F_getDict = () => {
  getDictList("人工繁育目的").then((res) => {
    data.rgfymdOptions = res.data;
  });
  getDictList("是否").then((res) => {
    data.sfOptions = res.data;
  });
  getDictList("人工繁育_审批权限").then((res) => {
    data.spqxOptions = res.data;
  });
  getDistrictList(data.xzqdm).then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 物种-添加行
 */
const F_addWz = () => {
  let proLevel;
  if (data.entity.jbxx.spqx == 3) {
    proLevel = 11;
  }
  //省级选省重点、三有
  if (data.entity.jbxx.spqx == 2) {
    proLevel = 13;
  }
  if (data.entity.jbxx.spqx == 1) {
    proLevel = 1;
  }
  data.entity.wzList.push({ proLevel: proLevel });
  F_getFjqx();
};

/**
 * 物种-删除行
 */
const F_deltWz = (index) => {
  if (data.entity.wzList.length > 1) data.entity.wzList.splice(index, 1);
  else {
    ElMessage.error("请至少保存一条数据！");
  }
};

/**
 * 根据审批权限调整保护级别
 */
const F_bhjb = (type) => {
  //type为一初始化，为2权限更改情况后初始化
  if (data.entity.jbxx.spqx == 3) {
    //市级选择一级、二级
    getDictList("一级二级_保护级别").then((res) => {
      data.bhjbOptions = res.data;
      if (type == 2) {
        for (let i = 0; i < data.entity.wzList.length; i++) {
          data.entity.wzList[i].proLevel = 11;
        }
      }
      F_getFjqx();
    });
  }
  //省级选省重点、三有
  if (data.entity.jbxx.spqx == 2) {
    getDictList("经营猎捕_保护级别").then((res) => {
      data.bhjbOptions = res.data;
      if (type == 2) {
        for (let i = 0; i < data.entity.wzList.length; i++) {
          data.entity.wzList[i].proLevel = 13;
        }
      }
      F_getFjqx();
    });
  }
  if (data.entity.jbxx.spqx == 1) {
    //国家级级选择十有
    getDictList("人工繁育_十有").then((res) => {
      data.bhjbOptions = res.data;
      if (type == 2) {
        for (let i = 0; i < data.entity.wzList.length; i++) {
          data.entity.wzList[i].proLevel = 1;
        }
      }
      F_getFjqx();
    });
  }
};

/**
 * 根据是否有三有、省重点来控制文件显示
 *
 */
const F_getFjqx = (val) => {
  data.importPro = false;
  data.threeKind = false;
  for (let i = 0; i < data.entity.wzList.length; i++) {
    if (data.entity.wzList[i].proLevel == 13) {
      data.importPro = true;
      break;
    }
  }
  if (val == 13) {
    data.importPro = true;
  }
  for (let i = 0; i < data.entity.wzList.length; i++) {
    if (data.entity.wzList[i].proLevel == 14) {
      data.threeKind = true;
      break;
    }
  }
  if (val == 13) {
    data.threeKind = true;
  }
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await rgfyform.value.validate((valid) => {
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
  if (data.entity.jbxx.xzqhdm) {
    data.entity.jbxx.xzqhdm = store.state.user.regionCode;
  }
  data.entity.jbxx.sqrssqy = data.entity.sqrssqy.toString();
  let _bjb = data.entity.bjbList.find((bjb) => bjb.taskId === data.taskId);
  data.entity.bjb = _bjb;
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
 *
 */
const F_saveSpyj = async (val) => {
  let _bjb = data.entity.bjbList.find((bjb) => bjb.taskId === data.taskId);
  if (
    _bjb.stepCode == "YSDWRGFYSP_BFCLXJ" ||
    _bjb.stepCode == "YSDWRGFYSP_BFCLSJ"
  ) {
    return true;
  } else {
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
  }
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

//审批权限改变，还原批文等数据
const F_clear = (val) => {
  data.entity.jbxx.pzwh = "";
  data.entity.jbxx.pzrq = "";
  data.entity.jbxx.xkzh = "";
  F_bhjb(2);
};

//4.入口
onMounted(() => {
  //1.初始化
  F_init();
  //2.定义监听事件
  bus.on("rgfy_save", async (obj) => {
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
  bus.on("rgfy_delete", (callback) => {
    F_delete(callback);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("rgfy_save");
  bus.off("rgfy_delete");
});
</script>

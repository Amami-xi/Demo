<template>
  <el-card
    header="生态公益林调整审批事项申报信息表"
    class="tlw-card tlw-lysp-form"
  >
    <el-form
      :model="entity"
      :rules="rules"
      ref="gylform"
      label-width="0"
      :inline-message="true"
      class="lysp-gyl-form"
    >
      <table class="tlw-table">
        <tr>
          <th style="width: 10%">审核事项</th>
          <th colspan="7">填报内容</th>
          <th style="width: 15%">上传附件</th>
        </tr>

        <tr>
          <td class="requireCol">项目名称</td>
          <td colspan="7">
            <el-form-item
              prop="jbxx.xmmc"
              label-widtd="0"
              :rules="rules.requiredField"
            >
              <el-input v-model="entity.jbxx.xmmc" :disabled="disabled" />
            </el-form-item>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="requireCol">项目编号</td>
          <td colspan="7">
            <el-form-item prop="jbxx.xmbh" label-width="0">
              <el-input v-model="entity.jbxx.xmbh" disabled />
            </el-form-item>
          </td>
          <td></td>
        </tr>
        <tr class="gly-tzyj">
          <td :rowspan="entity.tzyjList.length + 3" class="requireCol">
            调整依据
          </td>
          <th rowspan="2" style="width: 15%" class="requireCol">调整依据</th>
          <th colspan="3" style="width: 25%" class="requireCol">拟调出小班</th>

          <th colspan="2" style="width: 25%" class="requireCol">拟调入小班</th>
          <th rowspan="2" style="width: 10%">操作</th>
          <td rowspan="2" style="width: 13.75rem"></td>
        </tr>
        <tr>
          <th class="requireCol">小班号</th>
          <th class="requireCol">面积</th>
          <th class="requireCol">涉及国家生态红线或省级生态管控区</th>
          <th class="requireCol">小班号</th>
          <th class="requireCol">面积</th>
        </tr>
        <tr v-for="(item, index) in entity.tzyjList" :key="index">
          <td>
            <el-form-item
              :prop="`tzyjList.${index}.xmmc`"
              label-width="0"
              :rules="rules.requiredField"
            >
              <el-input v-model="item.xmmc" :disabled="disabled" />
            </el-form-item>
          </td>
          <td>
            <!-- <el-form-item
              :prop="`tzyjList.${index}.tcxbh`"
              :rules="rules.requiredChange"
            >
              <el-select
                v-model="item.tcxbh"
                :disabled="disabled"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  :label="itemdict.name"
                  :value="itemdict.code"
                  v-for="(itemdict, index) in districtOptions"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              style="margin-top: 6px"
              :prop="`tzyjList.${index}.tcCountry`"
              :rules="rules.requiredField"
            >
              <el-input v-model="item.tcCountry" :disabled="disabled" />
            </el-form-item>
            <div>村</div> -->
            <el-button
              type="primary"
              @click="F_xbDetail(item, index, 0)"
              v-if="disabled == false"
              >详细</el-button
            >
          </td>
          <td style="width: 8%">
            <el-form-item
              :prop="`tzyjList.${index}.tcxbmj`"
              label-width="0"
              :rules="rules.num"
              class="el-form-item__error_show"
            >
              <el-input v-model="item.tcxbmj" :disabled="disabled" />
            </el-form-item>
          </td>
          <td>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  :prop="`tzyjList.${index}.sfsjsthx`"
                  :rules="rules.requiredChange"
                >
                  <el-select
                    v-model="item.sfsjsthx"
                    filterable
                    clearable
                    :disabled="disabled"
                    @change="sjhxChange($event, index)"
                  >
                    <el-option
                      v-for="(item, index) in sfOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </td>
          <td>
            <!-- <el-form-item
              :prop="`tzyjList.${index}.trxbh`"
              :rules="rules.requiredChange"
            >
              <el-select
                v-model="item.trxbh"
                placeholder="请选择"
                :disabled="disabled"
                style="width: 100%"
              >
                <el-option
                  :label="itemdict.name"
                  :value="itemdict.code"
                  v-for="(itemdict, index) in districtOptions"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              style="margin-top: 6px"
              :prop="`tzyjList.${index}.trCountry`"
              :rules="rules.requiredField"
            >
              <el-input v-model="item.trCountry" :disabled="disabled" />
            </el-form-item>
            <div>村</div> -->
            <el-button
              type="primary"
              @click="F_xbDetail(item, index, 1)"
              v-if="disabled == false"
              >详细</el-button
            >
          </td>
          <td style="width: 8%">
            <el-form-item
              :prop="`tzyjList.${index}.trxmmj`"
              label-width="0"
              :rules="rules.num"
              class="el-form-item__error_show"
            >
              <el-input v-model="item.trxmmj" :disabled="disabled" />
            </el-form-item>
          </td>
          <td style="width: 8.75rem">
            <el-button
              type="primary"
              size="small"
              @click="F_addTzyj(index)"
              v-if="!disabled"
              circle
            >
              <el-icon>
                <Plus />
              </el-icon>
            </el-button>

            <el-button
              type="danger"
              size="small"
              @click="F_deltTzyj(index)"
              v-if="!disabled && entity.tzyjList.length > 1"
              circle
            >
              <el-icon>
                <Minus />
              </el-icon>
            </el-button>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="gyl_xmpffj"
              :taskId="taskId"
              btnText="项目批复附件pdf"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <th colspan="2">调出合计</th>
          <td>
            <el-input disabled v-model="tchjmj" />
          </td>
          <th colspan="2">调入合计</th>
          <td>
            <el-input disabled v-model="trhjmj" />
          </td>
          <td></td>
          <td>
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
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="gyl_slsj"
              :taskId="taskId"
              btnText="证明请示件"
            ></AttachUpload>
            <el-divider />
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="gyl_slsj"
              :taskId="taskId"
              btnText="小班明细表"
            ></AttachUpload>
            <el-divider />
            <ZbAttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="gyl_slsj"
              :taskId="taskId"
              pType="LX_X"
              businessCode="10140301"
              btnText="调入调出矢量数据shp"
            ></ZbAttachUpload>
          </td>
        </tr>
        <tr>
          <td rowspan="2" class="requireCol">征求意见</td>
          <td colspan="7">
            <el-row>
              <el-col :span="24">
                <div>拟调出小班（</div>
                <el-form-item
                  prop="jbxx.sfgs"
                  style="width: 120px"
                  :rules="rules.requiredChange"
                >
                  <el-select
                    v-model="entity.jbxx.sfgs"
                    filterable
                    clearable
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="(item, index) in sfOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>

                <div>）在所属村（组）进行公示，（</div>
                <el-form-item
                  prop="jbxx.gsYwyy"
                  style="width: 120px"
                  :rules="rules.requiredChange"
                >
                  <el-select
                    v-model="entity.jbxx.gsYwyy"
                    filterable
                    clearable
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="(item, index) in ywOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>

                <div>）异议</div>
              </el-col>
            </el-row>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="gyl_zzcl"
              :taskId="taskId"
              btnText="佐证材料pdf"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td colspan="7">
            <el-row>
              <el-col :span="24">
                <div>拟调整方案（</div>
                <el-form-item
                  prop="jbxx.sfzqyj"
                  style="width: 120px"
                  :rules="rules.requiredChange"
                >
                  <el-select
                    v-model="entity.jbxx.sfzqyj"
                    filterable
                    clearable
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="(item, index) in yweiOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div>）完成财政、环境、住建等部门意见征求，（</div>
                <el-form-item
                  prop="jbxx.yjYwyy"
                  style="width: 120px"
                  :rules="rules.requiredChange"
                >
                  <el-select
                    v-model="entity.jbxx.yjYwyy"
                    filterable
                    clearable
                    :disabled="disabled"
                  >
                    <el-option
                      v-for="(item, index) in ywOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div>）异议</div>
              </el-col>
            </el-row>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="gyl_zzclpdf"
              :taskId="taskId"
              btnText="佐证材料pdf"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">两图一说明</td>
          <td colspan="3" class="drxb">
            <el-row>
              <el-col :span="24">
                <div>按照《</div>
                <el-form-item prop="jbxx.tcCity" :rules="rules.requiredField">
                  <el-input v-model="entity.jbxx.tcCity" disabled />
                </el-form-item>
                <div>城市总体规划（</div>
                <el-form-item
                  prop="jbxx.tcYearStart"
                  :rules="rules.requiredField"
                >
                  <el-date-picker
                    type="year"
                    value-format="YYYY"
                    :disabled="disabled"
                    v-model="entity.jbxx.tcYearStart"
                    placeholder="请选择日期"
                    style="width: 8.25rem"
                  ></el-date-picker>
                </el-form-item>
                <div>--</div>
                <el-form-item
                  prop="jbxx.tcYearEnd"
                  :rules="rules.requiredField"
                >
                  <el-date-picker
                    type="year"
                    value-format="YYYY"
                    :disabled="disabled"
                    v-model="entity.jbxx.tcYearEnd"
                    placeholder="请选择日期"
                    style="width: 8.25rem"
                  ></el-date-picker>
                </el-form-item>
                <div>年）》拟调出地块功能为</div>
                <el-form-item prop="jbxx.tcDkxz" :rules="rules.requiredField">
                  <el-input v-model="entity.jbxx.tcDkxz" :disabled="disabled" />
                </el-form-item>
                <div>用地。国土空间规划（近期实时方案）占用允许建设区</div>
                <el-form-item prop="jbxx.tcYxmj" :rules="rules.num"   class="el-form-item__error_show">
                  <el-input v-model="entity.jbxx.tcYxmj" :disabled="disabled" />
                </el-form-item>
                <div>公顷，有条件建设区</div>
                <el-form-item prop="jbxx.tcTjmj" :rules="rules.num"   class="el-form-item__error_show">
                  <el-input v-model="entity.jbxx.tcTjmj" :disabled="disabled" />
                </el-form-item>
                <div>公顷，限制建设区</div>
                <el-form-item prop="jbxx.tcXzmj" :rules="rules.num"   class="el-form-item__error_show">
                  <el-input v-model="entity.jbxx.tcXzmj" :disabled="disabled" />
                </el-form-item>
                <div>公顷，禁止建设区</div>
                <el-form-item prop="jbxx.tcJzmj" :rules="rules.num"   class="el-form-item__error_show">
                  <el-input v-model="entity.jbxx.tcJzmj" :disabled="disabled" />
                </el-form-item>
                <div>公顷。</div>
              </el-col>
            </el-row>
          </td>
          <td colspan="4" class="dcxb">
            <el-row>
              <el-col :span="24">
                <div>拟调入地块，符《</div>
                <el-form-item prop="jbxx.trCity" :rules="rules.requiredField">
                  <el-input v-model="entity.jbxx.trCity" disabled />
                </el-form-item>
                <div>城市总体规划（</div>
                <el-form-item
                  prop="jbxx.tcYearStart"
                  :rules="rules.requiredField"
                >
                  <el-date-picker
                    type="year"
                    value-format="YYYY"
                    :disabled="disabled"
                    v-model="entity.jbxx.tcYearStart"
                    placeholder="请选择日期"
                    style="width: 8.25rem"
                  ></el-date-picker>
                </el-form-item>
                <div>--</div>
                <el-form-item
                  prop="jbxx.tcYearEnd"
                  :rules="rules.requiredField"
                >
                  <el-date-picker
                    type="year"
                    value-format="YYYY"
                    :disabled="disabled"
                    v-model="entity.jbxx.tcYearEnd"
                    placeholder="请选择日期"
                    style="width: 8.25rem"
                  ></el-date-picker>
                </el-form-item>
                <div>年）》,用地性质为</div>
                <el-form-item prop="jbxx.trDkxz" :rules="rules.requiredField">
                  <el-input v-model="entity.jbxx.trDkxz" :disabled="disabled" />
                </el-form-item>
                <div>；国土空间规划（近期实时方案）占用允许建设区</div>
                <el-form-item prop="jbxx.trYxmj" :rules="rules.num" class="el-form-item__error_show">
                  <el-input v-model="entity.jbxx.trYxmj" :disabled="disabled" />
                </el-form-item>
                <div>公顷，有条件建设区</div>
                <el-form-item prop="jbxx.trTjmj" :rules="rules.num" class="el-form-item__error_show">
                  <el-input v-model="entity.jbxx.trTjmj" :disabled="disabled" />
                </el-form-item>
                <div>公顷，限制建设区</div>
                <el-form-item prop="jbxx.trXzmj" :rules="rules.num" class="el-form-item__error_show">
                  <el-input v-model="entity.jbxx.trXzmj" :disabled="disabled" />
                </el-form-item>
                <div>公顷，禁止建设区</div>
                <el-form-item prop="jbxx.trJzmj" :rules="rules.num" class="el-form-item__error_show">
                  <el-input v-model="entity.jbxx.trJzmj" :disabled="disabled" />
                </el-form-item>
                <div>公顷。</div>
              </el-col>
            </el-row>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="gyl_zzcl"
              :taskId="taskId"
              btnText="佐证材料pdf"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td :rowspan="F_getHxChange()" class="requireCol">
            涉及生态红线（管控区）明细
          </td>
          <th colspan="2" class="requireCol">项目名称</th>
          <th colspan="5" class="requireCol">涉及生态红线（管控区）明细</th>
          <td :rowspan="F_getHxChange()"></td>
        </tr>
        <template v-for="(item, index) in entity.tzyjList" :key="index">
          <tr v-if="item.sfsjsthx == '1'">
            <td colspan="2">
              <el-form-item
                :prop="`tzyjList.${index}.xmmc`"
                :rules="rules.requiredField"
              >
                <el-input v-model="item.xmmc" placeholder="项目名称" disabled />
              </el-form-item>
            </td>
            <td colspan="5">
              <el-row>
                <el-col :span="24">
                  <el-form-item
                    :prop="`tzyjList.${index}.gklx`"
                    :rules="rules.requiredField"
                  >
                    <el-select
                      v-model="item.gklx"
                      filterable
                      clearable
                      :disabled="disabled"
                      style="width: 150px"
                    >
                      <el-option
                        v-for="(item, index) in gkOptins"
                        :key="index"
                        :label="item.codeName"
                        :value="parseInt(item.codeValue)"
                      />
                    </el-select>
                  </el-form-item>
                  <div>红线、管控区名称:</div>
                  <el-form-item
                    :prop="`tzyjList.${index}.hxmc`"
                    :rules="rules.requiredField"
                  >
                    <el-input
                      v-model="item.hxmc"
                      placeholder="红线、管控区名称"
                      :disabled="disabled"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div style="margin-left: 6px !important">管控措施:</div>
                  <el-form-item
                    :prop="`tzyjList.${index}.sftz`"
                    :rules="rules.requiredField"
                  >
                    <el-select
                      v-model="item.sftz"
                      filterable
                      clearable
                      :disabled="disabled"
                    >
                      <el-option
                        v-for="(item, index) in sfTzOptions"
                        :key="index"
                        :label="item.codeName"
                        :value="parseInt(item.codeValue)"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
          </tr>
        </template>

        <tr
          v-if="
            data.entity.tzyjList.filter((val) => val.sfsjsthx == '1').length ==
            0
          "
        >
          <td colspan="7">暂无数据</td>
        </tr>
        <tr>
          <td class="requireCol">涉及情况</td>
          <td colspan="7">
            <el-row>
              <el-col :span="24">
                <div>拟调整小班（</div>
                <el-form-item prop="jbxx.sfsjtd" :rules="rules.requiredChange">
                  <el-select
                    v-model="entity.jbxx.sfsjtd"
                    filterable
                    clearable
                    :disabled="disabled"
                    style="width: 8.25rem"
                  >
                    <el-option
                      v-for="(item, index) in sfOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div>）涉及耕地、基本农田情况。</div>
              </el-col>
            </el-row>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="gyl_zzclpdf"
              :taskId="taskId"
              btnText="佐证材料pdf"
              v-if="entity.jbxx.sfsjtd == 1"
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
            <th colspan="7">{{ item.stepName }}</th>
            <td :rowspan="3">
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="xj_spwj"
                :taskId="item.taskId"
                :catalog="item.taskId"
                btnText="县级审批文件pdf"
                v-if="item.stepCode == 'STGYLTZSP_XQLYSC'"
              ></AttachUpload>
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="sj_spwj"
                :taskId="item.taskId"
                :catalog="item.taskId"
                btnText="市级审批文件pdf"
                v-if="item.stepCode == 'STGYLTZSP_SJSC'"
              ></AttachUpload>
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="province_spwj"
                :taskId="item.taskId"
                :catalog="item.taskId"
                btnText="省级审批文件pdf"
                v-if="item.stepCode == 'STGYLTZSP_SLYJSC'"
              ></AttachUpload>
            </td>
          </tr>

          <tr v-if="item.stepCode == 'STGYLTZSP_XJLYCS'">
            <td colspan="7" class="spyj-image">
              <ImageUpload
                :flowinstid="flowinstid"
                :taskId="taskId"
                :disabled="F_getAction(item.taskId)"
                :catalog="item.taskId"
                referenceId="lyk_fj"
              ></ImageUpload>
            </td>
          </tr>
          <tr v-else-if="item.stepCode == 'STGYLTZSP_GBCSH'">
            <td colspan="7" class="spyj-image">
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
            <td colspan="7">
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
            <td colspan="7">
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
  <XbAdd ref="xbAdd" @refreshXb="F_refreshXb"></XbAdd>
</template>

<script setup>
import panel from "@/common/components/card/cardPanel";
import { ref, reactive, toRefs, computed } from "@vue/reactivity";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { init, saveOrUpdate, deleteLx } from "@/ly/api/proj/gyl";
import { bjbSave } from "@/common/api/jtap/bjb";
import { getDictList } from "@/common/api/jtap/dict";
import store from "@/common/store";
import moment from "moment";
import { getDistrictList, getZhen } from "@/common/api/jtap/district";
import AttachUpload from "@/common/components/attach/upload/moreAttachUpload2";
import ZbAttachUpload from "@/common/components/attach/upload/zbAttachUpload";
import { isNullorEmpty, getRules, checkValidate } from "@/ly/verification/gyl";
import ImageUpload from "@/common/components/attach/upload/moreImageUpload";
import { Plus, Minus } from "@element-plus/icons-vue";
import XbAdd from "@/ly/pages/proj/xbAdd";
import { ggDownLoadModel } from "@/common/api/jtap/download";
//1. 定义数据
const route = useRoute();
const params = route.query;
const xbAdd = ref(null);
const data = reactive({
  flowinstid: params.flowinstid,
  taskId: params.taskId,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  xzqdm: store.state.user.regionCode,
  entity: {
    jbxx: {}, //填报表单
    tzyjList: [{}], //项目信息列表
    sthxmxList: [], //涉及生态红线（管控区）明细
    bjbList: [], //审批意见
    bjb: {}, //当前审批人意见
  },
  sfOptions: [], //是否
  sfTzOptions: [],
  gkOptins: [],
  ywOptions: [], //有无
  yweiOptions: [], //已未
  districtOptions: [], //村列表
  rules: getRules(),
  tchjmj: 0,
  trhjmj: 0,
  currentTzyjIndex: 0,
  type: 0,
});
const {
  tchjmj,
  trhjmj,
  xzqdm,
  flowinstid,
  taskId,
  disabled,
  entity,
  sfOptions,
  sfTzOptions,
  districtOptions, //行政区列表
  gkOptins,
  ywOptions,
  yweiOptions,
  rules,
} = toRefs(data);

const gylform = ref(null);

//2.定义方法

data.tchjmj = computed(() => {
  let tchjmj = 0;
  for (var i = 0; i < data.entity.tzyjList.length; i++) {
    let tcmj = isNullorEmpty(data.entity.tzyjList[i].tcxbmj)
      ? 0
      : data.entity.tzyjList[i].tcxbmj;
    tchjmj += parseFloat(tcmj);
  }
  return tchjmj;
});

data.trhjmj = computed(() => {
  let trhjmj = 0;
  for (var i = 0; i < data.entity.tzyjList.length; i++) {
    let trmj = isNullorEmpty(data.entity.tzyjList[i].trxmmj)
      ? 0
      : data.entity.tzyjList[i].trxmmj;
    trhjmj += parseFloat(trmj);
  }
  return trhjmj;
});

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
      data.xzqdm = data.entity.jbxx.xzqhdm;
    } else {
      if (store.state.user.grade != 1) {
        //县级用户默认当前用户行政区
        data.entity.jbxx.xzqhdm = store.state.user.regionCode;
        data.xzqdm = store.state.user.regionCode;
      }
      data.entity.bjbList = res.data.bjbList;
    }
    F_getDistrictList();
  });
};

/**
 * 获取行政区列表
 */
const F_getDistrictList = () => {
  if (store.state.user.grade == 1) {
    //县级用户默认当前用户行政区
    data.xzqdm = "320600";
  } else {
    data.xzqdm = data.entity.jbxx.xzqhdm;
  }
  getZhen(data.xzqdm).then((res) => {
    data.districtOptions = res.data;
    if (data.districtOptions.length > 0) {
      if (!data.entity.jbxx.tcCity)
        data.entity.jbxx.tcCity = data.districtOptions[0].superName;
      if (!data.entity.jbxx.trCity)
        data.entity.jbxx.trCity = data.districtOptions[0].superName;
    }
  });
};

/**
 * 获取多部门环节意见
 * @param {*} val
 * @param {*} index
 */
const F_getSpyjts = (val, index) => {
  if (val) {
    let arr = val.split("$");
    if (arr[index]) {
      return arr[index];
    }
  }
  return "";
};

/**
 * 获取数据字典
 */
const F_getDict = () => {
  getDictList("是否").then((res) => {
    data.sfOptions = res.data;
  });
  getDictList("有无").then((res) => {
    data.ywOptions = res.data;
  });
  getDictList("已未").then((res) => {
    data.yweiOptions = res.data;
  });
  getDictList("公益林_调整类型").then((res) => {
    data.sfTzOptions = res.data;
  });
  getDictList("公益林_管控类型").then((res) => {
    data.gkOptins = res.data;
  });
};

/**
 * 调整依据-项目信息-添加行
 */
const F_addTzyj = () => {
  data.entity.tzyjList.push({});
};

/**
 * 调整依据-项目信息-删除行
 */
const F_deltTzyj = (index) => {
  if (data.entity.tzyjList.length > 1) {
    data.entity.tzyjList.splice(index, 1);
    F_deltSthx(index);
  } else {
    ElMessage.error("请至少保存一条数据！");
  }
};

/**
 * 获取小班涉及国家生态红线或省级生态管控区时对应的列数变化
 *
 */
const F_getHxChange = () => {
  if (data.entity.tzyjList.length > 0) {
    let arr = data.entity.tzyjList.filter((val) => val.sfsjsthx == "1");
    return arr.length > 0 ? arr.length + 1 : arr.length + 2;
  } else {
    return 2;
  }
};

/**
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空
  await gylform.value.validate((valid) => {
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
  data.entity.jbxx.tchjmj = data.tchjmj;
  data.entity.jbxx.trhjmj = data.trhjmj;
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
    _bjb.stepCode == "STGYLTZSP_XJLYCS" ||
    _bjb.stepCode == "STGYLTZSP_GBCSH"
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

/**
 * 初始化小班详细界面
 * @param {*} val
 *  @param {*} type 0为调出小班，1为调入小班
 */
const F_xbDetail = (val, index, type) => {
  let xbList = [];
  data.type = type;
  data.currentTzyjIndex = index;

  if (type == 0) {
    xbList = val.tcXbList;
  } else {
    xbList = val.trXbList;
  }
  xbAdd.value.F_getDistrictListXb(data.xzqdm);
  xbAdd.value.F_Init(xbList, data.disabled);
};

/**
 * 更新调整依据小班明细
 * @param {*} val
 */
const F_refreshXb = (val) => {
  if (data.type == 0) {
    data.entity.tzyjList[data.currentTzyjIndex].tcXbList = val;
  } else {
    data.entity.tzyjList[data.currentTzyjIndex].trXbList = val;
  }
};

/**
 * shp坐标模板下载
 */
 const F_download = () => {
   let path = "/usr/tdzzly/files/api-ly/templateFilePath/林业模板.zip";
   ggDownLoadModel(path);
};


//3.入口
onMounted(() => {
  //1.初始化
  F_init();
  //2.定义监听事件
  bus.on("gyl_save", async (obj) => {
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
  bus.on("gyl_delete", (callback) => {
    F_delete(callback);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("gyl_save");
  bus.off("gyl_delete");
});
</script>
<style lang="scss" scoped>
.drxb,
.dcxb {
  .el-input {
    width: 12.5rem;
  }
}
</style>
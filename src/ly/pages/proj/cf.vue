<template>
  <el-card
    header="林木采伐许可审批事项申报信息表"
    class="tlw-card tlw-lysp-form"
  >
    <el-form
      :model="entity"
      :rules="rules"
      ref="cfform"
      label-width="auto"
      :inline-message="true"
      class="lysp-cf-form"
    >
      <table class="tlw-table">
        <tr>
          <th style="width: 10%">填报项目</th>
          <th colspan="2">填报内容</th>
          <th style="width: 15%">附件</th>
        </tr>
        <tr>
          <td class="requireCol">项目名称</td>
          <td colspan="2">
            <el-form-item
              prop="jbxx.xmmc"
              label-widtd="0"
              :rules="rules.requiredField"
            >
              <el-input
                v-model="entity.jbxx.xmmc"
                :disabled="disabled"
                style="width: 100%"
              />
            </el-form-item>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="requireCol">项目编号</td>
          <td colspan="2">
            <el-form-item prop="jbxx.xmbh" label-width="0">
              <el-input
                v-model="entity.jbxx.xmbh"
                disabled
                style="width: 100%"
              />
            </el-form-item>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="requireCol">采伐单位/个人</td>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <el-form-item
                  prop="jbxx.lxrxz"
                  class="el-form-item__error_show"
                >
                  <el-radio-group
                    v-model="entity.jbxx.lxrxz"
                    :disabled="disabled"
                  >
                    <el-radio :label="parseInt(1)">单位</el-radio>
                    <el-radio :label="parseInt(2)">个人</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="data.entity.jbxx.lxrxz == '1'">
              <el-col :span="24">
                <div style="width: 10%">单位名称：</div>
                <el-form-item
                  prop="jbxx.cfdw"
                  label-width="0"
                  :rules="
                    data.entity.jbxx.lxrxz == '1' ? rules.requiredField : null
                  "
                  style="width: 85%"
                >
                  <el-input
                    v-model="entity.jbxx.cfdw"
                    placeholder="单位名称"
                    :disabled="disabled"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div style="width: 10%">联系人：</div>
                <el-form-item
                  prop="jbxx.cfdwGr"
                  label-width="0"
                  :rules="rules.requiredField"
                  style="width: 85%"
                >
                  <el-input
                    v-model="entity.jbxx.cfdwGr"
                    placeholder="联系人"
                    :disabled="disabled"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div style="width: 10%">联系方式：</div>
                <el-form-item
                  prop="jbxx.cfdwLx"
                  :rules="rules.phone"
                  label-width="0"
                  class="el-form-item__error_show"
                  style="width: 85%"
                >
                  <el-input
                    v-model="entity.jbxx.cfdwLx"
                    placeholder="联系方式"
                    :disabled="disabled"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="cf_zmcl"
              :taskId="taskId"
              btnText="采伐申请单位/个人身份证明材料PDF"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol" style="width: 10%">采伐地点</td>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <el-form-item prop="jbxx.xzqhdm" :rules="rules.requiredField">
                  <el-select
                    v-model="entity.jbxx.xzqhdm"
                    placeholder="请选择"
                    :disabled="disabled || store.state.user.grade != 1"
                    @change="F_xzqchange"
                    style="width: 100%"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.code"
                      v-for="(item, index) in district"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <div>县</div>
                <el-form-item
                  prop="jbxx.cfssxz"
                  :rules="rules.requiredField"
                  class="td-left"
                >
                  <el-select
                    v-model="entity.jbxx.cfssxz"
                    placeholder="请选择"
                    :disabled="disabled"
                    style="width: 100%"
                  >
                    <el-option
                      :label="item.name"
                      :value="item.code"
                      v-for="(item, index) in districtOptions"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <div>镇</div>
                <el-form-item
                  prop="jbxx.cfssqy"
                  :rules="rules.requiredField"
                  class="td-left"
                >
                  <el-input v-model="entity.jbxx.cfssqy" :disabled="disabled" />
                </el-form-item>
                <div>村</div>
                <div class="td-left">小班号：</div>
                <el-form-item prop="jbxx.cfssxbh" :rules="rules.requiredField">
                  <el-input
                    v-model="entity.jbxx.cfssxbh"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </td>
          <td style="width: 15%" rowspan="3">
            <el-button
              type="primary"
              size="small"
              @click="F_download"
              v-if="!disabled"
              ><el-icon class="el-icon--left"> <Download /> </el-icon
              >shp坐标模板下载
            </el-button>
            <el-divider v-if="!disabled" />
            <ZbAttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="cf_slsj"
              :taskId="taskId"
              pType="LX_X"
              :businessCode="10140201"
              btnText="森林类别证明pdf小班矢量数据"
            >
            </ZbAttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol" rowspan="2">采伐情况</td>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <div>公益林：</div>
                <el-form-item
                  prop="jbxx.cfmjCj"
                  :rules="rules.cfmjCj"
                  class="el-form-item__error_show"
                >
                  <el-radio-group
                    v-model="entity.jbxx.cfmjCj"
                    :disabled="disabled"
                  >
                    <el-radio :label="parseInt(1)">省级</el-radio>
                    <el-radio :label="parseInt(2)">国家级</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div class="td-left">采伐面积：</div>
                <el-form-item
                  prop="jbxx.cfmjGyl"
                  :rules="rules.num"
                  class="el-form-item__error_show"
                >
                  <el-input
                    v-model="entity.jbxx.cfmjGyl"
                    :disabled="disabled"
                  />
                </el-form-item>
                <div>公顷</div>
                <div class="td-left">采伐类型：</div>
                <el-form-item prop="jbxx.cflxGyl" :rules="rules.requiredChange">
                  <el-select
                    v-model="entity.jbxx.cflxGyl"
                    clearable
                    :disabled="disabled"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in cflxgylOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeValue"
                    />
                  </el-select>
                </el-form-item>
                <div class="td-left">采伐方式：</div>
                <el-form-item prop="jbxx.cffsGyl" :rules="rules.requiredChange">
                  <el-input
                    v-model="entity.jbxx.cffsGyl"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div>采伐强度：</div>
                <el-form-item
                  prop="jbxx.cfqdGyl"
                  :rules="rules.num"
                  class="el-form-item__error_show"
                >
                  <el-input
                    v-model="entity.jbxx.cfqdGyl"
                    :disabled="disabled"
                  />
                </el-form-item>
                %
                <div class="td-left">
                  限额：{{ data.entity.jbxx.xeGyl }}公顷
                </div>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td class="requireCol" colspan="2">
            <el-row>
              <el-col :span="24">
                <div>商品林：</div>
                <el-form-item
                  prop="jbxx.cfmjLevel"
                  :rules="rules.cfmjLevel"
                  class="el-form-item__error_show"
                >
                  <el-radio-group
                    v-model="entity.jbxx.cfmjLevel"
                    :disabled="disabled"
                  >
                    <el-radio :label="parseInt(1)">重点</el-radio>
                    <el-radio :label="parseInt(2)">一般</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div class="td-left">采伐面积：</div>
                <el-form-item
                  prop="jbxx.cfmjSpl"
                  :rules="rules.num"
                  class="el-form-item__error_show"
                >
                  <el-input
                    v-model="entity.jbxx.cfmjSpl"
                    :disabled="disabled"
                  />
                </el-form-item>
                <div>公顷</div>
                <div class="td-left">采伐类型：</div>
                <el-form-item prop="jbxx.cflxSpl" :rules="rules.requiredChange">
                  <el-select
                    v-model="entity.jbxx.cflxSpl"
                    clearable
                    :disabled="disabled"
                    @change="F_clearSplCffs"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in cflxsplOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeValue"
                    />
                  </el-select>
                </el-form-item>
                <div class="td-left">采伐方式：</div>
                <el-form-item prop="jbxx.cffsSpl" :rules="rules.requiredChange">
                  <el-select
                    v-model="entity.jbxx.cffsSpl"
                    clearable
                    v-if="entity.jbxx.cflxSpl == '2'"
                    :disabled="disabled"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in cffsOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="item.codeValue"
                    />
                  </el-select>
                  <el-input
                    v-else
                    v-model="entity.jbxx.cffsSpl"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div>采伐强度：</div>
                <el-form-item
                  prop="jbxx.cfqdSpl"
                  :rules="rules.num"
                  class="el-form-item__error_show"
                >
                  <el-input
                    v-model="entity.jbxx.cfqdSpl"
                    :disabled="disabled"
                  />
                </el-form-item>
                <div>%</div>
                <div class="td-left">
                  限额：{{ data.entity.jbxx.xeSpl }}公顷
                </div>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td class="requireCol">终审权限</td>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <el-form-item
                  prop="jbxx.zsqx"
                  :rules="rules.zsqx"
                  class="el-form-item__error_show"
                >
                  <el-radio-group
                    v-model="entity.jbxx.zsqx"
                    :disabled="disabled"
                  >
                    <el-radio
                      :label="parseInt(item.codeValue)"
                      v-for="(item, index) in spqxOptions"
                      :key="index"
                      >{{ item.codeName }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="requireCol" rowspan="4">作业设计</td>
          <td colspan="2">
            <el-row>
              <el-col :span="10">
                <el-form-item
                  prop="jbxx.zysj"
                  :rules="rules.requiredChange"
                  label-width="0"
                >
                  <el-select
                    v-model="entity.jbxx.zysj"
                    filterable
                    clearable
                    :disabled="disabled"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(item, index) in sfOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div class="td-left">需要编制采伐作业设计</div>
              </el-col>
            </el-row>
          </td>
          <td rowspan="4">
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="cf_gxzysj"
              :taskId="taskId"
              btnText="采伐更新作业设计说明书pdf"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol" colspan="2">
            <el-row>
              <el-col :span="24">
                <div>单位名称：</div>
                <el-form-item prop="jbxx.zysjdwmc" :rules="rules.requiredField">
                  <el-input
                    v-model="entity.jbxx.zysjdwmc"
                    placeholder="填写作业设计单位名称"
                    :disabled="disabled"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <div>联系人：</div>
                <el-form-item
                  prop="jbxx.zysjdwlxr"
                  :rules="rules.requiredField"
                >
                  <el-input
                    v-model="entity.jbxx.zysjdwlxr"
                    placeholder="填写作业设计联系人"
                    :disabled="disabled"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <div>联系方式：</div>
                <el-form-item
                  prop="jbxx.zysjdwlxfs"
                  :rules="rules.phone"
                  class="el-form-item__error_show"
                >
                  <el-input
                    v-model="entity.jbxx.zysjdwlxfs"
                    placeholder="填写作业设计单位联系方式"
                    :disabled="disabled"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td class="requireCol">树木权属</td>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <el-form-item prop="jbxx.qslx" :rules="rules.requiredChange">
                  <el-select
                    v-model="entity.jbxx.qslx"
                    filterable
                    clearable
                    :disabled="disabled"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in qslxOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div v-if="entity.jbxx.qslx == 1" class="td-left">
                  林权证号：
                </div>
                <el-form-item
                  prop="jbxx.lmqsZsh"
                  v-if="entity.jbxx.qslx == 1"
                  :rules="rules.requiredField"
                >
                  <el-input
                    v-model="entity.jbxx.lmqsZsh"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </td>
          <td>
            <AttachUpload
              v-if="entity.jbxx.qslx == 2"
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="cf_qszm"
              :taskId="taskId"
              btnText="权属证明pdf"
            ></AttachUpload>
            <AttachUpload
              v-else
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="cf_qszm"
              :taskId="taskId"
              btnText="林权证号pdf"
            ></AttachUpload>
          </td>
        </tr>

        <tr>
          <td class="requireCol">采伐树种</td>
          <td colspan="2">
            <el-row>
              <el-col :span="6">
                <div>总株数：</div>
                <el-form-item
                  prop="jbxx.cfszNumber"
                  :rules="rules.intNum"
                  class="el-form-item__error_show"
                >
                  <el-input
                    v-model="entity.jbxx.cfszNumber"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <div class="td-left">树种名称：</div>
                <el-form-item
                  prop="jbxx.cfszYs"
                  :rules="rules.requiredField"
                  style="width: 85%"
                >
                  <el-input
                    v-model="entity.jbxx.cfszYs"
                    :disabled="disabled"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </td>
          <td rowspan="2">
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="cf_zp"
              :taskId="taskId"
              btnText="3-4张现地照片jpg"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">采伐蓄积</td>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <el-form-item
                  prop="jbxx.cfxj"
                  :rules="rules.num"
                  class="el-form-item__error_show"
                >
                  <el-input v-model="entity.jbxx.cfxj" :disabled="disabled" />
                </el-form-item>
                <div>立方米（出材量：</div>
                <el-form-item
                  prop="jbxx.cfxjCcl"
                  :rules="rules.num"
                  class="el-form-item__error_show"
                >
                  <el-input
                    v-model="entity.jbxx.cfxjCcl"
                    :disabled="disabled"
                  />
                </el-form-item>
                <div>立方米）</div>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td class="requireCol" rowspan="3">采伐更新</td>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <div>更新时间：</div>
                <el-form-item prop="jbxx.cfgxrq" :rules="rules.requiredField">
                  <el-date-picker
                    type="date"
                    v-model="entity.jbxx.cfgxrq"
                    :disabled="disabled"
                    placeholder="请选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </td>
          <td rowspan="3"></td>
        </tr>
        <tr>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <div>更新树种：</div>
                <el-form-item
                  prop="jbxx.cfgxsz"
                  class="el-form-item__error_show"
                  style="width: 90%"
                >
                  <el-input
                    type="textarea"
                    v-model="entity.jbxx.cfgxsz"
                    :disabled="disabled"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <div>更新面积：</div>
                <el-form-item
                  prop="jbxx.cfgxmj"
                  :rules="rules.num"
                  class="el-form-item__error_show"
                >
                  <el-input v-model="entity.jbxx.cfgxmj" :disabled="disabled" />
                </el-form-item>
                <div>公顷</div>
                <div>共：</div>
                <el-form-item
                  prop="jbxx.cfgxsl"
                  :rules="rules.intNum"
                  class="el-form-item__error_show"
                >
                  <el-input v-model="entity.jbxx.cfgxsl" :disabled="disabled" />
                </el-form-item>
                <div>株</div>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td class="requireCol">采伐论证</td>
          <td colspan="2">
            <el-row>
              <el-col>
                <el-form-item prop="jbxx.iszj" :rules="rules.requiredChange">
                  <el-select
                    v-model="entity.jbxx.iszj"
                    filterable
                    clearable
                    :disabled="disabled"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(item, index) in sfOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div>需要专家认证&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <el-form-item
                  prop="jbxx.istgrz"
                  :rules="entity.jbxx.iszj == 1 ? rules.requiredChange : null"
                  v-if="entity.jbxx.iszj == 1"
                >
                  <el-select
                    v-model="entity.jbxx.istgrz"
                    filterable
                    clearable
                    :disabled="disabled"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(item, index) in sfOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div v-if="entity.jbxx.iszj == 1">通过专家认证</div>
              </el-col>
            </el-row>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="cf_lzfj"
              :taskId="taskId"
              btnText="论证附件pdf"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">限额情况</td>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <el-form-item prop="jbxx.isxe" :rules="rules.requiredChange">
                  <el-select
                    v-model="entity.jbxx.isxe"
                    filterable
                    clearable
                    :disabled="disabled"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(item, index) in sfOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div v-if="entity.jbxx.isxe == 1">占用限额（占用</div>
                <el-form-item
                  prop="jbxx.nx"
                  class="el-form-item__error_show"
                  :rules="entity.jbxx.isxe == 1 ? rules.num : null"
                  v-if="entity.jbxx.isxe == 1"
                >
                  <el-input v-model="entity.jbxx.nx" :disabled="disabled" />
                </el-form-item>
                <div v-if="entity.jbxx.isxe == 1">年限额）;</div>
                <el-form-item
                  prop="jbxx.xelx"
                  :rules="entity.jbxx.isxe == 1 ? rules.num : null"
                  class="el-form-item__error_show"
                  v-if="entity.jbxx.isxe == 1"
                >
                  <el-select
                    v-model="entity.jbxx.xelx"
                    filterable
                    clearable
                    :disabled="disabled"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in xelxOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </td>
          <td></td>
        </tr>

        <tr>
          <td class="requireCol" rowspan="3">水工用地情况</td>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <el-form-item prop="jbxx.issjsg" :rules="rules.requiredChange">
                  <el-select
                    v-model="entity.jbxx.issjsg"
                    filterable
                    clearable
                    :disabled="disabled"
                    style="width: 100%"
                    @change="F_sgyd"
                  >
                    <el-option
                      v-for="(item, index) in sfOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div>涉及水工用地</div>
              </el-col>
            </el-row>
          </td>
          <td rowspan="3">
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              btnText="相关县级pdf附件"
              referenceId="cf_xgfj"
              :taskId="taskId"
            ></AttachUpload>
            <el-divider></el-divider>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              btnText="相关市级pdf附件"
              referenceId="cf_xgfj_sj"
              :taskId="taskId"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <el-form-item
                  prop="jbxx.istrue"
                  :rules="entity.jbxx.issjsg == 1 ? rules.requiredChange : null"
                >
                  <el-select
                    v-model="entity.jbxx.istrue"
                    filterable
                    clearable
                    :disabled="disabled || disabled_sg"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(item, index) in sfOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div>通过县水利部门同意</div>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-row>
              <el-col :span="24">
                <el-form-item
                  prop="jbxx.istrueSj"
                  :rules="entity.jbxx.issjsg == 1 ? rules.requiredChange : null"
                >
                  <el-select
                    v-model="entity.jbxx.istrueSj"
                    filterable
                    clearable
                    :disabled="disabled || disabled_sg"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(item, index) in sfOptions"
                      :key="index"
                      :label="item.codeName"
                      :value="parseInt(item.codeValue)"
                    />
                  </el-select>
                </el-form-item>
                <div>通过市水利部门同意</div>
              </el-col>
            </el-row>
          </td>
        </tr>
        <tr>
          <td class="requireCol">是否完成上年度采伐迹地恢复</td>
          <td colspan="2">
            <el-form-item prop="jbxx.iswchf" :rules="rules.requiredChange">
              <el-select
                v-model="entity.jbxx.iswchf"
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
          </td>
          <td rowspan="2">
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="cf_xgpdf"
              :taskId="taskId"
              btnText="相关pdf附件"
            ></AttachUpload>
          </td>
        </tr>
        <tr>
          <td class="requireCol">上年度是否有重大破坏森林资源案件发生</td>
          <td colspan="2">
            <el-form-item prop="jbxx.isfsaj" :rules="rules.requiredChange">
              <el-select
                v-model="entity.jbxx.isfsaj"
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
          </td>
        </tr>
        <tr>
          <td class="requireCol">其他需要提供或说明的事项</td>
          <td colspan="2">
            <el-form-item prop="jbxx.qtqk" :rules="rules.requiredField">
              <el-input
                v-model="entity.jbxx.qtqk"
                type="textarea"
                :disabled="disabled"
                style="width: 100%"
              >
              </el-input>
            </el-form-item>
          </td>
          <td>
            <AttachUpload
              :disabled="disabled"
              :flowinstid="flowinstid"
              referenceId="cf_pdffj"
              :taskId="taskId"
              btnText="相关pdf附件"
            ></AttachUpload>
          </td>
        </tr>
        <template v-for="(item, index) in entity.bjbList" :key="index">
          <tr>
            <td :rowspan="entity.bjbList.length * 3" v-if="index === 0">
              <span class="requireCol">审查意见</span>
            </td>
            <th colspan="2">{{ item.stepName }}</th>
            <td :rowspan="3">
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="xj_spwj"
                :taskId="item.taskId"
                :catalog="item.taskId"
                btnText="县级审批文件pdf"
                v-if="item.stepCode == 'LYCFXKSP_XQLYSC'"
              ></AttachUpload>
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="sj_spwj"
                :taskId="item.taskId"
                :catalog="item.taskId"
                btnText="市级审批文件pdf"
                v-if="item.stepCode == 'LYCFXKSP_SJSC'"
              ></AttachUpload>
              <AttachUpload
                :disabled="F_getAction(item.taskId)"
                :flowinstid="flowinstid"
                referenceId="province_spwj"
                :taskId="item.taskId"
                :catalog="item.taskId"
                btnText="省级审批文件pdf"
                v-if="item.stepCode == 'LYCFXKSP_SLYJSC'"
              ></AttachUpload>
            </td>
          </tr>
          <tr>
            <td colspan="2">
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
            <td colspan="2">
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
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { onMounted, onBeforeUnmount } from "@vue/runtime-core";
import bus from "@/common/utils/bus";
import { init, saveOrUpdate, deleteLx } from "@/ly/api/proj/cf";
import { bjbSave } from "@/common/api/jtap/bjb";
import { getDictList } from "@/common/api/jtap/dict.js";
import store from "@/common/store";
import moment from "moment";
import AttachUpload from "@/common/components/attach/upload/moreAttachUpload2";
import ZbAttachUpload from "@/common/components/attach/upload/zbAttachUpload";
import { getDistrictList } from "@/common/api/jtap/district";
import { getRules, checkValidate } from "@/ly/verification/cf";
import { findByXzqdmAndYear } from "@/ly/api/xtwh/xtwh_cf";
import { ggDownLoadModel } from "@/common/api/jtap/download";

//1. 定义数据
const route = useRoute();
const params = route.query;
const data = reactive({
  flowinstid: params.flowinstid,
  taskId: params.taskId,
  flowAction: params.flowAction,
  disabled: params.action == "VIEW" ? true : false,
  leftmj: 90,
  district: [], //用户行政区
  districtOptions: [], //行政区列表
  disabled_sg: true,
  xzqdm: "",
  entity: {
    jbxx: {},
    bjbList: [], //审批意见
    bjb: {},
  },
  bjb: {}, //当前审批人意见
  sfOptions: [], //是否
  xelxOptions: [], //限额类型
  //采伐类型
  cflxsplOptions: [],
  //采伐类型
  cflxgylOptions: [],
  //采伐方式
  cffsOptions: [],
  qslxOptions: [], //树木权属类型
  spqxOptions: [],
  rules: getRules(),
});
const {
  flowinstid,
  taskId,
  disabled,
  entity,
  disabled_sg,
  district,
  districtOptions, //行政区列表
  cflxsplOptions,
  cflxgylOptions,
  cffsOptions,
  bjb,
  sfOptions,
  xelxOptions,
  spqxOptions,
  qslxOptions,
  rules,
} = toRefs(data);

const cfform = ref(null);

//2.定义方法

/**
 * 初始化
 */
const F_init = () => {
  F_getDict();
  F_getDetail();
  F_getDistrictList();
};

/**
 * 获取详情
 */
const F_getDetail = () => {
  init(data.flowinstid, data.taskId, data.flowAction).then((res) => {
    if (res.data.jbxx.flowinstid) {
      data.entity = res.data;
      F_getDistrictOptionsList();
    } else {
      data.entity.jbxx.issjsg = 0;
      data.entity.jbxx.isxe = 0;
      data.entity.jbxx.qslx = 1;
      data.entity.jbxx.iszj = 0;
      data.entity.jbxx.lxrxz = 1;
      if (store.state.user.grade != 1) {
        //县级用户默认当前用户行政区
        data.entity.jbxx.xzqhdm = store.state.user.regionCode;
        F_getDistrictOptionsList();
      }
      F_getXe();
      data.entity.bjbList = res.data.bjbList;
    }
    F_getDistrictList();
  });
};

/**
 * 获取行政区列表
 */
const F_getDistrictList = () => {
  //获取区县行政区
  getDistrictList("320600").then((res) => {
    data.district = res.data;
  });
};

/**
 * 获取对应镇行政区
 *
 */
const F_getDistrictOptionsList = () => {
  getDistrictList(data.entity.jbxx.xzqhdm).then((res) => {
    data.districtOptions = res.data;
  });
};

/**
 * 获取对应镇的行政区限额
 */
const F_getXe = () => {
  //初次保存可编辑时，存当前限额值
  if (!data.disabled) {
    let nowyear = new Date().getFullYear();
    if (data.entity.jbxx.xzqhdm) {
      findByXzqdmAndYear(data.entity.jbxx.xzqhdm, nowyear).then((res2) => {
        data.entity.jbxx.xeGyl = res2.data.xeGyl;
        data.entity.jbxx.xeSpl = res2.data.xeSpl;
      });
    } else {
      data.entity.jbxx.xeGyl = 0;
      data.entity.jbxx.xeSpl = 0;
    }
  }
};

/**
 * 行政区改变事件
 */
const F_xzqchange = () => {
  F_getDistrictOptionsList();
  F_getXe();
};

/**
 * 获取数据字典
 */
const F_getDict = () => {
  //是否
  getDictList("是否").then((res) => {
    data.sfOptions = res.data;
  });
  getDictList("采伐_限额类型").then((res) => {
    data.xelxOptions = res.data;
  });
  getDictList("采伐_商品林采伐类型").then((res) => {
    data.cflxsplOptions = res.data;
  });
  getDictList("采伐_公益林采伐类型").then((res) => {
    data.cflxgylOptions = res.data;
  });
  getDictList("采伐_主伐类型采伐方式").then((res) => {
    data.cffsOptions = res.data;
  });
  getDictList("采伐_权属类型").then((res) => {
    data.qslxOptions = res.data;
  });
  getDictList("采伐_审批权限").then((res) => {
    data.spqxOptions = res.data;
  });
};

/**
 * 涉及水工用地
 */
const F_sgyd = (val) => {
  if (val == 1) {
    data.disabled_sg = false;
  }
  if (val == 0) {
    data.disabled_sg = true;
    data.entity.jbxx.istrue = null;
    data.entity.jbxx.istrueSj = null;
  }
};

/**
 * 商品林采伐类型改变，采伐方式置空
 */
const F_clearSplCffs = (val) => {
  data.entity.jbxx.cffsSpl = "";
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
 * 保存前校验
 */
const F_beforeSave = async () => {
  let flag = true;
  //1. 表单判空

  await cfform.value.validate((valid) => {
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
 *
 */
const F_save = async (val) => {
  data.entity.jbxx.flowinstid = data.flowinstid;
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
  bus.on("cf_save", async (obj) => {
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
  bus.on("cf_delete", (callback) => {
    F_delete(callback);
  });
});

//4.销毁监听事件
onBeforeUnmount(() => {
  bus.off("cf_save");
  bus.off("cf_delete");
});
</script>

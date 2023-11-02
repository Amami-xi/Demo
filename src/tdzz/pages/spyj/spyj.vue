<template>
  <el-form ref="spform" :model="bjb" :rules="rules" label-width="auto">
    <panel title="审批意见">
      <el-row>
        <el-col :span="19" :offset="1">
          <el-form-item label="审批结果" prop="spzt" :rules="rules.spzt">
            <el-radio-group
              v-model="bjb.spzt"
              @change="F_change"
              :disabled="disabled"
            >
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="2">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(type, index) in typeList" :key="index">
        <el-col :span="19" :offset="1">
          <el-form-item
            :label="type.codeName"
            v-if="type.dkDetail == null || type.dkDetail == undefined"
          >
            <el-input
              type="textarea"
              :disabled="disabled"
              v-model="type.spyjValue"
            ></el-input>
          </el-form-item>
          <el-form-item :label="type.codeName + ':'" v-else>
            <!-- <el-input type="textarea" v-model="type.spyjValue"></el-input> -->
            <div style="width: 100%">
              <template v-for="(item, index2) in type.dkDetail" :key="index2">
                <el-row>
                  <el-col :span="9">
                    <el-form-item
                      class="el-form-item__label-wraptest"
                      label="地块号"
                      :prop="`type.dkDetail.${index2}.plNo`"
                    >
                      <el-input
                        :disabled="disabled"
                        v-model="item.plNo"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item
                      label="地块面积"
                      class="el-form-item__label-wraptest"
                      :prop="`type.dkDetail.${index2}.plMj`"
                    >
                      <el-input
                        :disabled="disabled"
                        v-model="item.plMj"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col
                    :span="4"
                    :offset="1"
                    style="width: 16.66% !important"
                  >
                    <el-button
                      v-if="index2 > 0 && disabled == false"
                      type="danger"
                      @click="F_delRowZxxx(index, index2)"
                      >删除</el-button
                    >
                    <el-button
                      type="primary"
                      @click="F_addRowZxxx(index)"
                      v-if="
                        disabled == false && index2 == type.dkDetail.length - 1
                      "
                      >添加</el-button
                    >
                  </el-col>
                </el-row>
              </template>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="19" :offset="1">
          <el-form-item
            label="审批意见"
            prop="spOption"
            :rules="disabled ? null : rules.spOption"
          >
            <template v-if="!disabled">
              <el-autocomplete
                style="width: 100%"
                type="textarea"
                v-model="bjb.spOption"
                :fetch-suggestions="F_querySearch"
                @select="handleContent"
                placeholder="请填写审批意见(双击可选择常用语)！"
                @dblclick="openMsg"
                :trigger-on-focus="false"
              >
              </el-autocomplete>
              <el-button @click="saveMsg" style="margin-top: 10px"
                >一键录入常用语</el-button
              >
            </template>
            <el-input v-else type="textarea" disabled v-model="bjb.spOption">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </panel>
  </el-form>
  <Phrase ref="phrase" :setOption="setOption"> </Phrase>
</template>

<script>
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import panel from "@/common/components/card/cardPanel";
import {
  getDetail,
  saveOrUpdate,
  getBjbSpDtOptionList,
} from "@/common/api/jtap/bjb";
import {
  getDetailById,
  updateJbxx,
  updateJbxxYszt,
} from "@/tdzz/api/proj/proj-jbxx";
import bus from "@/common/utils/bus";
import Phrase from "@/common/components/msg/phrase.vue";
import { querySearch, addTimes } from "@/common/api/jtap/phrase";
import { getDictList } from "@/common/api/jtap/dict";
export default defineComponent({
  name: "spyj",
  props: {
    //流程实例ID
    flowinstid: {
      type: String,
      default: "",
    },
    //业务编码
    businessCode: {
      type: String,
      default: "",
    },
    //任务ID
    taskId: {
      type: String,
      default: "",
    },
    //项目标识ID
    jbxxSec: {
      type: String,
      default: "",
    },
    //项目阶段
    catalog: {
      type: String,
      default: "",
    },
    //操作
    disabled: {
      type: Boolean,
      default: "",
    },
  },
  components: { panel, Phrase },
  setup(props, context) {
    //1.定义数据
    const spform = ref(null);
    const phrase = ref(null);
    const data = reactive({
      bjb: {},
      spzt: "",
      rules: {
        spzt: [{ required: true, message: "请选择审批结果", trigger: "blur" }],
        spOption: [
          { required: true, validator: validateSpOption, trigger: "blur" },
        ],
      },
      phraseList: [],
      typeList: [],
      plotList: [{}, {}],
    });

    //2.定义方法

    /**
     * 初始化
     */
    const F_init = () => {
      // F_getTypeList();
      F_getBjb();
    };

    // /**
    //  * 获取意见类型
    //  */
    // const F_getTypeList = () => {
    //   const params = {
    //     flowinstid: props.flowinstid,
    //     taskId: props.taskId,
    //     catalog: props.catalog,
    //     jbxxSec: props.jbxxSec,
    //     businessCode: props.businessCode,
    //   };
    //   getBjbSpDtOptionList(params).then((res) => {
    //     if (res.data != null && res.data != undefined) {
    //       data.typeList = res.data;
    //     }
    //   });
    // };

    const F_getBjb = () => {
      const params = {
        flowinstid: props.flowinstid,
        taskId: props.taskId,
        catalog: props.catalog,
        jbxxSec: props.jbxxSec,
        businessCode: props.businessCode,
      };
      getDetail(params).then((res) => {
        if (res.data != null) {
          data.bjb = res.data;

          if (res.data.typeList != null && res.data.typeList != undefined) {
            data.typeList = res.data.typeList;
          }
          //获取动态审批意见
          getDetailById(props.jbxxSec).then((res) => {
            if (props.catalog == "立项阶段") {
              data.bjb.spzt = res.data.spzt;
            } else if (props.catalog == "验收阶段") {
              data.bjb.spzt = res.data.ysSpzt;
            }
          });
        }
      });
    };

    /**
     * 审批意见校验
     *
     * @param {*} rule
     * @param {*} value
     * @param {*} callback
     */
    function validateSpOption(rule, value, callback) {
      if (value === "" || value == undefined || value.trim().length == 0) {
        callback(new Error("请填写审批意见！"));
      } else {
        callback();
      }
    }

    /**
     * 保存前校验
     */
    const F_beforeSave = async () => {
      let flag = true;
      //1. 表单判空
      await spform.value.validate((valid) => {
        flag = valid;
      });
      return flag;
    };

    /**
     * 保存
     */
    const F_save = async () => {
      let flag = await F_beforeSave();
      if (flag) {
        data.bjb.taskId = props.taskId;
        let array = [];
        for (var j = 0; j < data.typeList.length; j++) {
          let obj = {
            codeValue: data.typeList[j].codeValue,
            codeName: data.typeList[j].codeName,
            spyjValue: data.typeList[j].spyjValue,
            dkDetail: data.typeList[j].dkDetail,
          };
          array.push(obj);
        }
        data.bjb.spDtOption = JSON.stringify(array);
        await saveOrUpdate(data.bjb).then((res) => {});
        if (props.catalog == "立项阶段") {
          await updateJbxx(props.jbxxSec, data.bjb.spzt).then((res) => {});
        } else if (props.catalog == "验收阶段") {
          await updateJbxxYszt(props.jbxxSec, data.bjb.spzt).then((res) => {});
        }
      }
      return flag;
    };

    const F_change = (val) => {
      if (val == 1) {
        data.bjb.spOption = "同意";
      } else {
        data.bjb.spOption = "";
      }
    };

    /**
     * 打开常用语弹窗
     */
    const openMsg = () => {
      phrase.value.handleOpen();
    };

    /**
     * 保存常用语
     * @param {*}
     */
    const saveMsg = () => {
      phrase.value.savePhrase(data.bjb.spOption);
    };

    /**
     * 常用语查询
     */
    const F_querySearch = (queryString, callback) => {
      const params = {
        content: queryString,
      };
      querySearch(params).then((res) => {
        data.phraseList = res.data.map((item) => {
          return { value: item.content, id: item.phSec };
        });
        callback(data.phraseList);
      });
    };

    /**
     * 点击选择意见赋值
     */
    const setOption = (val) => {
      data.bjb.spOption = val;
    };

    /**
     * 选择常用语新增次数
     *
     * @param {*} item
     */
    const handleContent = (item) => {
      addTimes(item.id).then((res) => {});
    };

    //增加行
    const F_addRowZxxx = (index) => {
      data.typeList[index].dkDetail.push({});
    };

    //删除行
    const F_delRowZxxx = (index, index2) => {
      data.typeList[index].dkDetail.splice(index2, 1);
    };

    //3.入口
    onMounted(() => {
      //1.初始化
      F_init();
      //2.定义监听事件
      bus.on("spyj_save", async (callback) => {
        let flag = await F_save();
        if (callback) {
          callback(flag);
        }
      });
    });

    //4.销毁监听事件
    onBeforeUnmount(() => {
      bus.off("spyj_save");
    });

    return {
      ...toRefs(data),
      getDetail,
      F_init,
      spform,
      phrase,
      F_querySearch,
      openMsg,
      saveMsg,
      handleContent,
      setOption,
      F_change,
      F_addRowZxxx,
      F_delRowZxxx,
    };
  },
});
</script>

<style scoped>
.el-form-item__label-wraptest {
  margin-left: -12.75rem !important;
  margin-bottom: 1.125rem;
}
</style>
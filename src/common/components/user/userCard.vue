<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <el-form
      class="tlw-form"
      :model="entity"
      :rules="rules"
      ref="ruleFormRef"
      label-width="auto"
      :inline-message="true"
    >
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="用户姓名" prop="name" :rules="rules.name">
            <el-input
              v-model="entity.name"
              placeholder="请输入用户姓名"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="用户性别" prop="sex">
            <el-select
              v-model="entity.sex"
              placeholder="请选择用户性别"
              style="width: 100%"
            >
              <el-option value="1" label="男">男</el-option>
              <el-option value="0" label="女">女</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="所属机构" prop="orgId" :rules="rules.orgId">
            <el-tree-select
              style="width: 100%"
              v-model="entity.orgId"
              lazy
              :load="orgLoad"
              :props="propsData"
              check-strictly
              @change="orgChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="所属部门" prop="deptId" :rules="rules.deptId">
            <el-tree-select
              style="width: 100%"
              v-model="entity.deptId"
              :data="deptList"
              :props="propsData"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="用户职务">
            <el-input
              :disabled="disabled"
              v-model="entity.highestDutyRank"
              placeholder="请输入用户职务"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item
            label="登录名"
            prop="account.loginId"
            :rules="rules.loginId"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.account.loginId"
              placeholder="请输入登录名"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="showCsPwd">
        <el-col :span="12" :offset="6">
          <el-form-item
            label="初始密码"
            prop="account.password"
            :rules="rules.password"
          >
            <el-input
              type="password"
              show-password
              :disabled="disabled"
              v-model="entity.account.password"
              placeholder="请输入初始密码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item
            label="手机号码"
            prop="mobilePhone"
            :rules="rules.mobilePhone"
          >
            <el-input
              :disabled="disabled"
              v-model="entity.mobilePhone"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-form-item label="所属角色" prop="roleId" :rules="rules.roleId">
            <el-checkbox-group v-model="entity.roleId">
              <el-checkbox
                :label="item.Id"
                v-for="(item, index) in roleOptions"
                :key="index"
                style="width: 100%"
              >
                {{ item.Name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="F_confirm"> 确定 </el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import rulesUtil from "@/common/utils/rules";
import { getRolesByType } from "@/common/api/jtap/role";
import { addUser, editUser } from "@/common/api/jtap/user";
import { getChildrenOrganizations } from "@/common/api/jtap/org";
import { getOrganizationDepartments } from "@/common/api/jtap/dept";
import store from "@/common/store";

export default defineComponent({
  name: "UserCard",
  components: {},
  props: {
    appCode: {
      type: String,
      default: "",
    },
    render: {
      type: Function,
    },
  },
  setup(props) {
    //1.定义数据
    const ruleFormRef = ref(null);
    const data = reactive({
      propsData: {
        label: "abbr",
        children: "children",
        value: "id",
        isLeaf: "isLeaf",
      },
      title: "",
      disabled: false,
      user: store.state.user,
      deptList: [],
      roleOptions: [], //角色列表
      entity: {
        orgId: store.state.user.organizationId,
        deptId: null,
        account: {},
      },
      dialogVisible: false,
      showCsPwd: true,
      rules: {
        name: [
          { required: true, message: "用户姓名是必填项", trigger: "blur" },
        ],
        orgId: [
          { required: true, message: "所属机构是必填项", trigger: "blur" },
        ],
        deptId: [
          { required: true, message: "所属部门是必填项", trigger: "blur" },
        ],
        loginId: [
          { required: true, message: "登录名是必填项", trigger: "blur" },
        ],
        password: [
          { required: true, message: "初始密码是必填项", trigger: "blur" },
        ],
        mobilePhone: [{ validator: rulesUtil.checkPhone, trigger: "blur" }],
        roleId: [
          { required: true, message: "所属角色是必填项", trigger: "blur" },
        ],
      },
    });

    //2.定义方法
    /**
     * 打开弹窗-新增
     */
    const handleOpen = () => {
      data.title = "新增";
      data.entity.orgId = store.state.user.organizationId;
      data.entity.account.password = 1;
      data.showCsPwd = true;
      data.dialogVisible = true;
    };

    /**
     * 打开弹窗-编辑
     */
    const handleOpen_update = (row) => {
      data.title = "编辑";
      data.showCsPwd = false;
      data.dialogVisible = true;
      data.entity = JSON.parse(JSON.stringify(row));
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      data.dialogVisible = false;
      data.entity = {
        account: {},
      };
    };

    /**
     * 机构下拉事件
     *
     * @param {*} node
     * @param {*} resolve
     */
    const orgLoad = (node, resolve) => {
      if (node.isLeaf) return resolve([]);
      if (node.data.length == 0) {
        resolve([
          {
            id: data.user.organizationId,
            abbr: data.user.organizationAbbr,
          },
        ]);
        F_getDepts(data.user.organizationId);
      } else {
        getChildrenOrganizations(node.data.id).then((res) => {
          resolve(res.data);
        });
      }
    };

    /**
     * 机构选中事件
     *
     * @param {*} orgId
     */
    const orgChange = (orgId) => {
      F_getDepts(orgId);
    };

    /**
     * 获取机构下部门列表
     *
     * @param {*} orgId
     */
    const F_getDepts = (orgId) => {
      getOrganizationDepartments(orgId, false, props.appCode).then((res) => {
        data.deptList = res.data;
      });
    };

    /**
     * 获取角色列表
     */
    const F_getRoles = () => {
      getRolesByType(props.appCode).then((res) => {
        data.roleOptions = res.data;
      });
    };

    /**
     * 确定
     */
    const F_confirm = () => {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          if (data.title == "新增") {
            addUser(data.entity).then((res) => {
              ElMessage.success("新增成功");
              props.render();
              handleClose();
            });
          } else {
            editUser(data.entity).then((res) => {
              ElMessage.success("编辑成功");
              props.render();
              handleClose();
            });
          }
        }
      });
    };

    //4.入口
    onMounted(() => {
      F_getRoles();
    });

    return {
      ...toRefs(data),
      handleOpen,
      handleOpen_update,
      handleClose,
      F_getRoles,
      orgLoad,
      orgChange,
      F_getDepts,
      F_confirm,
      ruleFormRef,
    };
  },
});
</script>
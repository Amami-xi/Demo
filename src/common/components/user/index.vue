<template>
  <el-space spacer="|">
    <svg-icon class="headImage" name="headImage" :title="userName"></svg-icon>
    <div class="headSet">
      <div class="editPass" @click="F_editPass">修改密码</div>
      <div class="signOut" @click="signOut">
        <el-tooltip content="退出" placement="bottom" effect="light">
          <svg-icon name="arrow-right"></svg-icon>
        </el-tooltip>
      </div>
    </div>
  </el-space>
  <EditPass ref="editPass"></EditPass>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "@vue/runtime-core";
import store from "@/common/store";
import EditPass from "@/common/components/pass/index";
import { ElMessageBox } from "element-plus";
export default defineComponent({
  name: "userInfo",
  props: {},
  components: { EditPass },
  setup(props, context) {
    //1.定义数据
    const editPass = ref(null);
    const data = reactive({
      userName: store.state.user.userName, //菜单列表
    });
    //2.定义方法
    /**
     * 修改密码
     */
    const F_editPass = () => {
      editPass.value.handleOpen();
    };

    /**
     * 退出
     */
    const signOut = () => {
      ElMessageBox.confirm("是否确认退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          location.href = import.meta.env.VITE_APP_LOGOUT_URL;
        })
        .catch();
    };

    return {
      ...toRefs(data),
      F_editPass,
      editPass,
      signOut,
    };
  },
});
</script>
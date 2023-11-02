<template>
  <el-form :inline="true" class="tlw-search">
    <el-row>
      <el-col :span="24">
        <el-form-item label="坐标系：">
          <el-select v-model="tac.coordSys">
            <el-option
              v-for="item in coordSysOption"
              :key="item.codeValue"
              :value="item.codeValue"
              :label="item.codeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投影类型：">
          <el-select v-model="tac.projectionType">
            <el-option
              v-for="item in projectionTypeOption"
              :key="item.codeValue"
              :value="item.codeValue"
              :label="item.codeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="几度分带：">
          <el-select v-model="tac.howManyAngle">
            <el-option
              v-for="item in howManyAngleOption"
              :key="item.codeValue"
              :value="item.codeValue"
              :label="item.codeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="带号：">
          <el-input v-model="tac.terrainNo"></el-input>
        </el-form-item>
        <el-form-item label="精度：">
          <el-select v-model="tac.tacPrecision">
            <el-option
              v-for="item in tacPrecisionOption"
              :key="item.codeValue"
              :value="item.codeValue"
              :label="item.codeName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getDictList } from "@/common/api/jtap/dict";
export default defineComponent({
  name: "tac",
  components: {},
  props: {
    tac: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    //1.定义路由
    const router = useRouter();

    //2.定义数据
    const data = reactive({
      coordSysOption: [],
      projectionTypeOption: [],
      howManyAngleOption: [],
      tacPrecisionOption: [],
    });

    //3.定义方法

    /**
     * 获取坐标系数据字典列表
     */
    const F_getDictList = () => {
      getDictList("坐标系").then((res) => {
        data.coordSysOption = res.data;
      });
      getDictList("投影类型").then((res) => {
        data.projectionTypeOption = res.data;
      });
      getDictList("几度分带").then((res) => {
        data.howManyAngleOption = res.data;
      });
      getDictList("精度").then((res) => {
        data.tacPrecisionOption = res.data;
      });
    };

    //4.入口
    onMounted(() => {
      F_getDictList();
    });

    return { ...toRefs(data), F_getDictList };
  },
});
</script>
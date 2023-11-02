<template>
    <el-row class="tlw_bar">
        <el-col>
            <svg-icon name="wz" title="位置：指标调剂 > 借用指标"></svg-icon>
        </el-col>
    </el-row>
    <el-tabs v-model="activeName">
        <el-tab-pane label="借用指标明细" name="first" :key="'first'">
            <jyzbmx></jyzbmx>
        </el-tab-pane>

        <el-tab-pane label="借用指标统计" name="second" :key="'second'">
            <jyzbtj></jyzbtj>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import jyzbmx from '@/tdzz/pages/zbgl/zbtj/jyzb/jyzb_jyzbmx.vue'
import jyzbtj from '@/tdzz/pages/zbgl/zbtj/jyzb/jyzb_jyzbtj.vue'

export default {
    name: 'index',
    components:{
        jyzbmx: jyzbmx,
        jyzbtj: jyzbtj
    },
    data() {
        return {
            //默认第一个选项卡
            activeName: "first",
        }
    },
    mounted(){
 
    }
}
</script>
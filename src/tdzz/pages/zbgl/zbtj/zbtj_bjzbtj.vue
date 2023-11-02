<template>
    <el-row class="tlw_bar">
        <el-col>
            <svg-icon name="wz" title="位置：指标调剂 > 本级指标调剂"></svg-icon>
        </el-col>
    </el-row>
    <el-tabs v-model="activeName">
        <el-tab-pane label="指标调剂明细" name="first" :key="'first'">
            <zbtjmx></zbtjmx>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import zbtjmx from '@/tdzz/pages/zbgl/zbtj/bjzbtj/bjzbtj_zbtjmx.vue'

export default {
    name: 'index',
    components:{
        zbtjmx: zbtjmx
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
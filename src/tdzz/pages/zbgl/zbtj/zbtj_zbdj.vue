<template>
    <el-row class="tlw_bar">
        <el-col>
            <svg-icon name="wz" title="位置：指标调剂 > 指标冻结"></svg-icon>
        </el-col>
    </el-row>
    <el-tabs v-model="activeName">
        <el-tab-pane label="冻结明细" name="first" :key="'first'">
            <djmx></djmx>
        </el-tab-pane>

        <el-tab-pane label="冻结统计" name="second" :key="'second'">
            <djtj></djtj>
        </el-tab-pane>

        <el-tab-pane label="项目冻结明细" name="third" :key="'third'">
            <xmdjmx></xmdjmx>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import djmx from '@/tdzz/pages/zbgl/zbtj/zbdj/zbdj_djmx.vue'
import djtj from '@/tdzz/pages/zbgl/zbtj/zbdj/zbdj_djtj.vue'
import xmdjmx from '@/tdzz/pages/zbgl/zbtj/zbdj/zbdj_xmdjmx.vue'

export default {
    name: 'index',
    components:{
        djmx: djmx,
        djtj: djtj,
        xmdjmx: xmdjmx
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
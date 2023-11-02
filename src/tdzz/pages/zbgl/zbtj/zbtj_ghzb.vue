<template>
    <el-row class="tlw_bar">
        <el-col>
            <svg-icon name="wz" title="位置：指标调剂 > 归还指标"></svg-icon>
        </el-col>
    </el-row>
    <el-tabs v-model="activeName">
        <el-tab-pane label="归还指标明细" name="first" :key="'first'">
            <ghzbmx></ghzbmx>
        </el-tab-pane>

        <el-tab-pane label="归还指标统计" name="second" :key="'second'">
            <ghzbtj></ghzbtj>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import ghzbmx from '@/tdzz/pages/zbgl/zbtj/ghzb/ghzb_ghzbmx.vue'
import ghzbtj from '@/tdzz/pages/zbgl/zbtj/ghzb/ghzb_ghzbtj.vue'

export default {
    name: 'index',
    components:{
        ghzbmx: ghzbmx,
        ghzbtj: ghzbtj
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
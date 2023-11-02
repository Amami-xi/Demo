<template>
    <el-row class="tlw_bar">
        <el-col>
            <svg-icon name="wz" title="位置：指标调剂 > 指标调整"></svg-icon>
        </el-col>
    </el-row>
    
    <el-tabs v-model="activeName">
        <el-tab-pane label="指标调整明细" name="first" :key="'first'">
            <zbtzmx></zbtzmx>
        </el-tab-pane>

        <el-tab-pane label="指标调整统计" name="second" :key="'second'">
            <zbtztj></zbtztj>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
import zbtzmx from '@/tdzz/pages/zbgl/zbtj/zbtz/zbtz_zbtzmx.vue'
import zbtztj from '@/tdzz/pages/zbgl/zbtj/zbtz/zbtz_zbtztj.vue'

export default {
    name: 'index',
    components:{
        zbtzmx: zbtzmx,
        zbtztj: zbtztj
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
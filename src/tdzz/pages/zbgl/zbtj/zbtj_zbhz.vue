<template>
    <el-row class="tlw_bar">
        <el-col>
            <svg-icon name="wz" title="位置：指标调剂 > 指标划转"></svg-icon>
        </el-col>
    </el-row>

    <el-tabs v-model="activeName">
        <el-tab-pane label="指标划转明细" name="first" :key="'first'">
            <zbhzmx></zbhzmx>
        </el-tab-pane>

        <el-tab-pane label="指标划转统计" name="second" :key="'second'">
            <zbhztj></zbhztj>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
import zbhzmx from '@/tdzz/pages/zbgl/zbtj/zbhz/zbhz_zbhzmx.vue'
import zbhztj from '@/tdzz/pages/zbgl/zbtj/zbhz/zbhz_zbhztj.vue'

export default {
    name: 'index',
    components:{
        zbhzmx: zbhzmx,
        zbhztj: zbhztj
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

<style lang="scss" scoped>

</style>

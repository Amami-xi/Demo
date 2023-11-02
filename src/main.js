import { createApp } from 'vue'
import App from './App.vue'
// 引入路由配置
import router from './common/router/router'
// 引入vuex
import store from "./common/store"
// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css' //引入css样式
// 引入公共css
import './assets/css/common.scss'

//rem页面自适应
import '@/common/utils/rem'

// 引入注册脚本
import 'virtual:svg-icons-register'
// 引入svg组件
import svgIcon from "@/common/components/svgIcon/index";

//input 数字输入保留4位小数
import numberOnly from './common/utils/number-only';

import 'default-passive-events'

const app = createApp(App);
//注册svg
app.component('svg-icon', svgIcon)
//自定义input输入指令
app.directive("number-only", numberOnly.options);
//echarts页面大小自适应
app.config.globalProperties.$echartsResize = function (ref) {
  window.addEventListener('resize', function () {
    ref.resize();
  })
}
let useList = [ElementPlus, router, store];
useList.forEach((item) => {
  app.use(item);
});

app.mount('#app');

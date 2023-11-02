import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import tdzzRouter from '@/tdzz/router/router'
import lyRouter from '@/ly/router/router'

const routes = [
  {
    path: '/',
    redirect: '/guide',
  },
  //引导页
  {
    path: '/guide',
    name: 'guide',
    component: () => import('@/common/guide/guide.vue'),
  },

  //土地整治路由
  ...tdzzRouter,

  //林业路由
  ...lyRouter,

]

const router = new createRouter({
  //history: createWebHashHistory(), // 哈希模式
  history: createWebHistory(), // 历史模式
  routes, //导入路由的配置
})

export default router
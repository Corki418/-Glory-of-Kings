import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

export const playersRoutes: RouteConfig = {
  path: '/players',
  component: Layout,
  redirect: '/players/list',
  meta: {
    title: 'playerMgt', // i18n信息需要额外处理 icon: 'people' // 图标选取
    icon: 'people',
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "player-list" */
        '@/views/player/list.vue'),
      name: 'PlayerList',
      meta: {
        title: 'playerList', // i18n信息需要额外处理 icon: 'list' // 图标选取
      }
    }
  ]
}

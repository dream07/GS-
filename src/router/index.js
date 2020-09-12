import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    name: 'router-name',
    redirect: '/member',
    children: [
      {
        path: '/member',
        component: () => import('@/views/member/index'),
        name: 'member',
        meta: { title: '会员管理', icon: 'peoples', affix: true}
      }
    ]
  },
  {
    path: '/integral',
    component: Layout,
    redirect: '/integral/index',
    children: [
      {
        path: '/integral',
        component: () => import('@/views/integral/index'),
        name: 'integral',
        meta: { title: '积分管理', icon: 'star', noCache: true }
      }
    ]
  },
 
  {
    path: '/conversion',
    component: Layout,
    redirect: '/conversion/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/conversion/index'),
        name: 'conversion',
        meta: { title: '兑换管理', icon: 'el-icon-refresh', noCache: true }
      }
    ]
  },
  {
    path: '/bunchPlanting',
    component: Layout,
    redirect: '/bunchPlanting/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/bunchPlanting/index'),
        name: 'bunchPlanting',
        meta: { title: '点播管理', icon: 'el-icon-video-play', noCache: true }
      }
    ]
  },
  {
    path: '/directBroadcastingRoom ',
    component: Layout,
    redirect: '/directBroadcastingRoom/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/directBroadcastingRoom/index'),
        name: 'directBroadcastingRoom',
        meta: { title: '直播间管理', icon: 'el-icon-video-camera', noCache: true }
      }
    ]
  },
  {
    path: '/bannerConfig',
    component: Layout,
    redirect: '/bannerConfig/index',
    children: [
      {
        path: 'bannerConfig',
        component: () => import('@/views/bannerConfig/index'),
        name: 'bannerConfig',
        meta: { title: 'banner管理', icon: 'el-icon-picture-outline', noCache: true }
      }
    ]
  },
  {
    path: '/classify',
    component: Layout,
    redirect: '/classify/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/classify/index'),
        name: 'classify',
        meta: { title: '分类管理', icon: 'el-icon-menu', noCache: true }
      }
    ]
  },
  {
    path: '/inform',
    component: Layout,
    redirect: '/inform/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/inform/index'),
        name: 'inform',
        meta: { title: '通知', icon: 'el-icon-bell', noCache: true }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/feedback/index'),
        name: 'feedback',
        meta: { title: '意见反馈', icon: 'el-icon-edit', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member/index',
    hidden: true,
    name:'会员管理',
    children: [
      {
        path: '/memberDetail',
        component: () => import('@/views/member/components/memberDetail'),
        name: 'memberDetail',
        meta: { title: '会员详情', noCache: true,activeMenu: '/member' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */


const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

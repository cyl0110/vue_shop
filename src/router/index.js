import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'
import Rights from '@/components/power/rights'
import Roles from '@/components/power/Roles'
import Cate from '@/components/goods/Cate'
import Params from '@/components/goods/Params'
import List from '@/components/goods/List'
import Add from '@/components/goods/Add'
import Order from '@/components/order/Order'
import Report from '@/components/report/Report'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: List },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report }
      ]
    }
  ]
})
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行       next('/login')  强制跳转
  if (to.path === '/login') return next()
  // 获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router

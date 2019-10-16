import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/auth/Login.vue')
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('./components/Landing.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('./components/auth/Logout.vue')
    },
    {
      path: '/national-totals',
      name: 'national-totals',
      component: () => import('./components/national/NationalTotals.vue')
    },
    {
      path: '/gbg',
      name: 'gbg',
      component: () => import('./components/qld/gbg/Geebung.vue')
    },
    {
      path: '/smt',
      name: 'smt',
      component: () => import('./components/nsw/smt/Smithfield.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./components/auth/404.vue')
    },
    {
      path: '*',
      redirect: '/404'
    },
  ]
})

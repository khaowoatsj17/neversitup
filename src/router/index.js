import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'vue-cookies'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/MainPage.vue')
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: () => import('../components/ToDoList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const accessToken = cookies.get('Token')
  if (to.path !== '/' && !accessToken) {
    next({ path: '/' })
  } else if (to.path === '/' && accessToken) {
    next({ path: '/todolist' })
  } else {
    next()
  }
})
export default router

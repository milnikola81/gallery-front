import Vue from 'vue'
import Router from 'vue-router'
import Galleries from './pages/Galleries.vue'
import AppLogin from './pages/AppLogin.vue'
import AppRegister from './pages/AppRegister.vue'
import CreateGallery from './pages/CreateGallery.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'galleries',
      component: Galleries
    },
    {
      path: '/login',
      name: 'login',
      component: AppLogin
    },
    {
      path: '/register',
      name: 'register',
      component: AppRegister
    },
    {
      path: '/create',
      name: 'create',
      component: CreateGallery
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

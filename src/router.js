import Vue from 'vue'
import Router from 'vue-router'
import Galleries from './pages/Galleries.vue'
import AppLogin from './pages/AppLogin.vue'
import AppRegister from './pages/AppRegister.vue'
import CreateGallery from './pages/CreateGallery.vue'
import MyGalleries from './pages/MyGalleries.vue'
import SingleGallery from './pages/SingleGallery.vue'
import Author from './pages/Author.vue'
import store from './store'
import { authService } from './services/Auth'

Vue.use(Router)

const routes = [
    {
      path: '/',
      name: 'galleries',
      component: Galleries
    },
    {
      path: '/login',
      name: 'login',
      component: AppLogin,
      meta: { Guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: AppRegister,
      meta: { Guest: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreateGallery,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-galleries',
      name: 'my-galleries',
      component: MyGalleries,
      meta: { requiresAuth: true }
    },
    {
      path: 'galleries/:id',
      name: 'single-gallery',
      component: SingleGallery
    },
    {
      path: 'authors/:id',
      name: 'author',
      component: Author
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]


const router = new Router({
  routes,
  mode: 'history'
})

var isAuth = store.state.isAuthenticated

router.beforeEach((to, from, next) => {
  isAuth = store.state.isAuthenticated
  if (to.meta.requiresAuth) {
    if (isAuth) {
      return next();
    } else {
      return next({ name: 'galleries' });
    }
  }
  if (to.meta.Guest) {
    isAuth = store.state.isAuthenticated
    if (isAuth) {
      return next({ name: 'galleries' });
    } else {
      return next();
    }
  }
  next();
});

export default router;


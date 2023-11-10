import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import ChatWindow from '../views/ChatWindow.vue'
import FeedBack from '../views/Feedback.vue'
import Profile from '../views/Profile.vue'
import Leaderboard from '../views/Leaderboard.vue'

import { useUserStore } from '@/store/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: Signup
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      // meta: { requiresAuth: true }
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatWindow,
      meta: { requiresAuth: true }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedBack,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard,
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.setMessage({message: '', type: ''})
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    next({
      path: '/sign-in',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    })
  } else {
    next()
  }
})

export default router

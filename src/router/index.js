import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from "../views/Layout/LoginPage.vue"
import Dashboard from "../views/Layout/Dashboard.vue"
// import MQTT from "../views/MQTTTest.vue"

import Home from "../views/HomeView.vue"
import Node from "../views/Node.vue"
import DetailNode from "../views/Node/DetailNode.vue"
import Users from "../views/Users.vue"
import Notification from "../views/Notif.vue"
import Alert from "../views/Alerts.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    children:[
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'node',
        name: 'node',
        component: Node
      },
      {
        path: 'detailnode/:id',
        name: 'detailnode',
        component: DetailNode
      },
      {
        path: 'users/:id',
        name: 'users',
        component: Users
      },
      {
        path: 'notif',
        name: 'notif',
        component: Notification
      },
      {
        path: 'alert',
        name: 'alert',
        component: Alert
      }
    ]
  },
  // {
  //   path: '/mqtt',
  //   name: 'mqtt',
  //   component: MQTT
  // },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base:"simon_iot",
  routes
})

 router.beforeEach((to, from, next)=>{
  const isAuth=JSON.parse(sessionStorage.getItem('authenticated'));
  if (to.name !=='login' && !isAuth) next({name:"login"});
  if (to.name =='login' && isAuth) next({name:"home"});
  else next();
 })


export default router

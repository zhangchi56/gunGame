import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.安装VueRouter
Vue.use(VueRouter)

const Index = () => import('views/home/Index')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const Deposit = () => import('views/deposit/Deposit')
const Login = () => import('views/login/Login')
const GameRecord = () => import('views/profile/GameRecord')
const PayRecord = () => import('views/profile/PayRecord')
const Test1 = () => import('views/test1')
const Test2 = () => import('views/test2')
const Test3 = () => import('views/test3')
const Test4 = () => import('views/test4')
const Test5 = () => import('views/test5')



// 2.配置路由信息
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/deposit',
    component: Deposit
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/gameRecord',
    component: GameRecord
  },
  {
    path: '/payRecord',
    component: PayRecord
  },
  {
    path: '/test1',
    component: Test1
  },
  {
    path: '/test2',
    component: Test2
  },
  {
    path: '/test3',
    component: Test3
  },
  {
    path: '/test4',
    component: Test4
  },
  {
    path: '/test5',
    component: Test5
  },
]

// 3.创建路由对象
const router = new VueRouter({
  // mode: 'history',
  routes
})

// 4.导出
export default router

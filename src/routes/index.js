import AC from '../components/AsyncLoad'

export default [
    {
        name: '首页',
        icon: 'home',
        path: '/',
        component: AC(() => import('../pages/movie/home'))
    },
    {
        name: '详情页',
        path: '/detail/:id',
        component: AC(() => import('../pages/movie/detail'))
    }
]
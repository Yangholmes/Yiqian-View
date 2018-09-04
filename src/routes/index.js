/**
 * 路由表
 *
 * @file
 * @author Yangholmes
 */

export default [{
    path: '/',
    name: 'default',
    redirect: 'home'
}, {
    path: '/home',
    name: 'home',
    component: () => import('pages/home/Home')
}, {
    path: '/newQian',
    name: 'newQian',
    component: () => import('pages/qian/NewQian')
}];

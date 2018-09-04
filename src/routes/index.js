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
    path: '/qian',
    name: 'qian',
    component: () => import('pages/qian/Qian')
}];

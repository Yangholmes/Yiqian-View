import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from '@/routes';
import App from './App.vue';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
    // mode: 'history', // don't use this mode in multi-pages
    routes
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

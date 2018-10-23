<template>
    <div id="app">
        <router-view class="main" :class="{'hide': hide}"></router-view>
        <MainToolbar class="toolbar" :class="{'hide': hide}"></MainToolbar>
        <AddQian :hide="hide" :position="{x: 16, y: -16 * 4}"></AddQian>
    </div>
</template>

<script>
import AddQian from 'cpn/button/AddQian';
import MainToolbar from 'cpn/toolbar/MainToolbar.vue';

export default {
    name: 'app',
    components: {
        AddQian,
        MainToolbar
    },
    data() {
        return {
            hide: false
        };
    },
    watch: {
        '$route'(to) {
            if (to.name === 'newQian' || to.name === 'readQian') {
                this.hide = true;
            }
            else {
                this.hide = false;
            }
        }
    }
};
</script>

<style lang="less">
@import "./assets/less/global.less";

#app {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .main {
        width: 100%;
        height: 100%;
        padding-bottom: 3em;
        &.hide {
            padding: 0;
        }
    }
    .toolbar {
        width: 100%;
        height: 3em;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateY(0) scale(1);
        transition: transform .5s;
        &.hide {
            transform: translateY(3em) scale(0);
        }
    }
}
</style>

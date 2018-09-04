<template>
    <div id="app">
        <router-view></router-view>
        <addQian :position="position"></addQian>
    </div>
</template>

<script>
import addQian from 'cpn/addQian/addQian';

export default {
    name: 'app',
    components: {
        addQian
    },
    data() {
        return {
            position: {x: 0, y: -32}
        };
    },
    methods: {

    }
};
</script>

<style lang="less">
@import "./assets/less/global.less";

#app {
    width: 100%;
    height: 100%;
}
</style>

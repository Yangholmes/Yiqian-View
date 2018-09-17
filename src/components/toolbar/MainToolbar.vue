<template lang="html">
    <div class="toolbar-main">
        <ul>
            <li v-for="(menu, index) in menus" :key="index + menu.name" v-if="!menu.hidden">
                <router-link :to="menu.name" replace tag="div">
                    <div class="icon" v-if="menu.icon">
                        <img src="menu.icon">
                    </div>
                    <div class="label">
                        <span>{{menu.label}}</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import menus from './menus';

export default {
    data() {
        return {
            menus
        };
    }
};
</script>

<style lang="less">
.toolbar-main {
    width: 100%;
    height: 100%;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-around;

    ul {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: @labelColor;
        li {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            div.router-link-active {
                color: @infoColor;
            }
        }
    }
}
</style>

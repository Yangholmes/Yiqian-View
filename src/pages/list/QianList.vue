<template lang="html">
    <div class="qian-list">
        <ul>
            <li v-for="(qian, index) in qianList"
                :key="qian.aId">{{qian.title}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        qianList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="less">
.qian-list {
    width: 100%;
    height: 100%;
    background: #fafafa;
    ul {
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
        list-style: none;
        li {
            width: 100%;
            height: 5em;
            margin: .25em 0;
        }
    }
}
</style>

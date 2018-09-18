<template lang="html">
    <div class="list">
        <div class="search">
            <input type="text" placeholder="搜索">
        </div>
        <QianList class="qian-list" :qianList="allQian"></QianList>
    </div>
</template>

<script>
import QianList from './QianList';

import api from 'api';

export default {
    components: {
        QianList
    },
    mounted() {
        api.getAllQian().then(res => {
            if (!res.code) {
                this.allQian = res.data;
            }
        });
    },
    data() {
        return {
            allQian: []
        };
    },
    methods: {

    }
};
</script>

<style lang="less">
.list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    & > div {
        width: 100%;
    }
    .search {
        height: 3em;
        display: flex;
        align-items: center;
        input {
            width: 100%;
            margin: 0 1em;
            padding: 0;
            outline: none;
            border: none;
            border-bottom: 1px solid @infoColor;
        }
    }
    .qian-list {
        height: calc( 100% - 3em );
    }
}
</style>

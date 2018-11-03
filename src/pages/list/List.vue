<template lang="html">
    <div class="list">
        <div class="search">
            <input type="text" v-model="keyword" @keydown="onSearch" placeholder="正则搜索">
        </div>
        <QianList class="qian-list"
            :qianList="qianList"
            @onQianRead="onRead"
            @onQianModify="onModify"
            @onQianDelete="onDelete"></QianList>
    </div>
</template>

<script>
import QianList from './QianList';

import charaTrans from 'utils/charaTrans';
import dtUtils from 'utils/datetime';
import api from 'api';

export default {
    components: {
        QianList
    },
    mounted() {
        this.init();
    },
    data() {
        return {
            keyword: '',
            allQian: [],
            qianList: []
        };
    },
    methods: {
        init() {
            this.onQuery();
        },
        onQuery() {
            api.getAllQian().then(res => {
                if (!res.code) {
                    this.allQian = res.data;
                    this.onSearch();
                }
            });
        },
        onSearch(event) {
            this.keyword = this.keyword.trim();
            if (event && event.keyCode !== 13) {
                return false;
            }
            let keyword = charaTrans.htmlEncode(this.keyword);
            this.qianList = this.allQian.reduce((a, qian) => {
                let title = charaTrans.htmlEncode(qian.title);
                let article = charaTrans.htmlEncode(charaTrans.htmlDecode(qian.article)).replace(/\n|\r/g, '');
                let createDate = new Date(qian.createDate);
                if (RegExp(keyword).test(title) || RegExp(keyword).test(article)) {
                    title = title.replace(RegExp(`(${keyword})`), '<em>$1</em>');
                    article = article.replace(RegExp(`(.*?)(${keyword})(.{0,300})(.*)`), '<em>$2</em>$3');
                    createDate = dtUtils.toFormatString(createDate);
                    a.push(Object.assign({}, qian, {title, article, createDate}));
                }
                return a;
            }, []);
        },
        onRead(data) {
            this.$router.push({
                name: 'readQian',
                params: {
                    qian: this.allQian.find(e => e.id === data)
                }
            });
        },
        onModify(data) {
            this.$router.push({
                name: 'newQian',
                params: {
                    qian: this.allQian.find(e => e.id === data)
                }
            });
        },
        onDelete(data) {
            api.deleteQian(data).then(res => {
                !res.code && this.onQuery();
            });
        }
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

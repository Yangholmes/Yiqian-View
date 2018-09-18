<!-- 新堑 -->
<template lang="html">
    <transition name="drawer">
        <div id="qian">
            <Head class="head" v-model="head"></Head>
            <Article class="article" v-model="article"></Article>
            <Toolbar class="toolbar"
                @onCancel="onCancel"
                @onSubmit="onSubmit"></Toolbar>
        </div>
    </transition>
</template>

<script>
import Head from 'cpn/head/Head';
import Article from 'cpn/article/Article';
import Toolbar from 'cpn/toolbar/NewQian';
import MessageBox from 'cpn/messageBox';

import api from 'api';
import factory from 'utils/factory';

export default {
    components: {
        Head,
        Article,
        Toolbar
    },
    data() {
        return {
            aId: factory.genId(),
            head: {},
            article: ''
        };
    },
    methods: {
        onCancel() {
            MessageBox.confirm({
                message: '不写了吗？内容会被删除哦',
                cancleText: '继续写',
                confirmText: '不写了',
                onCancel() {
                    console.log('继续写哇');
                },
                onConfirm: function () {
                    this.$router.go(-1);
                }.bind(this)
            });
        },
        onSubmit() {
            if (!this.head.title || !this.article) {
                MessageBox.info({
                    message: '写点东西再保存吧',
                    confirmText: '好'
                });
                return false;
            }
            api.addNewQian({
                aId: this.aId,
                title: this.head.title,
                tags: this.head.tags,
                mainImg: this.head.mainImg,
                article: this.article,
                createDate: new Date().getTime()
            }).then(res => {
                res.code ? MessageBox.info({message: '保存失败了'}) : this.$router.replace('list');
            }).catch(error => {
                MessageBox.info({
                    message: error.msg
                });
            });
        }
    }
};
</script>

<style lang="less">
#qian {
    @headHeight: 6em;
    @toolbarHeight: 3em;
    width: 100%;
    height: 100%;
    will-change: transform;
    .head {
        width: 100%;
        height: @headHeight;
    }
    .article {
        width: 100%;
        height: calc( 100% - @headHeight - @toolbarHeight);
    }
    .toolbar {
        width: 100%;
        height: @toolbarHeight;
    }
}
// 过渡
.drawer {
    // 0 时刻和 t 时刻
    &-enter,
    &-leave-to {
        transform: translateX(-100%);
        opacity: 0;
    }

    // t/2 时刻
    &-enter-to,
    &-leave {
        transform: translateX(0);
        opacity: 1;
    }

    // 进入/退出 动画样式
    &-enter-active {
        transition: all .5s cubic-bezier(0, 0, 0.7, 1.3);
    }
    &-leave-active {
        // transition: all .5s linear;
    }
}
</style>

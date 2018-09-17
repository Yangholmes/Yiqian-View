<!-- 新堑 -->
<template lang="html">
    <transition name="windmill">
        <div id="qian">
            <Head class="head" v-model="head"></Head>
            <Article class="article" v-model="article"></Article>
            <Toolbar class="toolbar"
                @onCancel="onCancel"
                @onSubmit="onSubmit"
            ></Toolbar>
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
            this.$router.go(-1);
        },
        onSubmit() {
            api.addNewQian({
                aId: this.aId,
                title: this.head.title,
                tags: this.head.tags,
                mainImg: this.head.mainImg,
                article: this.article,
                createDate: new Date().getTime()
            }).then(res => {
                console.log(res);
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
.windmill {
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

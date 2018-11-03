<!-- 新堑 -->
<template lang="html">
    <transition name="drawer">
        <div id="new-qian">
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

export default {
    components: {
        Head,
        Article,
        Toolbar
    },
    beforeRouteLeave(to, from, next) {
        if (to.params.save) {
            next();
        }
        else {
            MessageBox.confirm({
                message: '不写了吗？内容不会保存哦',
                cancleText: '继续写',
                confirmText: '不写了',
                onCancel() {
                    console.log('继续写哇');
                    next(false);
                },
                onConfirm() {
                    next();
                }
            });
        }
    },
    mounted() {
        this.onInit();
    },
    data() {
        return {
            id: null,
            head: {},
            article: '',
            createDate: null,
            updateDate: null
        };
    },
    methods: {
        onInit() {
            let qian = this.$route.params.qian;
            if (qian) {
                this.id = qian.id;
                this.head = {
                    title: qian.title,
                    tags: qian.tags,
                    mainImg: qian.mainImg
                };
                this.article = qian.article;
                this.createDate = qian.createDate;
                this.updateDate = qian.updateDate;
            }
        },
        onCancel() {
            this.$router.go(-1);
        },
        onSubmit() {
            if (!this.head.title || !this.article) {
                MessageBox.info({
                    message: '写点东西再保存吧',
                    confirmText: '好'
                });
                return false;
            }
            this.article = this.article.replace(/ ?contenteditable(="true"|="false"|)/g, '');
            !this.id
                ? api.addNewQian({
                    title: this.head.title,
                    tags: this.head.tags,
                    mainImg: this.head.mainImg,
                    article: this.article,
                    createDate: this.createDate || new Date().getTime(),
                    updateDate: this.updateDate || new Date().getTime()
                }).then(res => {
                    res.code
                        ? MessageBox.info({message: '保存失败了'})
                        : this.$router.replace({
                            name: 'list',
                            params: {save: true}
                        });
                }).catch(error => {
                    console.log(error.data);
                    MessageBox.info({
                        message: error.msg
                    });
                })
                : api.updateQian({
                    id: this.id,
                    title: this.head.title,
                    tags: this.head.tags,
                    mainImg: this.head.mainImg,
                    article: this.article,
                    createDate: this.createDate || new Date().getTime(),
                    updateDate: this.updateDate || new Date().getTime()
                }).then(res => {
                    res.code
                        ? MessageBox.info({message: '保存失败了'})
                        : this.$router.replace({
                            name: 'list',
                            params: {save: true}
                        });
                }).catch(error => {
                    console.log(error.data);
                    MessageBox.info({
                        message: error.msg
                    });
                });
        }
    }
};
</script>

<style lang="less">
#new-qian {
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

<!-- 新堑 -->
<template lang="html">
    <div id="qian">
        <Head class="head" v-model="head"></Head>
        <Article class="article" v-model="article"></Article>
        <Toolbar class="toolbar"></Toolbar>
    </div>
</template>

<script>
import Head from 'cpn/head/Head';
import Article from 'cpn/article/Article';
import Toolbar from 'cpn/toolbar/newQian';

export default {
    components: {
        Head,
        Article,
        Toolbar
    },
    data() {
        return {
            head: {},
            article: ''
        };
    }
};
</script>

<style lang="less">
#qian {
    @headHeight: 6em;
    @toolbarHeight: 2.5em;
    width: 100%;
    height: 100%;
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
</style>

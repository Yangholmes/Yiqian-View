<!-- 堑 -->
<template lang="html">
    <div id="qian">
        <Head class="head" v-model="head"></Head>
        <Article class="article" v-model="article"></Article>
    </div>
</template>

<script>
import Head from 'cpn/head/Head';
import Article from 'cpn/article/Article';

export default {
    components: {
        Head,
        Article
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
    width: 100%;
    height: 100%;
    .head {
        width: 100%;
        height: @headHeight;
    }
    .article {
        width: 100%;
        height: calc( 100% - @headHeight);
    }
}
</style>

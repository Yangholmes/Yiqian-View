<!-- 读堑 -->
<template lang="html">
    <transition name="fan">
        <div id="read-qian">
            <div class="qian-container" :class="{'static': !moveEnable}"
                :style="`transform: translateY(${positionY}px);`"
                @touchstart="onStart"
                @touchmove="onMove"
                @touchend="onEnd">
                <div class="cover" v-if="qian.mainImg">
                    <img :src="qian.mainImg" alt="封面">
                </div>
                <div class="content">
                    <div class="title">
                        <h1>{{qian.title}}</h1>
                    </div>
                    <div class="date-tags">
                        <span class="date">{{dtUtils.toFormatString(new Date(qian.createDate))}}</span>
                        <Tag class="tags" :value="qian.tags" :readonly="true"></Tag>
                    </div>
                    <div class="article">
                        <div class="ql-container ql-snow">
                            <article class="ql-editor"  v-html="qian.article"></article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Tag from 'cpn/tag/Tag';

import dtUtils from 'utils/datetime';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

export default {
    components: {
        Tag
    },
    mounted() {
        this.init();
    },
    data() {
        return {
            dtUtils,
            qian: {},
            moveEnable: false,
            positionStart: 0,
            positionY: 0
        };
    },
    methods: {
        init() {
            this.qian = this.$route.params.qian;
        },
        onStart(e) {
            this.moveEnable = true;
            this.positionStart = e.touches[0].clientY;
        },
        onMove(e) {
            let scrollTop = this.$el.scrollTop;
            if (!this.moveEnable || scrollTop > 0) {
                return false;
            }
            this.positionY = (e.touches[0].clientY - this.positionStart) * .5;
        },
        onEnd() {
            this.moveEnable = false;
            this.positionY = 0;
        }
    }
};
</script>

<style lang="less">
#read-qian {
    width: 100%;
    height: 100%;
    overflow: auto;
    .qian-container {
        width: 100%;
        height: 100%;
        overflow: visible;

        &.static {
            transition: transform .5s;
        }

        & > div {
            width: 100%;
        }

        .cover {
            // height: auto;
            height: 60vw;
            overflow: visible;
            position: relative;
            img {
                width: 100%;
                height: auto;
                position: absolute;
                bottom: 0;
            }
        }
        .content {
            padding: 1em;
            & > div {
                margin: .5em 0;
            }
            .title {
                h1 {
                    margin: 0;
                    font-size: 1.5em;
                    font-weight: bold;
                    width: 100%;
                    overflow: hidden;
                }
            }
            .date-tags {
                font-size: .75em;
                display: flex;
                align-items: center;
                .date {
                    width: 15em;
                }
                .tags {
                    overflow: hidden;
                }
            }
            .article {
                .ql-container.ql-snow {
                    border: none;
                    article {
                        padding: 0;
                    }
                }
            }
        }
    }
}
</style>

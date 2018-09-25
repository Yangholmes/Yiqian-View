<template lang="html">
    <div class="qian-list">
        <ul v-if="qianList.length">
            <li v-for="(qian, index) in qianList" :key="index"
                :class="{'undrag': index !== dragIndex, 'autodrag': autoDrag}"
                :style="`transform: translateX(${index === dragIndex ? positionX : 0}px);`"
                @touchstart="onStart($event, index)"
                @touchmove="onMove($event)"
                @touchend="onEnd($event)"
                @touchcancel="onEnd($event)">
                <div class="content">
                    <h1 class="title" v-html="qian.title"></h1>
                    <MainImg class="cover" :value="qian.mainImg" :readonly="true"></MainImg>
                    <p class="abstract" v-html="qian.article"></p>
                    <p class="create-date">{{qian.createDate}}</p>
                </div>
                <div class="operation">

                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import MainImg from 'cpn/mainImg/MainImg';

export default {
    components: {
        MainImg
    },
    props: {
        qianList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            dragEnable: false,
            autoDrag: false,
            positionStart: 0,
            positionX: 0,
            positionMax: 7,
            dragIndex: null
        };
    },
    methods: {
        onStart(e, index) {
            this.dragEnable = true;
            this.autoDrag = false;
            this.dragIndex = index;
            this.positionX = 0;
            this.positionStart = e.touches[0].clientX;
        },
        onMove(e) {
            let delta = e.touches[0].clientX - this.positionStart;
            delta = (delta + 30) * 0.6;
            delta = delta <= -1 * this.positionMax * 16 ? -1 * this.positionMax * 16 : delta;
            if (delta >= 0) {
                return false;
            }
            this.positionX = delta;
        },
        onEnd() {
            this.dragEnable = false;
            if (this.positionX <= -1 * this.positionMax / 3 * 16) {
                this.positionX = -1 * this.positionMax * 16;
                this.autoDrag = true;
            }
            else {
                this.positionX = 0;
                this.dragIndex = null;
            }
        }
    }
};
</script>

<style lang="less">
.qian-list {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #fafafa;
    ul {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            @operationWidth: 7em;
            width: calc( 100% + @operationWidth );
            margin: .5em 0;

            display: flex;
            flex-direction: row;

            background: #fefefe;
            border-top: 1px solid @borderColor;
            border-bottom: 1px solid @borderColor;

            &.undrag {
                transition: transform .3s;
            }
            &.autodrag {
                transition: transform .3s;
            }

            .content {
                width: calc( 100% - @operationWidth );
                height: 8em;
                padding: .5em 1em;

                display: grid;
                grid-template:  "a a"
                                "b c"
                                "b d";
                grid-template-columns: 2fr 5fr;
                grid-template-rows: 2fr 5fr 1fr;

                h1,
                p {
                    margin: 0;
                    padding: 0;
                    font-size: 1em;
                    font-style: normal;
                    font-weight: normal;
                    em {
                        font-style: normal;
                        font-weight: normal;
                        color: @infoColor;
                    }
                }
                h1.title {
                    grid-area: a;
                    font-size: 1.05em;
                }
                .cover {
                    grid-area: b;
                }
                p.abstract {
                    grid-area: c;
                    // height: calc( 3 * 1.5 * 1em);
                    line-height: 1.5;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    // white-space: nowrap;
                    padding: .25em 0 .25em .5em;
                    font-size: .9em;
                    color: #666;
                }
                p.create-date {
                    grid-area: d;
                    padding-left: .5em;
                    font-size: .75em;
                    color: #999;
                }
            }
            .operation {
                width: @operationWidth;
                height: auto;
                background: red;
            }
        }
    }
}
</style>

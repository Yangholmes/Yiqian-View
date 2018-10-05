<template lang="html">
    <div class="qian-list" onselectstart="return false;">
        <ul v-if="qianList.length">
            <li v-for="(qian, index) in qianList" :key="index"
                :class="{'undrag': !dragEnable || dragIndex !== index}"
                :style="`transform: translateX(${index === dragIndex ? positionX : 0}px);`">
                <div class="content"
                    @touchstart="onStart($event, index)"
                    @touchmove="onMove($event)"
                    @touchend="onEnd($event)"
                    @touchcancel="onEnd($event)">
                    <h1 class="title" v-html="qian.title"></h1>
                    <MainImg class="cover" :value="qian.mainImg" :readonly="true"></MainImg>
                    <p class="abstract" v-html="qian.article"></p>
                    <p class="create-date">{{qian.createDate}}</p>
                </div>
                <div class="operation">
                    <div class="modify" @touchend="onQianModify(qian.id)">修改</div>
                    <div class="delete" @touchend="onQianDelete(qian.id)">删除</div>
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
            positionStart: 0,
            positionX: 0,
            offset: 0,
            positionMax: 7,
            dragIndex: null
        };
    },
    methods: {
        onStart(e, index) {
            // e.preventDefault();
            this.dragEnable = true;
            this.positionStart = e.touches[0].clientX;
            if (this.dragIndex !== index) {
                this.dragIndex = index;
                this.offset = 0;
                this.positionX = 0;
            }
            else {
                this.offset = this.positionX;
            }
        },
        onMove(e) {
            // e.preventDefault();
            let delta = e.touches[0].clientX - this.positionStart;
            if (delta > -30 && delta < 0) {
                return false;
            }
            delta = delta * 0.6;
            delta = delta <= -1 * this.positionMax * 16 ? -1 * this.positionMax * 16 : delta;
            delta += this.offset;
            this.positionX = delta <= 0 ? delta : 0;
            // console.log(this.positionX);
        },
        onEnd() {
            // e.preventDefault();
            this.dragEnable = false;
            if (this.positionX <= -1 * this.positionMax / 2 * 16) {
                this.positionX = -1 * this.positionMax * 16;
            }
            else {
                this.positionX = 0;
                this.offset = 0;
                this.dragIndex = null;
            }
        },
        onQianModify(id) {
            this.jet('onQianModify', id);
        },
        onQianDelete(id) {
            this.jet('onQianDelete', id);
        },
        jet(eventName, data) {
            this.positionX = 0;
            this.offset = 0;
            this.dragIndex = null;
            window.setTimeout(() => {
                this.$emit(eventName, data);
            }, 10);
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
    user-select: none;
    ul {
        width: 100%;
        height: auto;
        overflow: hidden;
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            @operationWidth: calc( 7 * 16px );
            width: calc( 100% + @operationWidth );
            margin: .5em 0;

            display: flex;
            flex-direction: row;

            background: #fefefe;

            &.undrag {
                transition: transform .3s;
            }

            .content {
                width: calc( 100% - @operationWidth );
                height: 8em;
                padding: .5em 1em;

                border-top: 1px solid @borderColor;
                border-bottom: 1px solid @borderColor;

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
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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

                & > div {
                    width: 50%;
                    height: 100%;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .modify {
                    background: @infoColor;
                }
                .delete {
                    background: @errorColor;
                }

                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>

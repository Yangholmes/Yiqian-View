<template lang="html">
    <div class="qian-list" onselectstart="return false;" @scroll="onScroll">
        <ul v-if="qianList.length">
            <li v-for="(qian, index) in qianList" :key="index"
                :class="{'undrag': !dragEnable || dragIndex !== index}"
                :style="`transform: translateX(${index === dragIndex ? position.x : 0}px);`">
                <div class="item"
                    @touchstart="onStart($event, index)"
                    @touchmove="onMove($event)"
                    @touchend="onEnd($event, qian.id)"
                    @touchcancel="onEnd($event, qian.id)">
                    <h1 class="title" v-html="qian.title"></h1>
                    <div class="content">
                        <div class="cover" v-if="qian.mainImg">
                            <MainImg :value="qian.mainImg" :readonly="true"></MainImg>
                        </div>
                        <div class="abstract-date" :class="{'no-cover': !qian.mainImg}">
                            <p class="abstract" v-html="qian.article"></p>
                            <p class="create-date">{{qian.createDate}}</p>
                        </div>
                    </div>
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
            scrolling: false,
            dragEnable: false,
            positionStart: {x: 0, y: 0},
            delta: 0,
            position: {x: 0, y: 0},
            offset: 0,
            positionMax: {x: 7, y: 0},
            dragIndex: null
        };
    },
    methods: {
        onScroll() {
            this.scrolling = true;
        },
        onStart(e, index) {
            // e.preventDefault();
            this.dragEnable = true;
            this.positionStart.x = e.touches[0].clientX;
            this.positionStart.y = e.touches[0].clientY;
            // this.position.y = e.touches[0].clientY;
            if (this.dragIndex !== index) {
                this.dragIndex = index;
                this.offset = 0;
                this.position.x = 0;
            }
            else {
                this.offset = this.position.x;
            }
        },
        onMove(e) {
            // e.preventDefault();
            this.delta = e.touches[0].clientX - this.positionStart.x;
            if (this.delta > -20 && this.delta < 0) {
                this.delta = 0;
                return false;
            }
            this.delta = (this.delta + 20) * 0.6;
            this.delta = this.delta <= -1 * this.positionMax.x * 16 ? -1 * this.positionMax.x * 16 : this.delta;
            this.delta += this.offset;
            this.position.x = this.delta <= 0 ? this.delta : 0;
            // this.position.y = e.touches[0].clientY;
            // console.log(this.position.x);
        },
        onEnd(e, id) {
            // e.preventDefault();
            if (this.position.x === 0 && this.offset === 0) {
                // Math.abs(this.positionStart.y - this.position.y) < 15 && this.onQianRead(id);
                !this.scrolling && this.onQianRead(id);
                this.scrolling = false;
            }
            else if (this.position.x <= -1 * this.positionMax.x / 2 * 16) {
                this.position.x = -1 * this.positionMax.x * 16;
            }
            else {
                this.position.x = 0;
                this.offset = 0;
                this.dragIndex = null;
            }
        },
        onQianRead(id) {
            this.jet('onQianRead', id);
        },
        onQianModify(id) {
            this.jet('onQianModify', id);
        },
        onQianDelete(id) {
            this.jet('onQianDelete', id);
        },
        jet(eventName, data) {
            this.position.x = 0;
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

            .item {
                @contentHeight: 5.5em;
                width: calc( 100% - @operationWidth );
                height: 8em;
                padding: .5em 1em;

                border-top: 1px solid @borderColor;
                border-bottom: 1px solid @borderColor;

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
                    font-size: 1em;
                    width: 100%;
                    height: calc( ~"8em - 1em - @{contentHeight}" );
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .content {
                    width: 100%;
                    height: @contentHeight;
                    overflow: hidden;
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    .cover {
                        width: 30%;
                        height: 100%;
                        padding-right: .5em;
                    }
                    .abstract-date {
                        width: 70%;
                        height: 100%;
                        padding: .25em 0;
                        &.no-cover {
                            width: 100%;
                        }
                        .abstract {
                            // height: calc( 100% - 1em );
                            // padding-bottom: .25em;
                            line-height: 1.25;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 4;
                            -webkit-box-orient: vertical;
                            font-size: .9em;
                            color: #666;
                        }
                        .create-date {
                            // padding-top: .25em;
                            line-height: 1.5;
                            font-size: .75em;
                            color: #999;
                        }
                    }
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

<template lang="html">
    <div class="add-qian" :class="{'hide': hide}"
        :style="transform"
        @touchstart="onStart($event)"
        @touchmove="onMove($event)"
        @touchend="onEnd($event)">
        <span></span>
    </div>
</template>

<script>
export default {
    props: {
        position: {x: 0, y: 0},
        hide: false
    },
    computed: {
        screenSize() {
            return {
                x: document.body.clientWidth,
                y: document.body.clientHeight
            };
        },
        size() {
            return {
                x: this.$el.clientWidth,
                y: this.$el.clientHeight
            };
        },
        transform() {
            return `transform: translateX(${this.movePosition.x}px) `
                + `translateY(${this.movePosition.y}px) `
                + `scale(${this.hide ? 0 : 1});`;
        }
    },
    data() {
        return {
            moveEnable: false,
            clickEnable: true,
            startPosition: {x: 0, y: 0},
            movePosition: {x: 0, y: 0},
            offset: {x: 0, y: 0}
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.movePosition = this.position || {x: 0, y: 0};
        },
        onStart(e) {
            e.preventDefault();
            this.moveEnable = true;
            this.startPosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
            this.offset = {
                x: this.movePosition.x,
                y: this.movePosition.y
            };
        },
        onMove(e) {
            if (!this.moveEnable) {
                return false;
            }
            this.clickEnable = false;
            let x = e.touches[0].clientX - this.startPosition.x + this.offset.x;
            let y = e.touches[0].clientY - this.startPosition.y + this.offset.y;
            x = x > this.screenSize.x - this.size.x
                ? this.screenSize.x - this.size.x : x;
            x = x > 0 ? x : 0;
            y = y < (this.screenSize.y - this.size.y) * -1
                ? (this.screenSize.y - this.size.y) * -1 : y;
            y = y < 0 ? y : 0;
            this.movePosition = {x, y};
        },
        onEnd(e) {
            e.preventDefault();
            let delta = {
                x: e.changedTouches[0].clientX - this.startPosition.x,
                y: e.changedTouches[0].clientY - this.startPosition.y
            };
            this.clickEnable = this.clickEnable || Math.hypot(delta.x, delta.y) < 5;
            if (this.clickEnable) {
                this.$router.push('newQian');
            }
            else {
                this.clickEnable =true;
                this.moveEnable = false;
            }
        }
    }
};
</script>

<style lang="less">
@addSize: 3.5em;
.add-qian {
    width: @addSize;
    height: @addSize;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    // transition: transform .1s;
    &.hide {
        transition: transform .2s;
    }

    span {
        width: 100%;
        height: 100%;
        display: inline-flex;
        border-radius: @addSize;
        background: @addColor;
        position: relative;
        filter: drop-shadow(0 0 5px @borderColor);
        @stickWidth: 55%;
        @stickHeight: .3em;

        &::before,
        &::after {
            content: '';
            width: @stickWidth;
            height: @stickHeight;
            border-radius: 2px;
            background: #fff;
            position: absolute;
            top: calc( ( 100% - @stickHeight ) / 2 );
            left: calc( ( 100% - @stickWidth ) / 2 );
        }
        &::after {
            transform: rotate(90deg);
        }
    }
}
</style>

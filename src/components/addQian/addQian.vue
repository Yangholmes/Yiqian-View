<template lang="html">
    <div class="add-qian"
        @touchstart="onStart($event)"
        @touchmove="onMove($event)"
        @touchend="onEnd($event)"
        :style="`transform: translateX(${delta.x}px) translateY(${delta.y}px)`">
        <span></span>
    </div>
</template>

<script>
export default {
    props: {
        position: {x: 0, y: 0}
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
        }
    },
    data() {
        return {
            moveEnable: false,
            clickEnable: true,
            originalPosition: {x: 0, y: 0},
            delta: {x: 0, y: 0}
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.delta = this.position || {x: 0, y: 0};
        },
        onStart(e) {
            e.preventDefault();
            this.moveEnable = true;
            this.originalPosition = {
                x: e.touches[0].clientX - this.delta.x,
                y: e.touches[0].clientY - this.delta.y
            };
        },
        onMove(e) {
            if (!this.moveEnable) {
                return false;
            }
            this.clickEnable = false;
            let x = e.touches[0].clientX - this.originalPosition.x;
            let y = e.touches[0].clientY - this.originalPosition.y;
            x = x > this.screenSize.x - this.size.x
                ? this.screenSize.x - this.size.x : x;
            x = x > 0 ? x : 0;
            y = y < (this.screenSize.y - this.size.y) * -1
                ? (this.screenSize.y - this.size.y) * -1 : y;
            y = y < 0 ? y : 0;
            this.delta = {x, y};
        },
        onEnd(e) {
            e.preventDefault();
            if (this.clickEnable) {
                this.$router.push('qian');
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
    span {
        width: 100%;
        height: 100%;
        display: inline-flex;
        border-radius: @addSize;
        background: @addColor;
        position: relative;
        filter: drop-shadow(0 0 3px #ccc);
        opacity: .9;
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

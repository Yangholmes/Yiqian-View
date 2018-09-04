<template lang="html">
    <div class="tag-maker">
        <ul>
            <li onselectstart="return false;"
                :class="{'delete': tagShake}"
                v-for="(tag, index) in tags" :key="tag"
                @touchstart="onTouchstart(index)"
                @touchmove="onTouchmove"
                @touchend="onTouchend">
                <span>{{tag}}</span>
            </li>
            <li>
                <input type="text" maxlength="10" placeholder="添加标签"
                    v-model="tag"
                    @keydown="onEnter($event)"
                    @focus="onFocus"
                    @blur="onBlur">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'value',
        event: 'modified'
    },
    props: {
        value: {
            type: Array,
            default: []
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tags: [],
            tag: '',
            hold: null,
            tagShake: false,
            stop: null
        };
    },
    mounted() {
        this.tags = this.value || [];
    },
    methods: {
        onTouchstart(index) {
            if (this.tagShake) {
                window.setTimeout(() => {
                    this.tags.splice(index, 1);
                    this.jet();
                }, 350);
                this.stopShaking();
            }
            else {
                this.hold = window.setTimeout(() => {
                    this.tagShake = true;
                    this.stopShaking();
                }, 700);
            }
        },
        onTouchmove() {
            this.hold && window.clearTimeout(this.hold);
        },
        onTouchend() {
            this.hold && window.clearTimeout(this.hold);
        },
        onEnter(e) {
            switch (e.keyCode) {
                case 8:
                    break;
                case 13:
                    (this.tags.findIndex(e => e === this.tag) === -1) && this.tags.push(this.tag); // 防止内容重复的 tag
                    this.tag = '';
                    this.jet();
                    break;
                default:
                    break;
            }
        },
        onFocus() {
            this.tagShake = false;
        },
        onBlur() {
            this.tag = '';
        },
        stopShaking() {
            this.stop && window.clearTimeout(this.stop);
            this.stop = window.setTimeout(() => {
                this.tagShake = false;
            }, 5000);
        },
        jet() {
            this.$emit('modified', this.tags);
        }
    }
};
</script>

<style lang="less">
.tag-maker {
    width: 100%;
    font-size: .9em;

    ul {
        width: 100%;
        overflow-x: auto;
        margin: 0;
        padding: .1em 0;
        list-style: none;
        display: inline-flex;
        justify-content: normal;
        align-items: center;

        & > * {
            word-wrap: normal;
            word-break: keep-all;
            word-spacing: normal;
            color: @infoColor;
            border: 1px solid @infoColor;
            border-radius: 2em;
            margin-right: .2em;
            padding: .15em .5em;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
            &:last-child {
                margin-right: 0;
                color: #000;
                border: 1px dashed #ccc;
            }
        }
        li {
            &.delete {
                animation: shake .15s infinite;
                border-color: @errorColor;
                background: @errorColor;
                color: #fff;
            }
            @keyframes shake
            {
                0% {
                    transform: rotate(-5deg);
                }
                25% {
                    transform: rotate(0deg);
                }
                50% {
                    transform: rotate(5deg);
                }
                100% {
                    transform: rotate(0deg);
                }
            }
            span {
                display: inline-block;
                margin: 0;
                padding: 0;
            }
            input {
                width: 5em;
                border: none;
                outline: none;
            }
        }
    }

    .input-length {
        color: rgba(0, 0, 0, 0);
        position: absolute;
        left: -999;
        right: -999;
        z-index: -999;
    }
}
</style>
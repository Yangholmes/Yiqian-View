<template lang="html">
    <transition name="fade">
        <div class="message-box" v-if="show">
            <div class="content">
                <div class="message">
                    {{message}}
                </div>
                <div class="btn-group">
                    <slot name="btn-group">
                        <Button @touchend="onCancel">{{cancleText}}</Button>
                        <Button @touchend="onConfirm"><span class="danger">{{confirmText}}</span></Button>
                    </slot>
                </div>
            </div>
            <div class="mask" @touchend="onClose"></div>
        </div>
    </transition>
</template>

<script>
import Button from 'cpn/button/FlatButton';

export default {
    components: {
        Button
    },
    props: {
        message: {
            type: String,
            default: '这是消息'
        },
        cancleText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        }
    },
    mounted() {
        // console.log(this);
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        onShow() {
            this.show = true;
        },
        onClose() {
            this.show = false;
            window.setTimeout(() => {
                this.onDestory();
            }, 500);
        },
        onDestory() {
            this.$destroy();
            document.body.removeChild(this.$el);
        },
        onConfirm() {
            this.jet('onConfirm');
            this.onClose();
        },
        onCancel() {
            this.jet('onCancel');
            this.onClose();
        },
        jet(event) {
            this.$emit(event);
        }
    }
};
</script>

<style lang="less">
.message-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;

    .content {
        min-width: 15em;
        max-width: 70%;
        // width: 70%;
        height: auto;
        border-radius: 3px;
        filter: drop-shadow(0 0 5px #555);
        background: #fff;

        .message {
            max-height: 7em;
            padding: 1em 2em .5em 2em;
            word-break: break-word;
            overflow: auto;
        }
        .btn-group {
            display: flex;
            justify-content: space-around;
            align-items: center;
            & > div {
                width: 100%;
            }
            .danger {
                color: @errorColor;
            }
        }
    }

    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background: rgba(50, 50, 50, 0.5);
    }
}

.fade {
    // 0 时刻和 t 时刻
    &-enter,
    &-leave-to {
        opacity: 0;
        .content {
            transform: translateY(3em);
        }
    }

    // t/2 时刻
    &-enter-to,
    &-leave {
        opacity: 1;
        .content {
            transform: translateY(0);
        }
    }

    // 进入/退出 动画样式
    &-enter-active {
        transition: opacity .5s;
        .content {
            transition: transform .5s;
        }
    }
    &-leave-active {
        transition: opacity .2s;
        .content {
            transition: transform .5s;
        }
    }
}
</style>

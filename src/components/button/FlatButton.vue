<template lang="html">
    <div class="flat-button" onselectstart="return false;"
        @touchend="jet">
        <span class="button-value"><slot>好</slot></span>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        jet() {
            this.$emit('touchend');
        }
    }
};
</script>

<style lang="less">
.flat-button {
    min-width: 2em;
    width: auto;
    height: 3em;
    font-size: 1em;
    padding: .25em .5em;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    .button-value {
        color: @infoColor;
    }
    &:active {
        .button-value {
            color: lighten(@infoColor, 10%);
        }
    }
}
</style>

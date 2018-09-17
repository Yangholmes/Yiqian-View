<template lang="html">
    <div class="toolbar-new-qian">
        <Button @touchend="onCancel">返回</Button>
        <span class="slot"><slot></slot></span>
        <Button @touchend="onSubmit">保存</Button>
    </div>
</template>

<script>
import Button from 'cpn/button/FlatButton';

export default {
    components: {
        Button
    },
    data() {
        return {

        };
    },
    methods: {
        onCancel() {
            this.$emit('onCancel');
        },
        onSubmit() {
            this.$emit('onSubmit');
        }
    }
};
</script>

<style lang="less">
.toolbar-new-qian {
    width: 100%;
    height: 100%;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-around;

    & > * {
        width: 100%;
    }
}
</style>

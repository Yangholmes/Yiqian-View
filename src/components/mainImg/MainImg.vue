<template lang="html">
    <div ref="frame" class="main-img" @click="chooseMain"
        :style="`width: ${frameWidth}; height: ${frameHeight}`">
        <!-- 封面图 -->
        <img alt="我是封面" v-show="mainImg"
            ref="img" :src="mainImg"
            :style="`width: ${imgWidth}; height: ${imgHeight}`">
        <span class="no-img" v-show="!mainImg">我是封面</span>
        <!-- 选择图片 `input` 控件 -->
        <input ref="input" type="file" accept="image/*" @change="onInputChange">
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
            type: String,
            default: null
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        frame() {
            return this.$refs.frame;
        },
        img() {
            return this.$refs.img;
        },
        input() {
            return this.$refs.input;
        }
    },
    data() {
        return {
            mainImg: null,
            frameWidth: '100%',
            frameHeight: '100%',
            imgWidth: 'auto',
            imgHeight: 'auto'
        };
    },
    mounted() {
        this.init();
        this.mainImg = this.value || null;
    },
    methods: {
        init() {
            this.frameResize();
            this.img.onload = this.imgLoaded;
        },
        frameResize() {
            let style = window.getComputedStyle(this.frame);
            let width = style.width.replace('px', '');
            let height = style.height.replace('px', '');
            if (width / height >= 1) {
                this.frameHeight = height + 'px';
                this.frameWidth = height + 'px';
            }
            else {
                this.frameWidth = width + 'px';
                this.frameHeight = width + 'px';
            }
        },
        imgLoaded() {
            let style = window.getComputedStyle(this.img);
            let width = style.width.replace('px', '');
            let height = style.height.replace('px', '');
            if (width / height >= 1) {
                this.imgWidth = '100%';
                this.imgHeight = 'auto';
            }
            else {
                this.imgWidth = 'auto';
                this.imgHeight = '100%';
            }
        },
        chooseMain() {
            this.input.click();
        },
        onInputChange() {
            let file = this.input.files[0];
            if (window.FileReader && file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = e => {
                    this.mainImg = e.target.result;
                    this.jet();
                };
            }
        },
        jet() {
            this.$emit('modified', this.mainImg);
        }
    }
};
</script>

<style lang="less">
.main-img {
    // width: 100%;
    // height: 100%;
    // margin: auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border: 1px dashed @borderColor;
    border-radius: 5px;

    .no-img {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        color: rgba(255, 255, 255, 1);
        font-size: .75em;
        font-weight: bold;
        filter: drop-shadow(0 0 1px #888);
    }

    input {
        display: none;
    }
}
</style>

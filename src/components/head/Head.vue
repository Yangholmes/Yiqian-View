<!-- 堑 标题 -->
<template lang="html">
    <div class="head" onselectstart="return false;">
        <div class="title">
            <input type="text" placeholder="标题取什么好呢？" v-model="title" @change="jet">
        </div>
        <div class="tag">
            <Tag v-model="tags" @modified="jet"></Tag>
        </div>
        <div class="cover">
            <MainImg v-model="mainImg" @modified="jet"></MainImg>
        </div>
    </div>
</template>

<script>
import MainImg from 'cpn/mainImg/MainImg';
import Tag from 'cpn/tag/Tag';

export default {
    components: {
        MainImg,
        Tag
    },
    model: {
        prop: 'value',
        event: 'modified'
    },
    props: {
        value: {
            type: Object,
            default() {
                return {
                    title: '',
                    tags: [],
                    mainImg: null
                };
            }
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            title: '',
            tags: [],
            mainImg: null
        };
    },
    mounted() {
        this.title = this.value.title || '';
        this.tags = this.value.tags || [];
        this.mainImg = this.value.mainImg || null;
    },
    methods: {
        jet() {
            this.$emit('modified', {
                title: this.title,
                tags: this.tags,
                mainImg: this.mainImg
            });
        }
    }
};
</script>

<style lang="less">
.head {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template:  "a c"
                    "b c";
    grid-template-columns: 3fr 2fr;

    & > * {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 15px;
        overflow: hidden;
    }

    .title {
        grid-area: a;
        input {
            display: inline-block;
            width: 100%;
            padding: 0;
            outline: none;
            border: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0);
            font-size: 1.25em;
            line-height: 1.5;
            &:focus {
                border-bottom: 1px solid #bbb;
            }
            &::-webkit-input-placeholder {
                color: rgba(0,0,0,0.6);
                // font-style: italic;
            }
        }
    }
    .tag {
        grid-area: b;
    }
    .cover {
        grid-area: c;
        padding: 12px 15px;
        justify-content: flex-end;
    }
}
</style>

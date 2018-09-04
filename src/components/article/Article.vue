<!-- 堑 内容 -->
<template lang="html">
    <div class="article">
        <div :id="id"></div>
    </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

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
    data() {
        return {
            id: 'editor-' + (Math.random() * 10000).toFixed(0),
            article: ''
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.quill = new Quill('#' + this.id, {
                theme: 'snow',
                placeholder: '今天想写点什么...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'image'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'color': []}]
                    ]
                }
            });
            this.article = this.value;
            this.quill.root.innerHTML = this.article;
            this.quill.on('text-change', this.onChange);
        },
        onChange() {
            this.article = this.quill.root.innerHTML;
            this.jet();
        },
        jet() {
            this.$emit('modified', this.article);
        }
    }
};
</script>

<style lang="less">
.article {
    width: 100%;
    height: 100%;

    .ql {
        &-toolbar {
            border: none;
            border-bottom: 1px solid #ccc;
        }
        &-container {
            height: calc( 100% - 42px );
            font-size: 1em;
            border: none;
            font-family: FZHTJW, sans-serif;
            font-weight: 400;
            img {
                display: block;
            }
        }
        &-blank::before {
            font-style: normal;
        }
    }
}
</style>

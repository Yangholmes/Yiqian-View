<!-- 堑 内容 -->
<template lang="html">
    <div class="article">
        <div :id="id"></div>
    </div>
</template>

<script>
import './newSnow';
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
    watch: {
        value(val, oldVal) {
            if (!oldVal && this.article !== this.quill.root.innerHTML) {
                this.article = this.value;
                this.quill.root.innerHTML = this.article;
            }
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
                theme: 'newSnow',
                syntax: true,
                placeholder: '今天想写点什么...',
                modules: {
                    toolbar: {
                        container: [
                            ['bold', 'italic', 'image'],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            ['code-block'],
                            [{'color': []}]
                            // ['table']
                        ]
                    }
                }
            });
            this.quill.on('text-change', this.onChange);
        },
        onChange(delta, oldDelta) {
            // console.log('article', this.article);
            // console.log('html', this.quill.root.innerHTML);
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
            border-bottom: 1px solid @borderColor;
        }
        &-container {
            height: calc( 100% - 42px );
            font-size: 1em;
            border: none;
            font-family: @fontFamily;
            font-weight: 400;
            img {
                display: block;
            }
            table {
                border: 1px solid #000;
                border-collapse: collapse;
                td {
                    border: 1px solid #000;
                }
            }
        }
        &-blank::before {
            font-style: normal;
        }
    }
}
</style>

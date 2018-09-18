/**
 * 消息弹窗工厂
 *
 * @file
 * @author Yangholmes
 */
import MessageBox from './MessageBox';
import Button from 'cpn/button/FlatButton';
import Vue from 'vue';

export default options => {
    let props = Object.assign({}, options.props),
        fns = Object.assign({}, options.fns);
    let MB = Vue.extend({
        render(h) {
            let btnGroup = props.cancelEnable ? [] : [
                h(Button, {
                    slot: 'btn-group',
                    on: {
                        touchend: function () {
                            return this.$children[0].onConfirm();
                        }.bind(this)
                    }
                }, [props.confirmText])
            ];
            return h(MessageBox, {
                props,
                on: {
                    onCancel: this.onCancel,
                    onConfirm: this.onConfirm
                }
            }, btnGroup);
        },
        methods: {
            onShow() {
                this.$children[0].onShow();
            },
            onCancel() {
                fns.onCancel && fns.onCancel();
            },
            onConfirm() {
                fns.onConfirm && fns.onConfirm();
            }
        }
    });
    let mbFactory = () => {
        let messageBox = new MB().$mount();
        document.body.appendChild(messageBox.$el);
        return messageBox;
    };

    return mbFactory();
};

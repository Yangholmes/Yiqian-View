import mbFactory from './mbFactory';

export default {
    confirm(options) {
        options.cancelEnable = true;
        let mb = mbFactory(this.sort(options));
        mb.onShow();
    },
    info(options) {
        options.cancelEnable = false;
        let mb = mbFactory(this.sort(options));
        mb.onShow();
    },

    sort(options) {
        let props = {},
            fns = {};
        for (let p in options) {
            if (options[p].constructor === Function) {
                fns[p] = options[p];
            }
            else {
                props[p] = options[p];
            }
        }
        return {props, fns};
    }
};

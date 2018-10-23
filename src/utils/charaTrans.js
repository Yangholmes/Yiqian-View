/**
 * 字符转换器
 *
 * @file
 * @author yangholmes
 */
export default {
    /**
     * 将字符转换成 html 编码格式
     * @param  {String} [str=''] [description]
     * @return {[type]} [description]
     */
    htmlEncode(str = '') {
        if (str.constructor !== String) {
            return '';
        }
        let tmpDiv = document.createElement('div');
        tmpDiv.textContent = str;
        let output = tmpDiv.innerHTML;
        tmpDiv = null;
        return output;
    },

    htmlDecode(html = '') {
        if (html.constructor !== HTMLElement) {
            let container = document.createElement('div');
            container.innerHTML = html;
            html = container;
        }
        return html.textContent;
    }
};

/**
 * 字符转换器
 *
 * @file
 * @author yangholmes
 */
export default {
    htmlEncode(str = '') {
        if (str.constructor !== String) {
            return '';
        }
        let tmpDiv = document.createElement('div');
        tmpDiv.textContent = str;
        let output = tmpDiv.innerHTML;
        tmpDiv = null;
        return output;
    }
};

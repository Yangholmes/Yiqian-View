/**
 * 日期时间工具箱
 *
 * @file
 * @author Yangholmes 2018-10-17
 */
export default {
    /**
     * 格式化时间戳
     * @param  {Date} [dt=new Date()] [description]
     * @param  {String} [format='Y-m-d H:i'] [description]
     * @return {String} [description]
     */
    toFormatString(dt = new Date(), format = 'Y-m-d H:i') {
        let year = dt.getFullYear(),
            month = this.prefixZero(dt.getMonth() + 1),
            day = this.prefixZero(dt.getDate()),
            hour = this.prefixZero(dt.getHours()),
            minutes = this.prefixZero(dt.getMinutes());
        return format.replace('Y', year)
            .replace('m', month)
            .replace('d', day)
            .replace('H', hour)
            .replace('i', minutes);
    },

    prefixZero(num = 0, digit = 2) {
        num = (num * 1).toString().split('');
        let preLength = digit - num.length;
        if (preLength > 0) {
            for (let i = 0; i < preLength; i++) {
                num.unshift('0');
            }
        }
        return num.join('');
    }
};

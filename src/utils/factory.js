/**
 * 工具s
 * @file
 * @author Yangholmes
 */
export default {
    storeName(storeName = 'store') {
        let dt = new Date();
        let year = dt.getFullYear(),
            month = dt.getMonth() + 1,
            date = dt.getDate();
        return `${storeName}{${year}-${month}-${date}:${this.genId()}}`;
    },
    genId() {
        let rId = (Math.random() * 100000).toFixed(0) * 1;
        let dId = new Date().getTime();
        return `${rId.toString(16)}-${dId.toString(16)}`;
    }
};

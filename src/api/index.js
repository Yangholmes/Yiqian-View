/**
 * 数据交互接口
 * client 端数据持久化接口
 * server 端数据线上备份接口
 * @file
 * @author Yangholmes
 */
import database from './database';
// import network from './network';

export default {
    /**
     * client 持久化
     */
    addNewQian(data) {
        return database.addNewQian(data);
    },
    getAllQian() {
        return database.getAllQian();
    },
    updateQian(data) {
        return database.updateQian(data);
    },
    deleteQian(key) {
        return database.deleteQian(key);
    }
};

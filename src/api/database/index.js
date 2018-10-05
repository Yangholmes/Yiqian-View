import IDBI from './IDBI';
import config from './config';
import factory from 'utils/factory';

export default {
    instantiationDB() {
        return new IDBI(config.name, {
            version: config.version,
            key: config.key,
            store: config.store,
            indexs: config.indexs
        });
    },

    addNewQian(data) {
        let idbi = this.instantiationDB();

        return new Promise((resolve, reject) => {
            data = Object.assign({}, data, {
                id: factory.genId()
            });
            idbi.insertData(data)
                .then(res => {
                    if (res.type === 'success') {
                        resolve({
                            code: 0,
                            msg: 'insert done',
                            data: ''
                        });
                    }
                    else {
                        reject({
                            code: -1,
                            msg: 'insert fail',
                            data: res
                        });
                    }
                })
                .catch(error => {
                    reject({
                        code: -1,
                        msg: 'insert fail',
                        data: error
                    });
                });
        });

    },
    getAllQian() {
        let idbi = this.instantiationDB();

        return new Promise((resolve, reject) => {
            idbi.getAllData()
                .then(res => {
                    let data = res.target.result;
                    resolve({
                        code: 0,
                        msg: '',
                        data
                    });
                })
                .catch(error => {
                    reject({
                        code: -1,
                        msg: 'query fail!',
                        data: error
                    });
                });
        });
    },
    updateQian(data) {
        let idbi = this.instantiationDB();

        return new Promise((resolve, reject) => {
            idbi.updateData(data)
                .then(res => {
                    let data = res.target.result;
                    resolve({
                        code: 0,
                        msg: '',
                        data
                    });
                })
                .catch(error => {
                    reject({
                        code: -1,
                        msg: 'update fail!',
                        data: error
                    });
                });
        });
    },
    deleteQian(key) {
        let idbi = this.instantiationDB();

        return new Promise((resolve, reject) => {
            idbi.deleteOne(key)
                .then(res => {
                    let data = res.target.result;
                    resolve({
                        code: 0,
                        msg: '',
                        data
                    });
                })
                .catch(error => {
                    reject({
                        code: -1,
                        msg: 'delete fail!',
                        data: error
                    });
                });
        });
    }
};

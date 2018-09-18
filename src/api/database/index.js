import IDBI from './IDBI';
import config from './config';

export default {
    addNewQian(data) {
        let idbi = new IDBI(config.name, {
            version: config.version,
            key: config.key,
            store: config.store,
            indexs: config.indexs
        });

        return new Promise((resolve, reject) => {
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
        let idbi = new IDBI(config.name, {
            version: config.version,
            key: config.key,
            store: config.store,
            indexs: config.indexs
        });

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
                    console.log(error);
                });
        });
    }
};

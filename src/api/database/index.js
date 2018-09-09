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

        idbi.insertData(data)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    },
    getAllQian() {
        let idbi = new IDBI(config.name, {
            version: config.version,
            key: config.key,
            store: config.store,
            indexs: config.indexs
        });

        idbi.getAllData()
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    }
};

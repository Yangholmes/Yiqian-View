/**
 * IndexedDB Interface
 *
 * How to...
 * 1. Open a database.
 * 2. Create an object store in the database.
 * 3. Start a transaction and make a request to do some database operation, like adding or retrieving data.
 * 4. Wait for the operation to complete by listening to the right kind of DOM event.
 * 5. Do something with the results (which can be found on the request object).
 *
 * @file
 * @author Yangholmes
 */
class IDBI {
    constructor(name = '', config = {}) {
        this.name = name.constructor === String ? name : '';
        this.config = config.constructor === Object ? config : '';
        this.initDb();
    }

    initDb() {
        this.db = null;
        this.store = this.config.store && (this.config.store.constructor === String)
            ? this.config.store : '';
        this.key = this.config.key && (this.config.key.constructor === Object)
            ? this.config.key : {keyPath: null, autoIncrement: false};
        this.indexs = this.config.indexs && (this.config.indexs.constructor === Array)
            ? this.config.indexs : [];
        this.version = this.config.version && (this.config.version.constructor === Number)
            ? this.config.version : 1;
    }

    compatibility() {
        if (!window.indexedDB) {
            console.error('Your browser do not support indexedDB');
            return false;
        }
        else {
            console.debug('indexedDB is ready');
            return true;
        }
    }

    openIndexedDb() {
        return new Promise((resolve, reject) => {
            !this.compatibility() && reject({
                code: -1,
                msg: '浏览器不支持indexedDB，无法存储数据',
                data: {}
            });

            let DBOpenRequest = window.indexedDB.open(this.name, this.version);

            DBOpenRequest.onsuccess = () => {
                this.db = DBOpenRequest.result;
                resolve(this.db);
            };
            DBOpenRequest.onupgradeneeded = event => {
                console.log('upgrade');
                this.db = event.target.result;
                if (!this.db.objectStoreNames.contains(this.store)) {
                    let store = this.db.createObjectStore(this.store, {
                        keyPath: this.key.keyPath,
                        autoIncrement: this.key.autoIncrement
                    });
                    this.indexs.forEach(e => {
                        store.createIndex(e.key, e.key, {
                            unique: e.unique
                        });
                    });
                }
            };
            DBOpenRequest.onerror = event => {
                reject(event);
            };
        });
    }

    setStore(store) {
        this.store = store && store.constructor === String ? store : '';
    }

    insertData(data) {
        return new Promise((resolve, reject) => {
            this.openIndexedDb()
                .then(() => {
                    let tx = this.db.transaction(this.store, 'readwrite'),
                        store = tx.objectStore(this.store),
                        req = store.add(data);

                    req.onsuccess = event => {
                        resolve(event);
                    };
                    req.onerror = event => {
                        reject(event);
                    };
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getAllData() {
        return new Promise((resolve, reject) => {
            this.openIndexedDb()
                .then(() => {
                    let tx = this.db.transaction(this.store, 'readwrite'),
                        store = tx.objectStore(this.store),
                        req = store.getAll();

                    req.onsuccess = event => {
                        resolve(event);
                    };
                    req.onerror = event => {
                        reject(event);
                    };
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    updateData(data) {
        return new Promise((resolve, reject) => {
            this.openIndexedDb()
                .then(() => {
                    let tx = this.db.transaction(this.store, 'readwrite'),
                        store = tx.objectStore(this.store),
                        req = store.put(data);

                    req.onsuccess = event => {
                        resolve(event);
                    };
                    req.onerror = event => {
                        reject(event);
                    };
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    deleteOne(key) {
        return new Promise((resolve, reject) => {
            this.openIndexedDb()
                .then(() => {
                    let tx = this.db.transaction(this.store, 'readwrite'),
                        store = tx.objectStore(this.store),
                        req = store.delete(key);

                    req.onsuccess = event => {
                        resolve(event);
                    };
                    req.onerror = event => {
                        reject(event);
                    };
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default IDBI;

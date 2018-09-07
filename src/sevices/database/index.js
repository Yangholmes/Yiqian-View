import IDBI from './IDBI';
import config from './config';

let idbi = new IDBI(config.name, {
    version: config.version
});

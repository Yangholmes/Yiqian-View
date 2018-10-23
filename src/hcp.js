/**
 *
 */
import cApp from '../public/cordova/hcp';
import MessageBox from 'cpn/messageBox';

cApp.init().then(() => {
    return cApp.checkVersion();
}).then(res => {
    console.debug(res);
    MessageBox.confirm({
        message: '有新版本，想不想更新？',
        cancleText: '不更',
        confirmText: '更之',
        onConfirm() {
            cApp.installNewVersion();
        }
    });
}).catch(error => {
    console.error(error);
});

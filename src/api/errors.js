/**
 * 错误代码
 * 0: 操作成功
 * -1: 操作过程中出现错误，原因不明
 *
 * 0开头错误: database 错误
 * 1开头错误: network通信错误
 */
export default {
    0: 'success',
    '-1': 'Unknown error'
};

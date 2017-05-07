/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏客户端webscoket扩展
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/23 初版
 */

//扩展send方法
WebSocket.prototype.wlSend = function (type,params) {
    var s = this;
    params = params || {};
    params.type = type;
    params.name = selfName;
    s.send(JSON.stringify(params));
};


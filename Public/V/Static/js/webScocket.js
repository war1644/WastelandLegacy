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
WebSocket.prototype.wlSend = function (params) {
    var data = {
        id:userInfo.id,
        service:this.service,
        data:params
    };
    data = JSON.stringify(data);
    this.send(data);
};

//握手成功触发
WebSocket.prototype.wlOnOpen = function(){
    this.onopen = function (e) {
        console.log("握手成功");
        if(ws.readyState==1){
            ws.send(JSON.stringify({id:id,wl:userInfo.wl}));
        }
    };
};
   //服务器发送消息，触发
WebSocket.prototype.wlOnMessage = function(){
    this.onmessage = function(e){
        //e.data就是服务器发送的信息
        console.log( JSON.parse(e.data) );
        //接下来爱干嘛干嘛去、
        //...code...
    }
};
   //出错时触发方法
WebSocket.prototype.wlOnError = function(){
    this.onmessage = function(e){
        console.log( e );
    };
};

//    var WS = new WebSocket("ws://127.0.0.1:2416");
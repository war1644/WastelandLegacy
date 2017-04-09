/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 客户端websocket类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @since
 * v2017/04/09 初版
 */
var WS = function () {
    //请求服务器握手
    var ws = new WebSocket("ws://127.0.0.1:8416");
    this.name = prompt('来个名字吧：');
    //握手成功触发
    ws.onopen = function(){
        console.log("握手成功");
        if(ws.readyState==1){
            ws.send(name+"加入房间");
        }
    };
    //服务器发送消息，触发
    ws.onmessage = function(e){
        //e就是服务器发送的信息
        console.log( JSON.parse(e.data) );
        //接下来爱干嘛干嘛去、
        //...code...
    };
    //出错时触发方法
    ws.onerror = function(e){
        console.log( e );
    };

};

WS.prototype = {
    sendDataFormat : function (params) {
        var data = {
            id:this.name,
            service:this.service,
            data:params
        };
        return JSON.stringify(data);
    }
};

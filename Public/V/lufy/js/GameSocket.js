/**
 * Created by 路漫漫.
 * Link: ahmerry@qq.com
 * Date: 2017/7/23 13:26
 *
 */
let socket,gameInfo = $(".information");
let GameSocket = {

    sendMsg:(text)=> {
        if (socket.readyState === WebSocket.OPEN) {
            let value = $('#userMsg').val();
            if (value) {
                $('#userMsg').val('');
                Lib.showInfo(value);
            }
            let to = document.getElementById("to").value;
            socket.wlSend('talk', {target: to, msg: value});
        } else {
            alert('连接服务器失败。');
        }
    },

    onLink:()=> {
        socket = new WebSocket("ws://127.0.0.1:8886");
        socket.onopen = function () {
            console.log("握手成功");
            if (socket.readyState == 1) {
                // socket.wlSend('login');
            }
        };
        socket.onmessage = function (e) {
            let data = JSON.parse(e.data);
            console.log(data);
            GameSocket.haveMsg(data);
        };
        socket.onerror = function (e) {
            console.log('err', e);
        };
        socket.onclose = function (e) {
            Lib.showInfo('服务器断开');

        };
        Lib.showInfo('连接服务器成功');
        //addTank("vvv",100,200,"left","#000000");
    },

    haveMsg:(value)=> {
        let text;
        switch (value["type"]) {
            case "error":
                Lib.showInfo(value["error"]);
                break;
            case "login":
                Lib.showInfo(value["登录成功"]);
                socket.wlSend(
                    'addUser',
                    {type:'player',img:'',x:player.px, y:player.py, dir:UP}
                );
                break;
            case "talk":
                Lib.showInfo(value["msg"]);
                break;
            case "removeUser":
                let index = charaLayer.getChildByName(value["name"]);
                charaLayer.removeChildAt(index);
                break;
            case "setUserList":
                let list = value["list"];
                for (let i in list) {
                    addNpc(list[i]);
                }
                break;
            case "addUser":
                addNpc(value);
                break;
            case "move":
                moveNetNpc(value["name"], value["steps"]);
                break;
            case "action":
                break;
            case "kill":
                break;

        }
        if (text) msg.innerHTML = text;
    }

};
$(".gameMsg").click(function(){
    if($(this).data("num")){
        $(this).data("num" , 0);
        $("#box").css({"width":"50px","height":"25px"});
        $(".information").hide();
        $(".footBtn").hide();
    }else {
        $(this).data("num" , 1);
        $("#box").css({"width":"300px","height":"316px"});
        $(".information").show();
        $(".footBtn").show();
    }
});

$('#send').click(function () {
    GameSocket.sendMsg();
});


$("#box").on("mousedown touchstart" , function (ev) {
    let box,leftMouse,topMouse;
    ev = ev || event;
    box = ev.currentTarget;
    if(ev.clientX == undefined || ev.clientY == undefined ){
        leftMouse= parseInt(ev.changedTouches[0].clientX) - box.offsetLeft;
        topMouse = parseInt(ev.changedTouches[0].clientY) - box.offsetTop;
    }else {
        leftMouse= ev.clientX - box.offsetLeft;
        topMouse = ev.clientY - box.offsetTop;
    }
    $(document).on("mousemove touchmove" , function (ev){
        ev = ev || event ;
        let boxLeft, boxTop;
        if(ev.clientX == undefined || ev.clientY == undefined ){
            boxLeft= parseInt(ev.changedTouches[0].clientX) - leftMouse;
            boxTop = parseInt(ev.changedTouches[0].clientY) - topMouse;
        }else {
            boxLeft = ev.clientX - leftMouse;
            boxTop = ev.clientY - topMouse;
        }
        if(boxLeft > window.innerWidth || boxLeft<0){
            return false;
        }
        if(boxTop > window.innerHeight || boxTop<0){
            return false;
        }
        box.style.left = boxLeft  + 'px';
        box.style.top = boxTop  + 'px';
    })
});

$("#box").on("mouseup touchend" , function(){
    $(document).off("mousemove touchmove" , null);
});
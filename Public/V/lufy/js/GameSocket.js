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
                // Lib.showInfo(value);
            }
            // let to = document.getElementById("to").value;
            socket.wlSend('talk', {target: 'all', msg: value});
        } else {
            alert('连接服务器失败。');
        }
    },

    onLink:()=> {
        socket = new WebSocket("ws://192.168.2.208:8886");
        socket.onopen = function () {
            RPG.newGame();
            Lib.showInfo('握手成功');
            if (socket.readyState === 1) {
                socket.wlSend('login');
            }
        };
        socket.onmessage = function (e) {
            let data = JSON.parse(e.data);
            console.log(data);
            GameSocket.haveMsg(data);
        };
        socket.onerror = function (e) {
            Lib.showInfo('err',JSON.stringify(e));
        };
        socket.onclose = function (e) {
            Lib.showInfo('服务器断开');
        };
        Lib.showInfo('连接服务器成功');
    },

    haveMsg:(value)=> {
        switch (value["type"]) {
            case "error":
                Lib.showInfo(value["error"]);
                break;
            case "login":
                Lib.showInfo(value.msg);
                break;
            case "talk":
                Lib.showInfo(value.content.msg);
                break;
            case "removeUser":
                if(value.content.stageId !== stage.id) return;
                let npc = netPlayer[value.name];
                charaLayer.removeChild(npc);
                delete netPlayer[value.name];
                break;
            case "setUserList":
                // let list = value["list"];
                // for (let i in list) {
                //     addNpc(list[i]);
                // }
                break;
            case "addUser":
                if(value.content.stageId !== stage.id) return;
                if(value.name === playerName) return;
                value.content.name = value.name;
                addNpc(value.content);
                break;
            case "move":
                if(value.content.stageId !== stage.id) return;
                moveNetNpc(value["name"], value.content);
                break;
            case "action":
                break;
            case "kill":
                break;

        }
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

$('#clear').click(function () {
    $(".information").html('');
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
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

    onLink:(name,pwd)=> {
        if(socket){
            socket.wlSend('getSave');
        }else {
            socket = new WebSocket('ws://'+location.host+':8886');
        }

        socket.onopen = function () {
            Lib.showInfo('握手成功');
            if (socket.readyState === 1) {
                socket.wlSend('login',{pwd:pwd});
            } else {
                Lib.showInfo('握手失败');
            }
        };
        socket.onmessage = function (e) {
            let data = JSON.parse(e.data);
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
                Lib.showInfo('正在初始化数据...');
                if('code' in value.content){
                    alert(value.content.msg);
                    return false;
                }
                Lib.userInfo = value.content;
                console.log('set',Lib.userInfo);
                RPG.newGame();
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
            case "setSave":
                if (value.content) {
                    UI.showInfo('保存成功');
                } else {
                    UI.showInfo('保存失败');
                }
                break;
            case "getSave":
                if (value.content) {
                    let saveData = value.content.saveData;
                    mainTeam = RPG.beget(PlayerTeam);
                    for (let i = 0; i < saveData.itemList.length; i++) {
                        mainTeam.addItem(saveData.itemList[i].id, saveData.itemList[i].num);
                    }

                    for (let i = 0; i < saveData.heroList.length; i++) {
                        mainTeam.addHero(saveData.heroList[i].id, saveData.heroList[i].Level);
                        RPG.extend(mainTeam.heroList[i], saveData.heroList[i]);
                    }
                    RPG.initSwitch();
                    RPG.extend(RPG.SWITCH, saveData.swt);
                    gameStageInit(Number(saveData.stageId), Number(saveData.px), Number(saveData.py));
                    // 进入地图控制状态
                    RPG.setState(RPG.MAP_CONTROL);
                } else {
                   alert('没有存档，请刷新游戏重新登录开始新游戏');
                }
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
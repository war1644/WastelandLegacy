/**
 * Created by 路漫漫.
 * Link: ahmerry@qq.com
 * Date: 2017/7/23 13:26
 *
 */
let socket;
let GameSocket = {
    sendMsg:()=>{
        if (socket && socket.readyState === WebSocket.OPEN) {
            let value = document.querySelector('#userMsg').value;
            if (value) {
                document.querySelector('#userMsg').value = '';
            }
            socket.wlSend('talk', {target: 'all', msg: value});
        } else {
            alert('连接服务器失败。');
        }
    },

    onLink:()=> {
        if(!socket){
            socket = new WebSocket('ws://'+WS_HOST+':9001?key=666');
        }
        socket.onopen = function () {
            if (socket.readyState === 1) {
                Lib.showInfo('连接服务器成功');
                socket.wlSend('login');
                msgBox.setAttribute('style','display:block');
            } else {
                Lib.showInfo('连接服务器失败');
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
    },

    haveMsg:(value)=> {
        switch (value["type"]) {
            case "ht":
                socket.wlSend('ht',1);
                break;
            case "error":
                Lib.showInfo(value["error"]);
                break;
            case "login":
                Lib.showInfo('已登录');
                // if('code' in value.content){
                //     playerName = false;
                //     alert(value.content.msg);
                //     return false;
                // }
                // RPG.newGame();
                break;
            case "talk":
                Lib.showInfo(value.content.msg);
                break;
            case "removeUser":
                if(value.content.stageId != stage.id) return;
                let npc = netPlayer[value.name];
                charaLayer.removeChild(npc);
                delete netPlayer[value.name];
                break;
            case "addUser":
                if(value.content.stageId != stage.id) return;
                if(value.name == playerName) return;
                value.content.name = value.name;
                addNpc(value.content);
                break;
            case "move":
                if(value.content.stageId != stage.id) return;
                moveNetNpc(value["name"], value.content);
                break;
            case "inBattle":
                if(value.content.stageId != stage.id) return;
                Fight.addNetBattle(value);
                break;
            case "support":
                if (!window.netTeam) {
                    window.netTeam = RPG.beget(PlayerTeam);
                    window.netTeam.clear();
                }
                window.netTeam.addHero(value.content.jobId, value.content.lv, value.content.name);
                Fight.addSupportBattle(window.netTeam, value.content.name);
                break;
            case "action":
                Fight.updateFightData(value);
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
                    let saveData = value.content;
                    mainTeam = RPG.beget(PlayerTeam);
                    if(saveData.itemList) {
                        for (let i = 0; i < saveData.itemList.length; i++) {
                            mainTeam.addItem(saveData.itemList[i].id, saveData.itemList[i].num);
                        }
                    }
                    for (let i = 0; i < saveData.heroList.length; i++) {
                        mainTeam.addHero(saveData.heroList[i].id, saveData.heroList[i].Level);
                        RPG.extend(mainTeam.heroList[i], saveData.heroList[i]);
                    }
                    if(saveData.tankList && saveData.tankList.length>0){
                        mainTeam.tankList = saveData.tankList;
                        mainTeam.inTank = true;
                        // for (let i = 0; i < saveData.tankList.length; i++) {
                        //     mainTeam.addTank(saveData.tankList[i].id, saveData.tankList[i].Level);
                        //     RPG.extend(mainTeam.tankList[i], saveData.tankList[i]);
                        // }
                    }
                    if(saveData.unuseTankList  && saveData.unuseTankList.length>0){
                        mainTeam.unuseTankList = saveData.unuseTankList;
                        // for (let i = 0; i < saveData.unuseTankList.length; i++) {
                        //     mainTeam.unuseTankList[i] = saveData.unuseTankList[i];
                        // }
                    }
                    socket.wlSend('netTeam', {jobId:Lib.userInfo.jobId, lv:Lib.userInfo.level,name:playerName});
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

let gameMsg = document.querySelector(".gameMsg"),
    gameInfo = document.querySelector(".information"),
    msgBox = document.querySelector('#box');

gameMsg.onclick = function(){
    if(this.dataset.num == 1){
        this.dataset.num = 0;
        msgBox.setAttribute('style','width:50px;height:25px');
        gameInfo.setAttribute('style','display:none');
        document.querySelector(".footBtn").setAttribute('style','display:none');
    } else {
        this.dataset.num = 1;
        msgBox.setAttribute('style','width:300px;height:316px');
        gameInfo.setAttribute('style','display:block');
        document.querySelector(".footBtn").setAttribute('style','display:block');
    }
};

document.querySelector('#send').onclick = function () {
    GameSocket.sendMsg();
};

document.querySelector('#clear').onclick = function () {
    gameInfo.innerHTML = '';
};

/*
msgBox.on("mousedown touchstart" , function (ev) {
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

msgBox.on("mouseup touchend" , function(){
    $(document).off("mousemove touchmove" , null);
});*/

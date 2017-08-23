/**
 *
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED█WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 * 客户端基础类库
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2016/12/9 初版
 *
 */


//扩展send方法
WebSocket.prototype.wlSend = function (type,content={}) {
    let s = this;
    let params = {};
    params.type = type;
    params.name = playerName;
    params.content = content;
    s.send(JSON.stringify(params));
};

function MyListChildView(i){
    let self = this;
    base(self,LListChildView,[]);
    let rand = Math.random();
    self.graphics.drawRect(1, "#000", [0, 0, 100, 30],true,rand < 0.33?"#90EE90":(rand < 0.66 ? "#F4A460":"#E6E6FA"));
    let t = new LTextField();
    t.text = "点击删除"+i;
    t.x = t.y = 5;
    self.addChild(t);
}
MyListChildView.prototype.onClick = function(event){
    event.currentTarget.deleteChildView(event.target);
};


function rand(n) {
    return (Math.random() * n) >> 0;
}

function rangeRand(min,max) {
    return (Math.random() * (max - min + 1)>>1) + min;
}

//走到触发型 场景跳转
function checkTrigger(boundary=false){
    let events = stage.triggerEvents;
    let triggerEvent;
    for(let i=0;i<events.length;i++){
        triggerEvent = events[i];
        if (triggerEvent.visible && !triggerEvent.visible()) continue;
        if (!triggerEvent.img){
            if(boundary && ( (triggerEvent.y==0) && (triggerEvent.x==0) )){
                //获取该场景脚本数据
                if (triggerEvent.action){
                    // 一旦触发事件，按键取消
                    isKeyDown= false;
                    triggerEvent.action();
                    return;
                }
            }
            if(boundary=='up' && (triggerEvent.y==0)){
                //获取该场景脚本数据
                if (triggerEvent.action){
                    // 一旦触发事件，按键取消
                    isKeyDown= false;
                    triggerEvent.action();
                    return;
                }
            }
            if(boundary=='down' && (triggerEvent.y==999)){
                //获取该场景脚本数据
                if (triggerEvent.action){
                    // 一旦触发事件，按键取消
                    isKeyDown= false;
                    triggerEvent.action();
                    return;
                }
            }
            if(boundary=='left' && (triggerEvent.x==0)){
                //获取该场景脚本数据
                if (triggerEvent.action){
                    // 一旦触发事件，按键取消
                    isKeyDown= false;
                    triggerEvent.action();
                    return;
                }
            }
            if(boundary=='right' && (triggerEvent.y==999)){
                //获取该场景脚本数据
                if (triggerEvent.action){
                    // 一旦触发事件，按键取消
                    isKeyDown= false;
                    triggerEvent.action();
                    return;
                }
            }
            if( (player.px == triggerEvent.x) && (player.py == triggerEvent.y) ){
                //获取该场景脚本数据
                if (triggerEvent.action){
                    // 一旦触发事件，按键取消
                    isKeyDown= false;
                    triggerEvent.action();
                    return;
                }
            }
        }
    }
}
/**
 * 检测NPC碰撞触发型事件
 */
function checkTouch(){
    // 仅在地图状态下可以触发
    if (!RPG.checkState(RPG.MAP_CONTROL)) return;
    let actionEvent, npc;
    for(let key in charaLayer.childList){
        npc = charaLayer.childList[key];
        console.log('npc',npc.px,npc.py);
        //不可见的不处理
        if (!npc.visible) continue;
        if (npc.touch){
            //判断周围有npc
            actionEvent = npc.rpgEvent;
            if( player.px >= npc.px - 1 &&
                player.px <= npc.px + 1 &&
                player.py >= npc.py - 1 &&
                player.py <= npc.py + 1 ){
                //获取该场景脚本数据
                if (actionEvent){
                    //朝向玩家
                    npc.anime.setAction(3 - player.direction);
                    npc.anime.onframe();
                    // 一旦触发事件，按键取消
                    isKeyDown= false;
                    actionEvent(npc);
                    return;
                }
            }
        }
    }
}

/**
 * 检测自动触发型事件
 */
function checkAuto(){
    let events = stage.autoEvents;
    let autoEvent;
    for(let i=0;i<events.length;i++){
        autoEvent = events[i];
        if (autoEvent.type==="auto"){
            if (autoEvent.visible && autoEvent.visible()){
                if (autoEvent.action){
                    Talk.setTalkPos("middle");
                    // 一旦触发事件，按键取消
                    isKeyDown= false;
                    autoEvent.action();
                    Talk.setTalkPos("bottom");
                    return;
                }
            }
        }
    }
}

/**
 * 检测战斗事件
 */
function checkIntoBattle(){
    if(RPG.checkState(RPG.FIGHT_RESULT)) return;
    if(RPG.fight && player.tmp >= player.enemyShow){
        if (rangeRand(0,9)>2){
            RPG.pushState(RPG.FIGHT_RESULT);
            Lib.bgm('StartBattle');
            let Level = mainTeam.heroList[0].Level;
            let len = EnemyList.length;
            let arrLen = rangeRand(1,4),arr = [];
            for (let i = 0; i < arrLen; i++) {
                arr.push(rangeRand(1,len));
            }
            RPG.flickerAnimation(Fight.normalFight,arr,Level-10);
        }
        player.tmp = 0;
    }
}

let jumpStage = function(x, y, dir=0){
    Lib.bgm('JumpStage');
    stage.autoEvents = [];
    stage.triggerEvents = [];
    stage.npcEvents = [];
    stage.tankEvents = [];
    stage.storyList = {};
    //当前场景地图
    CurrentMap = stage.map;
    let len = stage.events.length,
        events = stage.events;
    charaLayer.removeAllChild();
    if(mainTeam.unuseTankList.length>0){
        let tank = mainTeam.unuseTankList[0];
        if(tank.stageId == stage.id){
            let dir = Number(tank.dir);
            let bitmapData = new LBitmapData(assets[tank.movePic],dir*24,0,24,24);
            let bitmap = new LBitmap(bitmapData);
            bitmap.x = tank.px*STEP;
            bitmap.y = tank.py*STEP;
            mainTeam.unuseTankList[0].chara = charaLayer.addChild(bitmap);
        }
    }

    for(let i=0;i<len;i++){
        if(events[i].action){
            events[i].action = eval(events[i].action);
        }
        if(events[i].visible){
            events[i].visible = eval(events[i].visible);
        }
        if(events[i].img){
            let arr = events[i].img.split('/');
            if(arr.length>1){
                events[i].img = arr.pop();
            }
        }
        switch (events[i].type){
            case 'auto':
                stage.autoEvents.push(events[i]);
                break;
            case 'tank':
                let tank = events[i];
                if(tank.visible && tank.visible()){
                    let dir = Number(tank.dir);
                    let bitmapData = new LBitmapData(assets[tank.img],dir*24,0,24,24);
                    let bitmap = new LBitmap(bitmapData);
                    bitmap.x = tank.x*STEP;
                    bitmap.y = tank.y*STEP;
                    tank.chara = charaLayer.addChild(bitmap);
                    stage.tankEvents.push(tank);
                }
                break;
            case 'jump':
                stage.triggerEvents.push(events[i]);
                break;
            case 'touch':
            case 'item':
            case 'box':
            case 'npc':
                addNpc(events[i]);
                break;
        }
    }
    //初始化一些设置
    initScript(Number(x), Number(y), Number(dir));
};

let loadStage = function () {

};

function drawImgMap(map) {
    //得到地图图层
    let bitmapData = new LBitmapData(assets[stage.fileName+'_0']);
    let bitmapDataUp = new LBitmapData(assets[stage.fileName+'_1']);
    let bitmap = new LBitmap(bitmapData);
    let bitmapUp = new LBitmap(bitmapDataUp);
    let len = map.layers.length;
    CurrentMapEvents = map.layers[len-1];
    // 行动控制层
    CurrentMapMove = map.layers[len-2];
    mapLayer.removeAllChild();
    upLayer.removeAllChild();
    upLayer.addChild(bitmapUp);
    mapLayer.addChild(bitmap);
}

function setHero(x, y, dir){
    if (x === null) return;
    let hero,
        heroImg;
    // 把玩家置于屏幕的正中
    Lib.setCamera(x,y);

    let row = mainTeam.getHero().row || 4;
    let col = mainTeam.getHero().col || 4;
    heroImg = mainTeam.getHero().movePic;
    let imgData = new LBitmapData(assets[heroImg]);
    hero = new Character(true, 0, imgData, row, col);
    hero.inTank = false;
    hero.name = mainTeam.getHero().nickName;
    let text = UI.simpleText(hero.name,10);
    text.width = text.getWidth()>>0;
    text.x = ((STEP - text.getWidth())>>1);
    text.y = -(text.getHeight()>>0)-5;
    hero.addChild(text);
    hero.text = text;
    player = hero;
    player.img = heroImg;
    //玩家遇敌率
    player.enemyShow = 5;
    player.tmp = 0;
    hero.x = x * STEP- ((hero.pw- STEP)>>1);
    hero.y = y * STEP- (hero.ph- STEP);
    hero.px = x;
    hero.py = y;
    charaLayer.addChild(hero);
    player.direction = dir;
    hero.anime.setAction(dir);
    hero.anime.onframe();
    netPlayer[hero.name] = player;
}

//添加人物
function addNpc(npcObj){
    let npc,valid;
    //加入npcObj
    if (npcObj.img){
        if (!npcObj.visible){
            // 未定义必然可见
            valid= true;
        } else {
            valid= npcObj.visible();
        }
        if (valid){
            let row= npcObj.row || 4;
            let col= npcObj.col || 4;
            let imgData = new LBitmapData(assets[npcObj.img]);
            npc = new Character(false,npcObj.move,imgData, row, col, 3, npcObj.action);
            npc.x = npcObj.x * STEP- (npc.pw- STEP)/2;
            npc.y = npcObj.y * STEP- (npc.ph- STEP);
            npc.px = Number(npcObj.x);
            npc.py = Number(npcObj.y);
            if(npcObj.type === 'player'){
                npc.name = npcObj.name;
                npc.netType = 1;
                let text = UI.simpleText(npc.name,10);
                text.width = text.getWidth()>>0;
                text.x = ((STEP - text.getWidth())>>1);
                text.y = -(text.getHeight()>>0)-5;
                text.name = 'nickNameText';
                npc.addChild(text);
                netPlayer[npcObj['name']] = npc;
            }else{
                npc.name = npcObj.img;
            }
            //碰撞型事件
            if (npcObj.type === "touch") npc.touch= true;
            // 预设动作
            if (npcObj.preSet) npcObj.preSet(npc);
            // 如果是情节人物，则进入情节列表
            if (npcObj.story){

                stage.storyList[npcObj.story] = npc;
                npc.visible = false;
            }
            if('dir' in npcObj){
                npc.anime.setAction(Number(npcObj.dir));
                npc.anime.onframe();
            }
            charaLayer.addChild(npc);
        }
    }
}

//移动NPC
let moveNpc = function(npc, stepArr ,callback){
    npc.moveMode = 2;
    npc.stepArray = stepArr;
    if (npc.stepArray.length> 0){
        npc.callback = callback;
        npc.changeDir(npc.stepArray[0]);
    }
};

let moveNetNpc = function(name, content ,callback){
    if(name===playerName) return;
    let npc = netPlayer[name];
    if(npc.px !== content.x || npc.py !== content.y){
        npc.setCoordinate(content.x,content.y,content.dir);
    }
    npc.moveMode = 3;
    npc.changeDir(content.dir);


};
let Lib = {
    userInfo:null,

    setCamera:(x,y)=>{
        if (x === null) return;
        let w1= (WIDTH/STEP)>>1,
            h1= (HEIGHT/STEP)>>1,
            w2= Math.ceil(WIDTH/ STEP/ 2),
            h2= Math.ceil(HEIGHT/ STEP/ 2),
            moveX=0,
            moveY=0;
        // 把玩家置于屏幕的正中
        if (CurrentMap.width< w1+ w2) {
            moveX= (CurrentMap.width- w2- w1)>>1;
        } else {
            if (x< w1){
                moveX= 0;
            } else if (x>= CurrentMap.width- w1) {
                moveX= CurrentMap.width- w2- w1;
            } else {
                moveX= x- w1;
            }
        }
        if (CurrentMap.height< h1+ h2) {
            moveY= (CurrentMap.height- h2- h1)>>1;
        } else {
            if (y< h1){
                moveY= 0;
            } else if (y>= CurrentMap.height- h1){
                moveY= CurrentMap.height- h2- h1;
            } else {
                moveY= y- h1;
            }
        }
        mapLayer.x= -moveX* STEP;
        mapLayer.y= -moveY* STEP;
        upLayer.x= -moveX* STEP;
        upLayer.y= -moveY* STEP;
        charaLayer.x= -moveX* STEP;
        charaLayer.y= -moveY* STEP;
    },
    /**
     * 重排角色，以便正确遮盖
     * */
    resetChildIndex:(layer)=>{
        // 排序以脚为准
        let y1, y2, h1, h2;
        for (let i=0; i< layer.childList.length; i++){
            h1= charaLayer.childList[i].ph;
            if (!h1) {
                h1= charaLayer.childList[i].height+ 1;
            }
            y1= charaLayer.childList[i].y+ h1;
            for (let j= i+ 1; j< layer.childList.length; j++){
                h2= charaLayer.childList[j].ph;
                if (!h2) {
                    h2= charaLayer.childList[j].height+ STEP;
                }
                y2= charaLayer.childList[j].y+ h2;
                if (y1> y2) {
                    charaLayer.setChildIndex(charaLayer.childList[j], i);
                    y1= y2;
                }
            }
        }
    },
    showInfo:(text)=>{
        if (text) {
            let content = "<li>" + text + "</li>" + $('.information').html();
            $('.information').html(content);
        }
    },

    bgm:function(sound,loop=false,volume=0.6){
        RPG.curBGM = sound;
        sound = assets[sound];
        let obj = new LSound(sound);
        obj.setVolume(volume);
        if (loop) {
            if(RPG.curBGMObj){
                RPG.curBGMObj.close();
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                obj.play(0,99);
            },2000);
            RPG.curBGMObj = obj;
        }else {
            obj.setVolume(1.0);
            obj.play();
        }
    },
    login:function () {
        playerName = prompt("游戏昵称","");
        // let pwd = prompt("注册时的密码","");
        if(playerName){
            GameSocket.onLink(playerName);
        }else{
            playerName = false;
            return false;
        }
    },
    //计算地图坐标
    gridPos:function (x,y) {
        let px = ((x-mapLayer.x)/STEP)>>0;
        let py = ((y-mapLayer.y)/STEP)>>0;
        return [px,py];
    },

};

let UI = {

    msgBox :function (obj) {
        let titleBar = UI.drawColorWindow(false,0,0,HEIGHT-2*gap,30,0.8,'#384048');
        titleBar.addEventListener(LMouseEvent.MOUSE_DOWN, onBarDown);
        let onBarDown = function (event) {
            var s = event.clickTarget.parent;
            s.bar.addEventListener(LMouseEvent.MOUSE_UP, s._onBarUp);
            s.startDrag(event.touchPointID);
        };
        UI.diyButton(0,0,HEIGHT-2*gap,30,'exit',function () {

        });

            //遮罩
            let translucent = UI.drawColorWindow(LGlobal.stage,0,0,LGlobal.width, LGlobal.height,0.8,'#002');
            //拦截所有事件
            translucent.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
            });
            translucent.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
            });
            translucent.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
            });
            translucent.addEventListener(LMouseEvent.MOUSE_OVER, function (e) {
            });
            translucent.addEventListener(LMouseEvent.MOUSE_OUT, function (e) {
            });


            // let myWindow = new LWindow(obj.width, obj.height, obj.title);
            // myWindow.x = (LGlobal.width - myWindow.getWidth())>>1;
            // myWindow.y = (LGlobal.height - myWindow.getHeight())>>1;
            // LGlobal.stage.addChild(myWindow);
            // myWindow.addEventListener(LWindow.CLOSE, function (e) {
            //     translucent.die();
            //     translucent.remove();
            // });
            // if (obj.displayObject) {
            //     myWindow.layer.addChild(obj.displayObject);
            //     return;
            // }
            let msgLabel = UI.simpleText(obj.message,obj.size);
            msgLabel.width = obj.width - 100;
            msgLabel.setWordWrap(true, obj.textHeight);
            msgLabel.x = (obj.width - msgLabel.getWidth())>>1;
            msgLabel.y = (obj.height - myWindow.bar.getHeight() - msgLabel.getHeight())>>1;
            myWindow.layer.addChild(msgLabel);

    },

    window:function() {
        function MyWindow() {
            let s = this;
            LExtends(s, LSprite, []);
            s.type = "MyWindow";
            var style;
            if (typeof arguments[0] == "object") {
                style = arguments[0];
            } else {
                style = {width: arguments[0], height: arguments[1], title: arguments[2]};
            }
            s.style = style;
            s.w = style.width;
            s.h = style.height;
            s.bar = new LSprite();
            style.header = s.bar;
            s.bar.alpha = 0.7;
            s.barColor = "#384048";
            s.bar.w = s.w;
            s.bar.h = 30;
            //画关闭按钮
            var barGrd = LGlobal.canvas.createLinearGradient(0, -s.bar.h * 0.5, 0, s.bar.h * 2);
            barGrd.addColorStop(0, "#FFFFFF");
            barGrd.addColorStop(1, s.barColor);
            s.bar.graphics.drawRoundRect(1, s.barColor, [0, 0, s.bar.w, s.bar.h, s.bar.h * 0.1], true, barGrd);

            s.addChild(s.bar);
            s.bar.addEventListener(LMouseEvent.MOUSE_DOWN, s._onBarDown);
            if (style.title && typeof style.title == "object" && style.title.type == "LTextField") {
                s.title = style.title;
            } else {
                s.title = new LTextField();
                if (style.font) {
                    s.title.font = style.font;
                }
                s.title.size = style.size ? style.size : 16;
                s.title.color = style.color ? style.color : "#eee";
                s.title.text = style.title ? style.title : "";
            }
            s.title.x = s.title.getHeight() * 0.5;
            s.title.y = (s.bar.h - s.title.getHeight()) * 0.5;
            s.bar.addChild(s.title);
            if (style.closeButton) {
                if (style.closeButton.type == "LBitmapData") {
                    var bitmapClose = new LBitmap(style.closeButton);
                    var closeButton = new LSprite();
                    closeButton.addChild(bitmapClose);
                    s.closeObj = closeButton;
                } else {
                    s.closeObj = style.closeButton;
                }
                s.closeObj.x = s.w - s.closeObj.getWidth();
            } else {
                s.closeObj = new LSprite();
                style.closeButton = s.closeObj;
                s.closeObj.w = 50;
                s.closeObj.h = 25;
                s.closeObj.x = s.w - s.closeObj.w;
                var closeGrd = LGlobal.canvas.createLinearGradient(0, -s.closeObj.h * 0.5, 0, s.closeObj.h * 2);
                closeGrd.addColorStop(0, "#FFFFFF");
                closeGrd.addColorStop(1, "#800000");
                s.closeObj.graphics.drawRoundRect(1, "#800000", [0, 0, s.closeObj.w, s.closeObj.h, s.closeObj.h * 0.1], true, '#000020');
                s.closeObj.graphics.drawLine(4, "#FFFFFF", [15, 5, s.closeObj.w - 15, s.closeObj.h - 5]);
                s.closeObj.graphics.drawLine(4, "#FFFFFF", [15, s.closeObj.h - 5, s.closeObj.w - 15, 5]);
            }
            s.addChild(s.closeObj);
            s.closeObj.addEventListener(LMouseEvent.MOUSE_UP, s._onClose);
            s.layer = new LSprite();
            s.layer.y = s.bar.h;

            s.layerColor = "#002";
            s.layer.h = s.h - s.bar.h;
            style.background = UI.drawColorWindow(s,0,s.bar.h,s.w, s.layer.h,0.9,'#002');
            s.addChild(s.layer);
            let g = new LGraphics();
            g.rect(0, 0, s.w, s.layer.h);
            s.layer.mask = g;
            s.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
            });
            s.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
            });
            s.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
            });
            s.addEventListener(LMouseEvent.MOUSE_OVER, function (e) {
            });
            s.addEventListener(LMouseEvent.MOUSE_OUT, function (e) {
            });
        }

        MyWindow.CLOSE = "close";
        MyWindow.prototype._onClose = function (event) {
            event.clickTarget.parent.close();
        };
        MyWindow.prototype.close = function () {
            var s = this;
            s.dispatchEvent(MyWindow.CLOSE);
            s.parent.removeChild(s);
        };
        MyWindow.prototype._onBarDown = function (event) {
            var s = event.clickTarget.parent;
            s.bar.addEventListener(LMouseEvent.MOUSE_UP, s._onBarUp);
            s.startDrag(event.touchPointID);
        };
        MyWindow.prototype._onBarUp = function (event) {
            var s = event.clickTarget.parent;
            s.stopDrag();
            s.bar.removeEventListener(LMouseEvent.MOUSE_UP, s._onBarUp);
        };
        return MyWindow;

},
    contentWindow:function () {
        let myWindow = new LWindow({width: WIDTH, height: HEIGHT, title: "登录注册"});
        myWindow.x = 0;
        myWindow.y = 0;
        infoLayer.addChild(myWindow);

        let nameLabel = UI.simpleText("用户名：");
        nameLabel.x = 80;
        nameLabel.y = 70;
        myWindow.layer.addChild(nameLabel);
        let name = new LTextField();
        name.x = 150;
        name.y = 70;
        name.setWordWrap(true);
        name.setType(LTextFieldType.INPUT);
        myWindow.layer.addChild(name);
        name.focus();
        let passLabel = UI.simpleText("密码：");
        passLabel.x = 80;
        passLabel.y = 110;
        myWindow.layer.addChild(passLabel);
        let pass = new LTextField();
        pass.x = 150;
        pass.y = 110;
        pass.displayAsPassword = true;
        pass.setType(LTextFieldType.INPUT);
        myWindow.layer.addChild(pass);

        let button01 = UI.diyButton(0,0,100,150,"登录",function () {
            UI.msgBox({
                title: "消息",
                message: "点击了登陆按钮"
            });
            GameSocket.onLink();

        },20);
        myWindow.layer.addChild(button01);
        // button01.addEventListener(LMouseEvent.MOUSE_UP, );
        let button02 = UI.diyButton(0,0,200,150,"注册",false,20);
        myWindow.layer.addChild(button02);
    },

    /**
     * 纯色背景
     */
    drawColorWindow:(layer=false, x, y, w, h, alpha=0.9,color='#000')=>{
        let colorWindow = new LSprite();
        colorWindow.graphics.drawRect(0,'#000',[0,0,w,h],true,color);
        colorWindow.x = x;
        colorWindow.y = y;
        colorWindow.alpha = alpha;
        if (layer) layer.addChild(colorWindow);
        return colorWindow;
    },
    /**
     * 纯色图片背景
     */
    drawImgColor: function(layer, x, y, w, h) {
        let bitmapData = new LBitmapData(assets["focus"]);
        let bitmap = new LBitmap(bitmapData);
        bitmap.scaleX = w/ bitmap.width;
        bitmap.scaleY = h/ bitmap.height;
        bitmap.x = x;
        bitmap.y = y;
        bitmap.alpha = 0.5;
        layer.addChild(bitmap);
        return bitmap;
    },
    /**
     * 纯色背景带边框
     */
    drawBorderWindow:(layer=false, x, y, w, h, alpha=0.9)=> {
        let talkWindow = new LSprite();
        talkWindow.graphics.drawRect(4, '#384048', [0, 0, w, h], true, '#000020');
        talkWindow.x = x;
        talkWindow.y = y;
        talkWindow.alpha = alpha;
        if (layer) layer.addChild(talkWindow);
        return talkWindow;
    },

    /**
     * 边框绘制
     */
    drawBorder:(layer=false,color='#ffe',x=0, y=0, w=1, h=1,linW=2,alpha=0.9)=>{
        let rectBorder = new LSprite();
        rectBorder.graphics.drawRect(linW,color,[0,0,w,h]);
        rectBorder.x = x;
        rectBorder.y = y;
        rectBorder.alpha = alpha;
        if(layer) layer.addChild(rectBorder);
        return rectBorder;
    },


    /**
     * 对话文本，会自动折行
     */
    text:(text,x,y,size=14,color='#fff')=>{
        let textObj = new LTextField();
        if (text) textObj.setWordWrap(true,20);
        textObj.width = menuWidth-2*gap;
        textObj.x = x;
        textObj.y = y;
        textObj.size = size;
        textObj.color = color;
        textObj.text = text;
        return textObj;
    },
    /**
     * 普通文本
     */
    simpleText:(text,size=14,color='#eee',x=0,y=0)=>{
        let textObj = new LTextField();
        // textObj.setWordWrap(true,20);
        // textObj.width = menuWidth-2*gap;
        textObj.text = text;
        textObj.size = size;
        textObj.color = color;
        if(x){
            textObj.x = x;
            textObj.y = y;
        }
        return textObj;
    },

    /**
     * 文本
     */
    textScorll:(layer,text,x,y,size='14',color='#fff')=>{
            let t = document.getElementById("gameInfo"), i;
            if (text.length > 0 && t === null) {
                let d = document.createElement("DIV");
                d.position=0;
                d.style.position = "absolute";
                document.body.appendChild(d);
                t = document.createElement("TEXTAREA");
                t.id = "gameInfo";
                t.style.width = (window.innerWidth*0.5) + "px";
                t.style.height = "200px";
                let b = document.createElement("BUTTON");
                b.style.width = (window.innerWidth*0.25) + "px";
                b.innerHTML="Hide";
                d.appendChild(b);
                LEvent.addEventListener(b,LGlobal.mobile ? "touchstart":"click", function(e){
                    t.style.display = (t.style.display == "none" ? "":"none");
                });
                b = document.createElement("BUTTON");
                b.style.width = (window.innerWidth*0.25) + "px";
                b.innerHTML="position";
                d.appendChild(b);
                let f = function(e){
                    d.position++;
                    if(d.position == 0){
                        d.style.top = "5px";
                        d.style.left = "5px";
                    }else if(d.position == 1){
                        d.style.top = (window.innerHeight - 20 - parseInt(t.style.height)) + "px";
                        d.style.left = "5px";
                    }else if(d.position == 2){
                        d.style.top = "5px";
                        d.style.left = (window.innerWidth - parseInt(t.style.width)) + "px";
                    }else{
                        d.style.top = (window.innerHeight - 20 - parseInt(t.style.height)) + "px";
                        d.style.left = (window.innerWidth - parseInt(t.style.width)) + "px";
                        d.position = -1;
                    }
                };
                f();
                LEvent.addEventListener(b,LGlobal.mobile ? "touchstart":"click", f);
                d.appendChild(document.createElement("BR"));
                d.appendChild(t);
            }
            for (i = 0; i < text.length; i++) {
                t.value = t.value + text[i] + "\r\n";
                t.scrollTop = t.scrollHeight;
            }
    },

    /**
     * 物品icon
     */
    icon:(layer,item,x,y)=>{
        let bitmapData = new LBitmapData(assets["iconset"], ItemList[item.index].pic.x*RPG.iconStep, ItemList[item.index].pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
        let bitmap = new LBitmap(bitmapData);
        bitmap.x= x;
        bitmap.y= y;
        layer.addChild(bitmap);
    },

    // 显示获得物品
    showGetItem:(id, num)=>{
        let showWinow = UI.drawBorderWindow(effectLayer,0,HEIGHT>>1,WIDTH, 40);
        let item1 = ItemList[id-1];
        // 图片
        // bitmapData = new LBitmapData(assets["iconset"], item1.pic.x*RPG.iconStep, item1.pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep),
        // bitmap = new LBitmap(bitmapData);
        // bitmap.x= gap* 2;
        // bitmap.y= gap;
        // effectLayer.addChild (bitmap);
        // 物品名称
        let text = UI.simpleText(item1.name+'         *'+num,18);
        text.x = (WIDTH - text.getWidth())>>1;
        text.y = gap;
        showWinow.addChild(text);

        setTimeout(function(){
            effectLayer.removeAllChild();
        }, 2000);
    },
    // 显示获得物品
    showInfo:(text)=>{
        let obj = UI.simpleText(text,18);
        obj.setWordWrap(true,20);
        obj.width = menuWidth-2*gap;
        obj.x = gap;
        obj.y = gap;
        let h = obj.getHeight()+2*gap,
            w = obj.getWidth()+2*gap;
        let x = (WIDTH - w)>>1;
        let showWinow = UI.drawBorderWindow(infoLayer,x,HEIGHT>>1,w, h);
        showWinow.addChild(obj);
        setTimeout(function(){
            infoLayer.removeAllChild();
        }, 2000);
    },

    showImg:(img,callback)=>{
        let bitmapData = new LBitmapData(assets[img]);
        let bitmap = new LBitmap(bitmapData);
        bitmap.x = (WIDTH-bitmap.getWidth())>>1;
        bitmap.y = (HEIGHT-bitmap.getHeight())>>1;
        infoLayer.addChild(bitmap);
        setTimeout(function () {
            infoLayer.removeAllChild();
            if(callback) callback();
        },3000)
    },

    changeDress:(npc,img)=>{
        npc.lastBitmapData = npc.anime.childList[0].bitmapData.clone();
        if(mainTeam.inTank){
            mainTeam.heroList[0].tankMovePic = mainTeam.heroList[0].movePic;
            mainTeam.heroList[0].tankFightPic = mainTeam.heroList[0].fightPic;
        } else {
            mainTeam.heroList[0].charaMovePic = mainTeam.heroList[0].movePic;
            mainTeam.heroList[0].charaFightPic = mainTeam.heroList[0].fightPic;
        }
        mainTeam.heroList[0].movePic = img;
        mainTeam.heroList[0].fightPic = img;
        for (let i = 0; i < mainTeam.heroList.length; i++) {
            let hero = mainTeam.heroList[i];
            hero.inTank = true;
        }
        npc.anime.childList[0].bitmapData = new LBitmapData(assets[img]);
        npc.anime.onframe();
    },

    /**
     * diy按钮 简单的边框+文字组成
     **/
    diyButton : (w,h,x,y,text,callback=false,size=12)=>{
        //绘制文本
        let title = UI.simpleText(text,size);
        //绘制边框
        if(!w){
            w = title.getWidth()+gap;
            h = title.getHeight()+gap;
        }
        let upState = UI.drawBorder(false,'#384048',x,y,w,h);
        title.x = ((upState.getWidth() - title.getWidth())>>1);
        title.y = ((upState.getHeight() - title.getHeight())>>1);
        upState.addChild(title);

        let downState = upState.clone();
        downState.scaleX = 0.8;
        downState.scaleY = 0.8;

        let button01 = new LButton(upState,null,downState);
        button01.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
            RPG.currentButton = button01;
        });
        button01.addEventListener(LMouseEvent.MOUSE_UP, function () {
            if (RPG.currentButton === button01) {
                Lib.bgm('按钮');
                if (callback) callback();
            }
        });
        return button01;
    },

    /**
     * diy按钮 简单的边框+文字组成
     **/
    simpleButton : (x,y,w,h,text,callback=false,size=14)=>{
        //绘制文本
        let title = UI.simpleText(text);
        //绘制边框
        let upState = UI.drawBorder(false,'#384048',x,y,w,h);
        title.x = ((upState.getWidth() - title.getWidth())>>1);
        title.y = ((upState.getHeight() - title.getHeight())>>1);
        upState.addChild(title);

        let downState = upState.clone();
        downState.scaleX = 0.8;
        downState.scaleY = 0.8;

        let button01 = new LButton(upState,null,downState);
        button01.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
            RPG.currentButton = button01;
        });
        button01.addEventListener(LMouseEvent.MOUSE_UP, function () {
            if (RPG.currentButton === button01) {
                if (callback) callback();
            }
        });
        return button01;
    },

    /**
     * 图片背景按钮
     */
    imgButton : ()=>{
        let bitmapDataUp = new LBitmapData(assets["ok_button"],0,0,98,48);
        let bitmapUp = new LBitmap(bitmapDataUp);
        let bitmapDataOver = new LBitmapData(assets["ok_button"],0,48,98,48);
        let bitmapOver = new LBitmap(bitmapDataOver);
        bitmapUp.scaleX = 0.5;
        bitmapOver.scaleX = 0.5;
        let button = new LButton(bitmapUp,bitmapOver);
        button.x = 50;
        button.y = 150;
        return button;
    },

    /**
     * 游戏标题按钮
     */
    gameTitleButton:(w,h,x,y,text,callback)=>{
        let button01 = new LButtonSample1(text,14,null,'#000');
        button01.backgroundColor = '#eee';
        button01.x = x;
        button01.y = y;
        button01.width = w;
        button01.height = h;

        button01.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
            RPG.currentButton = button01;
        });
        button01.addEventListener(LMouseEvent.MOUSE_UP, function () {
            if (RPG.currentButton === button01) {
                if (callback) callback();
            }
        });
        return button01;
    },
    /**
     * 战斗按钮
     */
    fightButton:(x,y,text,callback)=>{
        let button01 = new LButtonSample1(text,null,null,'#000');
        button01.backgroundColor = '#eee';
        button01.scaleX = 0.8;
        button01.scaleY = 0.8;
        button01.x = x;
        button01.y = y;
        button01.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
            RPG.currentButton = button01;
        });
        button01.addEventListener(LMouseEvent.MOUSE_UP, function () {
            if (RPG.currentButton === button01) {
                if (callback) callback();
            }
        });
        return button01;
    },

    /**
     * option白底按钮
     **/
    optionButton: function(aw, ah, ax, ay, aText, aFunc) {
        let bitmapDataUp = new LBitmapData(assets["focus"]);
        let bitmapUp = new LBitmap(bitmapDataUp);
        bitmapUp.scaleX= aw/ bitmapUp.width;
        bitmapUp.scaleY= ah/ bitmapUp.height;
        bitmapUp.alpha= 0.2;
        // let bitmapDataDown = new LBitmapData(assets["focus"]);
        // let bitmapDown = new LBitmap(bitmapDataDown);
        // bitmapDown.scaleX= aw/ bitmapDown.width;
        // bitmapDown.scaleY= ah/ bitmapDown.height;
        let bitmapDown = bitmapUp.clone();
        bitmapDown.alpha= 0.5;
        // 保持进度的按钮
        let button02 = new LButton(bitmapUp,bitmapDown,bitmapDown);
        button02.x= ax;
        button02.y= ay;
        let text = UI.text(aText,button02.getWidth()/ 2,button02.getHeight()/ 2);
        text.textAlign= "center";
        text.textBaseline= "middle";
        button02.addChild(text);
        button02.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
            RPG.currentButton= button02;
        });
        button02.addEventListener(LMouseEvent.MOUSE_UP, function () {
            if (RPG.currentButton=== button02) {
                if (aFunc) aFunc();
            }
        });
        return button02;
    },

};

/**
 * 根据对外分发的URL来动态设置渠道
 */
function getChannelFromUrl() {
    let source = ['wechat', 'qq', 'weibo', 'uc'];
    let url = location.href;
    for (let i = 0; i < source.length; i += 1) {
        if (url.indexOf('channel=' + source[i]) > -1) {
            return source[i]
        }
    }
    return ''
}

function getAccountId() {
    // 获取登录用户帐号
    return ''
}
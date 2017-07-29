/**
 *
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED█WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 * 客户端基础类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2016/12/9 初版
 *
 */
//扩展send方法
WebSocket.prototype.wlSend = function (type,params) {
    let s = this;
    params = params || {};
    params.type = type;
    params.name = selfName;
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
function checkTrigger(){
    let events = stage.triggerEvents;
    let triggerEvent;
    for(let i=0;i<events.length;i++){
        triggerEvent = events[i];
        if (!triggerEvent.img){
            if( (player.px === triggerEvent.x) && (player.py === triggerEvent.y) ){
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
        //不可见的不处理
        if (!charaLayer.childList[key].visible) continue;
        //判断周围有npc
        actionEvent = charaLayer.childList[key].rpgEvent;
        if (charaLayer.childList[key].touch){
            npc = charaLayer.childList[key];

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
            // if (autoEvent.visible && autoEvent.visible()){
                if (autoEvent.action){
                    // 一旦触发事件，按键取消
                    isKeyDown= false;
                    autoEvent.action();
                    return;
                }
            // }
        }
    }
}

/**
 * 检测战斗事件
 */
function checkIntoBattle(){
    //Fight.simpleFight(1);
    // if(player.tmp >= player.enemyShow){
    //     if (rangeRand(0,9)>2){
    //         Fight.simpleFight(4);
    //     }
    //     player.tmp = 0;
    // }
}

let jumpStage = function(newStage, x, y, dir=0){
    stage = newStage;
    stage.autoEvents = [];
    stage.triggerEvents = [];
    stage.npcEvents = [];
    //当前场景地图
    CurrentMap = stage.map;
    CurrentMapImg = stage.imgName;
    let len = stage.events.length,
        events = stage.events;
    for(let i=0;i<len;i++){
        switch (events[i].type){
            case 'auto':
                stage.autoEvents.push(events[i]);
                break;
            case 'jump':
                stage.triggerEvents.push(events[i]);
                break;
            case 'touch':
            case 'item':
            case 'box':
            case 'npc':
                // stage.npcEvents.push(events[i]);
                addNpc(events[i]);
                break;
        }
    }

    //初始化一些设置
    initScript(x, y, dir);
};

let Lib = {
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
};




let UI = {

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
        talkWindow.graphics.drawRect(5, '#384048', [0, 0, w, h], true, '#000020');
        talkWindow.x = x;
        talkWindow.y = y;
        talkWindow.alpha = alpha;
        if (layer) layer.addChild(talkWindow);
        return talkWindow;
    },

    /**
     * 边框绘制
     */
    drawBorder:(layer,color='#ffe',x=0, y=0, w, h,linW=2,alpha=0.9)=>{
        let rectBorder = new LSprite();
        rectBorder.graphics.drawRect(linW,color,[0,0,w,h]);
        rectBorder.x = x;
        rectBorder.y = y;
        rectBorder.alpha = alpha;
        layer.addChild(rectBorder);
        return rectBorder;
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
        let button01 = new LButtonSample1(text,null,null,'#000');
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
        let bitmapDataDown = new LBitmapData(assets["focus"]);
        let bitmapDown = new LBitmap(bitmapDataDown);
        bitmapDown.scaleX= aw/ bitmapDown.width;
        bitmapDown.scaleY= ah/ bitmapDown.height;
        bitmapDown.alpha= 0.5;
        // 保持进度的按钮
        let button02 = new LButton(bitmapUp,bitmapDown,bitmapDown);
        button02.x= ax;
        button02.y= ay;
        let text = new LTextField();
        text.size = "15";
        text.color = "#FFF";
        text.text = aText;
        text.textAlign= "center";
        text.textBaseline= "middle";
        //text.x = bitmapUp.scaleX* bitmapUp.width/ 2;
        //text.y = bitmapUp.scaleY* bitmapUp.height/ 2;
        text.x = button02.getWidth()/ 2;
        text.y = button02.getHeight()/ 2;
        button02.addChild(text);
        button02.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
            RPG.currentButton= button02;
        });
        button02.addEventListener(LMouseEvent.MOUSE_UP, function () {
            if (RPG.currentButton== button02) {
                if (aFunc) aFunc();
            }
        });
        return button02;
    },

    /**
     * 文本
     */
    text:(text,x,y,size='14',color='#fff')=>{
        let textObj = new LTextField();
        textObj.x = x;
        textObj.y = y;
        textObj.size = size;
        textObj.color = color;
        textObj.text = text;
        if (text) textObj.setWordWrap(true,18);
        textObj.width = menuWidth-2*gap;
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
        UI.drawBorderWindow(effectLayer,0,0,WIDTH, 40);
        let item1 = ItemList[id];
        // 图片
        // bitmapData = new LBitmapData(assets["iconset"], item1.pic.x*RPG.iconStep, item1.pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep),
        // bitmap = new LBitmap(bitmapData);
        // bitmap.x= gap* 2;
        // bitmap.y= gap;
        // effectLayer.addChild (bitmap);
        // 物品名称
        let text = UI.text(item1.name,gap* 2+ 30,gap+ 5);
        effectLayer.addChild(text);
        // 物品数量
        let numText = text.clone();
        numText.x = 180;
        numText.text = num;
        effectLayer.addChild(numText);
        setTimeout(function(){
            effectLayer.removeAllChild();
        }, 1000);
    },
    /**
     * diy按钮
     **/
    diyButton : (x, y, text, callback,scale=1.5)=>{
        let title;
        let upState = new LPanel("#ccc");
        title = new LTextField();
        title.text = text;
        title.size = 20;
        text.textAlign= "center";
        text.textBaseline= "middle";
        title.x = (upState.getWidth() - title.getWidth())*0.5;
        title.y = (upState.getHeight() - title.getHeight())*0.5;
        upState.addChild(title);
        let downState = new LPanel("#eee");
        downState.addChild(title);
        // downState.scaleX=scale;
        // downState.scaleY=scale;
        // upState.scaleX=scale;
        // upState.scaleY=scale;

        let button01 = new LButton(upState,null,downState);
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
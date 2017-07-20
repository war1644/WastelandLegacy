/**
 *
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED█WOLF☆███▄▄▃▂
 *  ███████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * Created by 路漫漫.
 * Link: ahmerry@qq.com
 * Date: 2017/7/16 19:58
 *
 */


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
function fightBtn(x,y,text,callback) {
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
}

function gameTitleButton(w,h,x,y,text,callback) {
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
    // trace("button01 click");
}

//走到触发型
function checkTrigger(){
    let events = stage.events;
    let triggerEvent;
    for(let i=0;i<events.length;i++){
        triggerEvent = events[i];
        if (!triggerEvent.img){
            if( (player.x/STEP<<0 === triggerEvent.x) && (player.y/STEP<<0 === triggerEvent.y) ){
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
    let actionEvent, npc,ww1, ww2, hh1, hh2;
    for(let key in charaLayer.childList){
        //不可见的不处理
        if (!charaLayer.childList[key].visible) continue;
        //判断周围有npc
        actionEvent = charaLayer.childList[key].rpgEvent;
        if (charaLayer.childList[key].touch){
            npc = charaLayer.childList[key];
            // ww1= ww2= npc.getWidth()/ STEP;
            // hh1= hh2= npc.getHeight()/ STEP;
            // if (ww1> 2) {
            // 	ww1= 2;
            // 	ww2= 2;
            // }
            // if (hh1> 1) {
            // 	hh2= 1;
            // }
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
    let events = stage.events;
    let autoEvent;
    for(let i=0;i<events.length;i++){
        autoEvent = events[i];
        if (autoEvent.chara==="auto"){
            if (autoEvent.visible && autoEvent.visible()){
                if (autoEvent.action){
                    // 一旦触发事件，按键取消
                    isKeyDown= false;
                    autoEvent.action();
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
    if(player.tmp >= player.enemyShow){
        if (rangeRand(0,9)>2){
            RPG.simpleFight(rangeRand(1,5));
        }
        player.tmp = 0;
    }
}

//计算敌人的平均速度
function getEmyAverageSpeed() {
    let sumSpeed = 0;
    let len = battle.enemies.length;
    battle.enemies.forEach(function(o) {
        sumSpeed += o.speed;
    });

    return (sumSpeed / len) >> 0;
}

//是否先制攻击
function isForestall() {
    let emyAvgSpeed = getEmyAverageSpeed(battle.enemies);
    let playerSpeed = p1.getSpeed();

    if(playerSpeed >= emyAvgSpeed) {
        if(Math.random() >= 0.8) return true;
    } else {
        if(Math.random() >= 0.9) return true;
    }
    return false;
}

//是否被偷袭
function isSneak() {
    let emyAvgSpeed = getEmyAverageSpeed(battle.enemies);
    let playerSpeed = p1.getSpeed();

    if(emyAvgSpeed >= playerSpeed) {
        if(Math.random() >= 0.5) return true;
    } else {
        if(Math.random() >= 0.8) return true;
    }
    return false;
}

/**
 * 纯色背景框
 */
function drawColorWindow(layer, x, y, w, h, alpha=0.9,color='#000') {
    let colorWindow = new LSprite();
    colorWindow.graphics.drawRect(0,'#000',[0,0,w,h],true,color);
    colorWindow.x = x;
    colorWindow.y = y;
    colorWindow.alpha = alpha;
    layer.addChild(colorWindow);
    return colorWindow;
}

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
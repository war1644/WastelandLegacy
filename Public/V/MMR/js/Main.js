/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 客户端入口，初始参数，方法，主循环等
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/07/29 初版
 */

window._requestAF = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000/30);
        };
})();

LGlobal.aspectRatio = LANDSCAPE;//提示只支持横屏
window.onload = function(){
    LInit(window._requestAF,"mylegend",WIDTH,HEIGHT,main);
};

const
    // 瓦片大小
	STEP = 24,
    //方向变量
    DOWN = 0,
    LEFT = 1,
    RIGHT = 2,
    UP = 3,
    //间隙
    gap = 10,
    VER = 'V20170824.1',
    //根目录
    API = 'http://zregs.com/',
    //资源根目录
    API_RESOURCE = './Asset/',
    //地图
    API_MAP = API_RESOURCE+'地图/',
    WS_HOST = 'zregs.com';

let
    //游戏初始宽
	WIDTH= 480,
    sound={},
    sound2={},
audioContext,
	tempLength= 0;
if (window.innerHeight>=window.innerWidth){
    tempLength= window.innerWidth* WIDTH/window.innerHeight;
} else {
    tempLength= window.innerHeight* WIDTH/window.innerWidth;
}
let tempCells= (tempLength/ STEP)>>0;
let HEIGHT= tempCells* STEP;
// 高度太低没法玩
if (HEIGHT < 320) {
	HEIGHT= 320;
	tempLength= HEIGHT/window.innerHeight *window.innerWidth;
	tempCells= (tempLength/ STEP)>>0;
	WIDTH = tempCells* STEP;
}

let menuWidth = WIDTH - gap * 2,
menuHeight = HEIGHT - gap * 2;

// window.innerWidth, window.innerHeight
// init(1000/30,"mylegend",WIDTH,HEIGHT,main);

/**层变量*/
//显示进度条所用层
let loadingLayer,
//游戏底层
 	backLayer,
//地图层
 	mapLayer,
//上地图层
 	upLayer,
//人物层
 	charaLayer,
//效果层
 	effectLayer,
//对话层
 	talkLayer,
    //信息层
    infoLayer,
//控制层
 	ctrlLayer,

//点击状态
 	isKeyDown = false,
 	timer,
//地图滚动
 	mapMove = false,
//读取图片位置
 	loadIndex = 0,
//玩家
 	player,
    playerName,
    netPlayer={},
//玩家团队数据
 	mainTeam,
// 当前地图
 	CurrentMap,
    CurrentMapImg,
// 当前地图的行动控制层
 	CurrentMapMove,
	// 当前地图的事件控制层
    CurrentMapEvents,
//图片path数组
 	imgData = [],
 	stage,//当前场景
	assets;//读取完的图片数组

function main(){
	LGlobal.preventDefault = false;
    LGlobal.speed = 1000/30;

    if(LGlobal.mobile){
        LGlobal.align = LStageAlign.TOP_LEFT;
        //指定整个应用程序在指定区域中可见，且不会发生扭曲，同时保持应用程序的原始高宽比。
        LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
        LSystem.screen(LStage.FULL_SCREEN);
    }
	//准备读取资源
	//BGM SFX
    imgData = [
        {name:'NameSetting',path:API_RESOURCE+'Sound/Bgm/NameSetting.mp3'},
        {name:'无限音轨',path:API_RESOURCE+"Sound/Bgm/无限音轨.mp3"},
        {name:'TownTheme',path:API_RESOURCE+"Sound/Bgm/TownTheme.mp3"},
        {name:'Town',path:API_RESOURCE+"Sound/Bgm/Town.mp3"},
        {name:'BossFight',path:API_RESOURCE+"Sound/Bgm/BossFight.mp3"},
        {name:'BattleTheme',path:API_RESOURCE+"Sound/Bgm/BattleTheme.mp3"},
        {name:'战车恰恰悠扬激进版',path:API_RESOURCE+"Sound/Bgm/战车恰恰悠扬激进版.mp3"},
        {name:'7mm机关炮',path:API_RESOURCE+"Sound/Bgm/7mm机关炮.mp3"},
        {name:'商队',path:API_RESOURCE+"Sound/Bgm/商队.mp3"},
        {name:'消逝的过去',path:API_RESOURCE+"Sound/Bgm/消逝的过去.mp3"},
        {name:'迪加',path:API_RESOURCE+"Sound/Bgm/迪加.mp3"},
        {name:'山洞',path:API_RESOURCE+"Sound/Bgm/山洞.mp3"},
        {name:'未知荒野',path:API_RESOURCE+"Sound/Bgm/未知荒野.mp3"},
        {name:'战车恰恰',path:API_RESOURCE+"Sound/Bgm/战车恰恰.mp3"},
        {name:'流浪',path:API_RESOURCE+"Sound/Bgm/流浪.mp3"},
        {name:'道具屋',path:API_RESOURCE+"Sound/Bgm/道具屋.mp3"},

        {name:'GunAct',path:API_RESOURCE+"Sound/Sfx/GunAct.mp3"},
        {name:'boom',path:API_RESOURCE+"Sound/Sfx/boom.mp3"},
        {name:'Fail',path:API_RESOURCE+"Sound/Sfx/Fail.mp3"},
        {name:'Winning',path:API_RESOURCE+"Sound/Sfx/Winning.mp3"},
        {name:'Select',path:API_RESOURCE+"Sound/Sfx/Select.wav"},
        {name:'JumpStage',path:API_RESOURCE+"Sound/Sfx/JumpStage.wav"},
        {name:'StartBattle',path:API_RESOURCE+"Sound/Sfx/enemy.mp3"},
        {name:'获得物品',path:API_RESOURCE+"Sound/Sfx/获得物品.wav"},
        {name:'交易',path:API_RESOURCE+"Sound/Sfx/交易.wav"},
        {name:'出现',path:API_RESOURCE+"Sound/Sfx/出现.wav"},
        {name:'睡觉',path:API_RESOURCE+"Sound/Sfx/睡觉.mp3"},
        {name:'逃跑',path:API_RESOURCE+"Sound/Sfx/逃跑.wav"},
        {name:'按钮',path:API_RESOURCE+"Sound/Sfx/按钮.wav"},
        {name:'普通攻击',path:API_RESOURCE+"Sound/Sfx/普通攻击.wav"},
        {name:'普通攻击End',path:API_RESOURCE+"Sound/Sfx/普通攻击End.wav"},
        {name:'支援',path:API_RESOURCE+"Sound/Sfx/支援.mp3"},

    ];

	//js
    imgData.push({type:"js",path:"./js/GameLib.js?ver="+VER});
	imgData.push({type:"js",path:"./js/Talk.js?ver="+VER});
	imgData.push({type:"js",path:"./js/Character.js?ver="+VER});
	imgData.push({type:"js",path:"./js/Items.js?ver="+VER});
	imgData.push({type:"js",path:"./js/Hero.js?ver="+VER});
    imgData.push({type:"js",path:"./js/Tank.js?ver="+VER});
    imgData.push({type:"js",path:"./js/RPG.js?ver="+VER});
	imgData.push({type:"js",path:"./js/Menu.js?ver="+VER});
	imgData.push({type:"js",path:"./js/Team.js?ver="+VER});
    imgData.push({type:"js",path:"./js/Effect.js?ver="+VER});
    imgData.push({type:"js",path:"./js/FightMenu.js?ver="+VER});
    imgData.push({type:"js",path:"./js/Fight.js?ver="+VER});
    imgData.push({type:"js",path:"./js/Fighter.js?ver="+VER});
    imgData.push({type:"js",path:"./js/GameSocket.js?ver="+VER});

    //game other img
    imgData.push({name: "empty", path: API_RESOURCE+"事件/empty.png" });
    imgData.push({name: "箱子", path: API_RESOURCE+"事件/箱子.png" });
    imgData.push({name: "通缉令-戈麦斯", path: API_RESOURCE+"事件/通缉令-戈麦斯.png" });

	//人物行走图
    imgData.push({name:"猎人",path:API_RESOURCE+"人物行走图/猎人.png"});
    imgData.push({name:"机械师",path:API_RESOURCE+"人物行走图/机械师.png"});
    imgData.push({name:"战士",path:API_RESOURCE+"人物行走图/战士.png"});
    imgData.push({name:"护士",path:API_RESOURCE+"人物行走图/护士.png"});
    imgData.push({name:"蕾娜",path:API_RESOURCE+"人物行走图/蕾娜.png"});
	imgData.push({name:"姐姐",path:API_RESOURCE+"人物行走图/姐姐.png"});
    imgData.push({name:"老爹",path:API_RESOURCE+"人物行走图/老爹.png"});
    imgData.push({name:"重甲猎人",path:API_RESOURCE+"人物行走图/重甲猎人.png"});
    imgData.push({name:"穷猎人",path:API_RESOURCE+"人物行走图/穷猎人.png"});
    imgData.push({name:"商人妹子",path:API_RESOURCE+"人物行走图/商人妹子.png"});
    imgData.push({name:"交易员",path:API_RESOURCE+"人物行走图/交易员.png"});
    imgData.push({name:"大姐姐",path:API_RESOURCE+"人物行走图/大姐姐.png"});
    imgData.push({name:"明奇",path:API_RESOURCE+"人物行走图/明奇.png"});
    imgData.push({name:"路人",path:API_RESOURCE+"人物行走图/路人.png"});
    imgData.push({name:"士兵",path:API_RESOURCE+"人物行走图/士兵.png"});
    imgData.push({name:"喽啰move",path:API_RESOURCE+"人物行走图/喽啰.png"});

    //战车行走图
    imgData.push({name:"M1战车MMR",path:API_RESOURCE+"战车行走图/MMR/M1战车MMR.png"});
    imgData.push({name:"救护车MMR",path:API_RESOURCE+"战车行走图/MMR/救护车MMR.png"});
    imgData.push({name:"红狼战车MMR",path:API_RESOURCE+"战车行走图/MMR/红狼战车MMR.png"});
    imgData.push({name:"黑色战车MMR",path:API_RESOURCE+"战车行走图/MMR/黑色战车MMR.png"});
    imgData.push({name:"毁灭战车move",path:API_RESOURCE+"战车行走图/Boss/毁灭战车.png"});

    //FightPic
    imgData.push({name:"野战炮",path:API_RESOURCE+"战斗/MMR/野战炮.png"});
    imgData.push({name:"加农炮",path:API_RESOURCE+"战斗/MMR/加农炮.png"});
    imgData.push({name:"巨炮",path:API_RESOURCE+"战斗/MMR/巨炮.png"});
    imgData.push({name:"亡灵士兵",path:API_RESOURCE+"战斗/MMR/亡灵士兵.png"});
    imgData.push({name:"喽啰",path:API_RESOURCE+"战斗/MMR/喽啰.png"});
    imgData.push({name:"毁灭战车",path:API_RESOURCE+"战斗/MMR/毁灭战车.png"});
    imgData.push({name:"戈麦斯",path:API_RESOURCE+"战斗/MMR/戈麦斯.png"});
    imgData.push({name:"沙漠之舟",path:API_RESOURCE+"战斗/MMR/沙漠之舟.png"});

    //face
    imgData.push({name:"face猎人",path:API_RESOURCE+"头像/女猎人.png"});
    imgData.push({name:"face机械师",path:API_RESOURCE+"头像/女机械师.png"});
    imgData.push({name:"face战士",path:API_RESOURCE+"头像/女战士.png"});
    imgData.push({name:"face雷娜",path:API_RESOURCE+"头像/雷娜.png"});

	//effect
    imgData.push({name: "220Animation", path: API_RESOURCE+"战斗/动画/220Animation.png" });

    loadingLayer = new LoadingSample3();
	addChild(loadingLayer);	
	LLoadManage.load(
		imgData,
		function(progress){
            loadingLayer.setProgress(progress);
		},
		function(result){
			assets = result;
            removeChild(loadingLayer);
			loadingLayer = null;
			gameInit();
		}
	);
}

function onDown(event) {
    // 如果点击位置有NPC事件，优先触发talk事件
    isKeyDown = true;
    if (RPG.checkState(RPG.UNDER_MENU)) {
    	Menu.dealMenu(event.offsetX<<0, event.offsetY<<0);
    } else if(RPG.checkState(RPG.MAP_CONTROL)) {
        // 地图状态下可以进行移动和弹出菜单的操作
    	RPG.dealNormal(event.offsetX<<0, event.offsetY<<0);
    } else if(RPG.checkState(RPG.IN_TALKING)) {
    	Talk.startTalk();
    } else if(RPG.checkState(RPG.IN_FIGHTMENU)){
        Menu.clickList(event.offsetX<<0, event.offsetY<<0);
    }
}
function onUp(event){
	if (isKeyDown) {
		isKeyDown = false;
        clearTimeout(Menu.dragTimer);
	    if (RPG.checkState(RPG.UNDER_MENU)) {
    		Menu.dealMenuUp(event.offsetX>>0, event.offsetY>>0);
    	} else if(RPG.checkState(RPG.MAP_CONTROL)) {
            Talk.addTalk();
		}
	}
	RPG.currentButton= null;
}
function onMove(event){
	if (isKeyDown) {
	    if (RPG.checkState(RPG.UNDER_MENU)) {
    		Menu.dealMenuMove(event.offsetX<<0, event.offsetY<<0);
        }
    }
}
/**
 * 循环
 * */
function onFrame(){
	for(let i=0;i<charaLayer.childList.length;i++) {
		if (charaLayer.childList[i].onframe) {
			charaLayer.childList[i].onframe();
		}
	}
    if (Fight.layer && Fight.layer.childList) {
        let obj = Fight.layer.childList,len = obj.length;
        for (let i = 0; i < len; i++) {
            if (obj[i].onframe) {
                obj[i].onframe();
            }
        }
    }
	// if (RPG.descLayer && RPG.descLayer.childList){
	// 	for(let i=0;i<RPG.descLayer.childList.length;i++){
	// 		if (RPG.descLayer.childList[i].onframe){
	// 			RPG.descLayer.childList[i].onframe();
	// 		}
	// 	}
	// }
}

/**
 * 初始化
 **/
function gameInit(){
    LGlobal.setDebug(true);
    //数据初始化优先于显示部分的初始化
    LGlobal.aspectRatio = PORTRAIT;
    Lib.bgm('迪加',true);
    //游戏层显示初始化
    gameLayerInit();
    //游戏全局数据初始化
    gameDataInit();

    //添加帧事件，开始游戏循环
    backLayer.addEventListener(LEvent.ENTER_FRAME,onFrame);
    //添加点击控制事件
    LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
    LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
    LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
    backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onDown);
    backLayer.addEventListener(LMouseEvent.MOUSE_UP,onUp);
    talkLayer.addEventListener(LMouseEvent.MOUSE_MOVE,onMove);

    //设置载入菜单场景
    RPG.drawCover();
}
/**
 * 根据脚本，初始化游戏画面
 * x,y 玩家进入场景的x,y坐标
 **/
function initScript(x,y,dir=0){
    //效果层初始化
    // effectLayer.removeAllChild();
    //对话层初始化
    talkLayer.removeAllChild();
    //默认对话位置居中
    Talk.setTalkPos("bottom");

    setHero(x,y,dir);
    // 绘制地图
    drawImgMap(CurrentMap);
    Lib.bgm(stage.music,true);
    socket.wlSend(
        'addUser',
        {stageId:stage.id,type:'player',img:player.img,x:player.px, y:player.py, dir:player.direction,state:mainTeam.state}
    );
    //弹出刚才的等待状态，这样人物才会动

    if(RPG.checkState(RPG.MAP_WAITING)) RPG.popState();
    //
    // 立即检测自动动作
    checkAuto();
}

/**
 * 各图层初始化
 **/
function gameLayerInit() {
    backLayer = new LSprite();
    backLayer.graphics.drawRect(0,'#384048',[0,0,WIDTH,HEIGHT],true,'#000020');
    addChild(backLayer);
    //地图层
    mapLayer = new LSprite();
    backLayer.addChild(mapLayer);
    //人物层
    charaLayer = new LSprite();
    backLayer.addChild(charaLayer);
    //上地图层
    upLayer = new LSprite();
    backLayer.addChild(upLayer);
    //效果层
    effectLayer = new LSprite();
    backLayer.addChild(effectLayer);
    //菜单层
    talkLayer = new LSprite();
    backLayer.addChild(talkLayer);
    //信息层
    infoLayer = new LSprite();
    backLayer.addChild(infoLayer);

}

/**
 * 各图层初始化
 **/
function gameDataInit() {
    //ItemList
    $.getJSON(API+'Public/getItem?callback=?',{},function (e) {
        if(typeof e === 'object'){
            ItemList = e;
        } else {
            if(confirm('获取物品列表失败，点击确认重试')){
                gameDataInit();
            }
        }
    });
    $.getJSON(API+'Public/getJob?callback=?',{},function (e) {
        if(typeof e === 'object'){
            JobList = e;
        } else {
            if(confirm('获取物品列表失败，点击确认重试')){
                gameDataInit();
            }
        }
    });
    $.getJSON(API+'Public/getEnemy?callback=?',{},function (e) {
        if(typeof e === 'object'){
            EnemyList = e;
        } else {
            if(confirm('获取物品列表失败，点击确认重试')){
                gameDataInit();
            }
        }
    });

}

function gameStageInit(stageId,x,y,dir=3) {
    if(!RPG.checkState(RPG.MAP_WAITING))RPG.pushState(RPG.MAP_WAITING);
    RPG.blackEffect();
    $.getJSON(API+'Public/getMyData?callback=?',{id:stageId},function (e) {
        if('stage' in e){
            if(stage) socket.wlSend('removeUser',{stageId:stage.id});
            stage = e.stage;
            stage.map = JSON.parse(stage.map);
            let downMap = stage.fileName+'_0',upMap = stage.fileName+'_1';
            LLoadManage.load ([
                {name:downMap,path:API_MAP+downMap+'.png'},
                {name:upMap,path:API_MAP+upMap+'.png'},
            ],false,function (e) {
                assets[downMap] = e[downMap];
                assets[upMap] = e[upMap];
                RPG.whiteEffect();
                jumpStage(x,y,dir);
            });
        } else {
            if(confirm('游戏数据初始化错误，点击确认重试')){
                gameStageInit(stageId,x,y,dir);
            }
        }
    });
}
// let waitCharPos = function (npc, x, y, callback){
//     if (npc.px !== x || npc.py !== y) {
//         setTimeout(function(){waitCharPos(npc, x, y, callback);}, 500);
//     } else {
//         if (callback) callback();
//     }
// };
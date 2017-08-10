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

// LGlobal.aspectRatio = LANDSCAPE;提示只支持横屏
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
    gap = 10;

let
    //游戏初始宽
	WIDTH= 320,
    sound={},
    sound2={},
audioContext,
	tempLength= 0;
if (window.innerHeight>=window.innerWidth){
	tempLength= window.innerHeight* WIDTH/window.innerWidth;
} else{
	tempLength= window.innerWidth* WIDTH/window.innerHeight;	
}
let tempCells= (tempLength/ STEP)>>0;
let HEIGHT= tempCells* STEP;
// 高度太低没法玩
if (HEIGHT < 480) {
	HEIGHT= 480;
	tempLength= HEIGHT/ window.innerHeight* window.innerWidth;
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
        {name:'NameSetting',path:'/Asset/Sound/Bgm/NameSetting.mp3'},
        {name:'Startup',path:"/Asset/Sound/Bgm/Startup.mp3"},
        {name:'TownTheme',path:"/Asset/Sound/Bgm/TownTheme.mp3"},
        {name:'Town',path:"/Asset/Sound/Bgm/Town.mp3"},
        {name:'Select',path:"/Asset/Sound/Sfx/Select.wav"},
        {name:'JumpStage',path:"/Asset/Sound/Sfx/JumpStage.wav"},
        {name:'StartBattle',path:"/Asset/Sound/Bgm/enemy.mp3"},
        {name:'BossFight',path:"/Asset/Sound/Bgm/BossFight.mp3"},
        {name:'BattleTheme',path:"/Asset/Sound/Bgm/BattleTheme.mp3"},
        {name:'TownTheme',path:"/Asset/Sound/Bgm/TownTheme.mp3"},
        {name:'战车恰恰悠扬激进版',path:"/Asset/Sound/Bgm/战车恰恰悠扬激进版.mp3"},
        {name:'一切开始的地方',path:"/Asset/Sound/Bgm/一切开始的地方.mid"},

        {name:'GunAct',path:"/Asset/Sound/Sfx/GunAct.mp3"},
        {name:'boom',path:"/Asset/Sound/Sfx/boom.mp3"},
        {name:'Fail',path:"/Asset/Sound/Sfx/Fail.mp3"},
        {name:'Winning',path:"/Asset/Sound/Sfx/Winning.mp3"},
    ];

	//js
	imgData.push({type:"js",path:"./js/Talk.js"});
	imgData.push({type:"js",path:"./js/Character.js"});
	imgData.push({type:"js",path:"./js/Items.js"});
	imgData.push({type:"js",path:"./js/Hero.js"});
    imgData.push({type:"js",path:"./js/RPG.js"});
	imgData.push({type:"js",path:"./js/Menu.js"});
	imgData.push({type:"js",path:"./js/Team.js"});
    imgData.push({type:"js",path:"./js/TalkList.js"});
    imgData.push({type:"js",path:"./js/Effect.js"});
    imgData.push({type:"js",path:"./js/FightMenu.js"});
    imgData.push({type:"js",path:"./js/Fight.js"});
    imgData.push({type:"js",path:"./js/Fighter.js"});
    imgData.push({type:"js",path:"./js/GameSocket.js"});

    //game other img
    imgData.push({name: "empty", path: "/Asset/事件/empty.png" });
    imgData.push({name: "箱子", path: "/Asset/事件/箱子.png" });
    imgData.push({name: "通缉令-戈麦斯", path: "/Asset/事件/通缉令-戈麦斯.png" });

	//人物行走图
    imgData.push({name:"猎人",path:"/Asset/人物行走图/猎人.png"});
    imgData.push({name:"机械师",path:"/Asset/人物行走图/机械师.png"});
    imgData.push({name:"战士",path:"/Asset/人物行走图/战士.png"});
    imgData.push({name:"护士",path:"/Asset/人物行走图/护士.png"});
    imgData.push({name:"蕾娜",path:"/Asset/人物行走图/蕾娜.png"});
	imgData.push({name:"姐姐",path:"/Asset/人物行走图/姐姐.png"});
    imgData.push({name:"老爹",path:"/Asset/人物行走图/老爹.png"});
    imgData.push({name:"重甲猎人",path:"/Asset/人物行走图/重甲猎人.png"});
    imgData.push({name:"穷猎人",path:"/Asset/人物行走图/穷猎人.png"});
    imgData.push({name:"商人妹子",path:"/Asset/人物行走图/商人妹子.png"});
    imgData.push({name:"交易员",path:"/Asset/人物行走图/交易员.png"});
    imgData.push({name:"大姐姐",path:"/Asset/人物行走图/大姐姐.png"});
    imgData.push({name:"明奇",path:"/Asset/人物行走图/明奇.png"});

    //战车行走图
    imgData.push({name:"M1战车MMR",path:"/Asset/战车行走图/MMR/M1战车MMR.png"});
    imgData.push({name:"救护车MMR",path:"/Asset/战车行走图/MMR/救护车MMR.png"});
    imgData.push({name:"红狼战车MMR",path:"/Asset/战车行走图/MMR/红狼战车MMR.png"});
    imgData.push({name:"黑色战车MMR",path:"/Asset/战车行走图/MMR/黑色战车MMR.png"});


    //FightPic
    imgData.push({name:"巨炮",path:"/Asset/战斗/敌人/巨炮.png"});
    imgData.push({name:"沙漠之舟",path:"/Asset/战斗/敌人/沙漠之舟.png"});
    imgData.push({name:"戈斯战车",path:"/Asset/战斗/敌人/戈斯战车.png"});
    imgData.push({name:"黑色战车",path:"/Asset/战斗/黑色战车.png"});
    imgData.push({name:"加农炮",path:"/Asset/战斗/敌人/加农炮.png"});
    imgData.push({name:"野战炮",path:"/Asset/战斗/敌人/野战炮.png"});

    //face
    imgData.push({name:"face猎人",path:"/Asset/头像/女猎人.png"});
    imgData.push({name:"face机械师",path:"/Asset/头像/女机械师.png"});
    imgData.push({name:"face战士",path:"/Asset/头像/女战士.png"});
    imgData.push({name:"face雷娜",path:"/Asset/头像/雷娜.png"});

	//effect
    imgData.push({name: "220Animation", path: "/Asset/战斗/动画/220Animation.png" });

    loadingLayer = new LoadingSample7();
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
// let waitCharPos = function (npc, x, y, callback){
//     if (npc.px !== x || npc.py !== y) {
//         setTimeout(function(){waitCharPos(npc, x, y, callback);}, 500);
//     } else {
//         if (callback) callback();
//     }
// };

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
    Lib.bgm('start_mp3',true);
    //游戏层显示初始化
    gameLayerInit();

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
function initScript(x,y,frame=0){
    //效果层初始化
    effectLayer.removeAllChild();
    //对话层初始化
    talkLayer.removeAllChild();
    //默认对话位置居中
    Talk.setTalkPos("bottom");

    setHero(x,y,frame);
    // 绘制地图
    drawImgMap(CurrentMap);
    Lib.bgm(stage.music,true);
    socket.wlSend(
        'addUser',
        {stageId:stage.id,type:'player',img:player.img,x:player.px, y:player.py, dir:player.direction}
    );
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

function gameStageInit(stageId,x,y,dir) {
    $.getJSON(API+'Public/getMyData?callback=?',{id:stageId},function (e) {
        console.log(e);
        if('stage' in e){
            if(stage) socket.wlSend('removeUser',{stageId:stage.id});
            stage = e.stage;
            stage.map = JSON.parse(stage.map);
            ItemList = stage.items;
            let downMap = stage.name+'_0',upMap = stage.name+'_1';
            LLoadManage.load ([
                {name:downMap,path:API_MAP+downMap+'.png'},
                {name:upMap,path:API_MAP+upMap+'.png'},
            ],false,function (e) {
                assets[downMap] = e[downMap];
                assets[upMap] = e[upMap];
                jumpStage(x,y,dir);
            });
            console.log('ItemList',ItemList);
        } else {
            alert('游戏数据初始化错误，请刷新游戏重试！')
        }
    });
}

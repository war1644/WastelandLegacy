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
    netPlayer,
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
	// LGlobal.preventDefault = false;
    /*if(LGlobal.canTouch){
		LGlobal.stageScale = LStageScaleMode.EXACT_FIT;  //指定整个应用程序在指定区域中可见，但不尝试保持原始高宽比。
		//LGlobal.stageScale = LStageScaleMode.NO_BORDER;  //指定整个应用程序填满指定区域，不会发生扭曲，但有可能会进行一些裁切，同时保持应用程序的原始高宽比。
		//LGlobal.stageScale = LStageScaleMode.NO_SCALE;  //指定应用程序的大小是固定的，因此，即使在更改播放器窗口大小时，它仍然保持不变。
		//LGlobal.stageScale = LStageScaleMode.SHOW_ALL;  //指定整个应用程序在指定区域中可见，且不会发生扭曲，同时保持应用程序的原始高宽比。
		LSystem.screen(LStage.FULL_SCREEN);
	}*/

    if(LGlobal.mobile){
        // LGlobal.height = LGlobal.width*window.innerHeight/window.innerWidth;
        // LGlobal.canvasObj.width  = LGlobal.width;
        // LGlobal.canvasObj.height  = LGlobal.height;
        LGlobal.align = LStageAlign.TOP_LEFT;
        //指定整个应用程序在指定区域中可见，且不会发生扭曲，同时保持应用程序的原始高宽比。
        LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
        LSystem.screen(LStage.FULL_SCREEN);
    }
    LGlobal.speed = 1000/30;
	//准备读取资源
	//BGM SFX
    imgData = [
        {name:'NameSetting_mp3',path:'../RPG/Sound/Bgm/NameSetting.mp3'},
        {name:'lose',path:'../RPG/bgm/lose.mp3'},
        {name:'message',path:'../RPG/bgm/message.wav'},
        {name:'buy',path:'../RPG/bgm/buy.mp3'},
        {name:'start_mp3',path:"../RPG/Sound/Bgm/Startup.mp3"},
        {name:'town_mp3',path:"../RPG/Sound/Bgm/TownTheme.mp3"},
        {name:'town2_mp3',path:"../RPG/Sound/Bgm/Town.mp3"},
        {name:'Select_wav',path:"../RPG/Sound/Sfx/Select.wav"},
        {name:'JumpStage',path:"../RPG/Sound/Sfx/JumpStage.wav"},
        {name:'StartBattle',path:"../RPG/Sound/Bgm/enemy.mp3"},
        {name:'BossFight',path:"../RPG/Sound/Bgm/BossFight.mp3"},
        {name:'BattleTheme',path:"../RPG/Sound/Bgm/BattleTheme.mp3"},
        {name:'GunAct',path:"../RPG/Sound/Sfx/GunAct.mp3"},
        {name:'boom',path:"../RPG/Sound/Sfx/boom.mp3"},
        {name:'Fail',path:"../RPG/Sound/Sfx/Fail.mp3"},
        {name:'Winning',path:"../RPG/Sound/Sfx/Winning.mp3"},

    ];

	//js
	imgData.push({type:"js",path:"./js/Talk.js"});
	imgData.push({type:"js",path:"./js/Character.js"});
	imgData.push({type:"js",path:"./js/Items.js"});
	imgData.push({type:"js",path:"./js/Hero.js"});
    imgData.push({type:"js",path:"./js/Enemy.js"});
    imgData.push({type:"js",path:"./js/RPG.js"});
	imgData.push({type:"js",path:"./js/Menu.js"});
	imgData.push({type:"js",path:"./js/Team.js"});
	imgData.push({type:"js",path:"./js/Effect.js"});
	imgData.push({type:"js",path:"./js/FightMenu.js"});
	imgData.push({type:"js",path:"./js/Fight.js"});
	imgData.push({type:"js",path:"./js/Fighter.js"});
    imgData.push({type:"js",path:"./js/GameSocket.js"});
    imgData.push({type:"js",path:"./js/TalkList.js"});
    imgData.push({type:"js",path:"./js/Script.js"});



    //game other img
    // imgData.push({name:"start_png",path:"./image/start.bmp"});
	imgData.push({name:"button",path:"./image/button.png"});
    imgData.push({name:"iconset",path:"./image/IconSet.png"});
    imgData.push({name: "focus", path: "./image/focus.png" });
    imgData.push({name: "empty", path: "./image/empty.png" });
    imgData.push({name: "box", path: "./image/box.png" });
    imgData.push({name: "right", path: "./image/right.png" });
    imgData.push({name: "通缉令_戈麦斯", path: "./image/Other/通缉令_戈麦斯.png" });

	//movePic
    imgData.push({name:"猎人",path:"./image/MovePic/猎人.png"});
    imgData.push({name:"机械师",path:"./image/MovePic/机械师.png"});
    imgData.push({name:"雷娜",path:"./image/MovePic/雷娜.png"});
	imgData.push({name:"白象战车",path:"./image/MovePic/白象战车.png"});
	imgData.push({name:"黑色梅卡瓦",path:"./image/MovePic/黑色梅卡瓦.png"});
    imgData.push({name:"红色梅卡瓦",path:"./image/MovePic/红色梅卡瓦.png"});
	imgData.push({name:"姐姐",path:"./image/MovePic/姐姐.png"});
    imgData.push({name:"老爹",path:"./image/MovePic/老爹.png"});
    imgData.push({name:"猎人A",path:"./image/MovePic/猎人A.png"});
    imgData.push({name:"商人妹子",path:"./image/MovePic/商人妹子.png"});
    imgData.push({name:"售卖员",path:"./image/MovePic/售卖员.png"});
    imgData.push({name:"办事员",path:"./image/MovePic/办事员.png"});


    //FightPic
    imgData.push({name:"巨炮",path:"./image/FightPic/巨炮.png"});
    imgData.push({name:"沙漠之舟",path:"./image/FightPic/沙漠之舟.png"});
    imgData.push({name:"戈斯战车.png",path:"./image/FightPic/戈斯战车.png"});

    //face
    imgData.push({name:"face女猎人",path:"./image/face/女猎人.png"});
    imgData.push({name:"face女猎人2",path:"./image/face/女猎人2.png"});
    imgData.push({name:"face女机械师",path:"./image/face/女机械师.png"});
    imgData.push({name:"face女战士",path:"./image/face/女战士.png"});
    imgData.push({name:"face雷娜",path:"./image/face/雷娜.png"});

    //map
    imgData.push({name:"home1_0",path:"./assets/home1_0.png"});
    imgData.push({name:"home1_1",path:"./assets/home1_1.png"});
    imgData.push({name:"home2_0",path:"./assets/home2_0.png"});
    imgData.push({name:"home2_1",path:"./assets/home2_1.png"});
    imgData.push({name:"town_0",path:"./assets/laduo_0.png"});
    imgData.push({name:"town_1",path:"./assets/laduo_1.png"});
    imgData.push({name:"hunter_center_0",path:"./assets/hunter_center_0.png"});
    imgData.push({name:"hunter_center_1",path:"./assets/hunter_center_1.png"});

	//effect
	imgData.push({name: "pSword", path: "./image/FightPic/pSword.png" });
	imgData.push({name: "pAttack", path: "./image/FightPic/pAttack.png" });
	imgData.push({name: "pStick", path: "./image/FightPic/pStick.png" });
	imgData.push({name: "pSwipe", path: "./image/FightPic/pSwipe.png" });
	imgData.push({name: "mAttack", path: "./image/FightPic/mAttack.png" });
	imgData.push({name: "mUse", path: "./image/FightPic/mUse.png" });
    imgData.push({name: "heal", path: "./image/FightPic/heal.png" });
    imgData.push({name: "220Animation", path: "./image/FightPic/220Animation.png" });


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


function drawImgMap(map) {
    //得到地图图层
    let bitmapData = new LBitmapData(assets[CurrentMapImg[0]]);
    let bitmapDataUp = new LBitmapData(assets[CurrentMapImg[1]]);
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
	let w1= (WIDTH/STEP)>>1,
		h1= (HEIGHT/STEP)>>1,
		w2= Math.ceil(WIDTH/ STEP/ 2),
		h2= Math.ceil(HEIGHT/ STEP/ 2),
		moveX=0,
		moveY=0,
		hero,
		heroImg;
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

    let row = mainTeam.getHero().getPerson().row || 4;
    let col = mainTeam.getHero().getPerson().col || 4;
	heroImg = mainTeam.getHero().getPerson().img;
	let imgData = new LBitmapData(assets[heroImg]);
	hero = new Character(true, 0, imgData, row, col);
    hero.name = mainTeam.getHero().nickName;
	player = hero;
	//玩家遇敌率
	player.enemyShow = 10;
    player.tmp = 0;
	hero.x = x * STEP- ((hero.pw- STEP)>>1);
	hero.y = y * STEP- (hero.ph- STEP);
	hero.px = x;
	hero.py = y;
	charaLayer.addChild(hero);
    hero.anime.setAction(dir);
    hero.anime.onframe();
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
            npc.px = npcObj.x;
            npc.py = npcObj.y;
            npc.name = npcObj.img;
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
                npc.anime.setAction(npcObj.dir);
                npc.anime.onframe();
            }
            let i = charaLayer.addChild(npc,1);
            if(npcObj.type === 'player'){
                netPlayer[npcObj['name']] = i;
            }


        }
    }
        // }
    // }
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

let moveNetNpc = function(name, stepArr ,callback){
    let index = netPlayer[name];
    let npc = charaLayer.childList[index];
    npc.moveMode = 2;
    npc.stepArray = stepArr;
    if (npc.stepArray.length> 0){
        npc.callback = callback;
        npc.changeDir(npc.stepArray[0]);
    }
};

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
		// clearTimeout(timer);
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
 * 游戏音乐管理类
 * @param sound {string} 音乐名
 * @param loop  {boolean} 是否循环播放
 * @param volume  {number} 音量0~1
 * @returns
 */
// class SoundManage{
//     constructor(sound=false,loop=false,volume=0.6){
//         this.soundName = sound;
//         if (sound) {
//             this.bgm = assets[sound];
//         } else {
//             this.bgm = assets[RPG.curBGM];
//         }
//         this.bgm = new LSound(this.bgm);
//         this.bgm.setVolume(volume);
//         if (loop) {
//             if(RPG.curBGMObj) RPG.curBGMObj.close();
//             clearTimeout(timer);
//             timer = setTimeout(function () {
//                 this.bgm.play(0,99);
//             },2000);
//             // this.bgm.data.loop = true;
//             if (this.soundName) {
//                 RPG.curBGM = this.soundName;
//                 RPG.curBGMObj = this.bgm;
//             }
//         }else {
//             this.bgm.play();
//         }
//
//         this.play(loop,volume);
//     }
//
//     // play(loop,volume) {
//     //
//     //
//     // }
// }

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

    // 第一关的直接设置
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
    Lib.bgm(stage.bgm,true);
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

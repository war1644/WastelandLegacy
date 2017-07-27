/**
 * Main类
 * @author lufy(lufy_legend)
 * @blog http://blog.csdn.net/lufy_Legend
 * @email lufy.legend@gmail.com
 **/
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

// 图区大小
let STEP = 24;
let WIDTH= 256;
//间隙
let gap = 10;
let tempLength= 0;
if (window.innerHeight>=window.innerWidth){
	tempLength= window.innerHeight* WIDTH/window.innerWidth;
} else{
	tempLength= window.innerWidth* WIDTH/window.innerHeight;	
}
let tempCells= Math.floor(tempLength/ STEP);
let HEIGHT= tempCells* STEP;
// 高度太低没法玩
if (HEIGHT< 384) {
	HEIGHT= 384;
	tempLength= HEIGHT/ window.innerHeight* window.innerWidth;
	tempCells= Math.floor(tempLength/ STEP);
	WIDTH= tempCells* STEP;
}

let menuWidth = WIDTH - gap * 2,
menuHeight = HEIGHT - gap * 2;

// window.innerWidth, window.innerHeight
init(1000/30,"mylegend",WIDTH,HEIGHT,main);

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
//控制层
 	ctrlLayer,
//方向变量
 	DOWN = 0,
 	LEFT = 1,
 	RIGHT = 2,
 	UP = 3,
//点击状态
 	isKeyDown = false,
 	timer,
//地图滚动
 	mapMove = false,
//读取图片位置
 	loadIndex = 0,
//玩家
 	player,
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
	imglist;//读取完的图片数组

function main(){
	//LGlobal.preventDefault = false;
    if(LGlobal.canTouch){
		LGlobal.stageScale = LStageScaleMode.EXACT_FIT;  //指定整个应用程序在指定区域中可见，但不尝试保持原始高宽比。
		//LGlobal.stageScale = LStageScaleMode.NO_BORDER;  //指定整个应用程序填满指定区域，不会发生扭曲，但有可能会进行一些裁切，同时保持应用程序的原始高宽比。
		//LGlobal.stageScale = LStageScaleMode.NO_SCALE;  //指定应用程序的大小是固定的，因此，即使在更改播放器窗口大小时，它仍然保持不变。
		//LGlobal.stageScale = LStageScaleMode.SHOW_ALL;  //指定整个应用程序在指定区域中可见，且不会发生扭曲，同时保持应用程序的原始高宽比。
		LSystem.screen(LStage.FULL_SCREEN);
	}
	//准备读取图片
	//BGM SFX
    // imgData.push({name:'start_mp3',path:"../RPG/Sound/Bgm/Startup.mp3"});
    // imgData.push({name:'town_mp3',path:"../RPG/Sound/Bgm/TownTheme.mp3"});

	//js
    imgData.push({type:"js",path:"./js/TalkList.js"});
	imgData.push({type:"js",path:"./js/Talk.js"});
	imgData.push({type:"js",path:"./js/Character.js"});
	imgData.push({type:"js",path:"./js/script.js"});
	imgData.push({type:"js",path:"./js/Items.js"});
	imgData.push({type:"js",path:"./js/Hero.js"});
    imgData.push({type:"js",path:"./js/Enemy.js"});
	imgData.push({type:"js",path:"./js/Menu.js"});
	imgData.push({type:"js",path:"./js/Team.js"});
	imgData.push({type:"js",path:"./js/cover.js"});
	imgData.push({type:"js",path:"./js/Effect.js"});
	imgData.push({type:"js",path:"./js/FightMenu.js"});
	imgData.push({type:"js",path:"./js/Fight.js"});
	imgData.push({type:"js",path:"./js/Fighter.js"});
    imgData.push({type:"js",path:"./js/GameSocket.js"});

	//game other img
    // imgData.push({name:"start_png",path:"./image/start.bmp"});
	imgData.push({name:"button",path:"./image/button.png"});
    imgData.push({name:"iconset",path:"./image/IconSet.png"});
    imgData.push({name: "focus", path: "./image/focus.png" });
    imgData.push({name: "empty", path: "./image/empty.png" });
    imgData.push({name: "box", path: "./image/box.png" });
    imgData.push({name: "right", path: "./image/right.png" });

	//movePic
    imgData.push({name:"猎人",path:"./image/MovePic/猎人.png"});
    imgData.push({name:"机械师",path:"./image/MovePic/机械师.png"});
    imgData.push({name:"雷娜",path:"./image/MovePic/雷娜.png"});
	imgData.push({name:"白象战车",path:"./image/MovePic/白象战车.png"});
	imgData.push({name:"黑色梅卡瓦",path:"./image/MovePic/黑色梅卡瓦.png"});
	imgData.push({name:"姐姐",path:"./image/MovePic/姐姐.png"});

    //FightPic
    imgData.push({name:"巨炮",path:"./image/FightPic/巨炮.png"});
    imgData.push({name:"沙漠之舟",path:"./image/FightPic/沙漠之舟.png"});

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
			imglist = result;
            removeChild(loadingLayer);
			loadingLayer = null;
			gameInit();
		}
	);
}
function gameInit(){
	LGlobal.setDebug(true);
	//数据初始化优先于显示部分的初始化
	LGlobal.aspectRatio = PORTRAIT;
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

function drawImgMap(map) {
    //得到地图图层
    let bitmapData = new LBitmapData(imglist[stage.imgName[0]]);
    let bitmapDataUp = new LBitmapData(imglist[stage.imgName[1]]);
    let bitmap = new LBitmap(bitmapData);
    let bitmapUp = new LBitmap(bitmapDataUp);
    CurrentMapEvents = map.layers.pop();
    // 行动控制层
    CurrentMapMove = map.layers.pop();
    mapLayer.removeAllChild();
    upLayer.removeAllChild();
	upLayer.addChild(bitmapUp);
	mapLayer.addChild(bitmap);
}

function setHero(x, y, frame){
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
	let imgData = new LBitmapData(imglist[heroImg]);
	hero = new Character(true, 0, imgData, row, col);
	player = hero;
	//玩家遇敌率
	player.enemyShow = 10;
    player.tmp = 0;
	hero.x = x * STEP- ((hero.pw- STEP)>>1);
	hero.y = y * STEP- (hero.ph- STEP);
	hero.px = x;
	hero.py = y;
	charaLayer.addChild(hero);
    hero.anime.setAction(frame);
}

//添加人物
function addChara(){
	let charaList = stage.events,
		chara,
		charaObj,
		valid;
	charaLayer.removeAllChild();

	for(let i=0;i<charaList.length;i++){
		charaObj = charaList[i];
		if(charaObj.chara === "player"){
			//加入英雄
			// setHero(charaObj.x, charaObj.y);
		} else {
			//加入npc
			if (charaObj.img){
				if (!charaObj.visible){
					// 未定义必然可见
					valid= true;
				} else {
					valid= charaObj.visible();
				}
				if (valid){
					let row= charaObj.row || 4;
					let col= charaObj.col || 4;
                    let imgData = new LBitmapData(imglist[charaObj.img]);
					chara = new Character(false,charaObj.move,imgData, row, col, 3, charaObj.action);
					chara.x = charaObj.x * STEP- (chara.pw- STEP)/ 2;
					chara.y = charaObj.y * STEP- (chara.ph- STEP);
					chara.px = charaObj.x;
					chara.py = charaObj.y;
					//碰撞型事件
					if (charaObj.chara === "touch") chara.touch= true;
                    // 预设动作
					if (charaObj.preSet) charaObj.preSet(chara);
					// 如果是情节人物，则进入情节列表
					if (charaObj.list) {
						stage.charaList[charaObj.list]= chara;
					}
					charaLayer.addChild(chara);
				}
			}
		}
	}
}
function onDown(event) {
    // 如果点击位置有NPC事件，优先触发talk事件
    isKeyDown = true;

    if (RPG.checkState(RPG.UNDER_MENU)) {
    	RPG.dealMenu(event.offsetX<<0, event.offsetY<<0);
    } else if (RPG.checkState(RPG.MAP_CONTROL)) {
        // 地图状态下可以进行移动和弹出菜单的操作
    	RPG.dealNormal(event.offsetX<<0, event.offsetY<<0);
    } else if (RPG.checkState(RPG.IN_TALKING)) {
    	Talk.startTalk();
    }
}

function onUp(event){
	if (isKeyDown) {
		isKeyDown = false;
		clearTimeout(timer);
	    if (RPG.checkState(RPG.UNDER_MENU)) {
    		Menu.dealMenuUp(event.offsetX, event.offsetY);
    	} else if(RPG.checkState(RPG.MAP_CONTROL)) {
			Talk.addTalk();
		}
	}
	RPG.currentButton= null;
}
function onMove(event){
	if (isKeyDown) {
	    if (RPG.checkState(RPG.UNDER_MENU)) {
    		RPG.dealMenuMove(event.offsetX<<0, event.offsetY<<0);
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
	if (isKeyDown){
		//console.log(event.offsetX, event.offsetY);
		//charaLayer.childList[1].x=LGlobal.offsetX- charaLayer.x;
		//charaLayer.childList[1].y=LGlobal.offsetY- charaLayer.y;
		//upLayer.childList[1].x=LGlobal.offsetX- charaLayer.x;
		//upLayer.childList[1].y=LGlobal.offsetY- charaLayer.y;
	}
	if (RPG.descLayer && RPG.descLayer.childList){
		for(let i=0;i<RPG.descLayer.childList.length;i++){
			if (RPG.descLayer.childList[i].onframe){
				//console.log(ctrlLayer.childList[i]);
				RPG.descLayer.childList[i].onframe();
			}
		}
	}
}

/**
 * 游戏音乐管理类
 * @param sound {string} 音乐名
 * @param loop  {boolean} 是否循环播放
 * @param volume  {number} 音量0~1
 * @returns
 */
class SoundManage{
    constructor(sound=false,loop=false,volume=0.6){
        this.soundName = sound;
        if (sound) {
            this.bgm = imglist[sound];
        } else {
            this.bgm = imglist[RPG.curBGM];
        }
        this.bgm = new LSound(this.bgm);
        this.play(loop,volume);
    }

    play(loop,volume) {
        this.bgm.setVolume(volume);
        this.bgm.play();
        if (loop) {
            this.bgm.data.loop = true;
            if (this.soundName) {
                RPG.curBGM = this.soundName;
            }
        }
    }
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
    //当前场景地图
    CurrentMap= stage.map;
    CurrentMapImg = stage.imgName;
    //先添加人物NPC，为了确定地图的自动移动
    addChara();

    setHero(x,y,frame);
    // 绘制地图
    drawImgMap(CurrentMap);
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
}

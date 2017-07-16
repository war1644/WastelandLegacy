/**
 * Main类
 * @author lufy(lufy_legend)
 * @blog http://blog.csdn.net/lufy_Legend
 * @email lufy.legend@gmail.com
 **/
// 图区大小
let STEP = 24;
let WIDTH= 256;
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
 	mapmove = false,
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
    if(LGlobal.canTouch){
		LGlobal.stageScale = LStageScaleMode.EXACT_FIT;  //指定整个应用程序在指定区域中可见，但不尝试保持原始高宽比。
		//LGlobal.stageScale = LStageScaleMode.NO_BORDER;  //指定整个应用程序填满指定区域，不会发生扭曲，但有可能会进行一些裁切，同时保持应用程序的原始高宽比。
		//LGlobal.stageScale = LStageScaleMode.NO_SCALE;  //指定应用程序的大小是固定的，因此，即使在更改播放器窗口大小时，它仍然保持不变。
		//LGlobal.stageScale = LStageScaleMode.SHOW_ALL;  //指定整个应用程序在指定区域中可见，且不会发生扭曲，同时保持应用程序的原始高宽比。
		LSystem.screen(LStage.FULL_SCREEN);
	}
	//准备读取图片
    // imgData.push({name:'start_mp3',path:"../RPG/Sound/Bgm/Startup.mp3"});
    // imgData.push({name:'town_mp3',path:"../RPG/Sound/Bgm/TownTheme.mp3"});
    imgData.push({type:"js",path:"./js/talklist.js"});
	imgData.push({type:"js",path:"./js/Talk.js"});
	imgData.push({type:"js",path:"./js/Character.js"});
	imgData.push({type:"js",path:"./js/script.js"});
	imgData.push({type:"js",path:"./js/Items.js"});
	imgData.push({type:"js",path:"./js/Hero.js"});
	imgData.push({type:"js",path:"./js/Menu.js"});
	imgData.push({type:"js",path:"./js/team.js"});
	imgData.push({type:"js",path:"./js/cover.js"});
	imgData.push({type:"js",path:"./js/effect.js"});
	imgData.push({type:"js",path:"./js/fightmenu.js"});
	imgData.push({type:"js",path:"./js/fight.js"});
	imgData.push({type:"js",path:"./js/fighter.js"});
    // imgData.push({name:"start_png",path:"./image/start.bmp"});

	imgData.push({name:"button1",path:"./image/button1.png"});
	imgData.push({name:"button1_down",path:"./image/button1_down.png"});
	// imgData.push({name:"map1",path:"./image/tileset1.png"});
	// imgData.push({name:"map2",path:"./image/tileset2.png"});
	imgData.push({name:"carpet",path:"./image/carpet.png"});
	// imgData.push({name:"room",path:"./image/room.png"});
	//movePic
    imgData.push({name:"npc24",path:"./image/movePic/npc24.png"});
    imgData.push({name:"blackTank",path:"./image/movePic/blackTank.png"});
    imgData.push({name:"npc1",path:"./image/movePic/npc1.png"});
    imgData.push({name:"npc5",path:"./image/movePic/npc5.png"});
    imgData.push({name:"npc17",path:"./image/movePic/npc17.png"});
    imgData.push({name:"no17",path:"./image/movePic/no17.png"});

    //face
    imgData.push({name:"face1",path:"./image/face/face1.png"});
    imgData.push({name:"face2",path:"./image/face/face2.png"});
    imgData.push({name:"face3",path:"./image/face/face3.png"});
    imgData.push({name:"face4",path:"./image/face/face4.png"});
    imgData.push({name:"face5",path:"./image/face/face5.png"});
    imgData.push({name:"face6",path:"./image/face/face6.png"});
    imgData.push({name:"face7",path:"./image/face/face7.png"});
    imgData.push({name:"face8",path:"./image/face/face8.png"});

    //map
    imgData.push({name:"home1_0",path:"./assets/home1_0.png"});
    imgData.push({name:"home1_1",path:"./assets/home1_1.png"});
    imgData.push({name:"home2_0",path:"./assets/home2_0.png"});
    imgData.push({name:"home2_1",path:"./assets/home2_1.png"});
    // imgData.push({name:"home1",type:"text",path:"./assets/home1.json"});


    imgData.push({name:"iconset",path:"./image/IconSet.png"});
	imgData.push({name: "focus", path: "./image/focus.png" });
	imgData.push({name: "pSword", path: "./image/pSword.png" });
	imgData.push({name: "pAttack", path: "./image/pAttack.png" });
	imgData.push({name: "pStick", path: "./image/pStick.png" });
	imgData.push({name: "pSwipe", path: "./image/pSwipe.png" });
	imgData.push({name: "mAttack", path: "./image/mAttack.png" });
	imgData.push({name: "heal1", path: "./image/heal1.png" });
	imgData.push({name: "mUse", path: "./image/mUse.png" });
	imgData.push({name: "empty", path: "./image/empty.png" });
	imgData.push({name: "box", path: "./image/box.png" });
	imgData.push({name: "right", path: "./image/right.png" });
	
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
	//数据初始化优先于显示部分的初始化
	LGlobal.aspectRatio = PORTRAIT;
	//游戏层显示初始化
	RPG.layerInit();

	//添加帧事件，开始游戏循环
	backLayer.addEventListener(LEvent.ENTER_FRAME,onFrame);
	//添加点击控制事件
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onDown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,onUp);
	talkLayer.addEventListener(LMouseEvent.MOUSE_MOVE,onMove);
	//加载失败提示页
	drawBack();
    // 第一关的直接设置
    RPG.drawCover();
}

/**
 * 根据对外分发的URL来动态设置渠道
 */
function getChannelFromUrl() {
    let source = ['wechat', 'qq', 'weibo', 'uc'];
    let url = location.href
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
 

// 一个基本背景
function drawBack(){
    backLayer.graphics.drawRect(1,'#000',[0,0,WIDTH,HEIGHT],true,'#000');
    // 加入刷新提示
	let name = new LTextField();
	name.x = WIDTH/ 2;
	name.y = HEIGHT/ 2;
 	name.textAlign= "center";
	name.textBaseline= "middle";
	name.size = "15";
	name.color = "#fff";
	name.text = "【初始化失败，请重新载入游戏】";
	backLayer.addChildAt(name, 1);
}
function drawImgMap(map) {
    //得到瓦片
    let bitmapData = new LBitmapData(imglist[CurrentMapImg[0]]);
    let bitmapDataUp = new LBitmapData(imglist[CurrentMapImg[1]]);
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
	let w1= (WIDTH/ STEP/ 2)<<0,
		h1= (HEIGHT/ STEP/ 2)<<0,
		w2= Math.ceil(WIDTH/ STEP/ 2),
		h2= Math.ceil(HEIGHT/ STEP/ 2),
		moveX=0,
		moveY=0,
		hero,
		heroImg;
	// 把玩家置于屏幕的正中
	if (CurrentMap.width< w1+ w2) {
		moveX= ((CurrentMap.width- w2- w1)/ 2)<<0;
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
		moveY= ((CurrentMap.height- h2- h1)/ 2)<<0;
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

	let row, col;
	if (mainTeam.getHero().getPerson().row) {
		row= mainTeam.getHero().getPerson().row;
	} else row= 4;
	if (mainTeam.getHero().getPerson().col) {
		col= mainTeam.getHero().getPerson().col;
	} else col= 4;
	heroImg = mainTeam.getHero().getPerson().chara;
	let imgData = new LBitmapData(imglist[heroImg]);
	hero = new Character(true, 0, imgData, row, col, 1);
	player = hero;
	hero.x = x * STEP- (hero.pw- STEP)/ 2;
	hero.y = y * STEP- (hero.ph- STEP);
	hero.px= x;
	hero.py= y;
	charaLayer.addChild(hero);
    hero.anime.setAction(frame);
}

/**
 * tile map event data process
 */
function mapEventProcess() {
    let len = CurrentMapEvents.length;
    for (let i = 0; i < len; i++) {
        stage.events[CurrentMapEvents[i].id]
    }
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
			setHero(charaObj.x, charaObj.y);
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
					//console.log("charaObj", charaObj);
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
    	RPG.startTalk();
    }
}

function onUp(event){
	if (isKeyDown) {
		isKeyDown = false;
		clearTimeout(timer);
	    if (RPG.checkState(RPG.UNDER_MENU)) {
    		RPG.dealMenuUp(event.offsetX, event.offsetY);
    	} else if(RPG.checkState(RPG.MAP_CONTROL)) {
			addTalk();
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

//根据脚本，初始化游戏画面
/**
 * x,y 玩家进入场景的x,y坐标
 **/
function initScript(x,y,frame=0){
    //效果层初始化
    effectLayer.removeAllChild();
    //对话层初始化
    talkLayer.removeAllChild();
    //默认对话位置居中
    RPG.setTalkPos("bottom");
    //当前场景地图
    CurrentMap= stage.map;
    CurrentMapImg = stage.imgName;
    //先添加人物NPC，为了确定地图的自动移动
    addChara();

    setHero(x,y,frame);
    // 绘制地图
    // drawMap(CurrentMap);
    drawImgMap(CurrentMap);
    // 立即检测自动动作
    checkAuto();
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

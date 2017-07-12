/**
 * Main类
 * @author lufy(lufy_legend)
 * @blog http://blog.csdn.net/lufy_Legend
 * @email lufy.legend@gmail.com
 **/
// 图区大小
let STEP = 32;
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
// 当前地图的行动控制层
 	CurrentMapMove,
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
    //imgData.push({name:'start_mp3',path:"../RPG/Sound/Bgm/Startup.mp3"});
    //imgData.push({name:'town_mp3',path:"../RPG/Sound/Bgm/TownTheme.mp3"});
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
	imgData.push({name:"map1",path:"./image/tileset1.png"});
	imgData.push({name:"map2",path:"./image/tileset2.png"});
	imgData.push({name:"carpet",path:"./image/carpet.png"});
	imgData.push({name:"room",path:"./image/room.png"});
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

	imgData.push({name:"iconset",path:"./image/IconSet.png"});
	imgData.push({name: "focus", path: "./image/focus.png" });
	imgData.push({name: "hp", path: "./image/hp.png" });
	imgData.push({name: "mp", path: "./image/mp.png" });
	imgData.push({name: "exp", path: "./image/exp.png" });
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

function drawMap(aMap){
	let i,j,k, index,indexX,indexY, a, b, xx, yy, ww, hh;
	// 地图的起始位置
	let mapX = mapLayer.x / STEP;
	let mapY = mapLayer.y / STEP;
	let bitmapdata,bitmap;
	let isUp= false;
	let MapName;
	let imgNum;
	mapLayer.removeAllChild();	
	upLayer.removeAllChild();
    //图层数
	let ml= aMap.layers.length;
	// 逐层画地图
    //瓦片集x轴瓦片数
	a= aMap.tilesets[0].imagewidth/ aMap.tilesets[0].tilewidth;
	//瓦片集y轴瓦片数
	b= aMap.tilesets[0].imageheight/ aMap.tilesets[0].tilewidth;
	//地图x轴瓦片数
	ww= aMap.width;
	//地图y轴瓦片数
	hh= aMap.height;
	//console.log("drawMap");
	//瓦片集name
	MapName= aMap.tilesets[0].name;
	//瓦片集数
	imgNum= aMap.tilesets.length;
	//遍历图层
	for (i=0; i<ml; i++)
	{
		if(aMap.layers[i].name === "move"){
			// 行动控制层不画
			CurrentMapMove= aMap.layers[i];
			continue;
		}
		if(aMap.layers[i].name === "up"){
			// 行动控制层不画
			isUp= true;
		} else {
			isUp= false;
		}

		//遍历该图层瓦片编号
		for (j=0; j< aMap.layers[i].data.length; j++)
		{
			//当前瓦片编号
            index= aMap.layers[i].data[j];
			//为0则没有瓦片
           if (index===0) continue;
			//一个瓦片集，索引为0
			if (imgNum===1) {
				index=index- 1;
			} else {
				//遍历瓦片集
				for (k= imgNum- 1; k>= 0; k--){
					//瓦片号必须大于起始编号
                    if (index>= aMap.tilesets[k].firstgid){
                    	//索引从0开始
						index= index- aMap.tilesets[k].firstgid;
						//瓦片集name
						MapName= aMap.tilesets[k].name;
						//瓦片集x轴瓦片数
						a= aMap.tilesets[k].imagewidth/ aMap.tilesets[k].tilewidth;
						//瓦片集y轴瓦片数
                       b= aMap.tilesets[k].imageheight/ aMap.tilesets[k].tilewidth;
						break;
					}
				}
			}
			//瓦片换算为在地图的x,y坐标
			xx= j % ww;
			yy= Math.floor(j / hh);
			//瓦片换算为在瓦片集的x,y坐标
			indexY = Math.floor(index /a);
			indexX = index- indexY* a;
			//console.log(index,xx, yy,indexX, indexY);
			//小图片的横坐标
			//if (xx* STEP+STEP+ mapLayer.x< 0 ||	xx* STEP+ mapLayer.x> WIDTH || yy* STEP+STEP+ mapLayer.y< 0 || yy*STEP+ mapLayer.y> HEIGHT)

			//得到瓦片
			bitmapdata = new LBitmapData(imglist[MapName],indexX*STEP,indexY*STEP,STEP,STEP);
			bitmap = new LBitmap(bitmapdata);
			//设置瓦片的显示位置
			bitmap.x = xx*STEP;// - mapLayer.x;
			bitmap.y = yy*STEP;// - mapLayer.y;
			//将瓦片显示到地图层
			if (isUp){
				if (stage.hasBig){
					charaLayer.addChild(bitmap);
				} else {
					upLayer.addChild(bitmap);
				}
			} else {
				mapLayer.addChild(bitmap);
			}

		}
	}
}

function setHero(x, y, frame){
	if (x == null) return;
	let w1= Math.floor(WIDTH/ STEP/ 2),
		h1= Math.floor(HEIGHT/ STEP/ 2),
		w2= Math.ceil(WIDTH/ STEP/ 2),
		h2= Math.ceil(HEIGHT/ STEP/ 2),
		moveX=0,
		moveY=0,
		hero,
		heroImg;
	// 把玩家置于屏幕的正中
	if (CurrentMap.width< w1+ w2) {
		moveX= Math.floor((CurrentMap.width- w2- w1)/ 2);
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
		moveY= Math.floor((CurrentMap.height- h2- h1)/ 2);
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
					if (charaObj.preSet){
						// 任何一个地图对象都可以有预设动作
						charaObj.preSet(chara);
					}
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
    	RPG.dealMenu(event.offsetX, event.offsetY);
    } else if (RPG.checkState(RPG.MAP_CONTROL)) {
        // 地图状态下可以进行移动和弹出菜单的操作
    	RPG.dealNormal(event.offsetX, event.offsetY);
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
    		RPG.dealMenuMove(event.offsetX, event.offsetY);
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

/**
 * Main类
 * @author lufy(lufy_legend)
 * @blog http://blog.csdn.net/lufy_Legend
 * @email lufy.legend@gmail.com
 **/
// 图区大小
var STEP = 32;
var WIDTH= 256;
var tempLength= 0;
if (window.innerHeight>=window.innerWidth){
	tempLength= window.innerHeight* WIDTH/window.innerWidth;
} else{
	tempLength= window.innerWidth* WIDTH/window.innerHeight;	
}
var tempCells= Math.floor(tempLength/ STEP);
var HEIGHT= tempCells* STEP;
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
var loadingLayer;
//游戏底层
var backLayer;
//地图层
var mapLayer;
//上地图层
var upLayer;
//人物层
var charaLayer;
//效果层
var effectLayer;
//对话层
var talkLayer;
//控制层
var ctrlLayer;
//方向变量
var DOWN = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;
//点击状态
var isKeyDown = false;
var timer
//地图滚动
var mapmove = false;
/**int变量*/
//读取图片位置
var loadIndex = 0;
/**对象变量*/
//玩家
var player;
//玩家团队数据
var mainTeam;
// 当前地图
var CurrentMap;
// 当前地图的行动控制层
var CurrentMapMove;
/**数组变量*/
//图片path数组
var imgData = new Array();
var stage,//当前场景
	imglist;//读取完的图片数组

function main(){
	if(LGlobal.canTouch){
		LGlobal.stageScale = LStageScaleMode.EXACT_FIT;  //指定整个应用程序在指定区域中可见，但不尝试保持原始高宽比。
		//LGlobal.stageScale = LStageScaleMode.NO_BORDER;  //指定整个应用程序填满指定区域，不会发生扭曲，但有可能会进行一些裁切，同时保持应用程序的原始高宽比。
		//LGlobal.stageScale = LStageScaleMode.NO_SCALE;  //指定应用程序的大小是固定的，因此，即使在更改播放器窗口大小时，它仍然保持不变。
		//LGlobal.stageScale = LStageScaleMode.SHOW_ALL;  //指定整个应用程序在指定区域中可见，且不会发生扭曲，同时保持应用程序的原始高宽比。
		LSystem.screen(LStage.FULL_SCREEN);
	}
	//LGlobal.cant
	//准备读取图片
	// imgData.push({type:"js",path:"./js/dcagent.min.js"});
    imgData.push({name:'start_mp3',path:"../RPG/Sound/Bgm/Startup.mp3"});
    imgData.push({name:'town_mp3',path:"../RPG/Sound/Bgm/TownTheme.mp3"});
    imgData.push({type:"js",path:"./js/talklist.js"});
	//imgData.push({type:"js",path:"./js/rpg.js"});
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
	// imgData.push({name:"cover",path:"./image/cover.jpg"});
    // imgData.push({name:"start_png",path:"./image/start.bmp"});

    // imgData.push({name: "gameover", path: "./image/gameover.jpg" });
    // imgData.push({name: "tobecont", path: "./image/tobecont.jpg" });
	imgData.push({name:"button1",path:"./image/button1.png"});
	imgData.push({name:"button1_down",path:"./image/button1_down.png"});
	imgData.push({name:"map1",path:"./image/tileset1.png"});
	imgData.push({name:"map2",path:"./image/tileset2.png"});
	imgData.push({name:"carpet",path:"./image/carpet.png"});
	imgData.push({name:"room",path:"./image/room.png"});
	imgData.push({name:"hero",path:"./image/hero.png"});
	imgData.push({name: "fhero", path: "./image/fhero.png" });
	//movePic
    imgData.push({name:"npc24",path:"./image/movePic/npc24.png"});
    imgData.push({name:"blackTank",path:"./image/movePic/blackTank.png"});

    //face
    imgData.push({name:"face1",path:"./image/face/face1.png"});
    imgData.push({name:"face2",path:"./image/face/face2.png"});
    imgData.push({name:"face3",path:"./image/face/face3.png"});
    imgData.push({name:"face4",path:"./image/face/face4.png"});


    imgData.push({name:"m1_npc_1",path:"./image/m1_npc_1.png"});
	imgData.push({name:"m1_npc_2",path:"./image/m1_npc_2.png"});
	imgData.push({name:"m1_npc_3",path:"./image/m1_npc_3.png"});
	imgData.push({name:"m1_npc_5",path:"./image/m1_npc_5.png"});
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
	imgData.push({name: "bigdragon", path: "./image/bigdragon.png" });
	imgData.push({name: "bigdragonf",path:"./image/bigdragonf.png"});
	imgData.push({name: "empty", path: "./image/empty.png" });
	// imgData.push({name: "dragonchest", path: "./image/dragonchest.png" });
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
	// 数据初始化优先于显示部分的初始化
	LGlobal.aspectRatio = PORTRAIT;
	
	//游戏层显示初始化
	RPG.layerInit();
	// 初始化游戏信息	
	//地图图片初始化	
	//initMap();		

	//添加贞事件，开始游戏循环
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	//添加点击控制事件
	LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
	talkLayer.addEventListener(LMouseEvent.MOUSE_MOVE,onmove);

	// 第一关的直接设置
	drawBack();
	RPG.drawCover();


}

	


/**
 * 根据对外分发的URL来动态设置渠道
 */
function getChannelFromUrl() {
    var source = ['wechat', 'qq', 'weibo', 'uc'];
    var url = location.href
    for (var i = 0; i < source.length; i += 1) {
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
	var i,j,k, index,indexX,indexY, a, b, xx, yy, ww, hh;
	// 地图的起始位置
	var mapX = mapLayer.x / STEP;
	var mapY = mapLayer.y / STEP;
	var bitmapdata,bitmap;
	var isUp= false;
	var MapName;
	var imgNum;
	mapLayer.removeAllChild();	
	upLayer.removeAllChild();	
	var ml= aMap.layers.length;
	// 逐层画地图
	a= aMap.tilesets[0].imagewidth/ aMap.tilesets[0].tilewidth;
	b= aMap.tilesets[0].imageheight/ aMap.tilesets[0].tilewidth;
	ww= aMap.width;
	hh= aMap.height;
	//console.log("drawMap");
	MapName= aMap.tilesets[0].name;
	imgNum= aMap.tilesets.length;
	for (i=0; i<ml; i++)
	{
		if (aMap.layers[i].name=="move"){
			// 行动控制层不画
			CurrentMapMove= aMap.layers[i];
			continue;
		}
		if (aMap.layers[i].name=="up"){
			// 行动控制层不画
			isUp= true;
		} else {
			isUp= false;
		}
		//console.log(i);
		for (j=0; j< aMap.layers[i].data.length; j++)
		{
			index= aMap.layers[i].data[j];
			if (index==0){
				continue;
			}
			if (imgNum==1) {
				index=index- 1;
			} else {
				for (k= imgNum- 1; k>= 0; k--){
					if (index>= aMap.tilesets[k].firstgid){
						index= index- aMap.tilesets[k].firstgid;
						MapName= aMap.tilesets[k].name;
						a= aMap.tilesets[k].imagewidth/ aMap.tilesets[k].tilewidth;
						b= aMap.tilesets[k].imageheight/ aMap.tilesets[k].tilewidth;
						break;
					}
				}
			}
			xx= j % ww;
			yy= Math.floor(j / hh);
			indexY = Math.floor(index /a);
			indexX = index- indexY* a;
			//console.log(index,xx, yy,indexX, indexY);
			//小图片的横坐标
			//if (xx* STEP+STEP+ mapLayer.x< 0 ||	xx* STEP+ mapLayer.x> WIDTH || yy* STEP+STEP+ mapLayer.y< 0 || yy*STEP+ mapLayer.y> HEIGHT)
			if (false)
			{

			} else
			{
				//得到小图片
				bitmapdata = new LBitmapData(imglist[MapName],indexX*STEP,indexY*STEP,STEP,STEP);
				bitmap = new LBitmap(bitmapdata);
				//设置小图片的显示位置
				bitmap.x = xx*STEP;// - mapLayer.x;
				bitmap.y = yy*STEP;// - mapLayer.y;
				//将小图片显示到地图层
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
}
function setHero(ax, ay, aface){
	if (ax == null) {
		return;
	}
		//console.log(ax,ay,aface);
		var w1= Math.floor(WIDTH/ STEP/ 2);
		var h1= Math.floor(HEIGHT/ STEP/ 2);
		var w2= Math.ceil(WIDTH/ STEP/ 2);
		var h2= Math.ceil(HEIGHT/ STEP/ 2);
		var moveX=0;
		var moveY=0;
		var chara;
		var heroImg;
		// 把玩家置于屏幕的正中
		if (CurrentMap.width< w1+ w2) {
			moveX= Math.floor((CurrentMap.width- w2- w1)/ 2);
		} else {
			if (ax< w1){
				moveX= 0;
			} else if (ax>= CurrentMap.width- w1) {
				moveX= CurrentMap.width- w2- w1;
			} else {
				moveX= ax- w1;
			}
		}
		if (CurrentMap.height< h1+ h2) {
			moveY= Math.floor((CurrentMap.height- h2- h1)/ 2);
		} else {
			if (ay< h1){
				moveY= 0;
			} else if (ay>= CurrentMap.height- h1){
				moveY= CurrentMap.height- h2- h1;
			} else {
				moveY= ay- h1;
			}
		}
		mapLayer.x= -moveX* STEP;
		mapLayer.y= -moveY* STEP;
		upLayer.x= -moveX* STEP;
		upLayer.y= -moveY* STEP;
		charaLayer.x= -moveX* STEP;
		charaLayer.y= -moveY* STEP;
		//
		var row, col;
		if (mainTeam.getHero().getPerson().row) {
			row= mainTeam.getHero().getPerson().row;
		} else row= 4;
		if (mainTeam.getHero().getPerson().col) {
			col= mainTeam.getHero().getPerson().col;
		} else col= 4;
		heroImg = mainTeam.getHero().getPerson().chara;
		let bitmapdata = new LBitmapData(imglist[heroImg]);
		//chara = new Character(true, 0, bitmapdata, 4, 3, 1);
		chara = new Character(true, 0, bitmapdata, row, col, 1);
		player = chara;
		chara.x = ax * STEP- (chara.pw- STEP)/ 2;
		chara.y = ay * STEP- (chara.ph- STEP);
		chara.px= ax;
		chara.py= ay;
		charaLayer.addChild(chara);
		chara.anime.setAction(aface);
}
//添加人物
function addChara(){
	var charaList = stage.events,
		chara,
		charaObj,
		valid;
	charaLayer.removeAllChild();
	for(var i=0;i<charaList.length;i++){
		charaObj = charaList[i];
		if(charaObj.chara == "player"){
			//加入英雄
			setHero(charaObj.x, charaObj.y, 0)
			//chara.x = charaObj.x * STEP;
			//chara.y = charaObj.y * STEP;
			//charaLayer.addChild(chara);
		} else {
			//加入npc
			if (charaObj.img==""){
				//console.log("111", charaObj);
			}
			else
			{
				if (!charaObj.visible){
					// 未定义必然可见
					valid= true;
				} else {
					valid= charaObj.visible();
				}
				if (valid){
					var row= charaObj.row?charaObj.row:4;
					var col= charaObj.col?charaObj.col:3;
					//console.log("222", charaObj);
                    var bitmapdata = new LBitmapData(imglist[charaObj.img]);
					chara = new Character(false,charaObj.move,bitmapdata, row, col, 3, charaObj.action);
					chara.x = charaObj.x * STEP- (chara.pw- STEP)/ 2;
					chara.y = charaObj.y * STEP- (chara.ph- STEP);
					chara.px = charaObj.x;
					chara.py = charaObj.y;
					if (charaObj.chara=="touch"){
						chara.touch= true;
					}
					if (charaObj.preSet){
						// 任何一个地图对象都可以有预设动作
						charaObj.preSet(chara);
					}
					// 如果是情节人物，则进入情节列表
					if (charaObj.list) {
						stage.charaList[charaObj.list]= chara;
					}
					//chara.anime.setAction(3);
					charaLayer.addChild(chara);
				}
			}
		}
	}
}
function ondown(event) {
    // 如果点击位置有NPC事件，优先触发talk事件
    isKeyDown = true;

    if (RPG.checkState(RPG.UNDER_MENU)) {
    	RPG.dealMenu(event.offsetX, event.offsetY);
    } else if (RPG.checkState(RPG.MAP_CONTROL)) {
        console.log('checkState',RPG.checkState(RPG.MAP_CONTROL));
        // 地图状态下可以进行移动和弹出菜单的操作
    	RPG.dealNormal(event.offsetX, event.offsetY);
    } else if (RPG.checkState(RPG.IN_TALKING)) {
    	RPG.startTalk();
    }
}

function onup(event){
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
function onmove(event){
	//clearTimeout(timer);
	if (isKeyDown) {
	    if (RPG.checkState(RPG.UNDER_MENU)) {
    		RPG.dealMenuMove(event.offsetX, event.offsetY);
        }
    }
}
/**
 * 循环
 * */
function onframe(){
	for(var i=0;i<charaLayer.childList.length;i++) {
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
		for(var i=0;i<RPG.descLayer.childList.length;i++){
			if (RPG.descLayer.childList[i].onframe){
				//console.log(ctrlLayer.childList[i]);
				RPG.descLayer.childList[i].onframe();
			}
		}
	}
}

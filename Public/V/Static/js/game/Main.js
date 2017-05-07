/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏客户端主方法库
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/11 初版
 */

init(1000/30,"game",480,288,main);

var
	loadingLayer,//显示进度条所用层
	backLayer,//游戏底层
	mapUpLayer,//地图层
    mapDownLayer,
	charaLayer,//人物层
	effectLayer,//效果层
	talkLayer,//对话层
	ctrlLayer,//控制层
	DOWN = 0, LEFT = 1, RIGHT = 2, UP = 3, STEP = 24,//方向变量
	isKeyDown = false,//点击状态
	mapmove = false,//地图滚动
	loadIndex = 0,//读取图片位置
	player,//玩家
    //图片path数组
	loadData = [
		{name:"home2_0",path:'/V/Static/assets/home2_0.png'},
        {name:"home2_1",path:'/V/Static/assets/home2_1.png'},
        {name:"home1_0",path:'/V/Static/assets/home1_0.png'},
        {name:"home1_1",path:'/V/Static/assets/home1_1.png'},
        {name:"player",path:'/V/Static/img/movePic/NPC_1.png'},
        {name:"npc2",path:'/V/Static/img/movePic/NPC_2.png'},
        {name:"npc3",path:'/V/Static/img/movePic/NPC_3.png'},
        {name:"npc5",path:'/V/Static/img/movePic/NPC_5.png'},
    	{name:"logoBack",path:'/V/Static/img/bgimg/logoBac.bmp'},
    	{name:"startSound",path:'/V/Static/music/Start.mp3'},
    	{name:"setNameSound",path:'/V/Static/music/NameSetting.mp3'},
        {path:"/V/Static/js/game/Map.js"},
        {path:"/V/Static/js/game/Talk.js"},
        {path:"/V/Static/js/game/Character.js"},
        {path:"/V/Static/js/game/Script.js"},
        {name:"map",path:"/V/Static/image/map.jpg"},
        {name:"mingren",path:"/V/Static/image/p0.png"},
        {name:"npc1",path:"/V/Static/image/p1.png"},
        {name:"e1",path:"/V/Static/image/e1.png"},
        {name:"e2",path:"/V/Static/image/e2.png"},
        {name:"m",path:"/V/Static/image/m.jpg"},
        {name:"n",path:"/V/Static/image/n.jpg"},
        {name:"talk",path:"/V/Static/image/back.png"}
	],
	imageArray,
	stage,resList,center,backSound,scriptData;

function main(){
	if(LGlobal.canTouch){
		LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
		LSystem.screen(LStage.FULL_SCREEN);
	}
    LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN,true);
    LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
    LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,true);
    center = LGlobal.width/2;
    //添加背景层
    backLayer = new LSprite();
    //绘制成黑色
    backLayer.graphics.drawRect(1,'#000',[0,0,LGlobal.width,LGlobal.height],true,'#000');
    //添加到屏幕
    addChild(backLayer);
    //搞个loading画面
    loadingLayer = new LoadingSample5();
    //加到背景图层去
    backLayer.addChild(loadingLayer);
    //load东西了
    LLoadManage.load(loadData,function(progress){
        loadingLayer.setProgress(progress);
    },loadStartLayer);
}

function loadStartLayer(result) {
    resList = result;
    //添加背景音乐
    backSound = new LSound(resList['startSound']);
    backSound.play();
    //干掉load画面
    backLayer.removeChild(loadingLayer);
    loadingLayer = null;

    //载入logo背景
    backLayer.addChild(new LBitmap(new LBitmapData(resList['logoBack'])));
    //new个fps
    var fps = new FPS();
    //让FPS信息间隔10帧循环显隐
    LTweenLiteTimeline.to(fps,10,{alpha:0,loop:true}).to(fps,10,{alpha:1});
    backLayer.addChild(fps);
    //加个标题
    var titleButton = new LButtonSample1("废土战记",38);
    titleButton.x = center-titleButton.width/2;
    titleButton.y = 50;
    backLayer.addChild(titleButton);
    LTweenLiteTimeline.to(titleButton,5,{alpha:0,loop:true}).to(titleButton,5,{alpha:1});

    //加个跳转
    var startButton = new LButtonSample1("开始游戏");
    startButton.x = center-startButton.width/2;
    startButton.y = 200;
    backLayer.addChild(startButton);
    startButton.addEventListener(LMouseEvent.MOUSE_UP,gameInit);
}

function gameInit(){
	//游戏层显示初始化
	layerInit();	
	//地图初始化
	// initMap();
    getMapData();
	scriptData = script.home1;
	initScript(scriptData);

	//添加贞事件，开始游戏循环
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	//添加控制按钮
	var bitmapdata = new LBitmapData(resList["e1"]);
	var bitmap = new LBitmap(bitmapdata);
	bitmap.x = 0;
	bitmap.y = 0;
	ctrlLayer.addChild(bitmap);
	bitmapdata = new LBitmapData(resList["e2"]);
	bitmap = new LBitmap(bitmapdata);
	bitmap.x = 280;
	bitmap.y = 30;
	ctrlLayer.addChild(bitmap);
	ctrlLayer.x = 40;
	ctrlLayer.y = 160;
	//添加点击控制事件
	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
	
	if(!LGlobal.canTouch){
		//电脑的时候，添加键盘事件 【上 下 左 右 空格】
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
	}
}
//游戏层显示初始化
function layerInit(){
	//清除游戏底层事件和节点
    backLayer.die();
    backLayer.removeAllChild();

	//地图层添加
	mapDownLayer = new LSprite();
	backLayer.addChild(mapDownLayer);
	//人物层添加
	charaLayer = new LSprite();
	backLayer.addChild(charaLayer);
    //地图层添加
    mapUpLayer = new LSprite();
    backLayer.addChild(mapUpLayer);
	//效果层添加
	effectLayer = new LSprite();
	backLayer.addChild(effectLayer);
	//对话层添加
	talkLayer = new LSprite();
	backLayer.addChild(talkLayer);
	//控制层添加
	ctrlLayer = new LSprite();
	backLayer.addChild(ctrlLayer);
}
//地图图片初始化
function initMap(){

	imageArray = []
	// var bitmapdata;
	// if(imageArray == null){
	// 	//地图图片数据
	// 	bitmapdata = new LBitmapData(resList["map"]);
	// 	//将地图图片拆分，得到拆分后的各个小图片的坐标数组
	// 	imageArray = LGlobal.divideCoordinate(bitmapdata.image.width,bitmapdata.image.height,10,10);
	// }
}
//添加地图
function addMap(cx,cy){
	var mx = cx < 0 ? -1 : 0, my = cy < 0 ? -1 : 0;

    mapDownLayer.removeAllChild();
    mapUpLayer.removeAllChild();
    mapDownLayer.addChild(new LBitmap(new LBitmapData(resList['home2_0'],mx,my,LGlobal.width,LGlobal.height)));
    mapUpLayer.addChild(new LBitmap(new LBitmapData(resList['home2_1'],mx,my,LGlobal.width,LGlobal.height)));
}

//移除多余地图块
function delMap(){
	// var bitmap,i;
	// for(i=0;i<mapLayer.childList.length;i++){
	// 	bitmap = mapLayer.childList[i];
	// 	if(bitmap.x + mapLayer.x < 0 || bitmap.x + mapLayer.x >= 480 ||
	// 			bitmap.y + mapLayer.y < 0 || bitmap.y + mapLayer.y >= 288){
	// 		mapLayer.removeChild(bitmap);
	// 		i--;
	// 	}
	// }
    // mapDownLayer.removeChild();
}

//添加人物
function addChara(){
	var charaList = scriptData.add;
	var chara,charaObj;
	for(var i=0;i<charaList.length;i++){
		charaObj = charaList[i];
		if(charaObj.chara == "player"){
			//加入英雄
			var bitmapdata = new LBitmapData(resList[charaObj.img]);
			chara = new Character(true,i,bitmapdata,4,4);
			player = chara;
		}else{
			//加入npc
            var bitmapdata = new LBitmapData(resList[charaObj.img]);
			chara = new Character(false,i,bitmapdata,4,4);
		}
		chara.x = charaObj.x * 32;
		chara.y = charaObj.y * 32;
		charaLayer.addChild(chara);
	}
}
function ondown(event){
	//根据点击位置，判断移动方向
	if(event.offsetX >= ctrlLayer.x + 40 && event.offsetX <= ctrlLayer.x+80){
		if(event.offsetY >= ctrlLayer.y && event.offsetY <= ctrlLayer.y+40){
			player.changeDir(UP);
		}else if(event.offsetY >= ctrlLayer.y+80 && event.offsetY <= ctrlLayer.y+120){
			player.changeDir(DOWN);
		}
	}else if(event.offsetX >= ctrlLayer.x && event.offsetX <= ctrlLayer.x+40){
		if(event.offsetY >= ctrlLayer.y +40 && event.offsetY <= ctrlLayer.y+80){
			player.changeDir(LEFT);
		}
	}else if(event.offsetX >= ctrlLayer.x+80 && event.offsetX <= ctrlLayer.x+120){
		if(event.offsetY >= ctrlLayer.y +40 && event.offsetY <= ctrlLayer.y+80){
			player.changeDir(RIGHT);
		}
	}
	isKeyDown = true;
}
function onup(event){
	isKeyDown = false;
	if(event.offsetX >= ctrlLayer.x + 280 && event.offsetX <= ctrlLayer.x+330){
		if(event.offsetY >= ctrlLayer.y+40 && event.offsetY <= ctrlLayer.y+100){
			//对话
			addTalk();
		}
	}
}
function onkeydown(event){
	if(event.keyCode == 37){//left
		player.changeDir(LEFT);
	}else if(event.keyCode == 38){//up
		player.changeDir(UP);
	}else if(event.keyCode == 39){//right
		player.changeDir(RIGHT);
	}else if(event.keyCode == 40){//down
		player.changeDir(DOWN);
	}
	isKeyDown = true;
}
function onkeyup(event){
	isKeyDown = false;
	return;
	if(event.keyCode == 37 && player.move[0] < 0){//left
		player.move[0] = 0;
	}else if(event.keyCode == 38 && player.move[1] < 0){//up
		player.move[1] = 0;
	}else if(event.keyCode == 39 && player.move[0] > 0){//right
		player.move[0] = 0;
	}else if(event.keyCode == 40 && player.move[1] > 0){//down
		player.move[1] = 0;
	}else{//shoot
		player.canshoot = false;
		player.shootctrl = player.shootspeed;
	}
}
/**
 * 循环
 * */
function onframe(){
	for(var i=0;i<charaLayer.childList.length;i++)charaLayer.childList[i].onframe();
}
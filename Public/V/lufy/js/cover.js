/*
所有关于封面，载入、保存进度相关的代码在这里
 */
 	// 存档信息
 	RPG.saveList= [];
 	RPG.MaxSaveSlot= 8;

// 新游戏初始化信息
RPG.newGame = function () {
    //初始化玩家队伍
	mainTeam = RPG.beget(PlayerTeam);
    //向玩家队伍增加人物（人物索引，人物等级)
	mainTeam.addHero(0, 50,'路漫漫');
    mainTeam.addHero(1, 50,'废土04');
    //添置物品
    mainTeam.addItem(11, 20);
    mainTeam.addItem(12, 20);

	RPG.initSwitch();
    //初始化敌人
    RPG.initEnemyTeam();
	//载入场景
	RPG.jumpStage(script.stage02,3,14,0);

   	//进入地图控制状态
	RPG.setState(RPG.MAP_CONTROL);
};

// 初始化敌人战斗队的数据
RPG.initEnemyTeam = function(){
    let team1;
	// A队=0
	team1= RPG.beget(PlayerTeam);
	team1.clear();
	team1.addEnemy(0, 10);
	team1.addEnemy(1, 10);
	team1.addItem(1, 2);
	RPG.enemyTeam.push(team1);

	// B队=1
	team1 = RPG.beget(PlayerTeam);
	team1.clear();
    team1.addEnemy(0, 20);
    team1.addEnemy(1, 20);
    team1.addItem(1, 2);
	RPG.enemyTeam.push(team1);

	// C队=2
	team1= RPG.beget(PlayerTeam);
	team1.clear();
    team1.addEnemy(0, 50);
	team1.addItem(1, 2);
	RPG.enemyTeam.push(team1);

	// D队=3
	team1= RPG.beget(PlayerTeam);
	team1.clear();
    team1.addEnemy(1, 50);
	RPG.enemyTeam.push(team1);

	// E队=4
	team1 = RPG.beget(PlayerTeam);
	team1.clear();
    team1.addEnemy(0, 20);
    team1.addEnemy(1, 20);
    team1.addEnemy(0, 20);
    team1.addEnemy(1, 20);
    team1.addItem(1, 2);
	RPG.enemyTeam.push(team1);
};

RPG.newSaveList = function(){
	// 存档记录为空
	RPG.saveList=[];
	for (let i= 0; i< RPG.MaxSaveSlot; i++){
		RPG.saveList.push({name:"空记录", date:null});
	}
};
RPG.copySaveList = function (aSaveList) {
	// 读取存档记录
	RPG.saveList= aSaveList.slice(0);
};

RPG.saveGame = function(aSlot){
	if (aSlot>=0 && aSlot< RPG.MaxSaveSlot){
		RPG.saveList[aSlot].name= stage.name;
		RPG.saveList[aSlot].date= RPG.getDateTimeStr();
		if (window.localStorage){
			window.localStorage.setItem("WLSaveList", JSON.stringify(RPG.saveList));
			let tempData={x:player.px, y:player.py, items:mainTeam.itemList, heros:mainTeam.heroList, gate:stage.id, swt:RPG.SWITCH};
			window.localStorage.setItem("WLSaveSlot"+ aSlot, RPG.Serialize(tempData));
		}
	}
};

let loadGame = function(aSlot){
	if (aSlot>=0 && aSlot< RPG.MaxSaveSlot){
		if (window.localStorage){
			let tempStr= window.localStorage.getItem("WLSaveSlot"+ aSlot);
			if (tempStr) {
				let tempData= eval("("+ tempStr+ ")");
				mainTeam= RPG.beget(PlayerTeam);
				for(let i= 0; i< tempData.items.length; i++){
					mainTeam.addItem(tempData.items[i].index, tempData.items[i].num);
				}
				for(let i= 0; i< tempData.heros.length; i++){
					mainTeam.addHero(tempData.heros[i].index,tempData.heros[i].Level);
					RPG.extend(mainTeam.heroList[i], tempData.heros[i]);
				}
				RPG.initSwitch();
				RPG.extend(RPG.SWITCH, tempData.swt);
				RPG.jumpStage(script[tempData.gate],Number(tempData.x), Number(tempData.y));
				RPG.initEnemyTeam();
			   	// 进入地图控制状态
				RPG.setState(RPG.MAP_CONTROL);
				//初始化
			   	// initScript();

			}
		}
	}
};

RPG.showSaveSlot= function(aSlot){
	if (aSlot>=0 && aSlot< RPG.MaxSaveSlot){
		let result= RPG.saveList[aSlot].name;
		if (RPG.saveList[aSlot].date){
			for (let i=RPG.saveList[aSlot].name.length; i< 6; i++){
				result= result+ "　";
			}
			result= result+ "("+ RPG.saveList[aSlot].date+ ")";
		}
		return result;
	}
};
RPG.getDateTimeStr= function(){
	let myDate= new Date();
	let hh= myDate.getHours();
	let mm= myDate.getMinutes();
	let	result= ""//myDate.getFullYear()+ "-"
				+ (myDate.getMonth()+ 1)+ "-"
				+ myDate.getDate()+ " "
				+ (hh< 10?"0":"")
				+ hh+ ":"
				+ (mm< 10?"0":"")
				+ mm
				;
	return result;
};
RPG.howToUse= function(){
	Talk.startTalk(talkList.gameExplainTalk);
};
RPG.drawCover= function() {
	// 封面图
	RPG.setState(RPG.IN_COVER);
	let sLayer = effectLayer;
	sLayer.removeAllChild();

    let title = UI.text('废土战记',0,50,'35');
    title.x = (WIDTH-title.getWidth())>>1;
    sLayer.addChild(title);

	// 新的开始
    let button01= UI.gameTitleButton(120, 30, (WIDTH - 120)>>1, HEIGHT- 200, "新游戏", function(e){
    	// 按钮被透过窗口点击
    	if (RPG.checkState(RPG.IN_COVER)) {
			RPG.newGame();
		}
    });
    sLayer.addChild(button01);
    // 继续
    let button02= UI.gameTitleButton(120, 30, (WIDTH- 120)>>1, HEIGHT- 160, "载入进度", function(e){
    	if (RPG.checkState(RPG.IN_COVER)) {
	    	RPG.openLoadMenu();
	    }
	});
	button02.setState(LButton.STATE_DISABLE);
	sLayer.addChild(button02);
	// 说明
    let button03= UI.gameTitleButton(120, 30, (WIDTH- 120)>>1, HEIGHT- 120, "使用说明", function(e){
    	if (RPG.checkState(RPG.IN_COVER)) {
	    	RPG.howToUse();
	    }
	});
	sLayer.addChild(button03);
	if (window.localStorage) {
		let saveList= JSON.parse(window.localStorage.getItem("WLSaveList"));
		if (saveList) {
			button02.setState(LButton.STATE_ENABLE);
			RPG.copySaveList(saveList);
		} else {
			button02.setState(LButton.STATE_DISABLE);
			RPG.newSaveList();
		}
	}
    // let bitmapdata = new LBitmapData(imglist["start_png"]);
    // let bitmap = new LBitmap(bitmapdata);
    // bitmap.scaleX = WIDTH/ bitmap.width;
    // bitmap.scaleY = HEIGHT/ bitmap.height;
    // bitmap.x = 0;
    // bitmap.y = 0;
    // bitmap.alpha = 1;
    // sLayer.addChild(bitmap);
};

RPG.drawGameOver= function() {
	// 切换状态
	RPG.setState(RPG.IN_OVER);
	// 封面图
	var sLayer= effectLayer;
	var bitmapdata = new LBitmapData(imglist["gameover"]);
	var bitmap = new LBitmap(bitmapdata);
	sLayer.removeAllChild();
	//
	bitmap.scaleX = 1;
	bitmap.scaleY = HEIGHT/ bitmap.height;
	bitmap.x = (WIDTH- bitmap.width)/ 2;
	bitmap.y = 0;
	bitmap.alpha = 1;
	sLayer.addChild(bitmap);
	// 新的开始
    var button01= RPG.newButton(120, 30, (WIDTH- 120)/ 2, HEIGHT- 160, "回到标题", function(e){
		RPG.drawCover();
    });
    sLayer.addChild(button01);
};

RPG.winGame= function() {
	// 切换状态
	RPG.setState(RPG.IN_OVER);
	// 封面图
	var sLayer= effectLayer;
	var bitmapdata = new LBitmapData(imglist["tobecont"]);
	var bitmap = new LBitmap(bitmapdata);
	sLayer.removeAllChild();
	//
	bitmap.scaleX = WIDTH/ bitmap.width;
	bitmap.scaleY = HEIGHT/ bitmap.height;
	bitmap.x = 0;
	bitmap.y = 0;
	bitmap.alpha = 1;
	sLayer.addChild(bitmap);
	// 新的开始
    var button01= RPG.newButton(120, 30, (WIDTH- 120)/ 2, HEIGHT- 160, "回到标题", function(e){
		RPG.drawCover();
    });
    sLayer.addChild(button01);
};
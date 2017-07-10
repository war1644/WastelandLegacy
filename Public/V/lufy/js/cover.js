/*
所有关于封面，载入、保存进度相关的代码在这里
 */
 	// 存档信息
 	RPG.saveList= [];
 	RPG.MaxSaveSlot= 8;

// 新游戏初始化信息
RPG.newGame = function () {
	// 测试数据
	mainTeam= RPG.beget(RPG.PlayerTeam);
	mainTeam.addHero(0, 1);
	mainTeam.getHero().Hp= 150;
	mainTeam.getHero().Mp= 2;
	mainTeam.getHero().Exp= 15;
	// mainTeam.addHero(1, 1);
	// console.log(mainTeam);
	/*
	mainTeam.addItem(1, 10);
	mainTeam.addItem(2, 10);
	mainTeam.addItem(5, 1);
	mainTeam.addItem(6, 1);
	mainTeam.addItem(7, 1);
	mainTeam.addItem(8, 1);
	mainTeam.addItem(9, 1);
	mainTeam.addItem(10, 1);
	mainTeam.addItem(11, 1);
	//*/
	RPG.initSwitch(30);
	//载入场景
	stage = script.stage01;
	//初始化敌人
    // RPG.initEnemyTeam();
   	// 进入地图控制状态
	RPG.setState(RPG.MAP_CONTROL);
	//
   	initScript(3,14,0);
}

// 初始化敌人战斗队的数据
RPG.initEnemyTeam= function(){
	// 蝎子战队=0
	var team1= RPG.beget(RPG.PlayerTeam);
	team1.clear();
	team1.addHero(2, 2);
	team1.addHero(2, 2);
	//team1.addHero(2, 1);
	//
	team1.addItem(1, 2);
	//team1.addItem(2, 1);
	RPG.enemyTeam.push(team1);
	// 蝙蝠战队=1
	var team1= RPG.beget(RPG.PlayerTeam);
	team1.clear();
	team1.addHero(3, 1);
	team1.addHero(3, 1);
	//team1.addHero(2, 1);
	//
	team1.addItem(1, 2);
	RPG.enemyTeam.push(team1);
	// 蝎子巢穴队=2
	var team1= RPG.beget(RPG.PlayerTeam);
	team1.clear();
	team1.addHero(2, 5);
	team1.addHero(2, 3);
	team1.addHero(2, 3);
	team1.addHero(2, 3);
	//
	team1.addItem(1, 2);
	//team1.addItem(2, 1);
	RPG.enemyTeam.push(team1);
	// 蝙蝠巢穴队=3
	var team1= RPG.beget(RPG.PlayerTeam);
	team1.clear();
	team1.addHero(3, 5);
	team1.addHero(3, 3);
	team1.addHero(3, 3);
	team1.addHero(3, 3);
	//
	team1.addItem(1, 2);
	RPG.enemyTeam.push(team1);
	// 大龙战队=4
	var team1= RPG.beget(RPG.PlayerTeam);
	team1.clear();
	team1.addHero(4, 10);
	team1.addHero(2, 5);
	team1.addHero(3, 5);
	//
	RPG.enemyTeam.push(team1);
	// 坏人战队=5
	var team1= RPG.beget(RPG.PlayerTeam);
	team1.clear();
	team1.addHero(1, 6);
	//
	RPG.enemyTeam.push(team1);
}

RPG.newSaveList = function () {
	// 存档记录为空
	RPG.saveList=[];
	for (var i= 0; i< RPG.MaxSaveSlot; i++){
		RPG.saveList.push({name:"空记录", date:null});
	}
}
RPG.copySaveList = function (aSaveList) {
	// 读取存档记录
	RPG.saveList= aSaveList.slice(0);
}

RPG.saveGame= function(aSlot){
	if (aSlot>=0 && aSlot< RPG.MaxSaveSlot){
		RPG.saveList[aSlot].name= stage.name;
		RPG.saveList[aSlot].date= RPG.getDateTimeStr();
		if (window.localStorage){
			window.localStorage.setItem("SaiFuSaveList", JSON.stringify(RPG.saveList));
			var tempData={x:player.px, y:player.py, items:mainTeam.itemList, heros:mainTeam.heroList, gate:stage.id, swt:RPG.SWITCH};
			//alert(Serialize(tempData)); 
			window.localStorage.setItem("SaiFuSlot"+ aSlot, RPG.Serialize(tempData));
		}
	}
}

RPG.loadGame= function(aSlot){
	if (aSlot>=0 && aSlot< RPG.MaxSaveSlot){
		if (window.localStorage){
			var tempStr= window.localStorage.getItem("SaiFuSlot"+ aSlot);
			//console.log(tempStr);
			if (tempStr) {
				var tempData= eval("("+ tempStr+ ")");
				//console.log(tempData);
				//*
				mainTeam= RPG.beget(RPG.PlayerTeam);
				//mainTeam.init();
				for(var i= 0; i< tempData.items.length; i++){
					mainTeam.addItem(tempData.items[i].index, tempData.items[i].num);
				}
				for(var i= 0; i< tempData.heros.length; i++){
					mainTeam.addHero(tempData.heros[i].index);
					RPG.extend(mainTeam.heroList[i], tempData.heros[i]);
				}
				//RPG.SWITCH=tempData.swt.slice(0);
				RPG.initSwitch();
				RPG.extend(RPG.SWITCH, tempData.swt);
				//
				stage= script[tempData.gate];
				RPG.initEnemyTeam();
			   	// 进入地图控制状态
				RPG.setState(RPG.MAP_CONTROL);
				//
			   	initScript(Number(tempData.x), Number(tempData.y),0);
				//*/
			}
		}
	}
}

RPG.showSaveSlot= function(aSlot){
	if (aSlot>=0 && aSlot< RPG.MaxSaveSlot){
		var result= RPG.saveList[aSlot].name;
		if (RPG.saveList[aSlot].date){
			for (var i=RPG.saveList[aSlot].name.length; i< 6; i++){
				result= result+ "　";
			}
			result= result+ "("+ RPG.saveList[aSlot].date+ ")";
		}
		return result;
	}
}
RPG.getDateTimeStr= function(){
	var myDate= new Date();
	var hh= myDate.getHours();
	var mm= myDate.getMinutes();
	var	result= ""//myDate.getFullYear()+ "-"
				+ (myDate.getMonth()+ 1)+ "-"
				+ myDate.getDate()+ " "
				+ (hh< 10?"0":"")
				+ hh+ ":"
				+ (mm< 10?"0":"")
				+ mm
				;
	return result;
}
RPG.howToUse= function(){
	// 图片展示

}
RPG.drawCover= function() {
	// 封面图
	RPG.setState(RPG.IN_COVER);
	let sLayer= effectLayer;
	// let bitmapdata = new LBitmapData(imglist["start_png"]);
	// let bitmap = new LBitmap(bitmapdata);
	sLayer.removeAllChild();
    backLayer.removeChildAt(1);

	// bitmap.scaleX = WIDTH/ bitmap.width;
	// bitmap.scaleY = HEIGHT/ bitmap.height;
	// bitmap.x = 0;
	// bitmap.y = 0;
	// bitmap.alpha = 1;
	// sLayer.addChild(bitmap);
	// 新的开始
    let button01= RPG.newButton(120, 30, (WIDTH- 120)/ 2, HEIGHT- 200, "新游戏", function(e){
    	// 按钮被透过窗口点击
    	if (RPG.checkState(RPG.IN_COVER)) {
			RPG.newGame();
		}
    });
    sLayer.addChild(button01);
    // 继续
    let button02= RPG.newButton(120, 30, (WIDTH- 120)/ 2, HEIGHT- 160, "载入进度", function(e){
    	if (RPG.checkState(RPG.IN_COVER)) {
	    	RPG.openLoadMenu();
	    }
	});
	button02.setState(LButton.STATE_DISABLE);
	sLayer.addChild(button02);
	// 使用说明
    let button03= RPG.newButton(120, 30, (WIDTH- 120)/ 2, HEIGHT- 120, "使用说明", function(e){
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
}

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
}

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
}
/**
 * 循环事件 
 * @param isHero 是否英雄
 * @param move 移动模式
 * @param data 图片数据
 * @param row 图片分割行数
 * @param col 图片分割列数
 * @param speed 人物速度
 **/
function Character(isHero,move=3,data,row=4,col=4,speed=3, aRpgEvent){
	base(this,LSprite,[]);
	var self = this;
	self.isHero = isHero;
	// 1=随机自动；2=指定路线；3=外部装饰
	self.moveMode= move;
	self.rpgEvent= aRpgEvent;
	//设定人物动作速度
	self.speed = speed;
	self.speedIndex = 0;
	self.pw= data.image.width/col;
	self.ph= data.image.height/row;
	//设定人物大小
	data.setProperties(0,0,data.image.width/col,data.image.height/row);
	//得到人物图片拆分数组
	var list = LGlobal.divideCoordinate(data.image.width,data.image.height,row,col);
	//设定人物动画
	self.anime = new LAnimation(this,data,list);
	self.stepArray= [];
	// 下一步的移动，类似{x:-1, y:0};
	// self.nextStep={x:0, y:0};
	/*
	//调整人物位置
	//self.anime.y -= 16;
	*/
	//设定不移动
	self.move = false;
	//在一个移动步长中的移动次数设定
	self.moveIndex = 0;
};
/**
 * 循环事件 
 **/
Character.prototype.onframe = function (){
	// 仅在地图状态下动作
	if (!RPG.checkState(RPG.UNDER_MAP)){
		return;
	}
	var self = this;
	if (!self.visible) {
		return;
	}
	//人物动作速度控制
	if(self.speedIndex++ < self.speed)return;
	self.speedIndex = 0;
	// 不可见的对象不移动
	// NPC自发移动
	if (self.moveMode == 1) {
		// 随机移动型
		var a= Math.floor(Math.random()* 14);
		if (a<4) {
			self.changeDir(a);
		}
		//console.log(a);
		//self.move= true;
	}
	//当人物可移动，则开始移动
	if(self.move){
		if (self.isHero){
			self.onmove();
		}else{
			self.easyMove();
		}
		if (stage.hasBig){
			RPG.resetChildIndex(charaLayer);
		}
	}
	//人物动画播放
	//console.log('1');
	self.anime.onframe();
};
// NPC移动
Character.prototype.easyMove = function (){
	// NPC移动，仅在地图控制或无控等待下可行
	if (!RPG.checkState(RPG.UNDER_MAP)) {
		return;		
	}
	var self = this;
	//设定一个移动步长中的移动次数
	var ml_cnt = 4;
	if (self.moveMode == 2) {
		ml_cnt = 1;
	}
	//计算一次移动的长度
	var ml = STEP/ml_cnt;
	//console.log("move: ", self.direction);
	//根据移动方向，开始移动
	switch (self.direction){
		case UP:
			self.y -= ml;
			break;
		case LEFT:
			self.x -= ml;
			break;
		case RIGHT:
			self.x += ml;
			break;
		case DOWN:
			self.y += ml;
			break;
	}
	self.moveIndex++;
	//当移动次数等于设定的次数，开始判断是否继续移动
	if(self.moveIndex >= ml_cnt){
		// 移动后，更改占位
		switch (self.direction){
			case UP:
				self.py--;
				break;
			case LEFT:
				self.px--;
				break;
			case RIGHT:
				self.px++;
				break;
			case DOWN:
				self.py++;
				break;
		}
		//console.log(self.px, self.py);
		// NPC移动后
		checkTouch();
		//
		self.moveIndex = 0;
		//self.px= 
		if(self.direction != self.direction_next){
			self.direction = self.direction_next;
			self.anime.setAction(self.direction);
		}		
		if(!self.checkRoad(self.direction)){
			self.move = false;			
		}
		if (self.moveMode == 2) {
			// 指定路径移动型，直接进入下一步
			self.stepArray= self.stepArray.slice(1);
			//console.log(self.stepArray);
			if (self.stepArray.length> 0){
				self.changeDir(self.stepArray[0]);
			} else {
				self.move= false;
			}
		} else if  (self.moveMode == 1) {
			// 对于随机移动的类型，进行预占位
			self.takePlace();
		}
	}
};
/**
 * 开始移动 
 **/
Character.prototype.onmove = function (){
	var self = this;
	//设定一个移动步长中的移动次数
	var ml_cnt = 2;
	//计算一次移动的长度
	var ml = STEP/ml_cnt;
	//根据移动方向，开始移动
	switch (self.direction){
		case UP:
			if(mapmove){
				mapLayer.y += ml;
				upLayer.y += ml;
				charaLayer.y += ml;
			}
			self.y -= ml;
			break;
		case LEFT:
			if(mapmove){
				mapLayer.x += ml;
				upLayer.x += ml;
				charaLayer.x += ml;
			}
			self.x -= ml;
			break;
		case RIGHT:
			if(mapmove){
				mapLayer.x -= ml;
				upLayer.x -= ml;
				charaLayer.x -= ml;
			}
			self.x += ml;
			break;
		case DOWN:
			if(mapmove){
				mapLayer.y -= ml;
				upLayer.y -= ml;
				charaLayer.y -= ml;
			}
			self.y += ml;
			break;
	}
	self.moveIndex++;
	//当移动次数等于设定的次数，开始判断是否继续移动
	if(self.moveIndex >= ml_cnt){
		// 移动后，更改占位
		switch (self.direction){
			case UP:
				self.py--;
				break;
			case LEFT:
				self.px--;
				break;
			case RIGHT:
				self.px++;
				break;
			case DOWN:
				self.py++;
				break;
		}
		//console.log(self.px, self.py);
		//self.px= self.x;
		//self.py= self.y;
		//一个地图步长移动完成后，判断地图是否跳转
		checkJump();
		checkTouch();
		self.moveIndex = 0;
		//一个地图步长移动完成后，如果地图处于滚动状态，则移除多余地图块
		if(self.isHero && mapmove){
			// MapLayer 复位到32的整数位
			if (mapLayer.x % STEP != 0) {
				console.log(mapLayer.x);
				mapLayer.x= mapLayer.x- mapLayer.x % STEP;
				upLayer.x= mapLayer.x;
				charaLayer.x= mapLayer.x;
			}
			if (mapLayer.y % STEP != 0) {
				console.log(mapLayer.y);
				mapLayer.y= mapLayer.y- mapLayer.y % STEP;
				upLayer.y= mapLayer.y;
				charaLayer.y= mapLayer.y;
			}
			//drawMap(CurrentMap);
			//delMap();
		}
		//判断方向是否改变
		if(self.direction != self.direction_next){
			self.direction = self.direction_next;
			self.anime.setAction(self.direction);
		}
		//如果已经松开移动键，或者前方为障碍物，则停止移动，否则继续移动
		//if(!isKeyDown || !self.checkRoad(self.direction)){
		//	self.move = false;
		//	return;
		//}
		// 继续移动情况下，重新计算移动方向
		if (isKeyDown){
			var ret= RPG.getMoveDir(mouseX, mouseY);
    		if (ret.length==0) {
		        //timer= setTimeout(RPG.openMenu, 500 );    
		        self.move= false;
		        return;		
    		} else {
				self.move = false;
	        	player.changeDirAlt(ret);
    		}		
    	}
		if(!isKeyDown || !self.checkRoad(self.direction)){
			self.move = false;
			return;
		}
		// 继续移动的情况下，进行预占位
		//self.takePlace();
		//地图是否滚动
   		self.checkMap(self.direction);
	}
};
// 预占位
Character.prototype.takePlace = function (){
	var self = this;
	var tox,toy,myCoordinate;
	if (self.moveMode==2){
		// 指定路线时，不受障碍物限制，也不存在占位问题
		return true;
	}
	var dir=self.direction;
	//获取人物坐标
	myCoordinate = self.getCoordinate();
	//开始计算移动目的地的坐标
	switch (dir){
		case UP:
			tox = myCoordinate.x;
			toy = myCoordinate.y - 1;
			break;
		case LEFT:
			tox = myCoordinate.x - 1;
			toy = myCoordinate.y ;
			break;
		case RIGHT:
			tox = myCoordinate.x + 1;
			toy = myCoordinate.y;
			break;
		case DOWN:
			tox = myCoordinate.x;
			toy = myCoordinate.y + 1;
			break;
	}
	self.nx= tox;
	self.ny= toy;
};
/**
 * 障碍物判断
 * @param 判断方向 
 **/
Character.prototype.checkRoad = function (dir){
	var self = this;
	var tox,toy,myCoordinate;
	if (self.moveMode==2){
		// 指定路线时，不受障碍物限制
		return true;
	}
	//当判断方向为空的时候，默认当前方向
	if(dir==null)dir=self.direction;
	//获取人物坐标
	myCoordinate = self.getCoordinate();
	//开始计算移动目的地的坐标
	switch (dir){
		case UP:
			tox = myCoordinate.x;
			toy = myCoordinate.y - 1;
			break;
		case LEFT:
			tox = myCoordinate.x - 1;
			toy = myCoordinate.y ;
			break;
		case RIGHT:
			tox = myCoordinate.x + 1;
			toy = myCoordinate.y;
			break;
		case DOWN:
			tox = myCoordinate.x;
			toy = myCoordinate.y + 1;
			break;
	}
	
	//如果移动的范围超过地图的范围，则不可移动
	if(toy <= -1 || tox <= -1)return false;
	if(toy >= CurrentMap.height || tox >= CurrentMap.width) return false;
	//如果目的地为障碍，则不可移动
	//return true;
	if(CurrentMapMove.data[toy*CurrentMap.width+ tox] > 0)return false;
	//如果前方有NPC，同样不可移动
	//return true;
	var key;
	for(key in charaLayer.childList){
		//判断前面有没有npc
		if (!charaLayer.childList[key].visible){
			// 不可见的NPC不在考虑内
			continue;
		}
		if(charaLayer.childList[key].x/ STEP == tox && charaLayer.childList[key].y/ STEP == toy){
			// NPC本身占位
			//return false;
		}
		if(charaLayer.childList[key].px == tox && charaLayer.childList[key].py == toy){
			// 对于运动中的NPC，则是它预占位
			return false;
		}
	}
	return true;
};
/**
 * 设定人物坐标
 * @param x方向坐标，y方向坐标 
 **/
Character.prototype.setCoordinate = function (ax,ay, aFace){
	var self = this;
	//根据人物坐标，计算人物显示位置
	self.px= ax;
	self.py= ay;
	self.anime.setAction(aFace);
	self.x = ax*STEP- (self.pw- STEP)/ 2;
	self.y = ay*STEP- (self.ph- STEP);
};
/**
 * 获取人物坐标
 **/
Character.prototype.getCoordinate = function (){
	var self = this;
	//return {x:Math.floor(self.x/STEP),y:Math.floor(self.y/STEP)};
	//return {x:self.x/STEP, y: self.y/STEP};
	return {x:self.px, y: self.py};
};
/**
 * 改变人物方向，并判断是否可移动
 **/
Character.prototype.changeDir = function (dir){
	var self = this;
	//如果正在移动，则无效
	if(!self.move && self.moveIndex==0){
		//设定人物方向
		self.direction = dir;
		self.direction_next = dir;
		//设定图片动画
		self.anime.setAction(dir);
		//判断是否可移动
		if(!self.checkRoad(dir))return;
		//地图是否滚动
		if(self.isHero) {
			self.checkMap(dir);
		}
		//如果可以移动，则开始移动
		self.move = true;
		//self.moveIndex = 0;
	}else if(dir != self.direction){
		self.direction_next = dir;
	}
};
// 两个方向选一
Character.prototype.changeDirAlt = function (dirs){
	//console.log("try", dirs);
	var self = this;
	//如果正在移动，则无效
	if(!self.move && self.moveIndex==0){
		//设定人物方向
		var dd= -1;
		if (dirs.length==1) {
			dd= dirs[0];
			self.direction = dd;
			self.direction_next = dd;
			//设定图片动画
			self.anime.setAction(dd);
			//判断是否可移动
			if(!self.checkRoad(dd))return;
			//
		} else {
			var found= false;
			for (var i= 0; i< dirs.length; i++) {
				dd= dirs[i];
				if(self.checkRoad(dd)) {
					found= true;
					break;
				}
			}
			if (found) {
				//console.log("choose", dd);
				self.direction = dd;
				self.direction_next = dd;
				//设定图片动画
				self.anime.setAction(dd);
			} else {
				return;
			}
		}
		//地图是否滚动
		if(self.isHero) {
			self.checkMap(dd);
		}
		//如果可以移动，则开始移动
		self.move = true;
		//self.moveIndex = 0;
	}else {
		dd= dirs[0];
		if(dd != self.direction){
			self.direction_next = dd;
		}
	}
};
/**
 * 地图是否滚动
 **/
Character.prototype.checkMap = function (dir){
	var self = this;
	var w1= Math.floor(WIDTH / 2);
	var w2= Math.ceil(WIDTH / 2);
	var h1= Math.floor(HEIGHT / 2);
	var h2= Math.ceil(HEIGHT / 2);
	mapmove = false;
	//如果不是英雄，则地图不需要滚动
	//console.log(self.y, charaLayer.y, HEIGHT / 2);
	if(!self.isHero)return;
	switch (dir){
		case UP:
			if(self.y + charaLayer.y> h1)break;
			if(mapLayer.y >= 0)break;
			//drawMap(CurrentMap);
			mapmove = true;
			break;
		case LEFT:
			//if(self.x + charaLayer.x > STEP)break;
			if(self.x + charaLayer.x  > w1)break;
			if(mapLayer.x >= 0)break;
			//addMap(-1,0);
			//drawMap(CurrentMap);
			mapmove = true;
			break;
		case RIGHT:
			//if(self.x < WIDTH - 2*STEP)break;
			if(self.x + charaLayer.x  < w2)break;
			if(WIDTH - mapLayer.x >= CurrentMap.width*STEP)break;
			//addMap(1,0);
			//drawMap(CurrentMap);
			mapmove = true;
			break;
		case DOWN:
			if(self.y+ charaLayer.y < h2)break;
			if(HEIGHT - mapLayer.y >= CurrentMap.height* STEP)break;
			//drawMap(CurrentMap);
			mapmove = true;
			break;
	}
};
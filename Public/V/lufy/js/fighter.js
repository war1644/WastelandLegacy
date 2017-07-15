// 在战斗窗口中的人物，以及菜单中的人物
// 有各种战斗动作，及施法效果
RPG.Fighter= function (data,row,col){
	base(this,LSprite,[]);
	let self = this;
	//设定人物动作速度
	self.speed = 3;
	self.speedIndex = 0;
	//设定人物大小
	data.setProperties(0,0,data.image.width/col,data.image.height/row);
	//得到人物图片拆分数组
	let list = LGlobal.divideCoordinate(data.image.width,data.image.height,row,col);
	//设定人物动画
	self.anime = new LAnimation(this,data,list);
	self.stepArray= [];
	//在一个移动步长中的移动次数设定
	self.moveIndex = 0;
	self.move= true;
};
/**
 * 循环事件 
 **/
RPG.Fighter.prototype.onframe = function (){
	// 仅在战斗和菜单状态下有效
	if (!RPG.checkState(RPG.UNDER_WINDOWS)) return;
	// 打开菜单时停止运动
	let self = this;
	if(self.speedIndex++ < self.speed) return;
	self.speedIndex = 0;
	self.anime.onframe();
};

// 改变人物朝向
RPG.Fighter.prototype.changeDir = function (dir){
	let self = this;
	self.direction = dir;
	self.anime.setAction(dir);
};

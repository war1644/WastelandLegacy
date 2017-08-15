// 两类内容
// 一类是战斗画面中的攻击效果动画
// 另一类是全局的动态效果，总之都是效果类
// 效果集合
let effectList=[];
let Effect = function (data,row,col){
	base(this,LSprite,[]);
	let self = this,list;
	//设定人物动作速度
	self.speed = 3;
	self.speedIndex = 0;
	self.frameId= 0;
    self.scaleX = 0.6;
    self.scaleY = 0.6;
    //设定帧动画大小
    // if (type){
        data.setProperties(0,0,(data.image.width/col)>>0,(data.image.height/row)>>0);
        //得到帧动画图片拆分数组
        list = LGlobal.divideCoordinate(data.image.width,data.image.height,row,col);
    // } else {
    //     let w = row;
    //     let h = col;
		// data.setProperties(0,0,w,h);
    //     let tmpCol = (data.image.width / w)>>0;
    //     let tmpRow = (data.image.height / h)>>0;
    //     //得到帧动画图片拆分数组
    //     list = LGlobal.divideCoordinate(data.image.width,data.image.height,tmpRow,tmpCol);
	// }

	// 动作效果合并
	let list2=[], list3=[];
	for (let i = 0; i< list.length; i++){
		list2 = list2.concat(list[i]);
	}
	list3.push(list2);
    //设定人物动画
	self.anime = new LAnimation(this,data,list3);
	self.maxFrame = list3[0].length;
	//在一个移动步长中的移动次数设定
	self.move = false;
	self.func = null;
};
/**
 * 循环事件 
 **/
Effect.prototype.onframe = function (){
	// 目前，仅战斗状态下有效
	if (!RPG.checkState(RPG.IN_FIGHTING)) return;
	let self = this;
	if (!self.move) return;
	if(self.speedIndex++ < self.speed) return;
	self.speedIndex = 0;
	self.anime.onframe();
    self.frameId++;

	if (self.frameId >= self.maxFrame) {
		self.move= false;
		if (self.func) self.func();
	}
};

Effect.prototype.play = function (aTimes, aFunc){
	// 打开菜单时停止运动
	let self = this;
	self.move= false;
	self.speedIndex = 0;
	self.anime.setAction(0, 0, 1, false);
	self.frameId= 0;
	self.func= aFunc;
	self.move= true;
};





// 两类内容
// 一类是战斗画面中的攻击效果动画
// 另一类是全局的动态效果，总之都是效果类

RPG.Effect= function (data, aw, ah){
	base(this,LSprite,[]);
	let self = this;
	//设定人物动作速度
	self.speed = 0;
	self.speedIndex = 0;
	self.frameId= 0;
	//设定人物大小
	data.setProperties(0,0,aw,ah);
	//得到人物图片拆分数组
	let col= data.image.width/ aw;
	let row= data.image.height/ ah;
	let list = LGlobal.divideCoordinate(data.image.width,data.image.height,row,col);
	// 动作效果合并
	let list2=[], list3=[];
	for (let i= 0; i< list.length; i++){
		list2= list2.concat(list[i]);
	}
	list3.push(list2);
	//console.log(list);	
	//console.log(list2);	
	//console.log(list3);	
	//设定人物动画
	self.anime = new LAnimation(this,data,list3);
	self.maxFrame= list3[0].length;
	//在一个移动步长中的移动次数设定
	self.move= false;
	self.func= null;
};
/**
 * 循环事件 
 **/
RPG.Effect.prototype.onframe = function (){
	// 目前，仅战斗状态下有效
	if (!RPG.checkState(RPG.IN_FIGHTING)) return;
	let self = this;
	if (!self.move) return;
	if(self.speedIndex++ < self.speed) return;
	self.speedIndex = 0;
	self.anime.onframe();
	self.frameId++;
	//console.log(self.frameId);
	//*
	if (self.frameId>= self.maxFrame) {
		self.move= false;
		if (self.func){
			self.func();
		}
	}//*/
};

RPG.Effect.prototype.play = function (aTimes, aFunc){
	// 打开菜单时停止运动
	let self = this;
	self.move= false;
	self.speedIndex = 0;
	self.anime.setAction(0, 0, 1, false);
	self.frameId= 0;
	self.func= aFunc;
	self.move= true;
	//self.anime.removeAllEventListener();
	//self.anime.addEventListener(LEvent.COMPLETE, aFunc);
};

RPG.loadEffect= function(aName){
	if (!RPG.effectList[aName]){
		let bitmapData, chara;
        bitmapData = new LBitmapData(imglist[aName]);
		chara = new RPG.Effect(bitmapData, 48, 48);
		RPG.effectList[aName]= chara;
	}
	return RPG.effectList[aName];
};

// 屏幕从黑切换到白，模拟过去了一天的效果
RPG.nightAndDay= function(aFunc){
	let bmp= RPG.drawWindow(effectLayer,0,0,WIDTH,HEIGHT,0);
	LTweenLite.to(bmp,2,
		{alpha:1,ease:Quad.easeOut,
			onComplete:function(){
				//console.log("c");
				LTweenLite.to(bmp,2,
					{alpha:0,ease:Quad.easeIn,
						onComplete:function(){
							effectLayer.removeChild(bmp);
							if (aFunc) {
								aFunc();
							}
						}
					}
				)
			}
		}
	)
};

// 显示获得物品
RPG.showGetItem= function(id, num){
    RPG.drawWindow(effectLayer,0,0,WIDTH, 40);
	let item1 = RPG.ItemList[id],
		gap = 10,
		// 图片
		bitmapData = new LBitmapData(imglist["iconset"], item1.pic.x*RPG.iconStep, item1.pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep),
		bitmap = new LBitmap(bitmapData);
		bitmap.x= gap* 2;
		bitmap.y= gap;
		effectLayer.addChild (bitmap);
		// 物品名称
		let text = new LTextField();
		text.x = gap* 2+ 30;
		text.y = gap+ 5;
		text.size = "14";
		text.color = "#FFFFFF";
		text.text = item1.name;
		effectLayer.addChild(text);
		// 物品数量
		text = new LTextField();
		text.x = 180;
		text.y = gap+ 5;
		text.size = "14";
		text.color = "#FFFFFF";
		text.text = num;
		effectLayer.addChild(text);
	setTimeout(function(){
		effectLayer.removeAllChild();
	}, 1000);
};

// 战场指挥的各种控制
// 战场指挥主菜单

RPG.setFormation= function(){
	// 暂时不会
	if (!RPG.fightMenuLayer) {
		RPG.fightMenuLayer = new LSprite();
	}
	RPG.fightMenuLayer.removeAllChild();
	let x0 = 0;
	let y0 = HEIGHT - 150;
	let name = new LTextField();
	name.x = WIDTH/ 2;
	name.y = HEIGHT- 125;
 	name.textAlign= "center";
	name.textBaseline= "middle";
	name.size = "15";
	name.color = "#FFFFFF";
	name.text = "还未学会此能力";
	UI.drawBorderWindow(RPG.fightMenuLayer, x0, y0, RPG.menuWidth, 50);
	RPG.fightMenuLayer.addChildAt(name, 1);
	talkLayer.addChild(RPG.fightMenuLayer);
};

RPG.closeFormation= function(){
	talkLayer.removeChild(RPG.fightMenuLayer);
	RPG.fightMenuLayer.removeAllChild();
};

function showFightInfo(){
	// 
	if (!RPG.fightMenuLayer) {
		RPG.fightMenuLayer = new LSprite();
	}
	RPG.fightMenuLayer.removeAllChild();
	let x0 = 0;
	let y0 = HEIGHT - 150;
	UI.drawBorderWindow(RPG.fightMenuLayer, x0, y0, RPG.menuWidth, 50)
	talkLayer.addChild(RPG.fightMenuLayer);
};

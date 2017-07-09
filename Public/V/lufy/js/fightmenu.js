// 战场指挥的各种控制
// 战场指挥主菜单

RPG.setFormation= function(){
	// 暂时不会
	if (!RPG.fightMenuLayer) {
		RPG.fightMenuLayer = new LSprite();
	}
	RPG.fightMenuLayer.removeAllChild();
	var x0= 0
	var y0= HEIGHT- 150;
	var name = new LTextField();
	name.x = WIDTH/ 2;
	name.y = HEIGHT- 125;
 	name.textAlign= "center";
	name.textBaseline= "middle";
	name.size = "15";
	name.color = "#FFFFFF";
	name.text = "还未学会此能力";
	RPG.drawWindow(RPG.fightMenuLayer, x0, y0, RPG.menuWidth, 50);
	RPG.fightMenuLayer.addChildAt(name, 1);
	talkLayer.addChild(RPG.fightMenuLayer);
}

RPG.closeFormation= function(){
	talkLayer.removeChild(RPG.fightMenuLayer);
	RPG.fightMenuLayer.removeAllChild();
}

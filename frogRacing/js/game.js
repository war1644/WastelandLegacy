var Game = function() {

	// canvas
	this.el_canvas = document.getElementById('canvas');
	this.ctx = this.el_canvas.getContext('2d');
	this.WIDTH = this.el_canvas.width;
	this.HEIGHT = this.el_canvas.height;
	this.ratio = this.WIDTH / document.body.clientWidth;

	this.el_fps = document.getElementById('fps');
	this.last_frame_time = 0;
	this.fps_update_time = 0;
	this.fps = 60;
	this.sprites = [];
	this.user = {
		amount: parseInt($('#amount').text()),
		bet: parseInt($('#bet').text()),
		num: 0,
	};

	// image
	this.IMG_BG = new Image();
	this.IMG_BG.src = 'image/game_bg.png';
	this.IMG_SHEET = new Image();
	this.IMG_SHEET.src = 'image/game_sheet.png';

	// sound
	this.SOUND_BGM = document.getElementById('bgmSound');

	// parm
	this.TRACK = {
		x: 0,
		y: 0,
		width: 420,
		height: 64,
		count: 4,
	};
	this.FROGS = [{
		name: '哈姆雷特', // 名称
		odds: 3, // 赔率
		gold: 100, // 最小赌注
		prob: 0.25, // 跑动概率
		freq: 250, // 跑动&检测频率
		speed: 600, // 跑动速度
		cell: {
			x: 0,
			y: 0,
			width: 30,
			height: 30,
			count: 3,
		},
	}, {
		name: '沙皇',
		odds: 5,
		gold: 90,
		prob: 0.2,
		freq: 200,
		speed: 500,
		cell: {
			x: 0,
			y: 30,
			width: 30,
			height: 30,
			count: 3,
		},
	}, {
		name: '苏格拉底',
		odds: 2,
		gold: 80,
		prob: 0.3,
		freq: 150,
		speed: 300,
		cell: {
			x: 0,
			y: 60,
			width: 20,
			height: 20,
			count: 3,
		},
	}, {
		name: '凯撒',
		odds: 7,
		gold: 70,
		prob: 0.35,
		freq: 120,
		speed: 240,
		cell: {
			x: 0,
			y: 90,
			width: 20,
			height: 20,
			count: 3,
		},
	}, {
		name: '法拉利',
		odds: 3,
		gold: 60,
		prob: 0.95,
		freq: 100,
		speed: 160,
		cell: {
			x: 0,
			y: 120,
			width: 16,
			height: 16,
			count: 3,
		},
	}, {
		name: '路易',
		odds: 9,
		gold: 50,
		prob: 0.88,
		freq: 80,
		speed: 240,
		cell: {
			x: 0,
			y: 150,
			width: 16,
			height: 16,
			count: 3,
		},
	}, {
		name: '拿破仑',
		odds: 5,
		gold: 40,
		prob: 0.45,
		freq: 80,
		speed: 140,
		cell: {
			x: 0,
			y: 180,
			width: 14,
			height: 14,
			count: 3,
		},
	}, {
		name: '尼罗',
		odds: 8,
		gold: 30,
		prob: 0.5,
		freq: 60,
		speed: 100,
		cell: {
			x: 0,
			y: 210,
			width: 10,
			height: 10,
			count: 3,
		},
	}];

};

Game.prototype = {

	createFrogSprite: function(n) {
		var sheet = new Sheet(this.IMG_SHEET, this.FROGS[n].cell);
		var sprite;
		if (n === 4 || n === 5) {
			sprite = new Sprite('frog', sheet, [new walkBehavior(this.FROGS[n].freq)]);
		} else {
			sprite = new Sprite('frog', sheet, [new jumpBehavior(this.FROGS[n].freq)]);
		}
		sprite.name = this.FROGS[n].name;
		sprite.odds = this.FROGS[n].odds;
		sprite.gold = this.FROGS[n].gold;
		sprite.prob = this.FROGS[n].prob;
		sprite.speedX = this.FROGS[n].speed;
		sprite.end = this.TRACK.x + 15 - sprite.width / 2;
		sprite.status = 0;
		sprite.rank = 0;
		return sprite;
	},

	createSprites: function() {
		var arr = help.randomInts(0, this.FROGS.length - 1, 4);
		for (var i = 0, frog; i < this.TRACK.count; i++) {
			frog = this.createFrogSprite(arr[i]);
			frog.num = i + 1;
			frog.x = this.TRACK.x + this.TRACK.width - 50 - frog.width / 2;
			frog.y = this.TRACK.y + this.TRACK.height - 10 - 12 * (this.TRACK.count - i - 1) - frog.height;
			this.sprites.push(frog);
		}

	},

	updateSprites: function(now) {
		for (var i = 0, len = this.sprites.length, sprite; i < len; i++) {
			sprite = this.sprites[i];
			if (sprite.visible) {
				sprite.update(now, this.fps, this.ctx);
			}
		}
	},

	clearSprites: function() {
		for (var i = this.sprites.length - 1, sprite; i >= 0; i--) {
			sprite = this.sprites[i];
			if (sprite.visible === 0) {
				this.sprites.splice(i, 1);
			}
		}
	},

	drawSprites: function() {
		for (var i = 0, len = this.sprites.length, sprite; i < len; i++) {
			sprite = this.sprites[i];
			if (sprite.visible) {
				sprite.draw(this.ctx);
			}
		}
	},

	drawBackground: function() {
		this.ctx.drawImage(this.IMG_BG, this.TRACK.x, this.TRACK.y, this.TRACK.width, this.TRACK.height);
	},

	draw: function(now) {
		this.updateSprites(now);
		this.clearSprites();
		this.drawBackground();
		this.drawSprites();
	},

	getFps: function(now) {
		now === undefined && (now = 0);

		var fps = 1000 / (now - this.last_frame_time);
		this.last_frame_time = now;
		if (now - this.fps_update_time > 1000) {
			this.fps_update_time = now;
			this.el_fps.innerHTML = fps.toFixed(0) + ' fps';
		}
		return fps;
	},

	animate: function(now) {
		// game.fps = game.getFps(now);
		game.draw(now);
		window.RAF(game.animate);
	},

	init: function() {
		var _this = this;
		$(document.body).on('touchmove', function(e) {
            e.preventDefault();
		});

		$('#btns').on('click', 'li', function() {
			if (_this.user.num > 0) return;
			if (_this.sprites[$(this).index()].gold * _this.user.bet > _this.user.amount) {
				help.showMsg('余额不足！请调整下注数量！');
				return;
			}
            _this.SOUND_BGM.play();

            _this.user.num = $(this).index() + 1;
			$(this).addClass('active');
			$('#info').find('li').eq(_this.user.num - 1).addClass('active');
			$('#bet').addClass('active');
			help.countdown(3, function() {
				for (var i = 0, len = _this.sprites.length; i < len; i++) {
					_this.sprites[i].status = 1;
				}
			});
		});
		$('#betAdd').on('click', function() {
			if (_this.user.num > 0) return;
			_this.user.bet = help.addLimit(_this.user.bet, 1, 10);
			$('#bet').html(_this.user.bet);
		});
		$('#betSub').on('click', function() {
			if (_this.user.num > 0) return;
			_this.user.bet = help.addLimit(_this.user.bet, -1, 1);
			$('#bet').html(_this.user.bet);
		});
		// $('#resetBtn').on('click', function(){
		// 	$(this).hide();
		// 	_this.start();
		// });
		this.start();
		this.animate();
	},

	start: function() {
		this.user.num = 0;
		this.sprites = [];
		this.createSprites();
		for (var i = 0, len = this.sprites.length, str = ''; i < len; i++) {
			str += '<li><span class="name">' + this.sprites[i].name + '</span><span class="odds">' + this.sprites[i].odds + '</span><span class="stake">' + this.sprites[i].gold + '</span></li>';
		}
		$('#info').html(str);
		$('#btns').find('li').removeClass('active');
		$('#bet').removeClass('active');
	},

	over: function() {
		var _this = this;
		var t = this.user.bet;
		var $amount = $('#amount');
		var sp = this.sprites[this.user.num - 1];
		var change = (sp.rank === 1) ? sp.gold * t : -sp.gold * t;
		_this.user.amount += change;
		$amount.html(_this.user.amount);
		help.showMsg(sp.name + (change > 0 ? '获胜了！<br>你得到了' : '不给力啊！<br>你损失了') + change);
        _this.SOUND_BGM.pause();
        _this.start();
	}
};
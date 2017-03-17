/*
 * 动画调用
 */
window.RAF = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

/*
 * 图像类
 */
var Sheet = function(image, cell) {
	this.image = image;
	this.x = cell.x || 0;
	this.y = cell.y || 0;
	this.width = cell.width || 0;
	this.height = cell.height || 0;
	this.count = cell.count || 1;
	this.index = 0;
};
Sheet.prototype = {
	advance: function() {
		if (this.index === this.count - 1) {
			this.index = 0;
		} else {
			this.index++;
		}
	},
	draw: function(sprite, ctx) {
		ctx.drawImage(this.image, this.x + this.index * this.width, this.y, this.width, this.height, sprite.x, sprite.y, this.width, this.height);
	}
};

/*
 * 行为类
 */
var CycleBehavior = function(interval, delay) {
	this.interval = interval || 0;
	this.delay = delay || 0;
	this.last_time = 0;
};
CycleBehavior.prototype = {
	execute: function(sprite, time, fps) {
		if (this.last_time === 0) {
			this.last_time = time;
		}
		if (this.delay && sprite.sheet.index === 0) {
			if (time - this.last_time > this.delay) {
				sprite.sheet.advance();
				this.last_time = time;
			}
		} else if (time - this.last_time > this.interval) {
			sprite.sheet.advance();
			this.last_time = time;
		}
	}
};

var jumpBehavior = function(interval) {
	this.interval = interval || 0;
	this.last_time = 0;
};
jumpBehavior.prototype = {
	execute: function(sprite, time, fps) {
		if (sprite.status !== 1) return;
		if (this.last_time === 0) {
			this.last_time = time;
		}
		if (time - this.last_time > this.interval) {
			this.last_time = time;
			if (sprite.sheet.index === 0 && !this.canRun(sprite.prob)) return;

			sprite.sheet.advance();
			sprite.x -= sprite.speedX / fps;
			if (sprite.x <= sprite.end) {
				sprite.x = sprite.end;
				if (sprite.sheet.index === 0) {
					sprite.status = 2;
					for (var i = 0, len = game.sprites.length; i < len; i++) {
                        game.sprites[i].status === 2 && (sprite.rank++);
                    }
                    // sprite.rank++;
					$('#info').find('li').eq(sprite.num - 1).append('<span class="rank">' + sprite.rank + '</span>');
					// if (sprite.rank === game.TRACK.count) {
						game.over();
					// }
				}
			}
		}
	},
	canRun: function(prob) {
		var p = (0.5 + 100 * (1 - prob)) | 0;
		var r = Math.floor(Math.random() * 100);
		if (r >= p) {
			return true;
		}
		return false;
	}
};

var walkBehavior = function(interval) {
	this.interval = interval || 0;
	this.last_time = 0;
};
walkBehavior.prototype = {
	execute: function(sprite, time, fps) {
		if (sprite.status !== 1) return;
		if (this.last_time === 0) {
			this.last_time = time;
		}
		if (time - this.last_time > this.interval) {
			if (this.canRun(sprite.prob)) {
				this.last_time = time;
				sprite.sheet.advance();
				sprite.sheet.index === 0 && (sprite.sheet.index = 1);
				sprite.x -= sprite.speedX / fps;
				if (sprite.x <= sprite.end) {
					sprite.x = sprite.end;
					sprite.sheet.index = 0;
					sprite.status = 2;
					for (var i = 0, len = game.sprites.length; i < len; i++) {
						game.sprites[i].status === 2 && (sprite.rank++);
					}
					$('#info').find('li').eq(sprite.num - 1).append('<span class="rank">' + sprite.rank + '</span>');
					// if (sprite.rank === game.TRACK.count) {
						game.over();
					// }
				}
			} else {
				sprite.sheet.index = 0;
				this.last_time = time + this.interval * 10;
			}
		}
	},
	canRun: function(prob) {
		var p = (0.5 + 100 * (1 - prob)) | 0;
		var r = Math.floor(Math.random() * 100);
		if (r >= p) {
			return true;
		}
		return false;
	}
};

/*
 * 精灵类
 */
var Sprite = function(name, sheet, behaviors) {
	this.name = name || '';
	this.sheet = sheet;
	this.behaviors = behaviors || [];
	this.width = sheet.width || 0;
	this.height = sheet.height || 0;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.rotate = 0;
	this.speedX = 0;
	this.speedY = 0;
	this.opacity = 1.0;
	this.visible = 1;
};
Sprite.prototype = {
	draw: function(ctx) {
		ctx.save();
		/*
		// 透明度
		ctx.globalAlpha = this.opacity;
		// 旋转
		if (this.rotate !== 0) {
			ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
			ctx.rotate(this.rotate * Math.PI / 180);
			ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
		}
		// 缩放
		if (this.scaleX != 1 || this.scaleY != 1) {
			ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
			ctx.scale(this.scaleX, this.scaleY);
			ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
		}
		*/
		if (this.sheet && this.visible) {
			this.sheet.draw(this, ctx);
		}
		ctx.restore();
	},
	update: function(time, fps, ctx) {
		for (var i = 0; i < this.behaviors.length; i++) {
			if (this.behaviors[i] === undefined || !time) return;
			this.behaviors[i].execute(this, time, fps, ctx);
		}
	}
};

/*
 * 场景
 */
var scene = (function() {
	var obj = {};
	_page_now = '';
	_page_last = '';
	_zindex = 1;

	obj.moveTo = function(page, anime) {
		var anime_in = anime || '';
		if (_page_now === page) return;

		_page_last = _page_now;
		_page_now = _page;
		$(_page_now).css('zIndex', ++_zindex).addClass(anime_in).one('webkitAnimationEnd', function() {
			$(_page_last).removeClass();
		});
	};
	obj.moveIn = function(page, anime) {
		var anime_in = anime || '';
		if (_page_now === page) return;
		$(page).css('zIndex', ++_zindex).addClass(anime_in);
	};
	obj.moveOut = function(page, anime) {
		var anime_out = anime || '';
		if (_page_now !== page) return;
		$(page).addClass(anime_out).one('webkitAnimationEnd', function() {
			$(this).attr('style', '').removeClass();
		});
	};
	return obj;
})();

/*
 * 声音
 */
var sound = (function() {
	var obj = {};
	var _audios = [new Audio(), new Audio(), new Audio(), new Audio(), new Audio()];

	obj.isPlaying = function(audio) {
		return !audio.ended && audio.currentTime > 0;
	};
	obj.play = function(audio) {
		if (this.isPlaying(audio)) {
			var track;
			for (var i = 0, len = _audios.length; i < len; i++) {
				track = _audios[i];

				if (!this.isPlaying(track)) {
					track.src = audio.currentSrc;
					track.load();
					track.play();
					break;
				}
			}
		} else {
			audio.play();
		}
	};
	return obj;
})();

/*
 * 辅助
 */
var help = {
	randomInt: function(m, n) {
		return Math.floor(Math.random() * (n + 1 - m) + m);
	},

	randomInts: function(m, n, len) {
		var arr = [];
		var num = m;
		while (num <= n) {
			arr.push(num);
			num++;
		}
		arr.sort(function(a, b) {
			return Math.random() > 0.5 ? -1 : 1;
		});
		return arr.splice(0, len);
	},

	addLimit: function(base, add, limit) {
		var sum = base + add;
		if (add >= 0) {
			sum > limit && (sum = limit);
		} else {
			sum < limit && (sum = limit);
		}
		return sum;
	},

	checkCollision: function(obj1, obj2, lap) {
		//  l1-------r1  t1             l2-------r2  t2
		//  +--------+   |             	+--------+   |
		//  |  obj1  |   | 	            |  obj2  |   | 
		//  |        |   |              |        |   |
		//  +--------+   b1             +--------+   b2
		var lap1 = lap || 0;
		var t1 = obj1.y + lap1;
		var r1 = obj1.x + obj1.width - lap1;
		var b1 = obj1.y + obj1.height - lap1;
		var l1 = obj1.x + lap1;

		var t2 = obj2.y;
		var r2 = obj2.x + obj2.width;
		var b2 = obj2.y + obj2.height;
		var l2 = obj2.x;

		if (b1 < t2 || l1 > r2 || t1 > b2 || r1 < l2) {
			return false;
		}
		return true;
	},

	pointInSprite: function(x, y, sprite, ctx) {
		ctx.beginPath();
		ctx.rect(sprite.x, sprite.y, sprite.width, sprite.height);
		return ctx.isPointInPath(x, y);
	},

	countdown: function(n, callback) {
		var $countdown = $('#countdown');
		var count = n || 3;
		$countdown.show().find('strong').html(count);
		var timer = setInterval(function() {
			$countdown.find('strong').html(--count);
			if (count <= 0) {
				clearInterval(timer);
				$countdown.hide();
				callback();
			}
		}, 1000);
	},

	countTime: function(time, callback) {
		var $resttime = $('#resttime');
		if (time <= 0) {
			callback();
			return;
		}
		var dd = parseInt(time / 60 / 60 / 24);
		var hh = parseInt(time / 60 / 60 % 24);
		var mm = parseInt(time / 60 % 60);
		var ss = parseInt(time % 60);
		var timer = setInterval(function() {
			ss--;
			if (ss < 0) {
				ss = 59;
				mm--;
				if (mm < 0) {
					mm = 59;
					hh--;
					if (hh < 0) {
						hh = 23;
						dd--;
						if (dd < 0) {
							dd = 0;
							hh = 0;
							mm = 0;
							ss = 0;
							clearInterval(timer);
							callback();
						}
					}
				}
			}
			$resttime.html('<i>' + (hh < 10 ? '0' + hh : hh) + '</i> : <i>' + (mm < 10 ? '0' + mm : mm) + '</i> : <i>' + (ss < 10 ? '0' + ss : ss) + '</i>');
		}, 1000);
	},

	loadImgs: function(urls, callback) {
		var load_amount = urls.length;
		var load_count = 0;
		var load_rate = 0;
		var img_rate = Math.floor(100 / load_amount);
		var img_arr = [];
		var el_tube = document.getElementById('tube');
		var el_rate = document.getElementById('rate');

		for (var i = 0; i < load_amount; i++) {
			img_arr[i] = new Image();
			img_arr[i].onload = (function() {
				return function(){
					load_count++;
				};
			})();
			img_arr[i].src = urls[i];
		}
		var timer = setInterval(function() {
			el_tube.style.width = load_rate + '%';
			el_rate.innerHTML = load_rate + ' %';

			if (load_count < load_amount) {
				if (load_rate < load_count * img_rate) {
					load_rate++;
				}
			} else {
				if (load_rate < 100) {
					load_rate++;
				} else {
					clearInterval(timer);
					setTimeout(function() {
						callback();
					}, 1000);
				}
			}
		}, 30);
	},

	showMsg: function(msg) {
		if (!$('#msg')[0]) {
			$('body').append('<div id="msg"></div>');
		}
		$('#msg').removeClass('show');
		setTimeout(function() {
			$('#msg').html(msg).addClass('show');
		}, 100);
	}
};
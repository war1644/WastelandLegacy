/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆██▄▄▃▂
 *  ████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏声效基类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2018/1/16 21:10 初版
 */

let deposit = [];
class Sound {
    constructor(tag, loop) {
        this.source = tag.src;
        this.loop = !!loop;
        this.setVolume(0.6);
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        if (this.element)
            this.element.volume = Sound.volume * this.volume;
    }

    play() {
        if (this.element || Sound.active > Sound.channels)
            return;
        let me = this;
        me.element = Sound.createAudio(this.source);
        me.setVolume(me.volume);
        let ended = function () {
            if (me.loop) {
                this.currentTime = 0;
                this.play();
            } else {
                me.element = undefined;
                this.removeEventListener('ended', ended);
                Sound.destroyAudio(this);
            }
        };
        me.element.addEventListener('ended', ended);
        if (Sound.enabled)
            me.element.play();
    }

    static createAudio(src) {
        let d;
        Sound.active++;
        for (let i = deposit.length; i--;) {
            d = deposit[i];
            if (!d.active && d.src === src) {
                d.active = true;
                d.element.currentTime = 0;
                return d.element;
            }
        }
        d = {
            active: true,
            src: src,
            element: new Audio(src),
        };
        deposit.push(d);
        return d.element;
    }

    static destroyAudio(element) {
        Sound.active--;
        for (let i = deposit.length; i--;) {
            if (deposit[i].element === element) {
                deposit[i].active = false;
                break;
            }
        }
    }

    static disable() {
        if (Sound.enabled) {
            Sound.enabled = false;
            for (let i = deposit.length; i--;) {
                if (deposit[i].active)
                    deposit[i].element.pause();
            }
        }
    }

    static enable() {
        if (!Sound.enabled) {
            Sound.enabled = true;
            for (let i = deposit.length; i--;) {
                if (deposit[i].active)
                    deposit[i].element.play();
            }
        }
    }

    static setVolume(volume) {
        Sound.volume = volume;
        for (let i = deposit.length; i--;) {
            deposit[i].element.volume = volume;
        }
    }
}
Sound.volume = 1.0;
Sound.channels = 6;
Sound.active = 0;
Sound.sounds = [];
Sound.enabled = true;
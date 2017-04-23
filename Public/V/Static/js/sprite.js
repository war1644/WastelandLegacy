/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏客户端动画库
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/02/11 初版
 */
(function() {
    /**
     *  url：这个sprite的图像的路径
     *  pos：这个sprite的图像中的x和y坐标
     *  size：sprite的大小（只有一个关键帧）
     *  speed：以帧/秒为单位的速度，用于动画
     *  frames：用于动画化的帧索引的数组：[0,1,2,1]
     *  dir：当动画为“水平”（默认）或“垂直”时，在子画面地图中移动的方向：
     *  once：true只运行一次动画，默认为false
     */
    function Sprite(url, pos, size, speed, frames, dir, once) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
        this.running = false;
    }

    Sprite.prototype = {
        update: function(dt) {
            this._index += this.speed*dt;
        },
        //渲染
        render: function(ctx) {
            var frame;

            if(this.speed > 0 && this.running) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

                if(this.once && idx >= max) {
                    this.done = true;
                    return;
                }
            } else {
                frame = 0;
            }


            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir == 'vertical') {
                y += frame * this.size[1];
            } else {
                x += frame * this.size[0];
            }
            // console.log(x,y);
            ctx.drawImage(
                resources.get(this.url),
                x, y,
                this.size[0], this.size[1],
                0, 0,
                this.size[0], this.size[1]
            );
        }
    };

    window.Sprite = Sprite;
})();
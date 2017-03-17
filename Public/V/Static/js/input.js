/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 玩家输入处理
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v1.0     2017/02/11      初版
 */
(function() {
    var pressedKeys = {};

    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        switch(code) {
            case 13:
                key = 'ENTER'; break;
            case 32:
                key = 'SPACE'; break;
            case 37:
                key = 'LEFT'; break;
            case 38:
                key = 'UP'; break;
            case 39:
                key = 'RIGHT'; break;
            case 40:
                key = 'DOWN'; break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
                console.log(key);
        }

        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
        // $("#sprite").css({
        //     "animation-play-state" : "paused"
        // });
        player.sprite.running=false;
    });

    window.addEventListener('blur', function() {
        pressedKeys = {};
    });

    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();

//监听鼠标点击的canvas的坐标
function getMousePos(canvas) {
    canvas.addEventListener('click', function(e) {
        var rect = canvas.getBoundingClientRect();
        return {x: e.clientX - rect.left,y:e.clientY - rect.top}
    }, false);
}
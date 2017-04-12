/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏客户端物理碰撞检测
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/02/10 初版
 */
function checkPlayerBounds(x,y) {
    // Check bounds
    if(x < 0) {
        return false;
    } else if(x > mapWidth ) {
        return false;
    }

    if(y < 0) {
        return false;
    } else if(y > mapHeight) {
        return false;

    }
    return true;
}
//碰撞检测
function checkCollisions(x,y,dir) {
    if (!checkPlayerBounds(x,y)){
        return false;
    }
    var tmpX = x/tileSize;
    var tmpY = y/tileSize;
    var x1 = Math.round(tmpX);
    var y1 = Math.floor(tmpY);


    if(!mapPass[y1][x1]) {
        console.log('x:'+x1+'y:'+y1+' 不能通过');
        switch (dir){
            case 1:
                y1+=1;
                break;
            case 2:
                x1+=1;
                break;
            case 3:
                x1-=1;
                break;
            case 4:
                y1-=1;
                break;
        }
        player.pos = [x1,y1];
        return false;
    } else {
        player.pos = [x1,y1];
        return true;
    }

}
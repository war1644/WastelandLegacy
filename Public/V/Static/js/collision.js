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
    } else if(x > map.width ) {
        return false;
    }

    if(y < 0) {
        return false;
    } else if(y > map.height) {
        return false;
    }
    return true;
}
//碰撞检测
function checkCollisions(x,y) {
    if (!checkPlayerBounds(x,y)){
        return false;
    }
    if(mapPass[y][x] !== 0) {
        return false;
    }
    return true;

}
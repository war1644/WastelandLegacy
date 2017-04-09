<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 客户端访客类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @since
 * v2017/04/09 初版
 */

namespace App\C\Home;

use App\M\MapsM;

class MapC extends HomeC {
    /**
     * 获取地图数据
     */
    public function getMap() {
        $map = new MapsM();
        $result = $map->getMap(Session('mapId'));
        return ResultFormat($result);
    }
}
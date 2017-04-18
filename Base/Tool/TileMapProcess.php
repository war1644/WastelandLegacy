<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 处理瓦片编辑器保存的瓦片地图，tmx文件
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/4/18 初版
 */

namespace Base\Tool;


class TileMapProcess {
    public static function loadTmx($name){
        $xml = simplexml_load_file(RUN_PATH.'Assets/'.$name); //创建 SimpleXML对象
        return ResultFormat($xml);
//         json_decode($json,TRUE);
    }
}
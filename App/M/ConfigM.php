<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏网站配置模型
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/11 初版
 */

namespace App\M;


class ConfigM extends AppModel {
    /**
     * 获取地图数据
     */
    public function getConfig($id,$field='*') {
        $sql = "SELECT $field FROM $this->table WHERE id=?";
        $result = $this->executeSql($sql,[$id]);
        if ($result) {
            return ['code' => 1, 'msg' => '', 'data' => $result];
        } else {
            return ['code' => -1, 'msg' => 'data empty'];
        }
    }
}
<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏人物职业模型
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/03/22 初版
 */

namespace App\M;


class ItemsM extends AppModel {
    /**
     * 获取帐号信息
     */
    public function getAuth($data,$field='*') {
        $keys = array_keys($data);
        $values = array_values($data);
        $str = join('=? and ',$keys);
        $sql = "SELECT $field FROM $this->table WHERE $str=?";
        return $this->executeSql($sql,$values);
    }

}
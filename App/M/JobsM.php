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


class JobsM extends AppModel {
    public function getCurr() {
        $sql = "SELECT `name`,movePic,battlePic,description FROM $this->table WHERE id>? limit 10";
        $result = $this->executeSql($sql,[1],'all');
        if ($result) {
            return ['code' => 1, 'msg' => '', 'data' => $result];
        } else {
            return ['code' => -1, 'msg' => 'data empty'];
        }
    }
}
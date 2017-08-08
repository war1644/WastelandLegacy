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
    private  $hostNpc = '/images/charasets/';
    private  $hostBattle = '/images/battler/';

    public function getCurr() {
//        $sql = "SELECT `name`,CONCAT('$this->hostNpc',movePic) as movePic,CONCAT('$this->hostBattle',battlePic) as battlePic,description FROM $this->table WHERE id>? limit 10";
        $sql = "SELECT id,`name`,movePic,fightPic,description FROM $this->table limit 6";
        $result = $this->executeSql($sql,[],'all');
        if ($result) {
            return ['code' => 1, 'msg' => '', 'data' => $result];
        } else {
            return ['code' => -1, 'msg' => 'data empty'];
        }
    }

    public function getJob($id,$field='*') {
        $sql = "SELECT $field FROM $this->table WHERE id = ?";
        $result = $this->executeSql($sql,[$id]);
        if ($result) {
            return ['code' => 1, 'msg' => '', 'data' => $result];
        } else {
            return ['code' => -1, 'msg' => 'data empty'];
        }
    }
}
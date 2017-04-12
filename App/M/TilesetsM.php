<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏瓦片集模型
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/09 初版
 */

namespace App\M;

class TilesetsM extends AppModel {
    /**
     * 获取瓦片集数据
     */
    public function getTileSet($id,$field='*') {
        $sql = "SELECT $field FROM $this->table WHERE id=?";
        $result = $this->executeSql($sql,[$id]);
        if ($result) {
            return ['code' => 1, 'msg' => '', 'data' => $result];
        } else {
            return ['code' => -1, 'msg' => 'data empty'];
        }
    }

    /**
     * 获取地图数据
     */
    private function convertTileSet() {
        $sql = "SELECT id,tileSet FROM $this->table";
        $result = $this->executeSql($sql,[],'all');
        if ($result) {
            foreach ($result as $v){
                $data = [];
                $data[] = json_encode(unserialize(base64_decode($v['tileSet'])),JSON_UNESCAPED_UNICODE);
                $data[] = intval($v['id']);
                $sql = "update $this->table set tileSet= ? WHERE id = ?";
                $this->executeSql($sql,$data);
            }

        } else {
            return ['code' => -1, 'msg' => 'data empty'];
        }
    }

}
<?php
/**
 *
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version V0.9
 * @since
 * <p>v0.9 2017/4/12 17:12  初版</p>
 */

namespace App\M;

class EventsM extends AppModel {
    /**
     * 转换数据，减小字节占用
     */
    private function convertEvent() {
        $sql = "SELECT id,script FROM $this->table";
        $result = $this->executeSql($sql,[],'all');
        if ($result) {
            foreach ($result as $v){
                $data = [];
                $data[] = json_encode(unserialize(base64_decode($v['script'])),JSON_UNESCAPED_UNICODE);
                $data[] = intval($v['id']);
                $sql = "update $this->table set script= ? WHERE id = ?";
                $this->executeSql($sql,$data);
            }

        } else {
            return ['code' => -1, 'msg' => 'data empty'];
        }
    }

    /**
     * 获取瓦片集数据
     */
    public function getEvent($id,$field='*') {
        $sql = "SELECT $field FROM $this->table WHERE id=?";
        $result = $this->executeSql($sql,[$id]);
        if ($result) {
            return ['code' => 1, 'msg' => '', 'data' => $result];
        } else {
            return ['code' => -1, 'msg' => 'data empty'];
        }
    }
}
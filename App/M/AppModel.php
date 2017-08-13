<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏基础模型
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/08 初版
 */

namespace App\M;
use Base\Lib\M;
class AppModel extends M{
    public function getList($field='*') {
        $sql = "SELECT $field FROM $this->table";
        return $this->executeSql($sql,[],'all');
    }

    /**
     * 获取数据
     */
    public function getData($data=false,$mode='row',$field='*') {
        if($data) {
            $keys = array_keys( $data );
            $values = array_values( $data );
            $str = join( '`=? and `', $keys );
            $sql = "SELECT $field FROM $this->table WHERE $str=?";
            return $this->executeSql($sql,$values,$mode);
        }else{
            $sql = "SELECT $field FROM $this->table";
            return $this->executeSql($sql,[],'all');
        }
    }
}
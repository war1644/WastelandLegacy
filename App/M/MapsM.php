<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏地图模型
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/09 初版
 */

namespace App\M;

class MapsM extends AppModel {
    /**
     * 获取地图数据
     */
    public function getMap($id,$field='*') {
        $sql = "SELECT $field FROM $this->table WHERE id=?";
        $result = $this->executeSql($sql,[$id]);
        if ($result) {
            return ['code' => 1, 'msg' => '', 'data' => $result];
        } else {
            return ['code' => -1, 'msg' => 'data empty'];
        }
    }

    /**
     * 转换地图数据
     */
    private function convertMap() {
        $sql = "SELECT id,`data` FROM $this->table WHERE id>?";
        $result = $this->executeSql($sql,[3],'all');
        if ($result) {
            foreach ($result as $v){
                $data = [];
                $data[] = json_encode(unserialize(base64_decode($v['data'])),JSON_UNESCAPED_UNICODE);
                $data[] = intval($v['id']);
                $sql = "update $this->table set `data`= ? WHERE id = ?";
                $log[$v['id']] = $this->executeSql($sql,$data);
                MFLog($log);
            }

        } else {
            return ['code' => -1, 'msg' => 'data empty'];
        }
    }

    /**
     * 处理地图数据为客户端可用格式
     */
    public function mapDataAction($mapData){

        $mapData = json_decode($this->mapData,true );
        //获取瓦片集的数据
        $tileSet = new TilesetsM();
        $tileSet->getTileSet($this->tileSetId);

        $tileSetData = json_decode($this->tileSet,true );

        $this->countX = count( $mapData[0][0] );
        $this->countY = count( $mapData[0] );
        $this->width = $this->countX * $tileSet->tileSize;
        $this->height = $this->countY * $tileSet->tileSize;

        if ( $this->optimized ) {
            $data['mapImg'][] = CACHE_PATH . 'Maps' . 'map_' . $this->id . '_0.png';
            $data['mapImg'][] = CACHE_PATH . 'Maps' . 'map_' . $this->id . '_1.png';
            $data['mapImg'][] = CACHE_PATH . 'Maps' . 'map_' . $this->id . '_2.png';
        }
        $event_ids = [];
        $event_coords = [];
        for ( $x = 0; $x < $map->count_x; $x++ ) {
            for ( $y = 0; $y < $map->count_y; $y++ ) {
                if ( $map->blocs[2][$y][$x] > 0 ) {
                    $event_ids[] = $map->blocs[2][$y][$x];
                    if ( !isset( $event_coords[$map->blocs[2][$y][$x]] ) ) {
                        $event_coords[$map->blocs[2][$y][$x]] = [];
                    }
                    $event_coords[$map->blocs[2][$y][$x]][] = [$x, $y];
                }
                // 地图下图层
                $data['downMapPass'][] = ['x' => $x, 'y' => $y, 'pass' => (($map->tiles[0][1][$map->blocs[0][$y][$x]] == 0) ? 1 : 0)];

                // 地图上图层
                $data['upMapPass'][] = ['x' => $x, 'y' => $y, 'pass' => (($map->tiles[1][1][$map->blocs[1][$y][$x]] == 0) ? 3 : (($map->tiles[1][1][$map->blocs[1][$y][$x]] == 1) ? 0 : 1))];
            }
        }
    }

    /**
     * 检查地图缓存
     */
    public function checkMapCahe($mapData=[]) {
        if (!$mapData || !$this->optimized) return false;

        is_file( CACHE_PATH.'map/'.'map_' . $this->id . '_0.png' );
    }

    /**
     * 创建地图缓存
     */
    public function CreateMapCahe($mapData=[]) {
        if (!$mapData || !$this->mapData) return false;

    }

}
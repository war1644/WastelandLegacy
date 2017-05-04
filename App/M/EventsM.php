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
    static $eventKey=0;
    public $uid;
    public function __construct($id){
        $this->uid = $id;
    }

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

    /**
     * 转换文本为可执行脚本
     */
    public function enScript($textScript) {
        $text_script = explode("\n", str_replace("\r", '', $textScript));
//        var_dump($text_script);
        $script = [];
        $count = count($text_script);
        $i = 0;
        while ($i < $count && isset($text_script[$i])) {
            $command = $text_script[$i];
//            var_dump($command);
            if ($command == 'MESSAGE') {
                $msg = trim($text_script[++$i]);
                $script[] = [1, [$msg]];
            } elseif ($command == 'TELEPORT') {
                $args = explode(',',trim($text_script[++$i]));
                $script[] = [2,$args];
            } elseif ($command == 'SELECT') {

            } elseif ($command == 'JS') {

            } elseif ($command == 'PHP') {

            }
            $i++;
        }

        if ($script) {
            return [1, $script];
        }else{
            return [false, []];
        }
    }

    /**
     * 执行脚本
     */
    function execScript($script) {

        $id = $script[self::$eventKey][0];
        $args = $script[self::$eventKey][1];
        self::$eventKey++;

        switch ($id){
            case -1:
                self::$eventKey=0;
                return;
            case 1:
                //消息显示
                return "showMessage('$args[0]');";
                break;
            case 2:
                //场景切换
                $user = new UsersM();
                $sql = "mapId=?, mapX=?, mapY=?, mapDir=? WHERE id=?";
                $args[] = $this->uid;
                $user->update($sql,$args);
                return "teleport(true);";
                break;
            case 3:
                //玩家选择
                $selectValue = intval($_GET['select']);
                $texts = [];
                foreach ($args[1] as $key => $value) {
                    $a = substr(trim($args[1][$key]),1);
                    $args[1][$key] = $this->vars[$a];
                }

                foreach ( $args[1] as $text ) {
                    $texts[] = "'$text'";
                }
                $jsArrValue = implode(',', $texts);
                return "selectChoice([$jsArrValue]);";
                break;
            case 4:
                // 执行js
                return "scriptEval($args[0]);";
                break;
            case 5:
                // 执行php
                eval($args[0]);
                break;
            default:
                return false;
                break;
        }
    }

    /**
     * 解析脚本文本
     */
    function deScript($exec) {

        if ( $this->stop ) return false;

        $id = $this->script[$this->event_key][0];
        $args = $this->script[$this->event_key][1];
        $this->event_key++;

        if ( !isset($this->script[$this->event_key]) ) return false;

        if ( $id == 1 ) // show message
        {
            // $args[0] => (string) message
            $res = "show_message ('$args[0]'));";
            return $res;
        }
        elseif ( $id == 5 ) // switch choice
        {
            // $args[0] => (string) var to store result
            // $args[1] => (array) choices
            $value = intval($_GET['input_choice']);
            // 停止脚本接收选择
            $this->stop = true;
            $texts = array();

            foreach ($args[1] as $key => $value) {

                if (preg_match('`\$([A-Za-z0-9_]+)`', $args[1][$key])) {

                    $a = substr(trim($args[1][$key]),1);

                    $args[1][$key] = $this->vars[$a];

                }

            }

            foreach ( $args[1] as $text ) {
                $texts[] = '\''.$text.'\'';
            }
            $jsArrValue = implode(',', $texts);
            return "select_choice([$jsArrValue]));";
        }

        elseif ( $id == 2 ) // teleport
        {
            // $args[0] => (integer) map id
            // $args[1] => (integer) map X
            // $args[2] => (integer) map Y
            // $args[3] => (integer) map dir
            // update user map info
            $user = new UsersM();
            $user->mapId = $args[0];
            $user->mapX = $args[1];
            $user->mapY = $args[2];
            $user->mapDir = $args[3];
            $user->update();
            // refresh page
            return "teleport(true);";
        }
        elseif ( $id == 10 ) // exec javascript
        {
            // $args[0] => (string) script
            return $args[0] . 'script_eval((key + 1), script);';
        }
        elseif ( $id == 11 ) // exec php
        {
            // $args[0] => (string) script
            eval($args[0]);

            return 1;
        }
        else
        {
            return false;
        }
    }
}
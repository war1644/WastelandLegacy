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

    /**
     * 转换文本为可执行脚本
     */
    public function enScript($textScript) {
        $text_script = explode("\n", str_replace("\r", '', $textScript));
//        var_dump($text_script);
        $script = [];
        $count = count($text_script);
        $count_condition = $i = 0;
        while ($i < $count && isset($text_script[$i])) {
            if (preg_match('`^([A-Z_]+)`', ltrim($text_script[$i]), $command)) {
                $code = trim($text_script[$i]);
                $command = $command[1];

                if ($command == 'MESSAGE') {
                    if (substr(trim(substr($code, 7)), 0, 4) == 'HTML') {
                        $text = trim(substr(trim(substr($code, 7)), 4));
                        $html = true;
                    } else {
                        $text = trim(substr($code, 7));
                        $html = false;
                    }

                    if ($text != '') {
                        if (!$html) {
                            $text = nl2br(htmlspecialchars($text));
                        }

                        $script[] = [1, [$text]];
                    } else {
                        $text_on = true;
                        $text = '';
                        $i++;

                        while (isset($text_script[$i])) {
                            if (preg_match('/^END MESSAGE$/', trim($text_script[$i]))) {
                                if (!$html) {
                                    $text = nl2br(trim(htmlspecialchars($text)));
                                }

                                $script[] = [1, [str_replace(["\n", "\r"], '', $text)]];
                                $text_on = false;
                                break;
                            } else {
                                $text .= "\n" . $text_script[$i];
                                $i++;
                            }
                        }

                        if ($text_on) {
                            return [false, '消息脚本有误'];
                        }
                    }
                } elseif ($command == 'WAIT' && is_numeric(trim(substr($code, 4)))) {
                    $args = [intval(substr($code, 4))];
                    $script[] = array(7, $args);
                } elseif ($command == 'VAR' && preg_match('`^\$([A-Za-z0-9_]+) *(=|\+|\-|\*|/|\.) *(.*?)$`', trim(substr($code, 3)), $matches)) {
                    $args = [];
                    $args[0] = $matches[1];

                    if ($matches[2] == '=') {
                        $args[1] = 0;
                    } elseif ($matches[2] == '+') {
                        $args[1] = 1;
                    } elseif ($matches[2] == '-') {
                        $args[1] = 2;
                    } elseif ($matches[2] == '*') {
                        $args[1] = 3;
                    } elseif ($matches[2] == '/') {
                        $args[1] = 4;
                    } elseif ($matches[2] == '.') {
                        $args[1] = 5;
                    }

                    if (preg_match('`^\$([A-Za-z0-9_]+)$`', $matches[3], $matches2)) {
                        $args[2] = true;
                        $args[3] = $matches2[1];
                    } else {
                        $args[2] = false;
                        $args[3] = (is_numeric($matches[3])) ? doubleval($matches[3]) : $matches[3];
                    }

                    $script[] = array(8, $args);
                } elseif ($command == 'IF' && preg_match('`^\$([A-Za-z0-9_]+) *(\\<\\=|\\>\\=|\\<\\>|\\!\\=|\\=\\=|\\=|\\<|\\>) *(.*?)$`', trim(substr($code, 2)), $matches)) {
                    $args = array();
                    $args[0] = $matches[1];

                    if ($matches[2] == '<=') {
                        $args[1] = 4;
                    } elseif ($matches[2] == '>=') {
                        $args[1] = 5;
                    } elseif ($matches[2] == '!=' || $matches[2] == '<>') {
                        $args[1] = 0;
                    } elseif ($matches[2] == '=' || $matches[2] == '==') {
                        $args[1] = 1;
                    } elseif ($matches[2] == '<') {
                        $args[1] = 2;
                    } elseif ($matches[2] == '>') {
                        $args[1] = 3;
                    }

                    if (preg_match('`^\$([A-Za-z0-9_]+)$`', $matches[3], $matches2)) {
                        $args[2] = true;
                        $args[3] = $matches2[1];
                    } else {
                        $args[2] = false;
                        $args[3] = (is_numeric($matches[3])) ? doubleval($matches[3]) : $matches[3];
                    }

                    $script[] = [0, $args];
                    $count_condition++;
                } elseif ($command == 'ELSE' && trim(substr($code, 4)) == '' && $count_condition > 0) {
                    $script[] = [0, [false]];
                } elseif (($command == 'ENDIF' && trim(substr($code, 5)) == '') || ($command == 'END' && trim(substr($code, 3)) == 'IF')) {
                    $script[] = array(0, array(false, false));
                    $count_condition--;
                } elseif ($command == 'INPUT' && preg_match('`^\$([A-Za-z0-9_]+) *(MESSAGE *(HTML)? *(.*?))?$`', trim(substr($code, 5)), $matches)) {
                    if (!empty($matches[2])) {
                        if (empty($matches[4]) || trim($matches[4]) == '') {
                            $text_on = true;
                            $text = '';
                            $i++;

                            while (isset($text_script[$i])) {
                                if (preg_match('`^END *MESSAGE$`', trim($text_script[$i]))) {
                                    $text_on = false;
                                    break;
                                } else {
                                    $text .= "\n" . $text_script[$i];
                                    $i++;
                                }
                            }

                            if ($text_on) {
                                return [false, '消息脚本有误'];
                            }
                        } else {
                            $text = $matches[4];
                        }

                        if (empty($matches[3])) {
                            $text = nl2br(trim(htmlspecialchars($text)));
                        }
                    } else {
                        $text = '';
                    }

                    $script[] = array(6, array(str_replace(array("\n", "\r"), '', $text), $matches[1], false));
                } elseif ($command == 'INPUT_NUMBER' && preg_match('`^\$([A-Za-z0-9_]+) *(MESSAGE *(HTML)? *(.*?))?$`', trim(substr($code, 12)), $matches)) {
                    if (!empty($matches[2])) {
                        if (empty($matches[4]) || trim($matches[4]) == '') {
                            $text_on = true;
                            $text = '';
                            $i++;

                            while (isset($text_script[$i])) {
                                if (preg_match('`^END *MESSAGE$`', trim($text_script[$i]))) {
                                    $text_on = false;
                                    break;
                                } else {
                                    $text .= "\n" . $text_script[$i];
                                    $i++;
                                }
                            }

                            if ($text_on) {
                                return array(false, '消息脚本有误');
                            }
                        } else {
                            $text = $matches[4];
                        }

                        if (empty($matches[3])) {
                            $text = nl2br(trim(htmlspecialchars($text)));
                        }
                    } else {
                        $text = '';
                    }

                    $script[] = array(6, array(str_replace(array("\n", "\r"), '', $text), $matches[1], true));
                } elseif ($command == 'TELEPORT') {
                    $args = explode(',',trim(substr($code, 8)));
                    $script[] = [9, $args];
                } elseif ($command == 'CHOICE' && preg_match('`^\$([A-Za-z0-9_]+)$`', trim(substr($code, 6)), $matches)) {
                    $args = array();
                    $args[0] = $matches[1];
                    $choice_on = true;
                    $i++;
                    $i2 = $i;
                    $args[1] = array();

                    while (isset($text_script[$i])) {
                        if (preg_match('`^END *CHOICE$`', trim($text_script[$i]))) {
                            if ($i2 == $i) {
                                return array(false, '没有选择');
                            }

                            $script[] = array(5, $args);
                            $choice_on = false;
                            break;
                        } else {
                            $args[1][] = htmlspecialchars(str_replace(array("\n", "\r"), '', $text_script[$i]));
                            $i++;
                        }
                    }

                    if ($choice_on) {
                        return array(false, 'choice不在脚本范围');
                    }
                } elseif ($command == 'JAVASCRIPT' || $command == 'JS') {
                    $value = trim(substr($code, 10));

                    if ($value != '') {
                        $args = array($value);
                        $script[] = array(10, $args);
                    } else {
                        $script_on = true;
                        $code = '';
                        $i++;

                        while (isset($text_script[$i])) {
                            if (preg_match('`^END *' . $command . '$`', trim($text_script[$i]))) {
                                $args = ['eval(htmlspecialchars_decode(\'' . htmlspecialchars(str_replace(["\n", "\r"], '', $code)) . '\'));'];
                                $script[] = [10, $args];
                                $script_on = false;
                                break;
                            } else {
                                $code .= $text_script[$i];
                                $i++;
                            }
                        }

                        if ($script_on) {
                            return array(false, 'javascript 代码有误');
                        }
                    }
                } elseif ($command == 'PHP') {
                    $value = trim(substr($code, 3));

                    if ($value != '') {
                        $args = array($value);
                        $script[] = array(11, $args);
                    } else {
                        $script_on = true;
                        $code = '';
                        $i++;

                        while (isset($text_script[$i])) {
                            if (preg_match('`^END *PHP$`', trim($text_script[$i]))) {
                                $args = array($code);
                                $script[] = array(11, $args);
                                $script_on = false;
                                break;
                            } else {
                                $code .= $text_script[$i] . "\n";
                                $i++;
                            }
                        }

                        if ($script_on) {
                            die('php 代码有误');
                        }
                    }
                } else {
                    return array(false, sprintf('在 %s 行语法错误', ($i + 1)) . ' code="' . $code . '"');
                }
            } elseif (trim($text_script[$i]) != '') {
                return array(false, sprintf('在 %s 行语法错误', ($i + 1)));
            }

            $i++;
        }

        if ($count_condition != 0) {
            return [false, '脚本中的条件有误'];
        } else {
            $script[] = array(-1, array());
            return [true, $script];
        }
    }

    /**
     * 执行脚本
     */
    function execScript($content) {

        if ( $this->stop ) return false;

        $id = $this->script[$this->event_key][0];
        $args = $this->script[$this->event_key][1];
        $this->event_key++;

        if ( !isset($this->script[$this->event_key]) ) return false;

        if ( $id == -1 ) // stop
        {
            $this->stop = true;
            return 1;
        }
        elseif ( $id == 1 ) // show message
        {
            // $args[0] => (string) message
            $res = "showMessage ('$args[0]'));";
            return $res;
        }
        elseif ( $id == 5 ) // switch choice
        {
            // $args[0] => (string) var to store result
            // $args[1] => (array) choices
                $choiceValue = intval($_GET['input_choice']);
                // 停止脚本接收选择
                $this->stop = true;
                $texts = array();

                foreach ($args[1] as $key => $value) {
                    $a = substr(trim($args[1][$key]),1);
                    $args[1][$key] = $this->vars[$a];
                }

                foreach ( $args[1] as $text ) {
                    $texts[] = '\''.$text.'\'';
                }
                $jsArrValue = implode(',', $texts);
                return "selectChoice([$jsArrValue]));";
        }
        elseif ( $id == 7 ) // wait a moment
        {
            // $args[0] => (integer) time * 10^-3 seconds
            return "wait('$args[0]);";
        }
        elseif ( $id == 9 ) // teleport
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

            // refresh map
            return 1;
        }
        elseif ( $id == 10 ) // exec javascript
        {
            // $args[0] => (string) script
            return $args[0] . 'scriptEval((key + 1), script);';
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

    /**
     * 解析脚本文本
     */
    function deScript($exec) {

        if ( $this->stop ) return false;

        $id = $this->script[$this->event_key][0];
        $args = $this->script[$this->event_key][1];
        $this->event_key++;

        if ( !isset($this->script[$this->event_key]) ) return false;

        if ( $id == -1 ) // stop
        {
            $this->stop = true;
            return 1;
        }
        elseif ( $id == 1 ) // show message
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
        elseif ( $id == 7 ) // wait a moment
        {
            // $args[0] => (integer) time * 10^-3 seconds

            return 'wait(' . quotes($args[0]) . ', key, script);';
        }
        elseif ( $id == 8 ) // modify (or create) variable
        {
            // $args[0] => (string) var name
            // $args[1] => (integer) action
            // $args[2] => (boolean) second element type = string or var
            // $args[3] => (string) second element var name or string

            if ( substr($args[0], 0, 5) == 'USER_' ) // global user variable
            {
                $vars_update = '$user->set_var(\'' . substr($args[0], 5) . '\', $value);';

                if ( isset($user->vars[substr($args[0], 5)]) )
                {
                    $value = $user->vars[substr($args[0], 5)];
                }
                else
                {
                    $value = 0;
                }
            }
            elseif ( substr($args[0], 0, 7) == 'COMMON_' ) // global common variable
            {
                $vars_update = '$config->set_var(\'' . substr($args[0], 7) . '\', $value);';

                if ( isset($config->vars[substr($args[0], 7)]) )
                {
                    $value = $config->vars[substr($args[0], 7)];
                }
                else
                {
                    $value = 0;
                }
            }
            elseif ( !isset($this->vars[$args[0]]) )
            {
                $vars_update = '$this->vars[\'' . $args[0] . '\'] = $value;';
                $value = 0;
            }
            else
            {
                $vars_update = '$this->vars[\'' . $args[0] . '\'] = $value;';
                $value = $this->vars[$args[0]];
            }

            if ( $args[2] )
            {
                if ( substr($args[3], 0, 5) == 'USER_' ) // global user variable
                {
                    if ( isset($user->vars[substr($args[3], 5)]) )
                    {
                        $args[3] = $user->vars[substr($args[3], 5)];
                    }
                    else
                    {
                        $args[3] = 0;
                    }
                }
                elseif ( substr($args[3], 0, 7) == 'COMMON_' ) // global common variable
                {
                    if ( isset($config->vars[substr($args[3], 7)]) )
                    {
                        $args[3] = $config->vars[substr($args[3], 7)];
                    }
                    else
                    {
                        $args[3] = 0;
                    }
                }
                else
                {
                    $args[3] = ( isset($this->vars[$args[3]]) ) ? $this->vars[$args[3]] : 0;
                }
            }

            if ( $args[1] == 0 ) // set value
            {
                $value = $args[3];
            }
            elseif ( $args[1] == 1 ) // increase value
            {
                $value = doubleval($value) + doubleval($args[3]);
            }
            elseif ( $args[1] == 2 ) // decrease value
            {
                $value = doubleval($value) - doubleval($args[3]);
            }
            elseif ( $args[1] == 3 ) // multiply value
            {
                $value = doubleval($value) * doubleval($args[3]);
            }
            elseif ( $args[1] == 4 ) // divide value
            {
                if ( doubleval($args[3]) == 0 ) // division by zero !
                {
                    $value = 0;
                }
                else // division ok
                {
                    $value = doubleval($value) / doubleval($args[3]);
                }
            }
            elseif ( $args[1] == 5 ) // concat value
            {
                $value = strval($value) . strval($args[3]);
            }

            eval($vars_update);

            return 1; // no javascript
        }
        elseif ( $id == 9 ) // teleport
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
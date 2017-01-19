<?php

/*

Program: phpore
Author: Jeremy Faivre
Contact: http://www.jeremyfaivre.com/about
Year: 2005

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

*/

if ( !defined('IN_PHPORE') )
{
	exit;
}

//
// event script
//
class EventScript
{
	// constructor
    function __construct($script = false, $resume_script = false)
    {
        global $lang, $user;

        if ( $resume_script )
        {
            $resume_script = get_object_vars(unserialize($user->event_script));

            foreach ( $resume_script as $key => $val )
            {
                $this->$key = $val;
            }

            $this->stop = false;
        }
        elseif ( $script )
        {
            $this->config = array();
            $this->event_key = 0;
            $this->stop = false;
            $this->vars = array();
            $this->conditions = array();
            $this->condition_id = -1;

            if ( !is_array($script) )
            {
                $this->script = unserialize(base64_decode($script));
            }
            else
            {
                $this->script = $script;
            }
        }
        else
        {
            $this->stop = true;
        }
    }

	function script($exec, $submit)
	{
		global $config, $user, $db;

		if ( $this->stop )
		{
			return false;
		}

		if ( !$submit )
		{
			$id = $this->script[$this->event_key][0];
			$args = $this->script[$this->event_key][1];
			$this->event_key++;

			if ( !isset($this->script[$this->event_key]) )
			{
				return false;
			}
		}
		else
		{
			$id = $this->script[$this->event_key-1][0];
			$args = $this->script[$this->event_key-1][1];

			if ( !isset($this->script[$this->event_key-1]) )
			{
				return false;
			}
		}


		if ( $id == -1 ) // stop
		{
			$this->stop = true;
			$user->set('event_status', '');
			$user->set('event_script', '');
			return 1;
		}
		elseif ( $id == 0 ) // conditions
		{
			// $args[0] => (string) var name or (boolean) stop condition
			// $args[1] => (integer) condition type
			// $args[2] => (integer) second element type = string or var
			// $args[3] => (string) second element var name or string

			if ( isset($args[1]) && !$args[1] ) // close last condition
			{
				unset($this->conditions[$this->condition_id]);
				$this->condition_id--;
			}
			elseif ( !$args[0] ) // else process of last condition
			{
				if ( $this->conditions[$this->condition_id] )
				{
					$this->conditions[$this->condition_id] = false;
				}
				else
				{
					$this->conditions[$this->condition_id] = true;
				}
			}
			else // start new condition
			{
				$this->condition_id++;

				if ( in_array(false, $this->conditions) ) // skip condition if another condition is false
				{
					$this->conditions[$this->condition_id] = false;
				}
				else // check condition
				{
					if ( substr($args[0], 0, 5) == 'USER_' ) // global user variable
					{
						if ( isset($user->vars[substr($args[0], 5)]) )
						{
							$args[0] = $user->vars[substr($args[0], 5)];
						}
						else
						{
							$args[0] = 0;
						}
					}
					elseif ( substr($args[0], 0, 7) == 'COMMON_' ) // global common variable
					{
						if ( isset($config->vars[substr($args[0], 7)]) )
						{
							$args[0] = $config->vars[substr($args[0], 7)];
						}
						else
						{
							$args[0] = 0;
						}
					}
					elseif ( !isset($this->vars[$args[0]]) )
					{
						$args[0] = 0;
					}
					else
					{
						$args[0] = $this->vars[$args[0]];
					}

					if ( $args[2] == 1 ) // second element is a variable
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
						elseif ( isset($this->vars[$args[3]]) )
						{
							$args[3] = $this->vars[$args[3]];
						}
						else
						{
							$args[3] = 0;
						}
					}

					// 条件
					if ( $args[1] == 0 )
					{
						$condition_type = '!=';
						$args[0] = strval($args[0]);
						$args[3] = strval($args[3]);
					}
					elseif ( $args[1] == 1 )
					{
						$condition_type = '==';
						$args[0] = strval($args[0]);
						$args[3] = strval($args[3]);
					}
					elseif ( $args[1] == 2 )
					{
						$condition_type = '<';
						$args[0] = doubleval($args[0]);
						$args[3] = doubleval($args[3]);
					}
					elseif ( $args[1] == 3 )
					{
						$condition_type = '>';
						$args[0] = doubleval($args[0]);
						$args[3] = doubleval($args[3]);
					}
					elseif ( $args[1] == 4 )
					{
						$condition_type = '<=';
						$args[0] = doubleval($args[0]);
						$args[3] = doubleval($args[3]);
					}
					elseif ( $args[1] == 5 )
					{
						$condition_type = '>=';
						$args[0] = doubleval($args[0]);
						$args[3] = doubleval($args[3]);
					}

					eval('if ( $args[0] ' . $condition_type . ' $args[3] ) { $bool = true; } else { $bool = false; }');
					if ( $bool ) // condition true
					{
						$this->conditions[$this->condition_id] = true;
					}
					else // condition false
					{
						$this->conditions[$this->condition_id] = false;
					}
				}
			}

			return 1; // no javascript
		}
		elseif ( in_array(false, $this->conditions) && ( $exec || $submit ) ) // if condition false
		{
			return 1; // no javascript
		}
		elseif ( $id == 1 ) // show message
		{
			// $args[0] => (string) message
            //消息对齐方式
            $this->message_align = ( !isset($this->message_align) ) ? 0 : $this->message_align;
            //消息时间
            $this->message_time = ( !isset($this->message_time) ) ? false : $this->message_time;
            //头像
            $this->message_face = ( !isset($this->message_face) ) ? false : $this->message_face;
            //头像对齐方式
            $this->message_face_align = ( !isset($this->message_face_align) ) ? 0 : $this->message_face_align;

			while ( preg_match('`\$([A-Za-z0-9_]+)`', $args[0], $matches) ) {
                if (substr($matches[1], 0, 5) == 'USER_' && isset($user->vars[substr($matches[1], 5)])) {
                    $args[0] = str_replace('$' . $matches[1], $user->vars[substr($matches[1], 5)], $args[0]);
                } elseif (substr($matches[1], 0, 7) == 'COMMON_' && isset($config->vars[substr($matches[1], 7)])) {
                    $args[0] = str_replace('$' . $matches[1], $config->vars[substr($matches[1], 7)], $args[0]);
                } elseif (isset($this->vars[$matches[1]])) {
                    $args[0] = str_replace('$' . $matches[1], $this->vars[$matches[1]], $args[0]);
                } else {
                    $args[0] = str_replace('$' . $matches[1], '&#36;' . $matches[1], $args[0]);
                }
            }
            $res = 'show_message(\'' . quotes(htmlspecialchars(str_replace(array("\n", "\r"), '', $args[0]))) . '\', key, script, ' . $this->message_align . ', ' . (( $this->message_time ) ? $this->message_time : 'false') . ', ' . (( $this->message_face ) ? 'Array(\'' . quotes($this->message_face) . '\', ' . $this->message_face_align . ')' : 'false') . ');';
            return $res;
		}
		elseif ( $id == 2 ) // set message 对齐
		{
			// $args[0] => (integer) alignment

			if ( $args[0] >= 0 && $args[0] < 4 )
			{
				$this->message_align = $args[0];
			}

			return 1; // no javascript
		}
		elseif ( $id == 3 ) // set message time
		{
			// $args[0] => (integer) time * 10^-3 seconds or (boolean) validate

			$this->message_time = $args[0];

			return 1; // no javascript
		}
		elseif ( $id == 4 ) // set message talker face
		{
			// $args[0] => (string) filename or (boolean) none

			$this->message_face = $args[0];
			$this->message_face_align = $args[1];

			return 1; // no javascript
		}
		elseif ( $id == 5 ) // switch choice
		{
			// $args[0] => (string) var to store result
			// $args[1] => (array) choices

			if ( $submit )
			{
				if ( !isset($_GET['event_status'], $_GET['input_choice']) || $_GET['event_status'] != $user->event_status || $_GET['event_status'] == '' || !isset($args[1][intval($_GET['input_choice'])]) )
				{
					return false;
				}

				$value = intval($_GET['input_choice']);

				if ( substr($args[0], 0, 5) == 'USER_' ) // global user variable
				{
					$user->set_var(substr($args[0], 5), $value);
				}
				elseif ( substr($args[0], 0, 7) == 'COMMON_' ) // global user variable
				{
					$config->set_var(substr($args[0], 7), $value);
				}
				else
				{
					$this->vars[$args[0]] = $value;
				}

				$user->set('event_status', '');
				$user->set('event_script', '');

				return true;
			}
			else
			{
				$event_status = md5(uniqid(mt_rand()));

				$user->set('event_status', $event_status);
				$user->set('event_script', $this);

//				js_eval('alert("' . $args[1] . '");', 2);
				//消息对齐方式
				$this->message_align = ( !isset($this->message_align) ) ? 0 : $this->message_align;
				//消息时间
				$this->message_time = ( !isset($this->message_time) ) ? false : $this->message_time;
				//头像
				$this->message_face = ( !isset($this->message_face) ) ? false : $this->message_face;
				//头像对齐方式
				$this->message_face_align = ( !isset($this->message_face_align) ) ? 0 : $this->message_face_align;

				// stop script in this page, to continue it in the page witch receive choice
                // 停止脚本接收选择
				$this->stop = true;

				$texts = array();

				foreach ( $args[1] as $text )
				{
					$texts[] = '\'' . quotes($text) . '\'';
				}

				return 'select_choice(\'' . $event_status . '\', ' . $this->message_align . ', ' . (( $this->message_face ) ? '\'' . quotes($this->message_face) . '\'' : 'false') . ', new Array(' . implode(',', $texts) . '));';
			}
		}
		elseif ( $id == 6 ) // input string
		{
			// $args[0] => (string) message
			// $args[1] => (string) var 输入的字符串将存储位置
			// $args[2] => (boolean) 输入的为 string 还是 number

			if ( $submit )
			{
				
				if ( !isset($_GET['event_status'], $_GET['input_message']) || $_GET['event_status'] != $user->event_status || $_GET['event_status'] == '' )
				{
					return false;
				}

				if ( $args[2] )
				{
					$value = doubleval($_GET['input_message']);
				}
				else
				{

				    $value = stripslashes($_GET['input_message']);
				}

				if ( substr($args[1], 0, 5) == 'USER_' ) // global user variable
				{
					$user->set_var(substr($args[1], 5), $value);
				}
				elseif ( substr($args[1], 0, 7) == 'COMMON_' ) // global user variable
				{
					$config->set_var(substr($args[1], 7), $value);
				}
				else
				{
					$this->vars[$args[1]] = $value;
				}

				$user->set('event_status', '');
				$user->set('event_script', '');

				return true;
			}
			else
			{
				$event_status = md5(uniqid(mt_rand()));

				$user->set('event_status', $event_status);
				$user->set('event_script', $this);
				//$user->set('event_extra', ((( $args[2] ) ? 1 : 0 ) . ',' . $args[1]));

				//js_eval('alert("' . $args[1] . '");', 2);
				
				$this->message_align = ( !isset($this->message_align) ) ? 0 : $this->message_align;
				$this->message_time = ( !isset($this->message_time) ) ? false : $this->message_time;
				$this->message_face = ( !isset($this->message_face) ) ? false : $this->message_face;
				$this->message_face_align = ( !isset($this->message_face_align) ) ? 0 : $this->message_face_align;

				// stop script in this page, to continue it in the page witch receive input string
				$this->stop = true;

				while ( preg_match('`\$([A-Za-z0-9_]+)`', $args[0], $matches) )
				{
					if ( substr($matches[1], 0, 5) == 'USER_' && isset($user->vars[substr($matches[1], 5)]) )
					{
						$args[0] = str_replace('$' . $matches[1], $user->vars[substr($matches[1], 5)], $args[0]);
					}
					elseif ( substr($matches[1], 0, 7) == 'COMMON_' && isset($config->vars[substr($matches[1], 7)]) )
					{
						$args[0] = str_replace('$' . $matches[1], $config->vars[substr($matches[1], 7)], $args[0]);
					}
					elseif ( isset($this->vars[$matches[1]]) )
					{
						$args[0] = str_replace('$' . $matches[1], $this->vars[$matches[1]], $args[0]);
					}
					else
					{
						$args[0] = str_replace('$' . $matches[1], '&#36;' . $matches[1], $args[0]);
					}
				}

				return 'input_string(\'' . quotes(htmlspecialchars(str_replace(array("\n", "\r"), '', $args[0]))) . '\', \'' . $event_status . '\', ' . $this->message_align . ', ' . (( $this->message_face ) ? '\'' . quotes($this->message_face) . '\'' : 'false') . ', ' . (( $args[2] ) ? 'true' : 'false' ) . ');';
			}
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
			// $args[1] => (integer) map left
			// $args[2] => (integer) map top
			// $args[3] => (integer) map dir

			if ( $submit )
			{
				//js_eval('alert("' . $user->event_extra . '");', 2);
				if ( !isset($_GET['event_status']) || $_GET['event_status'] != $user->event_status || $_GET['event_status'] == '' )
				{
					return false;
				}
				
				$user->set('event_status', '');
				$user->set('event_script', '');

				return true;
			}
			else
			{
				$user->map_moves++;
				$user->map_moves_table = unserialize($user->map_moves_table);
				$user->map_moves_table[$user->map_moves] = 'teleport';
				unset($user->map_moves_table[$user->map_moves-17]);
				$user->map_moves_table = serialize($user->map_moves_table);

				$sql_dir = ( isset($args[3]) ) ? ', map_dir = ' . intval($args[3]) : '';

				// teleport player (update database)

				$user->set('map_previous_id', $user->map_id);

				if ( is_numeric($args[0]) )
				{
					$user->set('map_id', intval($args[0]));
				}
				
				if ( is_numeric($args[1]) )
				{
					$user->set('map_left', intval($args[1]));
				}
				
				if ( is_numeric($args[2]) )
				{
					$user->set('map_top', intval($args[2]));
				}

				$user->set('teleport', 1);
				$user->set('map_moves', $user->map_moves);
				$user->set('map_moves_table', $user->map_moves_table);

				$event_status = md5(uniqid(mt_rand()));

				$user->set('event_status', $event_status);
				$user->set('event_script', $this);

				if ( isset($args[3]) )
				{
					$user->set('map_dir', intval($args[3]));
				}

				// refresh page
				return 'teleport(\'' . $event_status . '\');';
			}
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
    /**
     * 转换文本格式,优化数据,准备 evalued 中的脚本
     */
	function compile($content)
	{
		global $lang;

		$lang->load_keys('compile_script');

		$text_script = explode("\n", str_replace("\r", '', $content));
		$script = array();
		$count = count($text_script);
		$count_condition = 0;

		$i = 0;
		while ( $i < $count && isset($text_script[$i]) )
		{
			if ( substr(ltrim($text_script[$i]), 0, 2) == '//' )
			{
				// comment !
			}
			elseif ( preg_match('`^([A-Z_]+)`', ltrim($text_script[$i]), $command) )
			{
				$code = trim($text_script[$i]);
				$command = $command[1];

				if ( $command == 'MESSAGE' )
				{
					if ( substr(trim(substr($code, 7)), 0, 4) == 'HTML' )
					{
						$text = trim(substr(trim(substr($code, 7)), 4));
						$html = true;
					}
					else
					{
						$text = trim(substr($code, 7));
						$html = false;
					}

					if ( $text != '' )
					{
						if ( !$html )
						{
							$text = nl2br(htmlspecialchars($text));
						}

						$script[] = array(1, array($text));
					}
					else
					{
						$text_on = true;
						$text = '';
						$i++;

						while ( isset($text_script[$i]) )
						{
							if ( preg_match('`^END *MESSAGE$`', trim($text_script[$i])) )
							{			
								if ( !$html )
								{
									$text = nl2br(trim(htmlspecialchars($text)));
								}

								$script[] = array(1, array(str_replace(array("\n", "\r"), '', $text)));
								$text_on = false;
								break;
							}
							else
							{
								$text .= "\n" . $text_script[$i];
								$i++;
							}
						}

						if ( $text_on )
						{
							return array(false, $lang->not_closed_message);
						}
					}
				}
				elseif ( $command == 'MESSAGE_ALIGN' && in_array(trim(substr($code, 13)), array('left', 'right', 'center', 'justify')) )
				{
					$value = trim(substr($code, 13));

					if ( $value == 'left' )
					{
						$args = array(0);
					}
					elseif ( $value == 'right' )
					{
						$args = array(1);
					}
					elseif ( $value == 'center' )
					{
						$args = array(2);
					}
					elseif ( $value == 'justify' )
					{
						$args = array(3);
					}

					$script[] = array(2, $args);
				}
				elseif ( $command == 'MESSAGE_TIME' && ( is_numeric(trim(substr($code, 12))) ) || trim(substr($code, 12)) == 'false' )
				{
					$value = trim(substr($code, 12));

					if ( $value == 'false' || $value == 0 )
					{
						$args = array(false);
					}
					else
					{
						$args = array(intval($value));
						if ( $args[0] < 1000 )
						{
							$args[0] = 1000;
						}
					}
					
					$script[] = array(3, $args);
				}
				elseif ( $command == 'MESSAGE_FACE' && trim(substr($code, 12)) != '' )
				{
					$value = trim(substr($code, 12));

					if ( $value == 'false' )
					{
						$args = array(false);
					}
					else
					{
						$args = array($value);
					}
					
					$script[] = array(4, $args);
				}
				elseif ( $command == 'WAIT' && is_numeric(trim(substr($code, 4))) )
				{
					$args = array(intval(substr($code, 4)));
					$script[] = array(7, $args);
				}
				elseif ( $command == 'VAR' && preg_match('`^\$([A-Za-z0-9_]+) *(=|\+|\-|\*|/|\.) *(.*?)$`', trim(substr($code, 3)), $matches) )
				{
					$args = array();
					$args[0] = $matches[1];

					if ( $matches[2] == '=' )
					{
						$args[1] = 0;
					}
					elseif ( $matches[2] == '+' )
					{
						$args[1] = 1;
					}
					elseif ( $matches[2] == '-' )
					{
						$args[1] = 2;
					}
					elseif ( $matches[2] == '*' )
					{
						$args[1] = 3;
					}
					elseif ( $matches[2] == '/' )
					{
						$args[1] = 4;
					}
					elseif ( $matches[2] == '.' )
					{
						$args[1] = 5;
					}

					if ( preg_match('`^\$([A-Za-z0-9_]+)$`', $matches[3], $matches2) )
					{
						$args[2] = true;
						$args[3] = $matches2[1];
					}
					else
					{
						$args[2] = false;
						$args[3] = ( is_numeric($matches[3]) ) ? doubleval($matches[3]) : $matches[3];
					}

					$script[] = array(8, $args);
				}
				elseif ( $command == 'IF' && preg_match('`^\$([A-Za-z0-9_]+) *(\\<\\=|\\>\\=|\\<\\>|\\!\\=|\\=\\=|\\=|\\<|\\>) *(.*?)$`', trim(substr($code, 2)), $matches) )
				{
					$args = array();
					$args[0] = $matches[1];

					if ( $matches[2] == '<=' )
					{
						$args[1] = 4;
					}
					elseif ( $matches[2] == '>=' )
					{
						$args[1] = 5;
					}
					elseif ( $matches[2] == '!=' || $matches[2] == '<>' )
					{
						$args[1] = 0;
					}
					elseif ( $matches[2] == '=' || $matches[2] == '==' )
					{
						$args[1] = 1;
					}
					elseif ( $matches[2] == '<' )
					{
						$args[1] = 2;
					}
					elseif ( $matches[2] == '>' )
					{
						$args[1] = 3;
					}

					if ( preg_match('`^\$([A-Za-z0-9_]+)$`', $matches[3], $matches2) )
					{
						$args[2] = true;
						$args[3] = $matches2[1];
					}
					else
					{
						$args[2] = false;
						$args[3] = ( is_numeric($matches[3]) ) ? doubleval($matches[3]) : $matches[3];
					}

					//js_eval('alert(\'' . quotes($matches[3]) .'\');', 1, 1);

					$script[] = array(0, $args);
					$count_condition++;
				}
				elseif ( $command == 'ELSE' && trim(substr($code, 4)) == '' && $count_condition > 0 )
				{
					$script[] = array(0, array(false));
				}
				elseif ( ( $command == 'ENDIF' && trim(substr($code, 5)) == '' ) || ( $command == 'END' && trim(substr($code, 3)) == 'IF' ) )
				{
					$script[] = array(0, array(false, false));
					$count_condition--;
				}
				elseif ( $command == 'INPUT' && preg_match('`^\$([A-Za-z0-9_]+) *(MESSAGE *(HTML)? *(.*?))?$`', trim(substr($code, 5)), $matches) )
				{
					if ( !empty($matches[2]) )
					{
						if ( empty($matches[4]) || trim($matches[4]) == '' )
						{
							$text_on = true;
							$text = '';
							$i++;

							while ( isset($text_script[$i]) )
							{
								if ( preg_match('`^END *MESSAGE$`', trim($text_script[$i])) )
								{
									$text_on = false;
									break;
								}
								else
								{
									$text .= "\n" . $text_script[$i];
									$i++;
								}
							}

							if ( $text_on )
							{
								return array(false, $lang->not_closed_message);
							}
						}
						else
						{
							$text = $matches[4];
						}

						if ( empty($matches[3]) )
						{
							$text = nl2br(trim(htmlspecialchars($text)));
						}
					}
					else
					{
						$text = '';
					}

					$script[] = array(6, array(str_replace(array("\n", "\r"), '', $text), $matches[1], false));
				}
				elseif ( $command == 'INPUT_NUMBER' && preg_match('`^\$([A-Za-z0-9_]+) *(MESSAGE *(HTML)? *(.*?))?$`', trim(substr($code, 12)), $matches) )
				{
					if ( !empty($matches[2]) )
					{
						if ( empty($matches[4]) || trim($matches[4]) == '' )
						{
							$text_on = true;
							$text = '';
							$i++;

							while ( isset($text_script[$i]) )
							{
								if ( preg_match('`^END *MESSAGE$`', trim($text_script[$i])) )
								{
									$text_on = false;
									break;
								}
								else
								{
									$text .= "\n" . $text_script[$i];
									$i++;
								}
							}

							if ( $text_on )
							{
								return array(false, $lang->not_closed_message);
							}
						}
						else
						{
							$text = $matches[4];
						}

						if ( empty($matches[3]) )
						{
							$text = nl2br(trim(htmlspecialchars($text)));
						}
					}
					else
					{
						$text = '';
					}

					$script[] = array(6, array(str_replace(array("\n", "\r"), '', $text), $matches[1], true));
				}
				elseif ( $command == 'TELEPORT' && preg_match('`^([0-9]*) *, *([0-9]*) *, *([0-9]*) *(left|right|up|down)?$`', trim(substr($code, 8)), $matches) )
				{
					$args = array();

					$args[0] = ( $matches[1] == '' ) ? false : intval($matches[1]);
					$args[1] = ( $matches[2] == '' ) ? false : intval($matches[2]);
					$args[2] = ( $matches[3] == '' ) ? false : intval($matches[3]);

					if ( isset($matches[4]) )
					{
						if  ( $matches[4] == 'down' )
						{
							$args[3] = 0;
						}
						elseif ( $matches[4] == 'left' )
						{
							$args[3] = 1;
						}
						elseif  ( $matches[4] == 'up' )
						{
							$args[3] = 2;
						}
						elseif  ( $matches[4] == 'right' )
						{
							$args[3] = 3;
						}
					}

					$script[] = array(9, $args);
				}
				elseif ( $command == 'CHOICE' && preg_match('`^\$([A-Za-z0-9_]+)$`', trim(substr($code, 6)), $matches) )
				{
					$args = array();
					$args[0] = $matches[1];
					$choice_on = true;
					$i++;
					$i2 = $i;
					$args[1] = array();

					while ( isset($text_script[$i]) )
					{
						if ( preg_match('`^END *CHOICE$`', trim($text_script[$i])) )
						{
							if ( $i2 == $i )
							{
								return array(false, $lang->no_choice);
							}

							$script[] = array(5, $args);
							$choice_on = false;
							break;
						}
						else
						{
							$args[1][] = htmlspecialchars(str_replace(array("\n", "\r"), '', $text_script[$i]));
							$i++;
						}
					}

					if ( $choice_on )
					{
						return array(false, $lang->not_closed_choice);
					}
				}
				elseif ( $command == 'JAVASCRIPT' || $command == 'JS' )
				{
					$value = trim(substr($code, 10));

					if ( $value != '' )
					{
						$args = array($value);
						$script[] = array(10, $args);
					}
					else
					{
						$script_on = true;
						$code = '';
						$i++;

						while ( isset($text_script[$i]) )
						{
							if ( preg_match('`^END *' . $command . '$`', trim($text_script[$i])) )
							{
								$args = array('eval(htmlspecialchars_decode(\'' . quotes(htmlspecialchars(str_replace(array("\n", "\r"), '', $code))) . '\'));');
								$script[] = array(10, $args);
								$script_on = false;
								break;
							}
							else
							{
								$code .= $text_script[$i];
								$i++;
							}
						}

						if ( $script_on )
						{
							return array(false, $lang->not_closed_javascript);
						}
					}
				}
				elseif ( $command == 'PHP' )
				{
					$value = trim(substr($code, 3));

					if ( $value != '' )
					{
						$args = array($value);
						$script[] = array(11, $args);
					}
					else
					{
						$script_on = true;
						$code = '';
						$i++;

						while ( isset($text_script[$i]) )
						{
							if ( preg_match('`^END *PHP$`', trim($text_script[$i])) )
							{
								$args = array($code);
								$script[] = array(11, $args);
								$script_on = false;
								break;
							}
							else
							{
								$code .= $text_script[$i] . "\n";
								$i++;
							}
						}

						if ( $script_on )
						{
							die($lang->not_closed_php);
						}
					}
				}
				else
				{
					return array(false, sprintf($lang->syntax_error_at_line, ($i + 1)) . ' code="' . $code . '"');
				}
			}
			elseif ( trim($text_script[$i]) != '' )
			{
				return array(false, sprintf($lang->syntax_error_at_line, ($i + 1)));
			}

			$i++;
		}

		if ( $count_condition != 0 )
		{
			return array(false, $lang->not_closed_condition);
		}
		else
		{
			$script[] = array(-1, array());
			return array(true, $script);
		}
	}
}

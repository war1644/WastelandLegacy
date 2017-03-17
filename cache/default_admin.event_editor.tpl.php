<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<table width="100%" cellpadding="2" cellspacing="1" border="0" class="portaline">
';

echo ' <tr>
';

echo '  <th colspan="2">' , ((isset($this->tpldata['.'][0]['L_EVENT_EDITOR'])) ? $this->tpldata['.'][0]['L_EVENT_EDITOR'] : ((isset($lang->event_editor)) ? $lang->event_editor : '')) , ' : ' , ((isset($this->tpldata['.'][0]['EVENT_NAME'])) ? $this->tpldata['.'][0]['EVENT_NAME'] : '') , '</th>
';

echo ' </tr>
';

echo ' <tr>
';

echo '
';

echo '  <td class="row1" align="right" valign="top" width="50%" style="padding:10px;">
';

echo '
';

echo '  <form action="" onsubmit="return false;"><input type="button" value="' , ((isset($this->tpldata['.'][0]['L_SAVE_EVENT'])) ? $this->tpldata['.'][0]['L_SAVE_EVENT'] : ((isset($lang->save_event)) ? $lang->save_event : '')) , '" class="button" onclick="save_event();" /></form>
';

echo '
';

echo '  <hr />
';

echo '
';

echo '  <form action="" onsubmit="return false;">
';

echo '  <input type="radio" name="mode" value="0" onclick="change_mode(this.value);" />&nbsp;<i>' , ((isset($this->tpldata['.'][0]['L_EVENT_PROPERTIES'])) ? $this->tpldata['.'][0]['L_EVENT_PROPERTIES'] : ((isset($lang->event_properties)) ? $lang->event_properties : '')) , '</i> &nbsp; <input type="radio" checked="checked" name="mode" value="1" onclick="change_mode(this.value);" />&nbsp;<i>' , ((isset($this->tpldata['.'][0]['L_SCRIPT_EDITOR'])) ? $this->tpldata['.'][0]['L_SCRIPT_EDITOR'] : ((isset($lang->script_editor)) ? $lang->script_editor : '')) , '</i>
';

echo '  </form><br /><br />
';

echo '
';

echo '  <div id="actual_mode"></div>
';

echo '
';

echo '  </td>
';

echo '  <td class="row2" align="left" valign="top" width="50%">
';

echo '
';

echo '  <div style="padding:10px"><form action="" onsubmit="return false;"><i>' , ((isset($this->tpldata['.'][0]['L_EVENT_SCRIPT'])) ? $this->tpldata['.'][0]['L_EVENT_SCRIPT'] : ((isset($lang->event_script)) ? $lang->event_script : '')) , ' :</i><br /><textarea name="text_script" id="text_script" cols="" rows="" style="width:300px;height:300px;">' , ((isset($this->tpldata['.'][0]['TEXT_SCRIPT'])) ? $this->tpldata['.'][0]['TEXT_SCRIPT'] : '') , '</textarea></form></div>
';

echo '
';

echo '  </td>
';

echo ' </tr>
';

echo '
';

echo '</table>
';

echo '
';

echo '<script type="text/javascript">
';

echo '<!--
';

echo '
';

echo 'var u_index = \'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? quotes($this->tpldata['.'][0]['U_INDEX']) : '') , '\';
';

echo 'var l_not_saved_continue_question = \'' , ((isset($this->tpldata['.'][0]['L_NOT_SAVED_CONTINUE_QUESTION'])) ? quotes($this->tpldata['.'][0]['L_NOT_SAVED_CONTINUE_QUESTION']) : ((isset($lang->not_saved_continue_question)) ? quotes($lang->not_saved_continue_question) : '')) , '\';
';

echo 'var l_message_content = \'' , ((isset($this->tpldata['.'][0]['L_MESSAGE_CONTENT'])) ? quotes($this->tpldata['.'][0]['L_MESSAGE_CONTENT']) : ((isset($lang->message_content)) ? quotes($lang->message_content) : '')) , '\';
';

echo 'var l_show_message = \'' , ((isset($this->tpldata['.'][0]['L_SHOW_MESSAGE'])) ? quotes($this->tpldata['.'][0]['L_SHOW_MESSAGE']) : ((isset($lang->show_message)) ? quotes($lang->show_message) : '')) , '\';
';

echo 'var l_validate = \'' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? quotes($this->tpldata['.'][0]['L_VALIDATE']) : ((isset($lang->validate)) ? quotes($lang->validate) : '')) , '\';
';

echo 'var l_html_activated = \'' , ((isset($this->tpldata['.'][0]['L_HTML_ACTIVATED'])) ? quotes($this->tpldata['.'][0]['L_HTML_ACTIVATED']) : ((isset($lang->html_activated)) ? quotes($lang->html_activated) : '')) , '\';
';

echo 'var l_yes = \'' , ((isset($this->tpldata['.'][0]['L_YES'])) ? quotes($this->tpldata['.'][0]['L_YES']) : ((isset($lang->yes)) ? quotes($lang->yes) : '')) , '\';
';

echo 'var l_no = \'' , ((isset($this->tpldata['.'][0]['L_NO'])) ? quotes($this->tpldata['.'][0]['L_NO']) : ((isset($lang->no)) ? quotes($lang->no) : '')) , '\';
';

echo 'var l_left = \'' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , '\';
';

echo 'var l_right = \'' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , '\';
';

echo 'var l_up = \'' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , '\';
';

echo 'var l_direction = \'' , ((isset($this->tpldata['.'][0]['L_DIRECTION'])) ? quotes($this->tpldata['.'][0]['L_DIRECTION']) : ((isset($lang->direction)) ? quotes($lang->direction) : '')) , '\';
';

echo 'var l_down = \'' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , '\';
';

echo 'var l_center = \'' , ((isset($this->tpldata['.'][0]['L_CENTER'])) ? quotes($this->tpldata['.'][0]['L_CENTER']) : ((isset($lang->center)) ? quotes($lang->center) : '')) , '\';
';

echo 'var l_justify = \'' , ((isset($this->tpldata['.'][0]['L_JUSTIFY'])) ? quotes($this->tpldata['.'][0]['L_JUSTIFY']) : ((isset($lang->justify)) ? quotes($lang->justify) : '')) , '\';
';

echo 'var l_time_limit = \'' , ((isset($this->tpldata['.'][0]['L_TIME_LIMIT'])) ? quotes($this->tpldata['.'][0]['L_TIME_LIMIT']) : ((isset($lang->time_limit)) ? quotes($lang->time_limit) : '')) , '\';
';

echo 'var l_validation = \'' , ((isset($this->tpldata['.'][0]['L_VALIDATION'])) ? quotes($this->tpldata['.'][0]['L_VALIDATION']) : ((isset($lang->validation)) ? quotes($lang->validation) : '')) , '\';
';

echo 'var l_show_face = \'' , ((isset($this->tpldata['.'][0]['L_SHOW_FACE'])) ? quotes($this->tpldata['.'][0]['L_SHOW_FACE']) : ((isset($lang->show_face)) ? quotes($lang->show_face) : '')) , '\';
';

echo 'var l_stored_in_var = \'' , ((isset($this->tpldata['.'][0]['L_STORED_IN_VAR'])) ? quotes($this->tpldata['.'][0]['L_STORED_IN_VAR']) : ((isset($lang->stored_in_var)) ? quotes($lang->stored_in_var) : '')) , '\';
';

echo 'var l_number = \'' , ((isset($this->tpldata['.'][0]['L_NUMBER'])) ? quotes($this->tpldata['.'][0]['L_NUMBER']) : ((isset($lang->number)) ? quotes($lang->number) : '')) , '\';
';

echo 'var l_text = \'' , ((isset($this->tpldata['.'][0]['L_TEXT'])) ? quotes($this->tpldata['.'][0]['L_TEXT']) : ((isset($lang->text)) ? quotes($lang->text) : '')) , '\';
';

echo 'var l_variable = \'' , ((isset($this->tpldata['.'][0]['L_VARIABLE'])) ? quotes($this->tpldata['.'][0]['L_VARIABLE']) : ((isset($lang->variable)) ? quotes($lang->variable) : '')) , '\';
';

echo 'var l_value = \'' , ((isset($this->tpldata['.'][0]['L_VALUE'])) ? quotes($this->tpldata['.'][0]['L_VALUE']) : ((isset($lang->value)) ? quotes($lang->value) : '')) , '\';
';

echo 'var l_var_set = \'' , ((isset($this->tpldata['.'][0]['L_VAR_SET'])) ? quotes($this->tpldata['.'][0]['L_VAR_SET']) : ((isset($lang->var_set)) ? quotes($lang->var_set) : '')) , '\';
';

echo 'var l_var_increase = \'' , ((isset($this->tpldata['.'][0]['L_VAR_INCREASE'])) ? quotes($this->tpldata['.'][0]['L_VAR_INCREASE']) : ((isset($lang->var_increase)) ? quotes($lang->var_increase) : '')) , '\';
';

echo 'var l_var_decrease = \'' , ((isset($this->tpldata['.'][0]['L_VAR_DECREASE'])) ? quotes($this->tpldata['.'][0]['L_VAR_DECREASE']) : ((isset($lang->var_decrease)) ? quotes($lang->var_decrease) : '')) , '\';
';

echo 'var l_var_multiply = \'' , ((isset($this->tpldata['.'][0]['L_VAR_MULTIPLY'])) ? quotes($this->tpldata['.'][0]['L_VAR_MULTIPLY']) : ((isset($lang->var_multiply)) ? quotes($lang->var_multiply) : '')) , '\';
';

echo 'var l_var_divide = \'' , ((isset($this->tpldata['.'][0]['L_VAR_DIVIDE'])) ? quotes($this->tpldata['.'][0]['L_VAR_DIVIDE']) : ((isset($lang->var_divide)) ? quotes($lang->var_divide) : '')) , '\';
';

echo 'var l_var_concat = \'' , ((isset($this->tpldata['.'][0]['L_VAR_CONCAT'])) ? quotes($this->tpldata['.'][0]['L_VAR_CONCAT']) : ((isset($lang->var_concat)) ? quotes($lang->var_concat) : '')) , '\';
';

echo 'var l_do_not_change = \'' , ((isset($this->tpldata['.'][0]['L_DO_NOT_CHANGE'])) ? quotes($this->tpldata['.'][0]['L_DO_NOT_CHANGE']) : ((isset($lang->do_not_change)) ? quotes($lang->do_not_change) : '')) , '\';
';

echo 'var l_map_dir = \'' , ((isset($this->tpldata['.'][0]['L_MAP_DIR'])) ? quotes($this->tpldata['.'][0]['L_MAP_DIR']) : ((isset($lang->map_dir)) ? quotes($lang->map_dir) : '')) , '\';
';

echo 'var l_warning_function = \'' , ((isset($this->tpldata['.'][0]['L_WARNING_FUNCTION'])) ? quotes($this->tpldata['.'][0]['L_WARNING_FUNCTION']) : ((isset($lang->warning_function)) ? quotes($lang->warning_function) : '')) , '\';
';

echo 'var l_condition_equal = \'' , ((isset($this->tpldata['.'][0]['L_CONDITION_EQUAL'])) ? quotes($this->tpldata['.'][0]['L_CONDITION_EQUAL']) : ((isset($lang->condition_equal)) ? quotes($lang->condition_equal) : '')) , '\';
';

echo 'var l_condition_different = \'' , ((isset($this->tpldata['.'][0]['L_CONDITION_DIFFERENT'])) ? quotes($this->tpldata['.'][0]['L_CONDITION_DIFFERENT']) : ((isset($lang->condition_different)) ? quotes($lang->condition_different) : '')) , '\';
';

echo 'var l_condition_smaller = \'' , ((isset($this->tpldata['.'][0]['L_CONDITION_SMALLER'])) ? quotes($this->tpldata['.'][0]['L_CONDITION_SMALLER']) : ((isset($lang->condition_smaller)) ? quotes($lang->condition_smaller) : '')) , '\';
';

echo 'var l_condition_bigger = \'' , ((isset($this->tpldata['.'][0]['L_CONDITION_BIGGER'])) ? quotes($this->tpldata['.'][0]['L_CONDITION_BIGGER']) : ((isset($lang->condition_bigger)) ? quotes($lang->condition_bigger) : '')) , '\';
';

echo 'var l_condition_smaller_or_equal = \'' , ((isset($this->tpldata['.'][0]['L_CONDITION_SMALLER_OR_EQUAL'])) ? quotes($this->tpldata['.'][0]['L_CONDITION_SMALLER_OR_EQUAL']) : ((isset($lang->condition_smaller_or_equal)) ? quotes($lang->condition_smaller_or_equal) : '')) , '\';
';

echo 'var l_condition_bigger_or_equal = \'' , ((isset($this->tpldata['.'][0]['L_CONDITION_BIGGER_OR_EQUAL'])) ? quotes($this->tpldata['.'][0]['L_CONDITION_BIGGER_OR_EQUAL']) : ((isset($lang->condition_bigger_or_equal)) ? quotes($lang->condition_bigger_or_equal) : '')) , '\';
';

echo 'var l_condition_with_else = \'' , ((isset($this->tpldata['.'][0]['L_CONDITION_WITH_ELSE'])) ? quotes($this->tpldata['.'][0]['L_CONDITION_WITH_ELSE']) : ((isset($lang->condition_with_else)) ? quotes($lang->condition_with_else) : '')) , '\';
';

echo 'var l_condition_without_else = \'' , ((isset($this->tpldata['.'][0]['L_CONDITION_WITHOUT_ELSE'])) ? quotes($this->tpldata['.'][0]['L_CONDITION_WITHOUT_ELSE']) : ((isset($lang->condition_without_else)) ? quotes($lang->condition_without_else) : '')) , '\';
';

echo 'var refresh_method = ' , ((isset($this->tpldata['.'][0]['REFRESH_METHOD'])) ? $this->tpldata['.'][0]['REFRESH_METHOD'] : '') , ';
';

echo 'var event_id = ' , ((isset($this->tpldata['.'][0]['EVENT_ID'])) ? $this->tpldata['.'][0]['EVENT_ID'] : '') , ';
';

echo 'var event_picture = \'' , ((isset($this->tpldata['.'][0]['EVENT_PICTURE'])) ? quotes($this->tpldata['.'][0]['EVENT_PICTURE']) : '') , '\';
';

echo 'var event_picture_type = \'' , ((isset($this->tpldata['.'][0]['EVENT_PICTURE_TYPE'])) ? quotes($this->tpldata['.'][0]['EVENT_PICTURE_TYPE']) : '') , '\';
';

echo 'var event_dir = \'' , ((isset($this->tpldata['.'][0]['EVENT_DIR'])) ? $this->tpldata['.'][0]['EVENT_DIR'] : '') , '\';
';

echo 'var event_name = \'' , ((isset($this->tpldata['.'][0]['EVENT_NAME'])) ? quotes($this->tpldata['.'][0]['EVENT_NAME']) : '') , '\';
';

echo 'var event_layer = ' , ((isset($this->tpldata['.'][0]['EVENT_LAYER'])) ? $this->tpldata['.'][0]['EVENT_LAYER'] : '') , ';
';

echo 'var mode = new Array();
';

echo '
';

echo 'mode[1] = \'<form action="" onsubmit="return false;"><select name="command_list" id="select_command" onchange="if(this.value!=-1){command(this.value, false, false);}"><option value="-1"> - </option>\';
';

$_command_list_count = (isset($this->tpldata['command_list'])) ? count($this->tpldata['command_list']) : 0;for ($_command_list_i = 0; $_command_list_i < $_command_list_count; $_command_list_i++){
echo 'mode[1] += \'<option value="' , ((isset($this->tpldata['command_list'][$_command_list_i]['ID'])) ? $this->tpldata['command_list'][$_command_list_i]['ID'] : '') , '">' , ((isset($this->tpldata['command_list'][$_command_list_i]['ID'])) ? $this->tpldata['command_list'][$_command_list_i]['ID'] : '') , '. ' , ((isset($this->tpldata['command_list'][$_command_list_i]['VALUE'])) ? quotes($this->tpldata['command_list'][$_command_list_i]['VALUE']) : '') , '</option>\';
';

} // END command_list
echo 'mode[1] += \'</select></form><br /><br /><div id="editor_options"></div>\';
';

echo 'mode[0] = \'<form action="" onsubmit="return false;">' , ((isset($this->tpldata['.'][0]['L_EVENT_NAME'])) ? quotes($this->tpldata['.'][0]['L_EVENT_NAME']) : ((isset($lang->event_name)) ? quotes($lang->event_name) : '')) , ' : <input type="text" id="event_name" value="" /><br /><br />' , ((isset($this->tpldata['.'][0]['L_EVENT_PICTURE'])) ? quotes($this->tpldata['.'][0]['L_EVENT_PICTURE']) : ((isset($lang->event_picture)) ? quotes($lang->event_picture) : '')) , ' : <span id="event_picture_path"></span>&nbsp;<input type="text" id="event_picture" value="" /><br /><br /><img id="event_picture_image" src="" /><br /><br />' , ((isset($this->tpldata['.'][0]['L_EVENT_LAYER'])) ? quotes($this->tpldata['.'][0]['L_EVENT_LAYER']) : ((isset($lang->event_layer)) ? quotes($lang->event_layer) : '')) , ' : <select id="event_layer"><option value="0">0</option><option value="1">1</option></select><br /><br />' , ((isset($this->tpldata['.'][0]['L_EVENT_PICTURE_TYPE'])) ? quotes($this->tpldata['.'][0]['L_EVENT_PICTURE_TYPE']) : ((isset($lang->event_picture_type)) ? quotes($lang->event_picture_type) : '')) , ' : <select id="event_picture_type" onchange="if(this.value==\\\'charasets\\\'){document.getElementById(\\\'event_dir_visibility\\\').style.visibility=\\\'visible\\\';}else{document.getElementById(\\\'event_dir_visibility\\\').style.visibility=\\\'hidden\\\';}"><option value="sprites">' , ((isset($this->tpldata['.'][0]['L_EVENT_SPRITE'])) ? quotes($this->tpldata['.'][0]['L_EVENT_SPRITE']) : ((isset($lang->event_sprite)) ? quotes($lang->event_sprite) : '')) , '</option><option value="charasets">' , ((isset($this->tpldata['.'][0]['L_EVENT_CHARASET'])) ? quotes($this->tpldata['.'][0]['L_EVENT_CHARASET']) : ((isset($lang->event_charaset)) ? quotes($lang->event_charaset) : '')) , '</option></select><br /><br /><span id="event_dir_visibility">' , ((isset($this->tpldata['.'][0]['L_EVENT_DIR'])) ? quotes($this->tpldata['.'][0]['L_EVENT_DIR']) : ((isset($lang->event_dir)) ? quotes($lang->event_dir) : '')) , ' : <select id="event_dir"><option value="0_0_1">' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ' 1 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="1_0_1">' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ' 2 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="2_0_1">' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ' 3 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="3_0_1">' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ' 4 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="0_1_1">' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ' 1 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="1_1_1">' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ' 2 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="2_1_1">' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ' 3 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="3_1_1">' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ' 4 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="0_2_1">' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ' 1 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="1_2_1">' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ' 2 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="2_2_1">' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ' 3 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="3_2_1">' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ' 4 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="0_3_1">' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ' 1 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="1_3_1">' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ' 2 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="2_3_1">' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ' 3 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="3_3_1">' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ' 4 - ' , ((isset($this->tpldata['.'][0]['L_DYNAMIC'])) ? quotes($this->tpldata['.'][0]['L_DYNAMIC']) : ((isset($lang->dynamic)) ? quotes($lang->dynamic) : '')) , '</option><option value="0_0_0">' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ' 1 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="1_0_0">' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ' 2 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="2_0_0">' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ' 3 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="3_0_0">' , ((isset($this->tpldata['.'][0]['L_DOWN'])) ? quotes($this->tpldata['.'][0]['L_DOWN']) : ((isset($lang->down)) ? quotes($lang->down) : '')) , ' 4 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="0_1_0">' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ' 1 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="1_1_0">' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ' 2 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="2_1_0">' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ' 3 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="3_1_0">' , ((isset($this->tpldata['.'][0]['L_LEFT'])) ? quotes($this->tpldata['.'][0]['L_LEFT']) : ((isset($lang->left)) ? quotes($lang->left) : '')) , ' 4 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="0_2_0">' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ' 1 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="1_2_0">' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ' 2 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="2_2_0">' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ' 3 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="3_2_0">' , ((isset($this->tpldata['.'][0]['L_RIGHT'])) ? quotes($this->tpldata['.'][0]['L_RIGHT']) : ((isset($lang->right)) ? quotes($lang->right) : '')) , ' 4 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="0_3_0">' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ' 1 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="1_3_0">' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ' 2 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="2_3_0">' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ' 3 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option><option value="3_3_0">' , ((isset($this->tpldata['.'][0]['L_UP'])) ? quotes($this->tpldata['.'][0]['L_UP']) : ((isset($lang->up)) ? quotes($lang->up) : '')) , ' 4 - ' , ((isset($this->tpldata['.'][0]['L_STATIC'])) ? quotes($this->tpldata['.'][0]['L_STATIC']) : ((isset($lang->static)) ? quotes($lang->static) : '')) , '</option></select></span></form>\';
';

echo '
';

echo '//-->
';

echo '</script>
';

echo '<script type="text/javascript" src="javascript/admin.event_editor.js"></script>
';



<table width="100%" cellpadding="2" cellspacing="1" border="0" class="portaline">
 <tr>
  <th colspan="2">{L_EVENT_EDITOR} : {EVENT_NAME}</th>
 </tr>
 <tr>

  <td class="row1" align="right" valign="top" width="50%" style="padding:10px;">

  <form action="" onsubmit="return false;"><input type="button" value="{L_SAVE_EVENT}" class="button" onclick="save_event();" /></form>

  <hr />
  
  <form action="" onsubmit="return false;">
  <input type="radio" name="mode" value="0" onclick="change_mode(this.value);" />&nbsp;<i>{L_EVENT_PROPERTIES}</i> &nbsp; <input type="radio" checked="checked" name="mode" value="1" onclick="change_mode(this.value);" />&nbsp;<i>{L_SCRIPT_EDITOR}</i>
  </form><br /><br />

  <div id="actual_mode"></div>

  </td>
  <td class="row2" align="left" valign="top" width="50%">

  <div style="padding:10px"><form action="" onsubmit="return false;"><i>{L_EVENT_SCRIPT} :</i><br /><textarea name="text_script" id="text_script" cols="" rows="" style="width:300px;height:300px;">{TEXT_SCRIPT}</textarea></form></div>

  </td>
 </tr>

</table>

<script type="text/javascript">
<!--

var u_index = '[U_INDEX]';
var l_not_saved_continue_question = '[L_NOT_SAVED_CONTINUE_QUESTION]';
var l_message_content = '[L_MESSAGE_CONTENT]';
var l_show_message = '[L_SHOW_MESSAGE]';
var l_validate = '[L_VALIDATE]';
var l_html_activated = '[L_HTML_ACTIVATED]';
var l_yes = '[L_YES]';
var l_no = '[L_NO]';
var l_left = '[L_LEFT]';
var l_right = '[L_RIGHT]';
var l_up = '[L_UP]';
var l_direction = '[L_DIRECTION]';
var l_down = '[L_DOWN]';
var l_center = '[L_CENTER]';
var l_justify = '[L_JUSTIFY]';
var l_time_limit = '[L_TIME_LIMIT]';
var l_validation = '[L_VALIDATION]';
var l_show_face = '[L_SHOW_FACE]';
var l_stored_in_var = '[L_STORED_IN_VAR]';
var l_number = '[L_NUMBER]';
var l_text = '[L_TEXT]';
var l_variable = '[L_VARIABLE]';
var l_value = '[L_VALUE]';
var l_var_set = '[L_VAR_SET]';
var l_var_increase = '[L_VAR_INCREASE]';
var l_var_decrease = '[L_VAR_DECREASE]';
var l_var_multiply = '[L_VAR_MULTIPLY]';
var l_var_divide = '[L_VAR_DIVIDE]';
var l_var_concat = '[L_VAR_CONCAT]';
var l_do_not_change = '[L_DO_NOT_CHANGE]';
var l_map_dir = '[L_MAP_DIR]';
var l_warning_function = '[L_WARNING_FUNCTION]';
var l_condition_equal = '[L_CONDITION_EQUAL]';
var l_condition_different = '[L_CONDITION_DIFFERENT]';
var l_condition_smaller = '[L_CONDITION_SMALLER]';
var l_condition_bigger = '[L_CONDITION_BIGGER]';
var l_condition_smaller_or_equal = '[L_CONDITION_SMALLER_OR_EQUAL]';
var l_condition_bigger_or_equal = '[L_CONDITION_BIGGER_OR_EQUAL]';
var l_condition_with_else = '[L_CONDITION_WITH_ELSE]';
var l_condition_without_else = '[L_CONDITION_WITHOUT_ELSE]';
var refresh_method = {REFRESH_METHOD};
var event_id = {EVENT_ID};
var event_picture = '[EVENT_PICTURE]';
var event_picture_type = '[EVENT_PICTURE_TYPE]';
var event_dir = '{EVENT_DIR}';
var event_name = '[EVENT_NAME]';
var event_layer = {EVENT_LAYER};
var mode = new Array();

mode[1] = '<form action="" onsubmit="return false;"><select name="command_list" id="select_command" onchange="if(this.value!=-1){command(this.value, false, false);}"><option value="-1"> - </option>';
<!-- BEGIN command_list -->
mode[1] += '<option value="{command_list.ID}">{command_list.ID}. [command_list.VALUE]</option>';
<!-- END command_list -->
mode[1] += '</select></form><br /><br /><div id="editor_options"></div>';
mode[0] = '<form action="" onsubmit="return false;">[L_EVENT_NAME] : <input type="text" id="event_name" value="" /><br /><br />[L_EVENT_PICTURE] : <span id="event_picture_path"></span>&nbsp;<input type="text" id="event_picture" value="" /><br /><br /><img id="event_picture_image" src="" /><br /><br />[L_EVENT_LAYER] : <select id="event_layer"><option value="0">0</option><option value="1">1</option></select><br /><br />[L_EVENT_PICTURE_TYPE] : <select id="event_picture_type" onchange="if(this.value==\'charasets\'){document.getElementById(\'event_dir_visibility\').style.visibility=\'visible\';}else{document.getElementById(\'event_dir_visibility\').style.visibility=\'hidden\';}"><option value="sprites">[L_EVENT_SPRITE]</option><option value="charasets">[L_EVENT_CHARASET]</option></select><br /><br /><span id="event_dir_visibility">[L_EVENT_DIR] : <select id="event_dir"><option value="0_0_1">[L_DOWN] 1 - [L_DYNAMIC]</option><option value="1_0_1">[L_DOWN] 2 - [L_DYNAMIC]</option><option value="2_0_1">[L_DOWN] 3 - [L_DYNAMIC]</option><option value="3_0_1">[L_DOWN] 4 - [L_DYNAMIC]</option><option value="0_1_1">[L_LEFT] 1 - [L_DYNAMIC]</option><option value="1_1_1">[L_LEFT] 2 - [L_DYNAMIC]</option><option value="2_1_1">[L_LEFT] 3 - [L_DYNAMIC]</option><option value="3_1_1">[L_LEFT] 4 - [L_DYNAMIC]</option><option value="0_2_1">[L_RIGHT] 1 - [L_DYNAMIC]</option><option value="1_2_1">[L_RIGHT] 2 - [L_DYNAMIC]</option><option value="2_2_1">[L_RIGHT] 3 - [L_DYNAMIC]</option><option value="3_2_1">[L_RIGHT] 4 - [L_DYNAMIC]</option><option value="0_3_1">[L_UP] 1 - [L_DYNAMIC]</option><option value="1_3_1">[L_UP] 2 - [L_DYNAMIC]</option><option value="2_3_1">[L_UP] 3 - [L_DYNAMIC]</option><option value="3_3_1">[L_UP] 4 - [L_DYNAMIC]</option><option value="0_0_0">[L_DOWN] 1 - [L_STATIC]</option><option value="1_0_0">[L_DOWN] 2 - [L_STATIC]</option><option value="2_0_0">[L_DOWN] 3 - [L_STATIC]</option><option value="3_0_0">[L_DOWN] 4 - [L_STATIC]</option><option value="0_1_0">[L_LEFT] 1 - [L_STATIC]</option><option value="1_1_0">[L_LEFT] 2 - [L_STATIC]</option><option value="2_1_0">[L_LEFT] 3 - [L_STATIC]</option><option value="3_1_0">[L_LEFT] 4 - [L_STATIC]</option><option value="0_2_0">[L_RIGHT] 1 - [L_STATIC]</option><option value="1_2_0">[L_RIGHT] 2 - [L_STATIC]</option><option value="2_2_0">[L_RIGHT] 3 - [L_STATIC]</option><option value="3_2_0">[L_RIGHT] 4 - [L_STATIC]</option><option value="0_3_0">[L_UP] 1 - [L_STATIC]</option><option value="1_3_0">[L_UP] 2 - [L_STATIC]</option><option value="2_3_0">[L_UP] 3 - [L_STATIC]</option><option value="3_3_0">[L_UP] 4 - [L_STATIC]</option></select></span></form>';

//-->
</script>
<script type="text/javascript" src="javascript/admin.event_editor.js"></script>
<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo '
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_SELECT_CLASS_TO_EDIT'])) ? $this->tpldata['.'][0]['L_SELECT_CLASS_TO_EDIT'] : ((isset($lang->select_class_to_edit)) ? $lang->select_class_to_edit : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1" align="center" style="padding:20px">
';

echo '  <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '" method="GET" onsubmit="if(document.getElementById(\'classname\').value==\'\'){return false;}">
';

echo '  <input type="hidden" name="mod" value="admin.general" />
';

echo '  <input type="hidden" name="mode" value="class_editor" />
';

echo '  <select name="classname" id="classname">
';

echo '  <option value=""> - </option>
';

$_class_list_count = (isset($this->tpldata['class_list'])) ? count($this->tpldata['class_list']) : 0;for ($_class_list_i = 0; $_class_list_i < $_class_list_count; $_class_list_i++){
echo '  <option value="' , ((isset($this->tpldata['class_list'][$_class_list_i]['NAME'])) ? $this->tpldata['class_list'][$_class_list_i]['NAME'] : '') , '">' , ((isset($this->tpldata['class_list'][$_class_list_i]['TITLE'])) ? $this->tpldata['class_list'][$_class_list_i]['TITLE'] : '') , '</option>
';

} // END class_list
echo '  </select>
';

echo '  <input type="submit" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? $this->tpldata['.'][0]['L_VALIDATE'] : ((isset($lang->validate)) ? $lang->validate : '')) , '" class="button" />
';

echo '  </form>
';

echo '  </td>
';

echo ' </tr>
';

echo '</table>
';



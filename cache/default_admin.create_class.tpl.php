<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_CREATE_CLASS'])) ? $this->tpldata['.'][0]['L_CREATE_CLASS'] : ((isset($lang->create_class)) ? $lang->create_class : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1">
';

echo '  <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.general&amp;mode=create_class" method="post">
';

echo '  <input type="hidden" name="create_class" value="1" />
';

echo '
';

echo '  <table width="100%" cellpadding="3" cellspacing="0" border="0">
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CLASSNAME'])) ? $this->tpldata['.'][0]['L_CLASSNAME'] : ((isset($lang->classname)) ? $lang->classname : '')) , ' :</td><td align="left" width="50%"><input type="text" name="classname" value="" maxlength="24" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_CLASS_TITLE'])) ? $this->tpldata['.'][0]['L_CLASS_TITLE'] : ((isset($lang->class_title)) ? $lang->class_title : '')) , ' :</td><td align="left" width="50%"><input type="text" name="class_title" value="" maxlength="64" /></td>
';

echo '   </tr>
';

echo '   <tr>
';

echo '    <td align="center" colspan="2"><input type="submit" value="' , ((isset($this->tpldata['.'][0]['L_VALIDATE'])) ? $this->tpldata['.'][0]['L_VALIDATE'] : ((isset($lang->validate)) ? $lang->validate : '')) , '" class="button" /></td>
';

echo '   </tr>
';

echo '  </table>
';

echo '
';

echo '  </form>
';

echo '  </td>
';

echo ' </tr>
';

echo '</table>
';



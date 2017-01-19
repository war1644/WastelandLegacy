<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
';

echo ' <tr>
';

echo '  <th>' , ((isset($this->tpldata['.'][0]['L_CREATE_EVENT'])) ? $this->tpldata['.'][0]['L_CREATE_EVENT'] : ((isset($lang->create_event)) ? $lang->create_event : '')) , '</th>
';

echo ' </tr>
';

echo '
';

echo ' <tr>
';

echo '  <td class="row1">
';

echo '  <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.map&amp;mode=create_event" method="POST">
';

echo '  <input type="hidden" name="create_event" value="1" />
';

echo '
';

echo '  <table width="100%" cellpadding="3" cellspacing="0" border="0">
';

echo '   <tr>
';

echo '    <td align="right" width="50%">' , ((isset($this->tpldata['.'][0]['L_EVENT_NAME'])) ? $this->tpldata['.'][0]['L_EVENT_NAME'] : ((isset($lang->event_name)) ? $lang->event_name : '')) , ' :</td><td align="left" width="50%"><input type="text" name="event_name" value="" /></td>
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



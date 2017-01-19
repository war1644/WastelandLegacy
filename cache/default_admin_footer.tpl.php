<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '</td>
';

echo ' </tr>
';

echo '  </table>
';

$_is_admin_count = (isset($this->tpldata['is_admin'])) ? count($this->tpldata['is_admin']) : 0;for ($_is_admin_i = 0; $_is_admin_i < $_is_admin_count; $_is_admin_i++){
} // END is_admin
echo '
';

echo '  </td>
';

echo ' </tr>
';

echo '</table>
';

echo '
';

echo '<table width="100%">
';

echo ' <tr>
';

echo '  <td height="5"></td>
';

echo ' </tr>
';

echo '</table>
';

echo '
';

echo '<table width="100%" class="bodyline" cellspacing="0" cellpadding="3">
';

echo ' <tr>
';

echo '  <td align="center"><span class="copyright">' , ((isset($this->tpldata['.'][0]['COPYRIGHT'])) ? $this->tpldata['.'][0]['COPYRIGHT'] : '') , '<span id="execution_time"></span></span></td>
';

echo ' </tr>
';

echo '</table>
';

echo '
';

echo '</body>
';

echo '
';

echo '</html>
';



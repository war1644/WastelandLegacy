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

$_admin_panel_count = (isset($this->tpldata['admin_panel'])) ? count($this->tpldata['admin_panel']) : 0;for ($_admin_panel_i = 0; $_admin_panel_i < $_admin_panel_count; $_admin_panel_i++){
echo '  <div align="center" class="gensmall"><a href="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.panel">' , ((isset($this->tpldata['.'][0]['L_GO_TO_ADMIN_PANEL'])) ? $this->tpldata['.'][0]['L_GO_TO_ADMIN_PANEL'] : ((isset($lang->go_to_admin_panel)) ? $lang->go_to_admin_panel : '')) , '</a></div>
';

echo '  <br />
';

} // END admin_panel
echo '
';

echo '  </div>
';

echo '  </div>
';

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

echo '<script type="text/javascript">
';

echo '
';

echo 'document.getElementById(\'display_body\').innerHTML = document.getElementById(\'real_body\').innerHTML;
';

echo '
';

echo '</script>
';

echo '
';

echo '</body>
';

echo '
';

echo '</html>
';



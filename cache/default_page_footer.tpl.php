<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '
';

$_admin_panel_count = (isset($this->tpldata['admin_panel'])) ? count($this->tpldata['admin_panel']) : 0;for ($_admin_panel_i = 0; $_admin_panel_i < $_admin_panel_count; $_admin_panel_i++){
echo '<div align="center" class="gensmall gogens"><a href="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=admin.panel">' , ((isset($this->tpldata['.'][0]['L_GO_TO_ADMIN_PANEL'])) ? $this->tpldata['.'][0]['L_GO_TO_ADMIN_PANEL'] : ((isset($lang->go_to_admin_panel)) ? $lang->go_to_admin_panel : '')) , '</a></div>
';

} // END admin_panel
echo '<br />
';

echo '</div>
';

echo '<div><span class="copyright">' , ((isset($this->tpldata['.'][0]['COPYRIGHT'])) ? $this->tpldata['.'][0]['COPYRIGHT'] : '') , '<span id="execution_time"></span></span></div>
';

echo '
';

echo '</body>
';

echo '
';

echo '</html>
';



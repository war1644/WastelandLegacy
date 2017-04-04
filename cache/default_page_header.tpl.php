<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

echo '<!doctype html>
';

echo '<html lang="en" dir="' , ((isset($this->tpldata['.'][0]['SCREEN_DIRECTION'])) ? $this->tpldata['.'][0]['SCREEN_DIRECTION'] : '') , '">
';

echo '<head>
';

echo '    <meta charset="UTF-8">
';

echo '    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
';

echo '    <meta http-equiv="X-UA-Compatible" content="ie=edge">
';

echo '    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
';

echo '    <title>' , ((isset($this->tpldata['.'][0]['SITE_NAME'])) ? $this->tpldata['.'][0]['SITE_NAME'] : '') , ' - ' , ((isset($this->tpldata['.'][0]['PAGE_NAME'])) ? $this->tpldata['.'][0]['PAGE_NAME'] : '') , '</title>
';

echo '    <link rel="stylesheet" href="' , ((isset($this->tpldata['.'][0]['TEMPLATE_PATH'])) ? $this->tpldata['.'][0]['TEMPLATE_PATH'] : '') , 'style.css" type="text/css" />
';

echo '    <script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
';

echo '    <script type="text/javascript" src="javascript/common.js"></script>
';

$_redirect_count = (isset($this->tpldata['redirect'])) ? count($this->tpldata['redirect']) : 0;for ($_redirect_i = 0; $_redirect_i < $_redirect_count; $_redirect_i++){
echo '    <meta http-equiv="refresh" content="' , ((isset($this->tpldata['redirect'][$_redirect_i]['TIMEOUT'])) ? $this->tpldata['redirect'][$_redirect_i]['TIMEOUT'] : '') , ';' , ((isset($this->tpldata['redirect'][$_redirect_i]['HTML_LOCATION'])) ? $this->tpldata['redirect'][$_redirect_i]['HTML_LOCATION'] : '') , '" />
';

echo '    <script type="text/javascript">
';

echo '        function location_timeout(time)
';

echo '        {
';

echo '            if ( document.getElementById(\'redirect_timeout\') )
';

echo '            {
';

echo '                document.getElementById(\'redirect_timeout\').innerHTML = time;
';

echo '                if ( time > 0 )
';

echo '                {
';

echo '                    setTimeout(\'location_timeout(\' + (time - 1) + \');\', 1000);
';

echo '                }
';

echo '            }
';

echo '        }
';

echo '        function location_redirect()
';

echo '        {
';

echo '            document.location.href = \'' , ((isset($this->tpldata['redirect'][$_redirect_i]['LOCATION'])) ? quotes($this->tpldata['redirect'][$_redirect_i]['LOCATION']) : '') , '\';
';

echo '        }
';

echo '        setTimeout(\'location_redirect();\', (' , ((isset($this->tpldata['redirect'][$_redirect_i]['TIMEOUT'])) ? $this->tpldata['redirect'][$_redirect_i]['TIMEOUT'] : '') , ' * 1000));
';

echo '    </script>
';

} // END redirect
echo '
';

echo '</head>
';

echo '
';

echo '<body id="bacBody" style="width: 100vw;height: 100vh;">
';

echo '<noscript><div id="noscript">' , ((isset($this->tpldata['.'][0]['L_JAVASCRIPT_REQUIRED'])) ? $this->tpldata['.'][0]['L_JAVASCRIPT_REQUIRED'] : ((isset($lang->javascript_required)) ? $lang->javascript_required : '')) , '</div></noscript>
';

echo '<span id="top"></span>
';

$_bgsound_ie_count = (isset($this->tpldata['bgsound_ie'])) ? count($this->tpldata['bgsound_ie']) : 0;for ($_bgsound_ie_i = 0; $_bgsound_ie_i < $_bgsound_ie_count; $_bgsound_ie_i++){
echo '<bgsound src="music/' , ((isset($this->tpldata['bgsound_ie'][$_bgsound_ie_i]['MUSIC'])) ? $this->tpldata['bgsound_ie'][$_bgsound_ie_i]['MUSIC'] : '') , '" loop="-1" />
';

} // END bgsound_ie
$_bgsound_ns_count = (isset($this->tpldata['bgsound_ns'])) ? count($this->tpldata['bgsound_ns']) : 0;for ($_bgsound_ns_i = 0; $_bgsound_ns_i < $_bgsound_ns_count; $_bgsound_ns_i++){
echo '<audio id="backMp3" src="music/' , ((isset($this->tpldata['bgsound_ns'][$_bgsound_ns_i]['MUSIC'])) ? $this->tpldata['bgsound_ns'][$_bgsound_ns_i]['MUSIC'] : '') , '" autoplay loop></audio>
';

} // END bgsound_ns
echo '
';

echo '
';

echo '
';

echo ' <div id="display_body">
';

echo '
';

echo '
';

echo '
';

echo '
';

echo '
';

echo '
';

echo '
';

echo '
';



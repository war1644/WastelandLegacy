<!doctype html>
<html lang="en" dir="{SCREEN_DIRECTION}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <title>{SITE_NAME} - {PAGE_NAME}</title>
    <link rel="stylesheet" href="{TEMPLATE_PATH}style.css" type="text/css" />
    <script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="javascript/common.js"></script>
    <!-- BEGIN redirect -->
    <meta http-equiv="refresh" content="{redirect.TIMEOUT};{redirect.HTML_LOCATION}" />
    <script type="text/javascript">
        function location_timeout(time)
        {
            if ( document.getElementById('redirect_timeout') )
            {
                document.getElementById('redirect_timeout').innerHTML = time;
                if ( time > 0 )
                {
                    setTimeout('location_timeout(' + (time - 1) + ');', 1000);
                }
            }
        }
        function location_redirect()
        {
            document.location.href = '[redirect.LOCATION]';
        }
        setTimeout('location_redirect();', ({redirect.TIMEOUT} * 1000));
    </script>
    <!-- END redirect -->

</head>

<body id="bacBody" style="width: 100vw;height: 100vh;">
<noscript><div id="noscript">{L_JAVASCRIPT_REQUIRED}</div></noscript>
<span id="top"></span>
<!-- BEGIN bgsound_ie -->
<bgsound src="music/{bgsound_ie.MUSIC}" loop="-1" />
<!-- END bgsound_ie -->
<!-- BEGIN bgsound_ns -->
<audio id="backMp3" src="music/{bgsound_ns.MUSIC}" autoplay loop></audio>
<!-- END bgsound_ns -->



 <div id="display_body">








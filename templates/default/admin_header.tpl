<!doctype html>
<html lang="en" dir="{DIRECTION}">
<head>
 <meta charset="UTF-8">
 <meta name="viewport"
       content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="Content-Type" content="text/html; charset={ENCODING}" />
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<title>{SITE_NAME} - {PAGE_NAME}</title>
<link rel="stylesheet" href="{TEMPLATE_PATH}style.css" type="text/css" />
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
setTimeout('location_redirect()', ({redirect.TIMEOUT} * 1000));
</script>
 <!-- END redirect -->
</head>


<body>
<span id="top"></span>

<table class="bodyline" width="100%" cellspacing="0" cellpadding="0" border="0">
 <tr>
  <td>
  <table width="100%" cellspacing="1" cellpadding="10" border="0" align="center">
 <tr>
<td align="center">

<div class="nav" align="left">{NAVIGATION}</div>
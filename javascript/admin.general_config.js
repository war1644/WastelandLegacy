
/*

Program: phpore
Author: Jeremy Faivre
Contact: http://www.jeremyfaivre.com/about
Year: 2005

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

*/

var i = 0;
while ( document.getElementById('time_zone').options[i].value != time_zone )
{
	i++;
}
document.getElementById('time_zone').options[i].selected = true;

if ( use_cache )
{
	document.getElementById('use_cache').options[1].selected = true;
}

if ( use_gzip )
{
	document.getElementById('use_gzip').options[1].selected = true;
}

if ( optimize_maps )
{
	document.getElementById('optimize_maps').options[1].selected = true;
}

if ( refresh_method )
{
	document.getElementById('refresh_method').options[1].selected = true;
}
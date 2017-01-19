
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
while ( document.getElementById('classname').options[i] && document.getElementById('classname').options[i].value != classname )
{
	i++;
}
document.getElementById('classname').options[i].selected = true;

i = 0;
while ( document.getElementById('map_dir').options[i] && document.getElementById('map_dir').options[i].value != map_dir )
{
	i++;
}
document.getElementById('map_dir').options[i].selected = true;

if ( admin )
{
	document.getElementById('admin').options[1].selected = true;
}

function modify_location_change()
{
	if ( document.getElementById('modify_location').value == 1 )
	{
		document.getElementById('map_id').disabled = false;
		document.getElementById('map_left').disabled = false;
		document.getElementById('map_top').disabled = false;
		document.getElementById('map_dir').disabled = false;
	}
	else
	{
		document.getElementById('map_id').disabled = true;
		document.getElementById('map_left').disabled = true;
		document.getElementById('map_top').disabled = true;
		document.getElementById('map_dir').disabled = true;
	}
}

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

function urlencode(content)
{
	return str_replace(escape(content), '+', '%2B');
}

// replace \ with \\ and ' with \'
function quotes(content)
{
	return str_replace(str_replace(content, '\\', '\\\\'), '\'', '\\\'');
}

// str_replace function for javascript
function str_replace(old, search, replace)
{
	var data = '';
	var pos = old.indexOf(search);
	var count = 0;
	if( pos != -1 )
	{
		while( pos >= 0 )
		{
			data = data + old.substring(0, pos) + replace;
			old = old.substring(pos + search.length, old.length);
			pos = old.indexOf(search);
			count++;
		}
		old = data + old;
	}

	return old;
}

//
// chatbox
//
function submit_chat()
{
	if ( chatbox_content.length > 128)
	{
		alert(l_flood_alert);
		return false;
	}

	var message = trim(document.getElementById('message_chat').value);
	// alert(message);

	if ( message == '' )
	{
		document.getElementById('message_chat').value = '';
		return false;
	}

	chatbox_content += ',' + message;

	// Who is slash command [Nuladion]
	if ( message.charAt(0) != '/' || message.substr(0,5) != '/who ' )
	{	
		chat_add(my_user_name, htmlspecialchars(message));
	}

	document.getElementById('message_chat').value = '';
}

function chat_add(name, message, special)
{
	if ( chat_history )
	{
		var color = 'gray';
	}
	else if ( special )
	{
		var color = 'blue';
	}
	else
	{
		var color = 'black';
	}

	if ( !special )
	{
		document.getElementById('chatbox').innerHTML += '<div style="color:' + color + '"><b>' + name + '</b>&nbsp;: <i>' + smileys(message) + '</i></div>';
	}
	else
	{
		document.getElementById('chatbox').innerHTML += '<div style="color:' + color + '"><b>' + name + '</b>&nbsp;:<br /><i>' + message + '</i></div>';
	}
	
	document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
}

function trim(text) 
{
	while ( text.substring(0,1) == ' ' || text.substring(0,1) == '	' )
	{
		text = text.substring(1, text.length);
	}
	while ( text.substring(text.length-1, text.length) == ' ' || text.substring(text.length-1, text.length) == '	' )
	{
		text = text.substring(0,text.length-1);
	}
	return text;
}

function htmlspecialchars(text)
{
	text = str_replace(text, '&', '&amp;');
	text = str_replace(text, '"', '&quot;');
	text = str_replace(text, '<', '&lt;');
	text = str_replace(text, '>', '&gt;');
	return text;
}

function htmlspecialchars_decode(text)
{
	text = str_replace(text, '&quot;', '"');
	text = str_replace(text, '&lt;', '<');
	text = str_replace(text, '&gt;', '>');
	text = str_replace(text, '&amp;', '&');
	return text;
}

function smileys(text)
{
	var code = new Array();
	var replace = new Array();

	code[code.length] = '8)';
	replace[replace.length] = '<img src="images/smileys/cool.gif" style="width:19px;height:19px" alt="8)" />';
	code[code.length] = '8|';
	replace[replace.length] = '<img src="images/smileys/what.gif" style="width:19px;height:19px" alt="8|" />';
	code[code.length] = ':(';
	replace[replace.length] = '<img src="images/smileys/sad.gif" style="width:19px;height:19px" alt=":(" />';
	code[code.length] = ':)';
	replace[replace.length] = '<img src="images/smileys/smile.gif" style="width:19px;height:19px" alt=":)" />';
	code[code.length] = ':biggrin:';
	replace[replace.length] = '<img src="images/smileys/biggrin.gif" style="width:19px;height:19px" alt=":biggrin:" />';
	code[code.length] = ':bleble:';
	replace[replace.length] = '<img src="images/smileys/bleble.gif" style="width:19px;height:19px" alt=":bleble:" />';
	code[code.length] = ':blink:';
	replace[replace.length] = '<img src="images/smileys/blink.gif" style="width:19px;height:19px" alt=":blink:" />';
	code[code.length] = ':blush:';
	replace[replace.length] = '<img src="images/smileys/blush.gif" style="width:19px;height:19px" alt=":blush:" />';
	code[code.length] = ':cheesy:';
	replace[replace.length] = '<img src="images/smileys/cheesy.gif" style="width:19px;height:19px" alt=":cheesy:" />';
	code[code.length] = ':clap:';
	replace[replace.length] = '<img src="images/smileys/clap.gif" style="width:19px;height:19px" alt=":clap:" />';
	code[code.length] = ':cool:';
	replace[replace.length] = '<img src="images/smileys/cool.gif" style="width:19px;height:19px" alt=":cool:" />';
	code[code.length] = ':crazy:';
	replace[replace.length] = '<img src="images/smileys/crazy.gif" style="width:19px;height:19px" alt=":crazy:" />';
	code[code.length] = ':cry:';
	replace[replace.length] = '<img src="images/smileys/cry.gif" style="width:19px;height:19px" alt=":cry:" />';
	code[code.length] = ':D';
	replace[replace.length] = '<img src="images/smileys/biggrin.gif" style="width:19px;height:19px" alt=":D" />';
	code[code.length] = ':downeyes:';
	replace[replace.length] = '<img src="images/smileys/downeyes.gif" style="width:19px;height:19px" alt=":downeyes:" />';
	code[code.length] = ':dry:';
	replace[replace.length] = '<img src="images/smileys/dry.gif" style="width:19px;height:19px" alt=":dry:" />';
	code[code.length] = ':happy:';
	replace[replace.length] = '<img src="images/smileys/happy.gif" style="width:19px;height:19px" alt=":happy:" />';
	code[code.length] = ':huh:';
	replace[replace.length] = '<img src="images/smileys/huh.gif" style="width:19px;height:19px" alt=":huh:" />';
	code[code.length] = ':laugh:';
	replace[replace.length] = '<img src="images/smileys/laugh.gif" style="width:19px;height:19px" alt=":laugh:" />';
	code[code.length] = ':lol:';
	replace[replace.length] = '<img src="images/smileys/laugh.gif" style="width:19px;height:19px" alt=":lol:" />';
	code[code.length] = ':love:';
	replace[replace.length] = '<img src="images/smileys/love.gif" style="width:19px;height:19px" alt=":love:" />';
	code[code.length] = ':mad:';
	replace[replace.length] = '<img src="images/smileys/mad.gif" style="width:19px;height:19px" alt=":mad:" />';
	code[code.length] = ':mellow:';
	replace[replace.length] = '<img src="images/smileys/mellow.gif" style="width:19px;height:19px" alt=":mellow:" />';
	code[code.length] = ':o';
	replace[replace.length] = '<img src="images/smileys/ooh.gif" style="width:19px;height:19px" alt=":o" />';
	code[code.length] = ':ooh:';
	replace[replace.length] = '<img src="images/smileys/ooh.gif" style="width:19px;height:19px" alt=":ooh:" />';
	code[code.length] = ':p';
	replace[replace.length] = '<img src="images/smileys/tongue.gif" style="width:19px;height:19px" alt=":p" />';
	code[code.length] = ':sad:';
	replace[replace.length] = '<img src="images/smileys/sad.gif" style="width:19px;height:19px" alt=":sad:" />';
	code[code.length] = ':sleep:';
	replace[replace.length] = '<img src="images/smileys/sleep.gif" style="width:19px;height:19px" alt=":sleep:" />';
	code[code.length] = ':smile:';
	replace[replace.length] = '<img src="images/smileys/smile.gif" style="width:19px;height:19px" alt=":smile:" />';
	code[code.length] = ':tongue:';
	replace[replace.length] = '<img src="images/smileys/tongue.gif" style="width:19px;height:19px" alt=":tongue:" />';
	code[code.length] = ':unsure:';
	replace[replace.length] = '<img src="images/smileys/unsure.gif" style="width:19px;height:19px" alt=":unsure:" />';
	code[code.length] = ':what:';
	replace[replace.length] = '<img src="images/smileys/what.gif" style="width:19px;height:19px" alt=":what:" />';
	code[code.length] = ':wink:';
	replace[replace.length] = '<img src="images/smileys/wink.gif" style="width:19px;height:19px" alt=":wink:" />';
	code[code.length] = ':zzz:';
	replace[replace.length] = '<img src="images/smileys/sleep.gif" style="width:19px;height:19px" alt=":zzz:" />';
	code[code.length] = ':|';
	replace[replace.length] = '<img src="images/smileys/mellow.gif" style="width:19px;height:19px" alt=":|" />';
	code[code.length] = ';)';
	replace[replace.length] = '<img src="images/smileys/blink.gif" style="width:19px;height:19px" alt=";)" />';
	code[code.length] = 'B)';
	replace[replace.length] = '<img src="images/smileys/cool.gif" style="width:19px;height:19px" alt="B)" />';
	code[code.length] = 'x(';
	replace[replace.length] = '<img src="images/smileys/mad.gif" style="width:19px;height:19px" alt="x(" />';
	code[code.length] = 'X(';
	replace[replace.length] = '<img src="images/smileys/mad.gif" style="width:19px;height:19px" alt="X(" />';
	code[code.length] = '^^';
	replace[replace.length] = '<img src="images/smileys/happy.gif" style="width:19px;height:19px" alt="^^" />';
	code[code.length] = ':b';
	replace[replace.length] = '<img src="images/smileys/focu.gif" style="width:19px;height:19px" alt=":b" />';
	code[code.length] = ':focu:';
	replace[replace.length] = '<img src="images/smileys/focu.gif" style="width:19px;height:19px" alt=":focu:" />';

	var i = 0;
	var i_max = code.length;

	while ( i < i_max )
	{
		text = str_replace(text, code[i], replace[i]);
		i++;
	}

	return text;
}

function change_chat_state()
{
	if ( chat_state == 1 )
	{
		document.getElementById('chat_hidden').innerHTML = document.getElementById('chat_show').innerHTML;
		document.getElementById('chat_show').innerHTML = '';
		document.getElementById('chat_title').innerHTML = chatbox_header.increase;
		chat_state = 0;
	}
	else
	{
		document.getElementById('chat_show').innerHTML = document.getElementById('chat_hidden').innerHTML;
		document.getElementById('chat_hidden').innerHTML = '';
		document.getElementById('chat_title').innerHTML = chatbox_header.reduce;
		chat_state = 1;
	}
}

// drag n drop 拖拽
function start_drag(layer_name)
{
	/*var f_drag_func = function() { drag_func(e, layer_name); };
	var f_do_drag = function() { do_drag(e, layer_name); };
	var f_end_drag = function() { end_drag(e, layer_name); };*/

	actual_layer = layer_name;

	if ( document.all )
	{
		// lance ma_fonction quand on appuie sur le bouton de la souris
		// 在按下鼠标按钮时启动 ma_fonction
		document.getElementById(layer_name).onmousedown = drag_func;
	}
	else
	{
		// lance ma_fonction quand on appuie sur le bouton de la souris
		// 在按下鼠标按钮时启动 ma_fonction
		document.getElementById(layer_name).addEventListener('mousedown', drag_func, false);
	}
}

function drag_func(e)
{
	if ( document.all )
	{
		//R�cup�ration de la position de la souris
		window.lastX = event.clientX; 
		window.lastY = event.clientY;
		// lance do_drag tant que l'on appuie sur le bouton de la souris en la bougeant
		document.onmousemove = do_drag;
		// lance end_drag quand on relache le bouton de la souris
		document.onmouseup = end_drag;
	}
	else
	{
		//R�cup�ration de la position de la souris
		window.lastX = e.clientX;
		window.lastY = e.clientY;
		// lance do_drag tant que l'on appuie sur le bouton de la souris en la bougeant
		window.onmousemove = do_drag;
		// lance end_drag quand on relache le bouton de la souris
		window.onmouseup = end_drag;
	}
}

// D�placement des Divs-Layers
function do_drag(e)
{
	if ( document.all )
	{
		// Calcul de l'�cart de position de la souris
		var difX = event.clientX - window.lastX;
		var difY = event.clientY - window.lastY;
		if ( actual_layer == 'message_layer' )
		{
			window_x += difX;
			window_y += difY;
		}
		//R�cup�ration de la position du div et ajout de l'�cart de position de la souris
		var newX1 = parseInt(document.getElementById(actual_layer).style.left) + difX;
		var newY1 = parseInt(document.getElementById(actual_layer).style.top) + difY;
		// Assignation des nouvelles coordonn�es au div
		document.getElementById(actual_layer).style.left = newX1 + 'px';
		document.getElementById(actual_layer).style.top = newY1 + 'px';
		//Assignation de l'anci�nne position de la souris
		window.lastX = event.clientX;
		window.lastY = event.clientY;
	}
	else
	{
		// Calcul de l'�cart de position de la souris
		var difX = e.clientX - window.lastX;
		var difY = e.clientY - window.lastY;
		if ( actual_layer == 'message_layer' )
		{
			window_x += difX;
			window_y += difY;
		}
		//R�cup�ration de la position du div et ajout de l'�cart de position de la souris
		var newX1 = parseInt(document.getElementById(actual_layer).style.left) + difX;
		var newY1 = parseInt(document.getElementById(actual_layer).style.top) + difY;
		// Assignation des nouvelles coordonn�es au div
		document.getElementById(actual_layer).style.left = newX1 + 'px';
		document.getElementById(actual_layer).style.top = newY1 + 'px';
		//Assignation de l'anci�nne position de la souris
		window.lastX = e.clientX;
		window.lastY = e.clientY;
	}
}

//Et pour finir, voici la fonction qui traite le relachement du bouton : 
function end_drag(e)
{
	if ( document.all )
	{
		//R�initialisation du onmousemove
		document.onmousemove = null;
	}
	else
	{
		//R�initialisation du onmousemove
		window.onmousemove = null;
	}
}
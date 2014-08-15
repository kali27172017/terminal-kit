/*
	The Cedric's Swiss Knife (CSK) - CSK terminal toolbox
	
	Copyright (c) 2009 - 2014 Cédric Ronvel 
	
	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/





			/* Escape sequences */



// Mini-doc:

// ESC = \x1b
// CSI = ESC + [
// OSC = ESC + ]
// DSC = ESC + P
// ST = ESC + \	(end some sequences)

// CSI: ESC + [ + <command> + <type>
// It is possible to separate many command with a ';' before the final 'type'.

// See: http://en.wikipedia.org/wiki/ANSI_escape_code
// and: http://invisible-island.net/xterm/ctlseqs/ctlseqs.html
// man tput
// man 5 terminfo
// For tput tcap name, see: http://pubs.opengroup.org/onlinepubs/7990989799/xcurses/terminfo.html
// useful command: infocmp -l $TERM


// Common sequences

// Remove colors
var defaultColor = '\x1b[39m' ;	// back to the default color, most of time it is the same than .white
var bgDefaultColor = '\x1b[49m' ;	// back to the default color, most of time it is the same than .bgBlack



var esc = {
	
			/* Common sequences */

	// Reset the terminal
	reset: { on: '\x1bc' } ,
	
			/* Cursor sequences */
	
	saveCursor: { on: '\x1b7' } ,
	restoreCursor: { on: '\x1b8' } ,
	
	up: { on: '\x1b[%uA' } ,
	down: { on: '\x1b[%uB' } ,
	right: { on: '\x1b[%uC' } ,
	left: { on: '\x1b[%uD' } ,
	moveTo: { on: '\x1b[%+1U;%-1UH' } ,
	//moveToBottomLeft: { on: '\x1bF' } ,	// Should better not using it cause we can't rely on it (not portable)
	
			/* Editing sequences */
	
	deleteLine: { on: '\x1b[%uM' } ,
	//deleteLine: { on: '\x0b%D' } ,
	
			/* Misc sequences */
	
	beep: { on: '\x07' } ,	// Emit a beep

			/* Style sequences */

	styleReset: { on: '\x1b[0m' } ,
	
	bold: { on: '\x1b[1m' , off: '\x1b[22m' } ,		// here we use the dim.off code (22) that have a better support than (21), for God-only known reason...
	dim: { on: '\x1b[2m' , off: '\x1b[22m' } ,		// dim: darker, 'off' remove removes also bold/bright
	italic: { on: '\x1b[3m' , off: '\x1b[23m' } ,
	underline: { on: '\x1b[4m' , off: '\x1b[24m' } ,
	blink: { on: '\x1b[5m' , off: '\x1b[25m' } ,
	inverse: { on: '\x1b[7m' , off: '\x1b[27m' } ,
	hidden: { on: '\x1b[8m' , off: '\x1b[28m' } ,	// invisible, but can be copy/paste'd
	strike: { on: '\x1b[9m' , off: '\x1b[29m' } ,
	
	// Foreground color
	defaultColor: { on: defaultColor } ,
	black: { on: '\x1b[30m' , off: defaultColor } ,
	red: { on: '\x1b[31m' , off: defaultColor } ,
	green: { on: '\x1b[32m' , off: defaultColor } ,
	yellow: { on: '\x1b[33m' , off: defaultColor } ,
	blue: { on: '\x1b[34m' , off: defaultColor } ,
	magenta: { on: '\x1b[35m' , off: defaultColor } ,
	cyan: { on: '\x1b[36m' , off: defaultColor } ,
	white: { on: '\x1b[37m' , off: defaultColor } ,
	darkColor: { on: '\x1b[3%um' , off: defaultColor } ,	// should be called with a 0..7 integer
	brightBlack: { on: '\x1b[90m' , off: defaultColor } ,
	brightRed: { on: '\x1b[91m' , off: defaultColor } ,
	brightGreen: { on: '\x1b[92m' , off: defaultColor } ,
	brightYellow: { on: '\x1b[93m' , off: defaultColor } ,
	brightBlue: { on: '\x1b[94m' , off: defaultColor } ,
	brightMagenta: { on: '\x1b[95m' , off: defaultColor } ,
	brightCyan: { on: '\x1b[96m' , off: defaultColor } ,
	brightWhite: { on: '\x1b[97m' , off: defaultColor } ,
	brightColor: { on: '\x1b[9%um' , off: defaultColor } ,	// should be called with a 0..7 integer

	// Background color
	bgDefaultColor: { on: bgDefaultColor } ,
	bgBlack: { on: '\x1b[40m' , off: bgDefaultColor } ,
	bgRed: { on: '\x1b[41m' , off: bgDefaultColor } ,
	bgGreen: { on: '\x1b[42m' , off: bgDefaultColor } ,
	bgYellow: { on: '\x1b[43m' , off: bgDefaultColor } ,
	bgBlue: { on: '\x1b[44m' , off: bgDefaultColor } ,
	bgMagenta: { on: '\x1b[45m' , off: bgDefaultColor } ,
	bgCyan: { on: '\x1b[46m' , off: bgDefaultColor } ,
	bgWhite: { on: '\x1b[47m' , off: bgDefaultColor } ,
	bgDarkColor: { on: '\x1b[4%um' , off: bgDefaultColor } ,	// should be called with a 0..7 integer
	bgBrightBlack: { on: '\x1b[100m' , off: bgDefaultColor } ,
	bgBrightRed: { on: '\x1b[101m' , off: bgDefaultColor } ,
	bgBrightGreen: { on: '\x1b[102m' , off: bgDefaultColor } ,
	bgBrightYellow: { on: '\x1b[103m' , off: bgDefaultColor } ,
	bgBrightBlue: { on: '\x1b[104m' , off: bgDefaultColor } ,
	bgBrightMagenta: { on: '\x1b[105m' , off: bgDefaultColor } ,
	bgBrightCyan: { on: '\x1b[106m' , off: bgDefaultColor } ,
	bgBrightWhite: { on: '\x1b[107m' , off: bgDefaultColor } ,
	bgBrightColor: { on: '\x1b[10%um' , off: bgDefaultColor } ,	// should be called with a 0..7 integer
	
			/* Input / Output sequences */
	
	// Terminal will send the cursor coordinate
	cursor: { on: '\x1b[?6n' , off: '' } ,
	
	// Terminal will send event on button pressed with mouse position
	mouseButton: { on: '\x1b[?1000h' , off: '\x1b[?1000l' } ,
	
	// Terminal will send position of the column hilighted
	mouseHilight: { on: '\x1b[?1001h' , off: '\x1b[?1001l' } ,
	
	// Terminal will send event on button pressed and mouse motion as long as a button is down, with mouse position
	mouseDrag: { on: '\x1b[?1002h' , off: '\x1b[?1002l' } ,
	
	// Terminal will send event on button pressed and motion
	mouseMotion: { on: '\x1b[?1003h' , off: '\x1b[?1003l' } ,
	
	// Another mouse protocol that extend coordinate mapping (without it, it supports only 223 rows and columns)
	mouseSGR: { on: '\x1b[?1006h' , off: '\x1b[?1006l' } ,
	
	// Terminal will send event when it gains and loses focus
	focusEvent: { on: '\x1b[?1004h' , off: '\x1b[?1004l' } ,
	
	// This set the alternate screen buffer, do not work on many term, due to this titeInhibit shit...
	fullscreen: { on: '\x1b[?1049h' , off: '\x1b[?1049l' } ,
	//fullscreen: { on: '\x1b[?47h' , off: '\x1b[?47l' } ,
	
	// Should allow keypad to send different code than 0..9 keys but it does not works on some setup
	applicationKeypad: { on: '\x1b[?1h\x1b=' , off: '\x1b[?1l\x1b>' } ,
	
	// Do not work... use node.js stdout.setRawMode(true) instead
	//noecho: { on: '\x1b[12h' } ,
	
			/* OSC - OS Control sequences: may be unavailable on some context */
	
	// Set the title of an xterm-compatible window
	windowTitle: { on: '\x1b]0;%s\x1b\\' } ,
	
			/* Misc */
	
	// It just set error:true so it will write to STDERR instead of STDOUT
	error: { err: true } ,
} ;





			/* Inputs management */



var handler = {} ;



handler.mouseX11Protocol = function mouseX11Protocol( basename , buffer )
{
	var code = buffer[ 0 ] ;
	var result = {
		data: {
			shift: code & 4 ? true : false ,
			alt: code & 8 ? true : false ,
			ctrl: code & 16 ? true : false
		}
	} ;
	
	if ( code & 32 )
	{
		if ( code & 64 )
		{
			result.name = basename + ( code & 1 ? '_WHEEL_DOWN' : '_WHEEL_UP' ) ;
		}
		else
		{
			// Button event
			switch ( code & 3 )
			{
				case 0 : result.name = basename + '_LEFT_BUTTON_PRESSED' ; break ;
				case 1 : result.name = basename + '_MIDDLE_BUTTON_PRESSED' ; break ;
				case 2 : result.name = basename + '_RIGHT_BUTTON_PRESSED' ; break ;
				case 3 : result.name = basename + '_BUTTON_RELEASED' ; break ;
			}
		}
	}
	else if ( code & 64 )
	{
		// Motion event
		result.name = basename + '_MOTION' ;
	}
	
	result.eaten = 3 ;
	result.data.code = code ;
	result.data.x = buffer[ 1 ] - 32 ;
	result.data.y = buffer[ 2 ] - 32 ;
	
	return result ;
} ;



handler.mouseSGRProtocol = function mouseSGRProtocol( basename , buffer )
{
	var code , released , matches , result ;
	
	matches = buffer.toString().match( /^([0-9]*);([0-9]*);([0-9]*)(.)/ ) ;
	
	code = parseInt( matches[ 1 ] ) ;
	released = matches[ 4 ] === 'm' ;
	
	result = {
		data: {
			shift: code & 4 ? true : false ,
			alt: code & 8 ? true : false ,
			ctrl: code & 16 ? true : false
		}
	} ;
	
	result.data.x = parseInt( matches[ 2 ] ) ;
	result.data.y = parseInt( matches[ 3 ] ) ;
	result.eaten = matches[ 0 ].length ;
	
	if ( code & 32 )
	{
		// Motions event
		result.name = basename + '_MOTION' ;
	}
	else
	{
		if ( code & 64 )
		{
			result.name = basename + ( code & 1 ? '_WHEEL_DOWN' : '_WHEEL_UP' ) ;
		}
		else
		{
			// Button event
			switch ( code & 3 )
			{
				case 0 : result.name = basename + '_LEFT_BUTTON' ; break ;
				case 1 : result.name = basename + '_MIDDLE_BUTTON' ; break ;
				case 2 : result.name = basename + '_RIGHT_BUTTON' ; break ;
				case 3 : result.name = basename + '_OTHER_BUTTON' ; break ;
			}
			
			result.name += released ? '_RELEASED' : '_PRESSED' ;
		}
	}
	
	result.data.code = code ;
	
	return result ;
} ;





			/* Key Mapping */



var keymap = {
	
	ESCAPE: '\x1b' ,
	TAB: '\x09' ,
	ENTER: '\x0d' ,
	BACKSPACE: '\x7f' ,
	
	UP: [ '\x1bOA' , '\x1b[A' ] ,
	DOWN: [ '\x1bOB' , '\x1b[B' ] ,
	RIGHT: [ '\x1bOC' , '\x1b[C' ] ,
	LEFT: [ '\x1bOD' , '\x1b[D' ] ,
	
	INSERT: '\x1b[2~' ,
	DELETE: '\x1b[3~' ,
	HOME:[ '\x1b[1~' , '\x1b[H' , '\x1bOH' ] ,
	END: [ '\x1b[4~' , '\x1b[F' , '\x1bOF' ] ,
	PAGE_UP: '\x1b[5~' ,
	PAGE_DOWN: '\x1b[6~' ,
	
	// Application Keypad
	KP_NUMLOCK: [] ,	// '\x1bOP' ,
	KP_DIVIDE: '\x1bOo' ,
	KP_MULTIPLY: '\x1bOj' ,
	KP_MINUS: '\x1bOm' ,
	KP_0: [] ,	// '\x1b[2~' ,
	KP_1: [] ,	// '\x1bOF' ,
	KP_2: [] ,	// '\x1b[B' ,
	KP_3: [] ,	// '\x1b[6~' ,
	KP_4: [] ,	// '\x1b[D' ,
	KP_5: [ '\x1bOE' , '\x1b[E' ] ,
	KP_6: [] ,	// '\x1b[C' ,
	KP_7: [] ,	// '\x1bOH' ,
	KP_8: [] ,	// '\x1b[A' ,
	KP_9: [] ,	// '\x1b[5~' ,
	KP_PLUS: '\x1bOk' ,
	KP_DELETE: [] ,	// '\x1b[3~' ,
	KP_ENTER: '\x1bOM' ,
	
	F1: '\x1bOP' ,
	F2: '\x1bOQ' ,
	F3: '\x1bOR' ,
	F4: '\x1bOS' ,
	F5: '\x1b[15~' ,
	F6: '\x1b[17~' ,
	F7: '\x1b[18~' ,
	F8: '\x1b[19~' ,
	F9: '\x1b[20~' ,
	F10: '\x1b[21~' ,
	F11: [ '\x1b[23~' , '\x1b[22~' ] ,
	F12: '\x1b[24~' ,
	
	SHIFT_UP: '\x1b[1;2A' ,
	SHIFT_DOWN: '\x1b[1;2B' ,
	SHIFT_RIGHT: '\x1b[1;2C' ,
	SHIFT_LEFT: '\x1b[1;2D' ,
	ALT_UP: '\x1b[1;3A' ,
	ALT_DOWN: '\x1b[1;3B' ,
	ALT_RIGHT: '\x1b[1;3C' ,
	ALT_LEFT: '\x1b[1;3D' ,
	CTRL_UP: '\x1b[1;5A' ,
	CTRL_DOWN: '\x1b[1;5B' ,
	CTRL_RIGHT: '\x1b[1;5C' ,
	CTRL_LEFT: '\x1b[1;5D' ,
	
	FOCUS_IN: { code: '\x1b[I' , event: 'window' , data: {} } ,
	FOCUS_OUT: { code: '\x1b[O' , event: 'window' , data: {} } ,
	
	MOUSE: [
		{ code: '\x1b[<' , event: 'mouse' , handler: handler.mouseSGRProtocol } ,
		{ code: '\x1b[M' , event: 'mouse' , handler: handler.mouseX11Protocol }
	]
} ;



// Complete with Modifier + [A-Z]
for ( var i = 1 ; i <= 26 ; i ++ )
{
	keymap[ 'CTRL_' + String.fromCharCode( 64 + i ) ] = String.fromCharCode( i ) ;
	keymap[ 'ALT_' + String.fromCharCode( 64 + i ) ] = '\x1b' + String.fromCharCode( 96 + i ) ;
	keymap[ 'CTRL_ALT_' + String.fromCharCode( 64 + i ) ] = '\x1b' + String.fromCharCode( i ) ;
}





module.exports = {
	esc: esc ,
	keymap: keymap ,
	handler: handler
} ;

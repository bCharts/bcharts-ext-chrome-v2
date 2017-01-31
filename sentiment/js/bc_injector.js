/**
 * Created by bruce on 2017-01-24.
 */

var bc_extension_id_script = '' +
    '<script type="text/javascript">\n' +
    '   var bc_extension_id = "' + chrome.runtime.id + '";\n' +
    '</script>';

var bc_hastag_js_url = chrome.extension.getURL('sentiment/js/bc_hashtag.js');
var bc_hashtag_js = '<script type="text/javascript" src="' + bc_hastag_js_url + '"></script>';

var flybee_url = chrome.extension.getURL('sentiment/images/flybeefly.gif');
var progress_view =
    '<div id="be13c76a2c0cd43fad7993bd227caef9">' +
    '   <img width="300px" src="' + flybee_url + '" />' +
    '</div>';

$('html').append(bc_extension_id_script);
$('html').append(bc_hashtag_js);
$('html').append(progress_view);
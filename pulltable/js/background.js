/**
 * Created by bruce on 2016-11-13.
 */

var my_id = chrome.runtime.id;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (sender.id != my_id) {
        return;
    }

    switch (msg.type) {
        case 'pulltable':
            $.ajax({
                url: 'http://bcdev.mybluemix.net/pulltableocrwebservice',
                // url: 'http://127.0.0.1:8000/pulltablegoogle',
                // url: 'http://127.0.0.1:8000/pulltableocrwebservice',
                method: 'POST',
                async: false,
                data: {
                    'top': msg.data.top,
                    'left': msg.data.left,
                    'width': msg.data.width,
                    'height': msg.data.height,
                    'imagesrc': msg.data.imagesrc
                },
                dataType: 'text',
                success: function (data, textStatus, jqXHR) {
                    var retval = $.parseJSON(data);
                    chrome.tabs.create({
                        url: retval.url
                    });

                    sendResponse({
                        'result': retval.result,
                        'data': retval.msg
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    sendResponse({
                        'result': 'error',
                        'data': textStatus
                    });
                }
            });
            break;
        default:
            console.log('wrong message');
    }
});
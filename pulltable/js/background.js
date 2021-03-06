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
                url: 'http://bcdev.mybluemix.net/pulltable',
                // url: 'http://127.0.0.1:8000/pulltable',
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
                    console.log(retval)
                    if (retval.result == 'ok') {
                        chrome.tabs.create({
                            url: retval.url
                        });
                    }

                    sendResponse({
                        'result': retval.result,
                        'csv': retval.csv,
                        'images': {
                            'step1': retval.images.step1,
                            'step2': retval.images.step2,
                            'step3': retval.images.step3,
                            'step4': retval.images.step4,
                            'step5': retval.images.step5,
                            'step6': retval.images.step6
                        }
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
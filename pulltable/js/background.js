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
<<<<<<< HEAD
                // url: 'http://bcdev.mybluemix.net/pulltableocrwebservice',
                url: 'http://bcdev.mybluemix.net/pulltable',
                // url: 'http://127.0.0.1:8000/pulltablegoogle',
                // url: 'http://127.0.0.1:8000/pulltableocrwebservice',
                // url: 'http://127.0.0.1:8000/pulltable',
=======
                url: 'http://bcdev.mybluemix.net/pulltableocrwebservice',
                // url: 'http://127.0.0.1:8000/pulltablegoogle',
                // url: 'http://127.0.0.1:8000/pulltableocrwebservice',
>>>>>>> ba985aa71d6c05667076341d1c148ea4c4490e37
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
<<<<<<< HEAD
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
=======
                    chrome.tabs.create({
                        url: retval.url
                    });

                    sendResponse({
                        'result': retval.result,
                        'data': retval.msg
>>>>>>> ba985aa71d6c05667076341d1c148ea4c4490e37
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
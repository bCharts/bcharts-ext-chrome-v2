/**
 * Created by bruce on 2016-11-06.
 */

chrome.tabs.executeScript(null, {
    file: 'pulltable/js/jquery.js'
}, function () {
    if (chrome.extension.lastError) {
        console.log(chrome.extension.lastError.message);
    }
});

chrome.tabs.executeScript(null, {
    file: 'pulltable/js/html2canvas.js'
}, function () {
    if (chrome.extension.lastError) {
        console.log(chrome.extension.lastError.message);
    }
});

chrome.tabs.executeScript(null, {
    file: 'pulltable/js/highestzindex.js'
}, function () {
    if (chrome.extension.lastError) {
        console.log(chrome.extension.lastError.message);
    }
});

chrome.tabs.executeScript(null, {
    file: 'pulltable/js/cropinterface.js'
}, function () {
    if (chrome.extension.lastError) {
        console.log(chrome.extension.lastError.message);
    }
});

chrome.tabs.executeScript(null, {
    file: 'pulltable/js/main.js'
}, function () {
    if (chrome.extension.lastError) {
        console.log(chrome.extension.lastError.message);
    }
});
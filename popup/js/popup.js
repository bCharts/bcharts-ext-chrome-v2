// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

function getCurrentTabUrl(callback) {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];

        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;

        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });

    // Most methods of the Chrome extension APIs are asynchronous. This means that
    // you CANNOT do something like this:
    //
    // var url;
    // chrome.tabs.query(queryInfo, function(tabs) {
    //   url = tabs[0].url;
    // });
    // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}


document.addEventListener('DOMContentLoaded', function () {

});


$(document).on("click", "#cropAreaButton", function () {
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

    window.close();
});


$(document).on("click", "#parseButton", function () {

    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, {message: "highlightCode"});
    });
    chrome.tabs.executeScript(null, {
        file: 'parsehtml/js/jquery.tableCSVExport.js'
    }, function () {
        if (chrome.extension.lastError) {
            console.log(chrome.extension.lastError.message);
        }


    });
    window.close();
});

$(document).on("click", "#uploadFile", function () {

    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, {message: "uploadFile"});
    });
    chrome.tabs.executeScript(null, {
        file: 'uploadfile/js/fileselection.js'
    }, function () {
        if (chrome.extension.lastError) {
            console.log(chrome.extension.lastError.message);
        }


    });
    window.close();
});

$(document).ready(function () {
    $('#login-trigger').click(function () {
        $(this).next('#login-content').slideToggle();
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
        else $(this).find('span').html('&#x25BC;')
    })
});

$("#signin").click(function(){
  var p_email = $("#uname").val();
  var p_pass = $("#pass").val();
  console.log(p_email);
  console.log(p_pass);
 $.ajax({
                url: 'https://api.beta.bcharts.xyz/users/login',
                type: 'POST',
                //async: false,
                crossDomain: true,
                dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: {
                    email: p_email,
                    password: p_pass
                },
                success: function (data, textStatus, jqXHR) {
                    console.log(data.client_id);
                    var str = "Token token="+data.client_id+":"+data.secret;
                    request_charts(str);

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                    console.log(jqXHR);
                     $( "#login_err" ).css({opacity:1})
                     $( "#login_err" ).delay( 2000 ).animate({
                       opacity: 0
                      }, 500, "linear", function() {
                
                    });
                }
        });
            
});


function request_charts(str){

  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.beta.bcharts.xyz/charts",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "authorization": str
  }
}

$.ajax(settings).done(function (response) {
  console.log(response.charts[1]);
  window.location.href = "profile.html";
});
}

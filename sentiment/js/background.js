/**
 * Created by bruce on 2017-01-24.
 */

chrome.runtime.onMessageExternal.addListener(function (msg, sender, sendResponse) {
    switch (msg.type) {
        case 'sendhashtag':
            $.ajax({
                type: 'POST',
                url: 'https://i.beta.bcharts.xyz/integrations/requests/twitter/sentiment',
                data: {
                    chart_type: 'pie',
                    hashtag: msg.hashtag,
                    owner_id: '',
                    redirect_type: 'json',
                    redirect_uri: 'https://beta.bcharts.xyz/chartdesigner'
                },
                async: false,
                success: function (data, textStatus, jqXHR ) {
                    sendResponse(data);
                    console.log(data);
                    chrome.tabs.create({
                        url: 'https://beta.bcharts.xyz/chartdesigner/' + data.chartId
                    });
                }
            });
            break;
    }
});
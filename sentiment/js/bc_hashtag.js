/**
 * Created by bruce on 2017-01-23.
 */

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function highlight_hashtag() {
    var hashtag_blocks = $('a[data-query-source="hashtag_click"][bc_reported!="yes"]');
    hashtag_blocks.attr("bc_reported", "yes");
    hashtag_blocks.each(function (i) {
        var id = generateUUID();
        var hashtag_text = $(this).text();
        $(this).after('<a id="' + id + '" hashtag="' + hashtag_text + '" title="' + hashtag_text + '&#39;s sentiment analysis~!!"><img class="bc_hashtag_sentiment_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAADjUlEQVRIx+2WW2hcVRSGv7VnnzNnLkmmMSQzMdbJJG1tRagaE2PbPDQt9akPsbTRtyLig4hSCYqIUFCDFVEUBcVYithUxRsIIQ2xIqaUUB+EQkpSS1JrxDSXuSQ1JjNn+zAz0TaTEAPRl/yHzYGzL//617/WOQfWsY41gme5ybYjTxIuLy+/OjraGK4or2ra9cDE4NCluTWNqOrWyo2O4z2htZ4QyCgl85Zl/eI4zstbtmwKrgnpS0ef17Zt9QGm0PD5fH2xWLR4rURHgaGlyP1+3/EXnjvCf04uIvObN9VE19LuJcnLym55ZLWH6hWsGQb2Aj1A7Q0zhrLlNkbC4WKv197s8/nca9fGt8UT8dcCgcA7zzz9xCt6hQEOA81A7w3kwtXlNqVSqaPxRKZOiRpPZzKV6XQmDDT7/c6xVaddKZWqv++eJRXfufWOqNdrD1RGIkGAmljUKSkpPlhRUV6VjXkZxDtjCtSrQGnuUXfo4Uv9QHdRMNjx2cmOYw/uP1Rwr9/v+0h79JlkKvXhv/ZYkQbDAZNVylhKUXfv3ReSydRjwaJgvOv0GQ2kf/+8yXbSv7WC2wwo4MdH36djRsd+6OruKXj2IsWx6mh9PJ7YDSAiXHgz2BawpBTgvdNJ2o5PLaxt2rkj8sVTs3N2ZuJLkCZEcgUPBhlWJrOvqHVkcEWKE8nk/ZNTU+0ASmBmLoDfysYn8necImBZHuzM+NugmoyAYPj+oss3/dM8tMMXbYjpzuSp2xuKW0fSq2knJKcif8tjz7Y/S0EdAEEMJOfgYPuvXJ9N0/mdxc8f3LZdeQJ1wLnFNq4AxmTHog9JOFQpzNuG7CW5kfdQiSjtpmoLpjpxKqqAekBhoOX1mereiZsVS8GKmJxKjRu0KyIKA0Ve+OrFCF/3p2lpdNC4ZJRvrCCxGNcxhi6QkIhh33ab3vM3KcYU7Lyun/TY4Xq+NbAn70NDjUVDjZXLkHtlVledhYECHYMgki2WJT0WEDGLPP5j3riuWI+LcYcFEAPGSC5HZho4HGnpmS6o2BjjAoOICQIoj6U3hEr8/6jiZJ5PadveECpx8tFYWruhQ0OXJz+9q9FjZp4F2S3G1QbVb8Tb7k9fHlxSTOLkRgBHch72pfbqi4moFhEMHlrDJ+YCnuuuMXAuuUsPTG9d6ISRK6PJN9561114031S6ygzz4R/52z1/o/XfyzX8f/gL4mqQVEi7yf8AAAAAElFTkSuQmCC"></a>');
        $('#' + id).click(function () {
            var hashtag = $(this).attr('hashtag').replace('#', '');
            // send_hashtag(hashtag);
            $('#be13c76a2c0cd43fad7993bd227caef9').fadeIn(300);
            chrome.runtime.sendMessage(bc_extension_id, {
                type: 'sendhashtag',
                hashtag: hashtag
            }, function (response) {
                $('#be13c76a2c0cd43fad7993bd227caef9').fadeOut(300);
            });
        });
    });
}

highlight_hashtag();

$(document).ajaxSuccess(function (event, xhr, settings) {
    highlight_hashtag();
});
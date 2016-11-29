/**
 * Created by bruce on 2016-11-09.
 */

var mousedown = false;
var mouseleave = false;
var region_selected = false;
var first_mousedown_x = 0;
var first_mousedown_y = 0;
<<<<<<< HEAD
=======
var first_scroll_left = 0;
var first_scroll_top = 0;
>>>>>>> ba985aa71d6c05667076341d1c148ea4c4490e37
var s_area_top = 0;
var s_area_left = 0;
var s_area_width = 0;
var s_area_height = 0;

cropinterface.remove_all();
cropinterface.init();

cropinterface.mouse_control_layer.jqo().mousedown(function (e) {
    if (region_selected)
        return;

    mousedown = true;
    cropinterface.show_crop_helper();
<<<<<<< HEAD
    first_mousedown_x = e.offsetX + $(document.body).scrollLeft();
    first_mousedown_y = e.offsetY + $(document.body).scrollTop();
    s_area_top = first_mousedown_y;
    s_area_left = first_mousedown_x;
=======
    first_mousedown_x = e.offsetX;
    first_mousedown_y = e.offsetY;
    first_scroll_top = $(document.body).scrollTop();
    first_scroll_left = $(document.body).scrollLeft();
    s_area_top = first_mousedown_y + first_scroll_top;
    s_area_left = first_mousedown_x + first_scroll_left;
>>>>>>> ba985aa71d6c05667076341d1c148ea4c4490e37
    cropinterface.update_location(s_area_top, s_area_left, 0, 0);
});

cropinterface.mouse_control_layer.jqo().mousemove(function (e) {
    if (mousedown) {
<<<<<<< HEAD
        var current_mousedown_x = e.offsetX + $(document.body).scrollLeft();
        var current_mousedown_y = e.offsetY + $(document.body).scrollTop();

        if (first_mousedown_x > current_mousedown_x) {
            s_area_left = current_mousedown_x;
            s_area_width = first_mousedown_x - current_mousedown_x;
        } else {
            s_area_width = current_mousedown_x - first_mousedown_x;
        }

        if (first_mousedown_y > current_mousedown_y) {
            s_area_top = current_mousedown_y;
            s_area_height = first_mousedown_y - current_mousedown_y;
        } else {
            s_area_height = current_mousedown_y - first_mousedown_y;
        }

        cropinterface.update_location(s_area_top, s_area_left, s_area_width, s_area_height);
=======
        var scroll_top = $(document.body).scrollTop() - first_scroll_top;
        var scroll_left = $(document.body).scrollLeft() - first_scroll_left;
        var width = e.offsetX - first_mousedown_x + scroll_left;
        var height = e.offsetY - first_mousedown_y + scroll_top;

        cropinterface.update_location(s_area_top, s_area_left, width, height);
>>>>>>> ba985aa71d6c05667076341d1c148ea4c4490e37
    }
});

cropinterface.mouse_control_layer.jqo().mouseup(function (e) {
    if (region_selected)
        return;

    mousedown = false;
    region_selected = true;
<<<<<<< HEAD
    // var scroll_top = $(document.body).scrollTop() - first_scroll_top;
    // var scroll_left = $(document.body).scrollLeft() - first_scroll_left;
    // s_area_width = e.offsetX - first_mousedown_x + scroll_left;
    // s_area_height = e.offsetY - first_mousedown_y + scroll_top;
=======
    var scroll_top = $(document.body).scrollTop() - first_scroll_top;
    var scroll_left = $(document.body).scrollLeft() - first_scroll_left;
    s_area_width = e.offsetX - first_mousedown_x + scroll_left;
    s_area_height = e.offsetY - first_mousedown_y + scroll_top;
>>>>>>> ba985aa71d6c05667076341d1c148ea4c4490e37
    cropinterface.update_location(s_area_top, s_area_left, s_area_width, s_area_height);

    cropinterface.ok_button.jqo().fadeIn(200);
    cropinterface.cancel_button.jqo().fadeIn(200);
});

cropinterface.ok_button.jqo().click(function (e) {
    cropinterface.remove_crop_helper();

    html2canvas(document.body, {
        letterRendering: true,
        onrendered: function (canvas) {
            canvas.setAttribute('crossOrigin', 'anonymous');
            cropinterface.show_progress_view();
            var data = {
                'top': s_area_top,
                'left': s_area_left,
                'width': s_area_width,
                'height': s_area_height,
                'imagesrc': canvas.toDataURL("image/png")
            };

            chrome.runtime.sendMessage({'type': 'pulltable', 'data': data}, function (response) {
                cropinterface.remove_progress_view();
<<<<<<< HEAD
                $(cropinterface.result_view.html(response)).appendTo(document.body);
                cropinterface.result_view.resize_result_table();
                // console.log(response.data);
                // cropinterface.remove_all();
                if (response.result != 'ok') {
                    alert(response.result)
=======
                // $(cropinterface.result_view.html(response.data, false)).appendTo(document.body);
                // cropinterface.result_view.resize_result_table();
                // console.log(response.data);
                // cropinterface.remove_all();
                if (response.result != 'ok') {
                    console.log(response.data);
>>>>>>> ba985aa71d6c05667076341d1c148ea4c4490e37
                }
            });
        }
    });
});

cropinterface.cancel_button.jqo().click(function () {
    cropinterface.remove_all();
});

$(window).resize(function (e) {
    cropinterface.result_view.resize_result_table();
});
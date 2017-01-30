var tableID;
var created = false;
var htmlParsing = false;
var fileCreated = false;
var data;
var trigger = true;
var payloadValue = "";
var css_code = chrome.extension.getURL('../../uploadfile/css/background.css');
$(document.body).append('<link name="css_injected2" href="' + css_code + '" rel="stylesheet">');

chrome.runtime.onMessage.addListener(
 function(request, sender) {
  switch (request.message)
  {
        case 'uploadFile':
        
           var str ='<a class="btn" data-popup-open="popup-1" id="openpopup" href="#" style="display:none"></a><div class="popup" id="tobeshown" data-popup="popup-1"><div class="popup-inner"><p><div id="drop_zone">Drop file here</div><output id="list"></output></p><p><a data-popup-close="popup-1" href="#" style="float: left;">Close</a><a href="#" id="fileOK" style="float:right">OK</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>';
           
           $(str).appendTo(document.body);
           showPopup();
             // Setup the dnd listeners.
           var dropZone = document.getElementById('drop_zone');
           dropZone.addEventListener('dragover', handleDragOver, false);
           dropZone.addEventListener('drop', handleFileSelect, false);

           
        break;

        default:
          //sendResponse({data: 'Invalid arguments'});
          console.log('Invalid arguments');
        break;
    }
  });

$(window).keyup(function (e) {
    // esc key
    if (e.keyCode == 27) {
       // close popup
    }
});




    //----- OPEN
    function showPopup() {
        $('#tobeshown').fadeIn(350);
    }
 
    //----- CLOSE
        $(document).on("click", "[data-popup-close]",function(e) {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
        $('output#list').empty();
        $('#openpopup').remove();
        fileCreated = false;
    });


$(document).on("mouseover", ".hlrect",function(event) {
  if (htmlParsing == true){
    var rect = $(this);
    $( 'table' )
    .filter(function() {
     return ($(this).offset().top == rect.offset().top && $(this).offset().top == rect.offset().top && $(this).width() == rect.width() && $(this).height == rect.height) ;
    })
    .addClass("tableToCSV");
    var position = $(this).offset();
    var width = $(this).width();
    var height = $(this).height();
    tableID =  $(this).attr("id");
      var btnblock = '<div id="btn" style="position: absolute; padding: 0px; margin: 0px; top: ' + (position.top+10) + 'px; left: ' + (position.left+10) + 'px; z-index: "2147483646"><a href="#" id="grabber"><img id="beelogo" style="display: block; width: 95%; height:auto; padding: 5%;"></img></a></div>';
    
    if (!created && trigger) {
      $(btnblock).appendTo(document.body);
      created = true;
      $('#beelogo').attr('src', chrome.extension.getURL('resourses/img/beelogo-old.png'));

     

    }
  }

  

});




$(document).on("click", "#fileOK",function() {
  if (fileCreated == true) {
  // replace just a table with ID of the right one
  var text = payloadValue;
  console.log (text);
  var text_formatted = text.replace(/\t/g, ",").replace(/[^\x00-\x7F]/g, "");
   data = {
    'redirect_uri': "http://beta.bcharts.xyz/chartdesigner" ,
    'payload': text_formatted,
    'redirect_type': 'redirect',
  }
  chrome.extension.sendRequest({'message':'fileUploaded','data': data},function(response){})

  $(".hlrect").remove();
  $("#btn").remove();
  $(".tableToCSV").removeClass("tableToCSV");
  created = false;
  trigger = false;
    }

});



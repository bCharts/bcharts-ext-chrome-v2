var tableID;
var created = false;
var htmlParsing = false;
var data;
var trigger = true;
var css = chrome.extension.getURL('../../parsehtml/css/background.css');
$(document.body).append('<link name="css_injected" href="' + css + '" rel="stylesheet">');

chrome.runtime.onMessage.addListener(
 function(request, sender) {
 	switch (request.message)
 	{
        case 'highlightCode':
           htmlParsing = true;
           trigger = true;
        break;

        default:
        	sendResponse({data: 'Invalid arguments'});
        break;
    }
  });


$(document).on("mouseover", "table",function(event) {
	if (htmlParsing == true){
		$(this).addClass("tableToCSV");
		var position = $(this).closest('table').offset();
		var width = $(this).closest('table').width();
		var height = $(this).closest('table').height();
		tableID =  $(this).attr("id");
	    var tag = '<div id="rect" name="rectname" style="position: absolute; padding: 0px; margin: 0px; border-style: dotted; border-width: 2px; border-color: #2980b9; background-color: #3498db; opacity: 0.3; top: ' + position.top + 'px; left: ' + position.left + 'px; width: ' + width + 'px; height: ' + height + 'px; z-index: "1147483646"></div>';
		var btnblock = '<div id="btn" style="position: absolute; padding: 0px; margin: 0px; top: ' + (position.top+10) + 'px; left: ' + (position.left+10) + 'px; z-index: "2147483646"><a href="#" id="grabber"><img id="beelogo" style="display: block; width: 95%; height:auto; padding: 5%;"></img></a></div>'
		
		if (!created && trigger) {
			$(tag).appendTo(document.body);
			$(btnblock).appendTo(document.body);
			created = true;
			$('#beelogo').attr('src', chrome.extension.getURL('resourses/img/beelogo-old.png'));

     

		}
	}

	

});

$(document).on("mouseout", "#rect",function(event) {
	if (created==true){
 	 	if ((event.pageX<$("#rect").position().left) ||  (event.pageX>$("#rect").position().left+$("#rect").width()) || (event.pageY<$("#rect").position().top) || (event.pageY>$("#rect").position().top+$("#rect").height())){
 	 		$(this).remove();
 	 		$("#btn").remove();
 	 		$(".tableToCSV").removeClass("tableToCSV");
 		 	created = false;
 		 }
 	}
});


$(document).on("click", "#grabber",function() {
	// replace just a table with ID of the right one
 	 var text = $(".tableToCSV").TableCSVExport();
 	 var text_formatted = text.replace(/\t/g, ",").replace(/[^\x00-\x7F]/g, "");
 	 data = {
    'redirect_uri': "http://beta.bcharts.xyz/chartdesigner" ,
    'payload': text_formatted,
    'redirect_type': 'redirect',
  }
  chrome.extension.sendRequest({'message':'htmlParsed','data': data},function(response){})

  $("#rect").remove();
  $("#btn").remove();
  $(".tableToCSV").removeClass("tableToCSV");
  created = false;
  trigger = false;
 		

});



// MAIN JS SCRIPT - CUSTOM 

$(document).ready(function () {
  $('#list-items').html(localStorage.getItem('listItems'));
  //$('.sublist-items').html(localStorage.getItem('sublistItems'));

  $('.add-items').on('submit', function(event) {


	event.preventDefault();
	var item = $('#todo-list-item').val();

	if(item) {
	  $('#list-items').append("<li class='not-done'><span class='check-item'></span><span class='item-content'>" + item + "</span><span class='date-container'><span class='day'></span> <span class='month'></span><span class='calendar fa fa-calendar'></span></span><span class='add-sublist closed active'></span><div class='extended-item'><div class='add-subitems'><input type='text' placeholder='Enter a subtask' class='todo-sublist-item' placeholder='Sublist item'><button class='add2 btn orange'>Add sublist</button></div><div class='list-container'><ul class='sublist-items large connectedSortable'></ul></div></div><div class='list-text-area'><textarea class='textarea orders'></textarea><button class='btn btn-primary save'>Save</button><div class='colors-container'><button class='color-button color-red'></button><button class='color-button color-orange'></button><button class='color-button color-green'></button><button class='color-button color-black'></button></div></div></li>");
	  localStorage.setItem('listItems', $('#list-items').html());
	  $('#todo-list-item').val(""); 
	}

  });

// Sublist 

$(document).on('click', '.add2', function(event) {  



  event.preventDefault();
  var subitem = $(this).parent().find('.todo-sublist-item').val();

  if(subitem === " ") { 
    return false;
  }

  $(this).parent().parent().find("input").val(" "); 

  if(subitem) {
    $(this).parent().parent().find("ul").append("<li class='not-done'><span class='check-subitem'></span><span class='subitem-content'>" + subitem + "</span><span class='date-container'><span class='day'></span> <span class='month'></span><span class='calendar2 fa fa-calendar'></span></span><div class='sublist-text-area'><textarea class='textarea orders'></textarea><button class='btn save'>Save</button><div class='colors-container'><button class='color-button color-red'></button><button class='color-button color-orange'></button><button class='color-button color-green'></button><button class='color-button color-black'></button></div></div></li>");

      localStorage.setSubItem('sublistItems', $('.sublist-items').html());
      $('.todo-sublist-item').parent().parent().find('.todo-sublist-item').val("");
  } 

});

// Filter function
  var input = $('.search-filter');
    input.change( function () {
        var filter = input.val();
    
         if(filter.length == 0) { // show all if filter is empty
               $('.item-content').each(function() {
                 $(this).parent().show();   
                 $(this).prev().show();
               });
               return;
          }
    
         $('.item-content').each(function() {
         $(this).parent().hide();   
         $(this).prev().hide();
         }); // hide all labels
    
        $('.item-content:contains("'+filter+'")').each(function() {
            $(this).parent().show();   
           $(this).prev().show();
        });

    }).keyup(function() {
        $(this).change();    
    });

// Filter subtasks

  var input2 = $('.search-filter2');
    input2.change( function () {
        var filter2 = input2.val();
    
         if(filter2.length == 0) { // show all if filter is empty
               $('.subitem-content').each(function() {
                 $(this).parent().show();   
                 $(this).prev().show();
               });
               return;
          }

         $('.subitem-content').each(function() {
         $(this).parent().hide();   
         $(this).prev().hide();
         }); // hide all labels
    
        $('.subitem-content:contains("'+filter2+'")').each(function() {
            $(this).parent().show();   
           $(this).prev().show();
        });


    }).keyup(function() {
        $(this).change();    
    });    

    $(document).on('click', '.add-sublist', function() {

      if($(this).hasClass("closed")) {
        $(this).removeClass("closed");
        $(this).parent().find(".extended-item").slideDown(500);
      }
      else {
        $(this).addClass("closed");
        $(this).parent().find(".extended-item").slideUp(500);
      }
    });

});


// Sortable feature
 $(window).on('load', function(){
  
  $("#list-items").sortable("refresh");

  $('ul.sublist-items').sortable ({
    accept: 'sortableitem',
    helperclass: 'sorthelper',
    activeclass: 'sortableactive',
    hoverclass: 'sortablehover',
    opacity: 0.9,
    fx: 200,
    axis: 'vertically',
    opacity: 0.9,
    revert: true
  })
});

$( function() {
  $( "#list-items, ul.sublist-items" ).sortable({
    connectWith: ".connectedSortable"
  }).disableSelection();
});

// Check and uncheck the tasks

$(document).on('click', '.check-item', function() {
	if($(this).parent().hasClass("not-done")){
		$(this).parent().removeClass("not-done");
		$(this).parent().addClass("completed")
		localStorage.setItem('listItems', $('#list-items').html());
    $(this).parent().find(".sublist-text-area, .list-text-area").hide();
	}
	else{
		$(this).parent().removeClass("completed");
		$(this).parent().addClass("not-done");
		localStorage.setItem('listItems', $('#list-items').html());
	}
});

// Subtasks

$(document).on('click', '.check-subitem', function() {
  if($(this).parent().hasClass("not-done")){
    $(this).parent().removeClass("not-done");
    $(this).parent().addClass("completed")
    localStorage.setSubItem('sublistItems', $('.sublist-items').html());
  }
  else{
    $(this).parent().removeClass("completed");
    $(this).parent().addClass("not-done");
    localStorage.setSubItem('sublistItems', $('.sublist-items').html());
  }
});

// ADD DATE

$(document).on('click', '.calendar, .add-sublist.active', function() {

  $(this).removeClass("active");

  $(this).parent().find('.calendar').hide();

  var months = ["January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"]

  $(this).parent().find(".month" ).text(months[new Date().getMonth()]);
  $(this).parent().find(".day"). text(new Date().getDate());
  $(this).parent().find(".hour") .text(new Date().getHours());
  $(this).parent().find(".minute").text(new Date().getMinutes());
});

$(document).on('click', '.calendar2', function() {

  $(this).parent().find('.calendar2').hide();

  var months = ["January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"]

  $(this).parent().parent().find(".month" ).text(months[new Date().getMonth()]);
  $(this).parent().parent().find(".day"). text(new Date().getDate());
  $(this).parent().parent().find(".hour") .text(new Date().getHours());
  $(this).parent().parent().find(".minute").text(new Date().getMinutes());
});

// Remove task
$( ".delete-zone" ).droppable({
	 drop: function( event, ui ) {
	$(this).parent().find( "ul li.ui-sortable-placeholder, ul li.ui-sortable-helper" ).remove()
	localStorage.setItem('listItems', $('#list-items').html());
    localStorage.setSubItem('sublistItems', $('.sublist-items').html());
	if ($('#list-items li').length < 14) {
		$('button[type=submit], input[type=text]').prop( 'disabled', false );
		$('.info-message').fadeIn(100).text("The task has been erased!");
	}

  	setTimeout(function(){
  	    $(".info-message").fadeOut(400);
  	}, 2000);
	}
});

// SAVE EDITED TEXT

  $( function() {

//Save edited text for list-item     

  $(document).on('click', 'span.item-content', function() {
    $(this).parent().find("textarea").text( $(this).text() ).focus(); 
    $(this).parent().find(".list-text-area").slideDown(200);

    if($(this).parent().hasClass("completed")) {
      $(this).parent().find(".list-text-area").hide();
    }
  });

    $(document).on('click', '.list-text-area button.save', function() {
    $(this).parent().slideUp(200);
    $(this).parent().parent().find("span.item-content").text( $(this).parent().find('textarea').val());       
  });

//Save edited text for list-item 

  $(document).on('click', 'span.subitem-content', function() {
    $(this).parent().find("textarea").text( $(this).text() ).focus(); 
    $(this).parent().find(".sublist-text-area").slideDown(200);
  });

    $(document).on('click', '.sublist-text-area button.save', function() {
    $(this).parent().slideUp(200);
    $(this).parent().parent().find("span.subitem-content").text( $(this).parent().find('textarea').val());       
  });


  $(document).on('click', '.color-red', function() {
    $(this).parent().parent().parent().find("span.item-content").text( $(this).parent().find('textarea').val() ).css('color','#C93F30'); 

    $(this).parent().parent().parent().find("span.subitem-content").text( $(this).parent().find('textarea').val() ).css('color','#C93F30'); 
  });

  $(document).on('click', '.color-orange', function() {
    $(this).parent().parent().parent().find("span.item-content").text( $(this).parent().find('textarea').val() ).css('color','#F6AE7C'); 

    $(this).parent().parent().parent().find("span.subitem-content").text( $(this).parent().find('textarea').val() ).css('color','#F6AE7C'); 
  });

  $(document).on('click', '.color-green', function() {
    $(this).parent().parent().parent().find("span.item-content").text( $(this).parent().find('textarea').val() ).css('color','#5FC44F'); 

    $(this).parent().parent().parent().find("span.subitem-content").text( $(this).parent().find('textarea').val() ).css('color','#5FC44F'); 
  });

  $(document).on('click', '.color-black', function() {
    $(this).parent().parent().parent().find("span.item-content").text( $(this).parent().find('textarea').val() ).css('color','#2A2A28'); 

    $(this).parent().parent().parent().find("span.subitem-content").text( $(this).parent().find('textarea').val() ).css('color','#2A2A28'); 
  });
});

// Local storage save

document.getElementById("app-save").addEventListener("click", function ()
{
  localStorage.setItem('listItems', $('#list-items').html());
  localStorage.setSubItem('sublistItems', $('.sublist-items').html());
} , false);



// MAIN JS SCRIPT - CUSTOM 

$(document).ready(function () {
  $('#list-items').html(localStorage.getItem('listItems'));
  //$('.sublist-items').html(localStorage.getItem('sublistItems'));

  $('.add-items').on('submit', function(event) {
  	$('.info-message').fadeIn(100).text("Task! has been created!");

	event.preventDefault();
	var item = $('#todo-list-item').val();

	if(item) {
	  $('#list-items').append("<li class='not-done'><span class='check-item'></span><span class='item-content'>" + item + "</span><span class='add-sublist closed'></span><div class='extended-item'><div class='add-subitems'><input type='text' class='todo-sublist-item' placeholder='Sublist item'><button class='add2 btn'>Add sublist</button></div><div class='list-container'><ul class='sublist-items large connectedSortable'></ul></div></div><div class='list-text-area'><textarea class='textarea orders'></textarea><button class='btn btn-primary'>Save</button></div></li>");
	  localStorage.setItem('listItems', $('#list-items').html());
	  $('#todo-list-item').val("");
	}

	    setTimeout(function(){
		    $(".info-message").fadeOut(400);
		}, 2000);
  });

// Sublist 

$(document).on('click', '.add2', function(event) {

  event.preventDefault();
  var subitem = $(this).parent().find('.todo-sublist-item').val();


  if(subitem) {
    $(this).parent().parent().find("ul").append("<li class='not-done'><span class='check-subitem'></span><span class='subitem-content'>" + subitem + "</span><div class='sublist-text-area'><textarea class='textarea orders'></textarea><button class='btn'>Save</button></div></li>");
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
  });

    $(document).on('click', '.list-text-area button', function() {
    $(this).parent().slideUp(200);
    $(this).parent().parent().find("span.item-content").text( $(this).parent().find('textarea').val());       
  });

//Save edited text for list-item 

  $(document).on('click', 'span.subitem-content', function() {
    $(this).parent().find("textarea").text( $(this).text() ).focus(); 
    $(this).parent().find(".sublist-text-area").slideDown(200);
  });

    $(document).on('click', '.sublist-text-area button', function() {
    $(this).parent().slideUp(200);
    $(this).parent().parent().find("span.subitem-content").text( $(this).parent().find('textarea').val());       
  });
});

// Local storage save

document.getElementById("app-save").addEventListener("click", function ()
{
  localStorage.setItem('listItems', $('#list-items').html());
  localStorage.setSubItem('sublistItems', $('.sublist-items').html());
} , false);




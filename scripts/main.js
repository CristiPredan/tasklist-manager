// MAIN JS SCRIPT - CUSTOM 

$(document).ready(function () {
  $('#list-items').html(localStorage.getItem('listItems'));

  $('.add-items').on('submit', function(event) {
  	$('.info-message').fadeIn(100).text("Task! has been created!");

	event.preventDefault();
	var item = $('#todo-list-item').val();

	if(item) {
	  $('#list-items').append("<li class='not-done'><span class='check-item'></span><span class='item-content'>" + item + "</span><span class='add-sublist material-icons'>playlist_add</span><div class='extended-item'><div class='add-subitems'><input type='text' class='todo-sublist-item' placeholder='Sublist item'><button class='add'>Add</button></div><div class='list-container'><ul class='sublist-items large'></ul></div></div></li>");
	  localStorage.setItem('listItems', $('#list-items').html());
	  $('#todo-list-item').val("");
	}

	    setTimeout(function(){
		    $(".info-message").fadeOut(400);
		}, 2000);
  });

// Sublist 

$(document).on('click', '.add-subitems', function(event) {

  event.preventDefault();
  var subitem = $(this).find('.todo-sublist-item').val();


  if(subitem) {
    $(this).parent().find("ul").append("<li class='not-done'><span class='check-subitem'></span><span class='subitem-content'>" + subitem + "</span></li>");
    localStorage.setItem('sublistItems', $('.sublist-items').html());
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

//

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
      $(this).parent().find(".extended-item").slideDown(500);
    });


});

// Sortable feature
 $(window).on('load', function(){
  $("#list-items").sortable();
});

$(document).ready(function() {
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


$(document).on('click', '.check-subitem', function() {
  if($(this).parent().hasClass("not-done")){
    $(this).parent().removeClass("not-done");
    $(this).parent().addClass("completed")
    localStorage.setItem('sublistItems', $('.sublist-items').html());
  }
  else{
    $(this).parent().removeClass("completed");
    $(this).parent().addClass("not-done");
    localStorage.setItem('sublistItems', $('.sublist-items').html());
  }
});


// Remove task
$( ".delete-zone" ).droppable({
	 drop: function( event, ui ) {
	$(this).parent().find( "ul li.ui-sortable-placeholder, ul li.ui-sortable-helper" ).remove()
	localStorage.setItem('listItems', $('#list-items').html());
	if ($('#list-items li').length < 14) {
		$('button[type=submit], input[type=text]').prop( 'disabled', false );
		$('.info-message').fadeIn(100).text("The task has been erased!");
	}

	setTimeout(function(){
	    $(".info-message").fadeOut(400);
	}, 2000);

	if ($('#list-items li').length < 9) {
		$("#list-items").removeClass("small");
		$("#list-items").addClass("medium");
		localStorage.setItem('listItems', $('#list-items').html());
	}

	if ($('#list-items li').length < 7) {
		$("#list-items").removeClass("medium");
		$("#list-items").addClass("large");
		localStorage.setItem('listItems', $('#list-items').html());
	}
	}
});

// Edit task
$( ".add-items" ).droppable({
	 drop: function( event, ui ) {
	 	var editTask = $(this).parent().parent().find( 'ul li.ui-sortable-placeholder, ul li.ui-sortable-helper' ).text();
	 	$('.info-message').fadeIn(100).text("Edit the task!");
	 	$('input').val(editTask);
	 	$(this).parent().parent().find( "ul li.ui-sortable-placeholder, ul li.ui-sortable-helper" ).remove();

	if ($('#list-items li').length < 14) {
		$('button[type=submit], input[type=text]').prop( 'disabled', false );
		alert("You reached the maximum items for the list!");
	}

		 setTimeout(function(){
	    $(".info-message").fadeOut(400);
	}, 2000);
	}

});

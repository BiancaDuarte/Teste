var server = 'http://localhost:45000/dados';
$(document).ready(function () {
	$(function(){
		$(".dropdown").hover(
			function(){
				$('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
				$(this).toggleClass('open');
				$('b', this).toggleClass("caret caret-up");
			},
			function(){
				$('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
				$(this).toggleClass('open');
				$('b', this).toggleClass("caret caret-up");
			}
		);
	});

	$('.myCarousel').carousel({
		interval: 3000
	});

	$('#txt-search').keyup(function(){
	    $.get(server, function(data) {       
	    	var searchField = $(this).val();
			if(searchField == '')  {
				$('#filter-records').html('');
				return;
			}
			var regex = new RegExp(searchField, "i");
			var output = '<div class="row">';
			var count = 1;
	  
        	$(data).each(function(){
			   	console.log(this);

				if (this.Nome.search(regex) != -1){
					output += '<div class="col-md-6 well">';
					output += '<div class="col-md-3"><img class="img-responsive" src="" /></div>';
					output += '<div class="col-md-7">';
					output += '<h5>' + this.Nome + '</h5>';
					output += '<p>' + this.Código + '</p>'
					output += '</div>';
					output += '</div>';
				}
			});
		
		output += '</div>';
		$('#filter-records').html(output);
		});
	});
});
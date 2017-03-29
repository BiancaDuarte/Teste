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


	$.getJSON('../quadros.json', function(dados){
		// datas são seus dados do json
		console.log(dados);
 
// para pegar os valores pelos indices do objeto basta varer o objeto
 
		$.each(dados, function(catalogo, resultado){
			console.log(resultado.indice); // ta ai seus valores
		});
 
	});

$('#txt-search').keyup(function(){
	var searchField = $(this).val();
	if(searchField === '')  {
		$('#filter-records').html('');
		return;
	}
	
	var regex = new RegExp(searchField, "i");
	var output = '<div class="row">';
	var count = 1;
	$.get(server, function(data) {
	  for (z in data) {
	  	var bla = data[z];
	  	for (y in bla){
	  		var oi = bla[y].Nome;
	  		console.log(oi);
	  		if (oi.search(regex) != -1){
			  output += '<div class="col-md-6 well">';
			  output += '<div class="col-md-3"><img class="img-responsive" src="'+bla[y].Imagem+'" alt="'+ oi +'" /></div>';
			  output += '<div class="col-md-7">';
			  output += '<h5>' + oi + '</h5>';
			  output += '<p>' + bla[y].Preço1 + '</p>'
			  output += '</div>';
			  output += '</div>';
			  if(count%2 == 0){
				output += '</div><div class="row">'
			  }
			  count++;
			}
	  	}
	  }
	  output += '</div>';
	  $('#filter-records').html(output);
});
});

	});
var server = 'http://localhost:46000/dados';
 var json="http://localhost:46000/dados";
$(document).ready(function () {
	$('#resultados-busca').hide();
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
	var searchField = $(this).val();
	if(searchField === '')  {
		$('#resultados-busca').hide();
		$('#resultados-busca').html('');
		return;
	}

	var regex = new RegExp(searchField, "i");
	var resultados = '<div class="row">';
	var count = 1;
	$.get('/dados', function(data) {
	$('#txt-search').show();	
	$('#resultados-busca').show();
	for (x in data) {
		if (data[x].Nome.search(regex) != -1){
			resultados += '<div class="col-md-12 well">';
			resultados += '<div class="col-md-3"><img class="img-responsive" src="'+data[x].Imagem+'" alt="'+ data[x].Nome +'" /></div>';
			resultados += '<div class="col-md-7">';
			resultados += '<h5>' + data[x].Nome + '</h5>';
			resultados += '<h3> A partir de R$ ' + data[x].Preço1 + '</h3>'
			resultados += '</div>';
			resultados += '</div>';
		}
	}
		resultados += '</div>';
		$('#resultados-busca').html(resultados);
	});
});

// 	var count = 0;//recebendo o valor 5 que você disse
// $('#aumenta').click(function(){
// 	alert(count);
// 	count++;
// });

});




// function tudo(){
// $.get(json, function(data) {
//     for(var x=0; x<data.filmes.length; x++){
//     	$('#imagem').append( '<img src='+data.filmes[x].Imagem+'>')
//     	$('#informacoes').append('<h1>' +data.filmes[x].Nome+data.filmes[x].Preço1+data.filmes[x].Estoque1 + '</h1>'); 
//     }

// });
// };

// $.get(json, function(data) {

// });

// $("#").append(html);
// $('#informacoes').append('<tr><td>'+data.filmes[x].Nome+'</td><td>'+data.filmes[x].Imagem+'</td><td>'+data.filmes[x].Preço1+'</td><td>'+data.filmes[x].Estoque+'</td>'+'</td></tr>');


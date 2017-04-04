var server = 'http://localhost:45000/dados';
 var json="http://localhost:45000/dados";
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
			var categorias = data[x];
			for (y in categorias){
				var nome = categorias[y].Nome;
				if (nome.search(regex) != -1){
					console.log(nome);
					resultados += '<div class="col-md-12 well">';
					resultados += '<div class="col-md-3"><img class="img-responsive" src="'+categorias[y].Imagem+'" alt="'+ nome +'" /></div>';
					resultados += '<div class="col-md-7">';
					resultados += '<h5>' + nome + '</h5>';
					resultados += '<h3> A partir de R$ ' + categorias[y].Preço1 + '</h3>'
					resultados += '</div>';
					resultados += '</div>';
				}
			}
		}
		resultados += '</div>';
		$('#resultados-busca').html(resultados);
	});
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

if(window.location.href == 'http://localhost:45000/produtoselecionado'){

	var cod = getUrlParameter('cod');

	$.get(json, function(data) {
		$('#imagem').append( '<img src='+data.filmes[0].Imagem+'>')
	});
}

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


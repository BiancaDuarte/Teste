var server = 'http://localhost:45000/dados';
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

$('#informacoes').append('<tr><td>'+dados.filmes[x].Nome+'</td><td>'+dados.filmes[x].Preço1+'</td><td>'+'R$ '+n+' '+'</td><td>'+'<span class="glyphicon glyphicon-thumbs-down"></span>'+'</td><td>'+dados.filmes[x].Estoque+'</td>'+'</td></tr>');
// var myJSON = {"Código": 1000 }; 
// var myJSON = encodeURIComponent(JSON.stringify(myJSON1)); 

// $('#salvar').attr('href', 'localhost:45000/'+ myJSON +'/Código');
// // this button then sends the letter to a function w/c generates the PDF


	// 	$(function(){
	// 	    $('#salva').on("click", function() {
	// 	        var código = $('#Código').val();

	// 	        $.getJSON("http://localhost:45000/" + código, function(data){
	// 	        });
	// 	    });
	// 	});


// $filmes.filtrarCodigo(codigo){
// 	$('#resultado').on("click", function() {
// 		return $filmes.filter(function(item){ 
//                                     return (item.Código == codigo)
//                                 });
// 	})
// }

 });


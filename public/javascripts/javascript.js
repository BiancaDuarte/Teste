var server = 'http://localhost:52000/dados';
var troca=0;
$(document).ready(function () {
	printQuadros();
	printCanecas();
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


function filtro(flt){
	$('#quadros').empty();
	// for (x in data) {
	// 	var categorias = data[x];
	// 	for(y in categorias){
	// 		var nome = categorias[y].Nome;
	// 		if (nome.search(flt) != -1){
	// 			$('#quadros').append('<div class="col-md-4 imagem"><h2>'+categorias[y].Nome+'</h2><p><div class="grid"><figure class="effect-zoe"><a href="http://localhost:52000/produto/detalhado/'+categorias[y].Código+'"><img src='+categorias[y].Imagem+'><figcaption><p class="icon-links"><a href="#"><i class="material-icons small"> shopping_cart</i></a><a href="#"><i class="material-icons small"> star</i></a></p></figcaption></a></figure><div><h1>A partir de R$ '+categorias[y].Preço1+'</h1><p>'+categorias[y].Pagamento+'</p></div></div></p></div>');
	// 		}
	// 	}
	// }
}


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
			for(y in categorias){
				var nome = categorias[y].Nome;
					if (nome.search(regex) != -1){
						resultados += '<div class="col-md-12 well">';
						resultados += '<div class="col-md-3"><img class="img-responsive" src="'+categorias[y].Imagem+'" alt="'+ categorias[y].Nome +'" /></div>';
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

// 	var count = 0;//recebendo o valor 5 que você disse
// $('#aumenta').click(function(){
// 	alert(count);
// 	count++;
// });

$('#zoom').zoom();//Zoom na imagem do produto selecionado

$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );

$('.dropdown-button').dropdown('open');
$('.dropdown-button').dropdown('close');
        
	// $("#status").click(function(){
	// 	$('#bla').append('<h3>' +data[cod].Preço1+ '</h3>');
	// 	// tudo();
	// });

	// $("#status2").click(function(){
	// 	$('#bla').append('<h3>' +data[cod].Preço2+ '</h3>');
	// 	// tudo();
	// });

	
	$('#menu-content').on('click', '#alice', function(){
		console.log('alice');
		filtro("alice");
	});

	$('.titulopromo').click(function(){
		console.log('alice');
		filtro("alice");
	});
});

function printQuadros(){//printar json/quadros no catalogo-quadros
	$('#quadros').empty();
	$.get(server, function(dados) {
		for (var x = 0; x < 72; x++){
				$('#quadros').append('<div class="col-md-4 imagem"><h2>'+dados.quadros[x].Nome+'</h2><p><div class="grid"><figure class="effect-zoe"><a href="http://localhost:52000/produto/detalhado/'+dados.quadros[x].Código+'"><img src='+dados.quadros[x].Imagem+'><figcaption><p class="icon-links"><a href="#"><i class="material-icons small"> shopping_cart</i></a><a href="#"><i class="material-icons small"> star</i></a></p></figcaption></a></figure><div><h1>A partir de R$ '+dados.quadros[x].Preço1+'</h1><p>'+dados.quadros[x].Pagamento+'</p></div></div></p></div>');
		}
	});
}

function printCanecas(){//printar json/canecas no catalogo-canecas
	$('#canecas').empty();
	$.get(server, function(dados) {
		for (var x = 0; x < 13; x++){
				$('#canecas').append('<div class="col-md-4 imagem"><h2>'+dados.canecas[x].Nome+'</h2><p><div class="grid"><figure class="effect-zoe"><a href="http://localhost:52000/produto/detalhado/'+dados.canecas[x].Código+'"><img src='+dados.canecas[x].Imagem+'><figcaption>	<p class="icon-links"><a href="#"><i class="material-icons small"> shopping_cart</i></a><a href="#"><i class="material-icons small"> star</i></a></p></figcaption></a></figure><div><h1>A partir de R$ '+dados.canecas[x].Preço1+'</h1><p>'+dados.canecas[x].Pagamento+'</p></div></div></p></div>');
		}
	});
}

// function mudarconteudo(){//printar json/quadros no catalogo-quadros
// 	$('#conteudo').empty();
// 	$.get(server, function(dados) {
// 		for (var x = 0; x < 1; x++){
// 				$('#conteudo').append('<div class="col-md-4 imagem"><h2>'+dados.quadros[0].Nome+'</h2><p><div class="grid"><figure class="effect-zoe"><a href="http://localhost:52000/produto/detalhado/"'+dados.quadros[0].Código+'><img src='+dados.quadros[0].Imagem+'><figcaption>	<p class="icon-links"><a href="#"><i class="material-icons small"> shopping_cart</i></a><a href="#"><i class="material-icons small"> star</i></a></p></figcaption></a></figure><div><h1>A partir de R$ '+dados.quadros[0].Preço1+'</h1><p>'+dados.quadros[0].Pagamento+'</p></div></div></p></div>');
// 		}
// 	});
// }

// function tudo(){
//     $.get(server, function(data) {
//         	if($('#opcao').value == "P1"){
//         		$('.informacoes').append('<h3>' +data[cod].Preço1+ '</h3>');
//         	}  
        	
        	
//         	else if ($('#opcao').value == "P2"){
//         		$('.informacoes').append('<h3>' +data[cod].Preço2+ '</h3>');
//         	}  
//     });

// }




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


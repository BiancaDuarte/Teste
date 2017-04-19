var server = 'http://localhost:52000/dados';
var fav = 'http://localhost:52000/favoritos/'
var troca=0, ID;


function filtroquadros(flt){//filtra os quadros
	$('#quadros').empty();
	var regex = new RegExp(flt, "i");
	$.get('/dados', function(data) {
	for (x in data.quadros) {
		if (data.quadros[x].Nome.search(regex) != -1){
			$('#quadros').append('<div class="col-md-4 imagem"><h2>'+data.quadros[x].Nome+'</h2><p><div class="grid"><figure class="effect-zoe"><a href="http://localhost:52000/quadro/detalhado/'+data.quadros[x].Código+'"><img src='+data.quadros[x].Imagem+'><figcaption><p class="icon-links"><a href="#"><i class="material-icons small"> shopping_cart</i></a><a href="#"><i class="material-icons small"> star</i></a></p></figcaption></a></figure><div><h1>A partir de R$ '+data.quadros[x].Preço1+'</h1><p>'+data.quadros[x].Pagamento+'</p></div></div></p></div>');
		}
	
	}	
	});
}//

function filtrocanecas(flto){//filtra as canecas
	$('#canecas').empty();
	var regex = new RegExp(flto, "i");
	$.get('/dados', function(data) {
	for (x in data.canecas) {
		if (data.canecas[x].Nome.search(regex) != -1){
			$('#canecas').append('<div class="col-md-4 imagem"><h2>'+data.canecas[x].Nome+'</h2><p><div class="grid"><figure class="effect-zoe"><a href="http://localhost:52000/caneca/detalhada/'+data.canecas[x].Código+'"><img src='+data.canecas[x].Imagem+'><figcaption><p class="icon-links"><a href="#"><i class="material-icons small"> shopping_cart</i></a><a href="#"><i class="material-icons small"> star</i></a></p></figcaption></a></figure><div><h1>A partir de R$ '+data.canecas[x].Preço1+'</h1><p>'+data.canecas[x].Pagamento+'</p></div></div></p></div>');
		}
	
	}	
	});
}//

$(document).ready(function () {

$("#form").submit(function() {
    if($("#campo").val()== null || $("#campo").val() ==""){
        alert('campo vazio');      
        return false;
    }
});

$('#quadros').on('click', ".favorite", function(){
	ID = $(this).data("id");
	favoritos();
	contador();
});

$('#canecas').on('click', ".favorite", function(){
	ID = $(this).data("id");
	favoritos();
	contador();
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
			for(y in categorias){
				var nome = categorias[y].Nome;
					if (nome.search(regex) != -1){
						resultados += '<div class="col-md-12 well">';
						resultados += '<div class="col-md-3"><img class="img-responsive" src="'+categorias[y].Imagem+'" alt="'+ categorias[y].Nome +'" /></div> <a href="http://localhost:52000/quadro/detalhado/'+categorias[y].Código+'">';
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
	printQuadros();
	printCanecas();
	$('#resultados-busca').hide();
	$('.myCarousel').carousel({
		interval: 3000
	});

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
		
	$('#menu-content').on('click', '.filter', function(){
		var classe = $(this).data('id');
		filtroquadros(classe);
	});

	$('#menu-content').on('click', '.filter', function(){
		var classe = $(this).data('id');
		filtrocanecas(classe);
	});

	$('#dropdown1').on('click', '.opcao', function(){
		var classe = $(this).data('id');
		var estoque = $(this).data('estoque');
		console.log(classe);
		printPreço(classe);
		printEstoque(estoque);
	});


	var favorites = [];
	var counter = 0;

	function contador(){
		var counter = 0;
		$.get(server, function(dados) {
		for (var x = 0; x < 72; x++){
			if(dados.quadros[x].Favoritos=="s")
				counter++;
		}
		for (var x = 0; x < 13; x++){
			if(dados.canecas[x].Favoritos=="s")
				counter++;
		}
			$('#contador').empty();
			$('#contador').append('<p>'+counter+'</p>');
		});
	}

	contador();

	$('.favorite').click(function() {

		contador();

		$('#cor').toggleClass("vermelho");
		ID = $(this).data("id");
		console.log('id = '+ID); // id que pe usado no get dos favoritos
		favoritos();
	});

	$('#reveal').click(function() {
	   alert(counter); 
	});
});

function printQuadros(){//printar json/quadros no catalogo-quadros
	$('#quadros').empty();
	$.get(server, function(dados) {
		for (var x = 0; x < 72; x++){
				$('#quadros').append('<div id="'+dados.quadros[x].Código+'" class="col-md-4 imagem"><h2>'+dados.quadros[x].Nome+'</h2><p><div class="grid"><figure class="effect-zoe"><a data-id="'+dados.quadros[x].Código+'" href="http://localhost:52000/quadro/detalhado/'+dados.quadros[x].Código+'"><img src='+dados.quadros[x].Imagem+'><figcaption><p class="icon-links"><a href="#"><i class="material-icons small"> shopping_cart</i></a><a><i id="cor'+dados.quadros[x].Código+'" class="material-icons small favorite" data-id='+dados.quadros[x].Código+'> star</i></a></p></figcaption></a></figure><div><h1>A partir de R$ '+dados.quadros[x].Preço1+'</h1><p>'+dados.quadros[x].Pagamento+'</p></div></div></p></div>');
		}
	});
}

function printCanecas(){//printar json/canecas no catalogo-canecas
	$('#canecas').empty();
	$.get(server, function(dados) {
		for (var x = 0; x < 13; x++){
				$('#canecas').append('<div class="col-md-4 imagem"><h2>'+dados.canecas[x].Nome+'</h2><p><div class="grid"><figure class="effect-zoe"><a data-id="'+dados.canecas[x].Código+'" href="http://localhost:52000/caneca/detalhada/'+dados.canecas[x].Código+'"><img src='+dados.canecas[x].Imagem+'><figcaption>	<p class="icon-links"><a href="#"><i class="material-icons small"> shopping_cart</i></a><a><i id="cor'+dados.canecas[x].Código+'" data-id='+dados.canecas[x].Código+' class="material-icons small favorite" id="estrela"> star</i></a></p></figcaption></a></figure><div><h1>A partir de R$ '+dados.canecas[x].Preço1+'</h1><p>'+dados.canecas[x].Pagamento+'</p></div></div></p></div>');
		}
	});
}

function printPreço(classe){//troca de preço no item selecionado
	$('#preço').empty();
	$('#preço').append('<h3> R$ '+classe+'</h3>');
}

function printEstoque(estoque){//troca de estoque no item selecionado
	$('#estoque').empty();
	$('#estoque').append('<b> Estoque: '+estoque+'</b>');
}

function favoritos(){// get dos favoritos
	$.ajax({
		type: 'GET',
		dataType: 'json',
		url: fav+ID,
		success: function(result){
			console.log('Produto adicionado com sucesso!');

		},
		error: function(status){
			console.log('status');
		}
	});
}

// function trocacor(coraçao){
// 	$('#cor').append('<i> '+vermelho+' </i>')
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


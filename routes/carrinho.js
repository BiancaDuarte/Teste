var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');

router.get('/', function (req, res){
	fs.readFile(__dirname + '/../db/quadros.json', 'utf8', function(err, data){
	data = JSON.parse(data);
	res.render('carrinho', { dados:data });
	
			res.end();
	});

});

router.get('/:cod', function(req, res, next){
	fs.readFile(__dirname + '/../db/quadros.json', 'utf8', function(err, data){
		data = JSON.parse(data);
		var cod = req.params.cod;
		console.log("cod = "+cod);
		console.log("Entrei no coisa do carrinho");
		var flag=0;

		var posicao = 0;
		for(i in data.quadros){
			if(data.quadros[i].Código==req.params.cod){
				posicao = i;
				console.log('Ta em quadros');
				flag=1;
			}
		}

		for(i in data.canecas){
			if(data.canecas[i].Código==req.params.cod){
				posicao = i;
				console.log('Ta em canecas');
				flag=2;
			}
		}

		if(flag==1){
			if(data.quadros[posicao].Carrinho=="n"){
				var produto = data.quadros[posicao];
				produto.Carrinho = "s";
				console.log(produto);
				data.quadros.splice(posicao, 1);

				data.quadros.push(produto);

				var dataJson = JSON.stringify(data);
				file.write(dataJson, res);
			}
		}

		if(flag==2){
			if(data.canecas[posicao].Carrinho=="n"){
				var produto = data.canecas[posicao];
				produto.Carrinho = "s";
				console.log(produto);
				data.canecas.splice(posicao, 1);

				data.canecas.push(produto);

				var dataJson = JSON.stringify(data);
				file.write(dataJson, res);
			}
		}
		
		if(flag==1){
			if(data.quadros[posicao].Carrinho=="s"){
				var produto = data.quadros[posicao];
				produto.Carrinho = "n";
				console.log(produto);
				data.quadros.splice(posicao, 1);

				data.quadros.push(produto);

				var dataJson = JSON.stringify(data);
				file.write(dataJson, res);
				console.log('Excluido com sucesso');
			}
		}

		if(flag==2){
			if(data.canecas[posicao].Carrinho=="s"){
				var produto = data.canecas[posicao];
				produto.Carrinho = "n";
				console.log(produto);
				data.canecas.splice(posicao, 1);

				data.canecas.push(produto);

				var dataJson = JSON.stringify(data);
				file.write(dataJson, res);
				console.log('Excluido com sucesso');
			}
		}


	});
});

module.exports = router;
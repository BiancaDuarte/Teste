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
		var flag=0;

		var posicao = 0;
		for(i in data.quadros){//varredura para saber se é quadro e a sua determinada posição
			if(data.quadros[i].Código==req.params.cod){
				posicao = i;
				flag=1;
			}
		}

		for(i in data.canecas){//varredura para saber se é caneca e a sua determinada posição
			if(data.canecas[i].Código==req.params.cod){
				posicao = i;
				flag=2;
			}
		}

		if(flag==1){//quadros
			if(data.quadros[posicao].Carrinho=="n"){//não estando no carrinho
				var produto = data.quadros[posicao];//salva o item nessa variável
				produto.Carrinho = "s";//mudando o status do carrinho
				data.quadros.splice(posicao, 1);//apaga o item que existe em data

				data.quadros.push(produto);//dá um push na variável que foi modificada

				var dataJson = JSON.stringify(data);
				file.write(dataJson, res);
			}
		}

		if(flag==2){//canecas
			if(data.canecas[posicao].Carrinho=="n"){
				var produto = data.canecas[posicao];
				produto.Carrinho = "s";
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
				data.quadros.splice(posicao, 1);

				data.quadros.push(produto);

				var dataJson = JSON.stringify(data);
				file.write(dataJson, res);
			}
		}

		if(flag==2){
			if(data.canecas[posicao].Carrinho=="s"){
				var produto = data.canecas[posicao];
				produto.Carrinho = "n";
				data.canecas.splice(posicao, 1);

				data.canecas.push(produto);

				var dataJson = JSON.stringify(data);
				file.write(dataJson, res);
			}
		}


	});
});

module.exports = router;
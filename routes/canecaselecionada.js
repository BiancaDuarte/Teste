var express = require('express');
var router = express.Router();
var fs = require('fs');
var posicao = 0;

router.get('/:cod', function (req, res){
	fs.readFile(__dirname + '/../db/quadros.json', 'utf8', function(err, data){
	data = JSON.parse(data);
	for(x in data.canecas){
		if(data.canecas[x].Código == req.params.cod){
			posicao = x;
			console.log(posicao);
		}
	}
	res.render('produtoselecionado2', { dados:data, cod:posicao });
	
			res.end();
	});

});

module.exports = router;
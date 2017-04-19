var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/:cod', function (req, res){
	fs.readFile(__dirname + '/../db/quadros.json', 'utf8', function(err, data){
	data = JSON.parse(data);
	var posicao = 0;
	for(i in data.quadros){
		if(data.quadros[i].Código==req.params.cod){
			posicao = i;
		}
	}
	res.render('produtoselecionado', { dados:data, cod:posicao });
	
			res.end();
	});

});

module.exports = router;
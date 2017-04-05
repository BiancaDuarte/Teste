var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/:cod', function (req, res){
	fs.readFile(__dirname + '/../db/quadros.json', 'utf8', function(err, data){
	data = JSON.parse(data);
		console.log(data);
	res.render('produtoselecionado', { dados:data, cod:req.params.cod });
	
			res.end();
	});

});

module.exports = router;
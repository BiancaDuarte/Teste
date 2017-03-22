var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

fs.readFile(__dirname + '/../db/quadros.json', 'utf8', function(err, data){
	data = JSON.parse(data);
		console.log(data);
	res.render('index', {title: 'Cadastro de Países', dados:data });
	
			res.end();
	});
});

module.exports = router;

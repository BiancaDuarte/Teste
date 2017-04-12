var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res){
	fs.readFile(__dirname + '/../db/quadros.json', 'utf8', function(err, data){
	data = JSON.parse(data);
	res.render('quadros', { dados:data });
		res.end();
	});

});

router.get('/detalhado/:cod', function (req, res){
	console.log(req.params.cod);
});

module.exports = router;
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res){
	fs.readFile(__dirname + '/../db/quadros.json', 'utf8', function(err, data){
	data = JSON.parse(data);
		console.log(data);
	res.json(data);
	
			res.end();
	});

});

module.exports = router;
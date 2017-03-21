var express = require('express');
var router = express.Router();
var fs = require('fs');
var file = require('./../controller/file');

router.get('/users', function (req, res){
	fs.readFile(__dirname + '/../db/quadros.json', 'utf8', function(err, data){
			console.log(data);
			res.end(data);
	});

});

module.exports = router;

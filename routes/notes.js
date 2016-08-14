var express = require('express');
var router = express.Router();
var Note = require('../models/note');

router.get('/', function(req, res) {
	Note.find( function(err, notes){
		if (err)
			return res.status(500).json({error: "Something Went Wrong"});
		else
			return res.json(notes);
	});

	router.post('/', function(req, res) {
		new Note({
			title: req.body.title
		}).save( function(err, note) {
			if (err)
				return res.status(500).json({error: "Something Went Wrong"});
			else
				return res.send(note);
		});
	});


});

module.exports = router;
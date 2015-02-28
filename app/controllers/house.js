var mongoose = require('mongoose');
var House = mongoose.model('House');

exports.publish = function(req, res) {
	var _house = req.body.house;
	house = new House(_house);
	house.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			res.send('suc');
		}
	});
};
exports.getDetail = function(req, res) {
	var houseId = req.body.id;
	House.findById(houseId, function(err, data) {
		res.send(data);
	})
};
exports.saveImg = function(req, res) {
	res.send(req.files);
};
exports.search = function(req, res) {
	var obj = req.body;
	var key,
		searchData = {};
	for (key in obj) {
		if (obj[key] !== '') {
			if (key === 'city') {
				searchData['address.city'] = obj[key];
			} else if (key === 'state') {
				searchData['address.state'] = obj[key];
			} else {
				searchData['peopleNum'] = obj[key];
			}
		}
	}
	House.find(searchData, function(err, data) {
		res.send(data);
	})
};

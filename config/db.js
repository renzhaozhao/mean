var mongoose = require('mongoose');
var config = require('./config');

module.exports = function() {
	var db = mongoose.connect(config.db);
	db.connection.on("error", function(error) {
		console.log("数据库连接失败：" + error);
	});
	db.connection.on("open", function() {
		console.log("------数据库连接成功！------");
	});

	require('../app/models/models.news.js');

	return db;
}

var mysql = require('mysql');

var connectMYSQL = function (){
	return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password: 'root',
			database: 'casadocodigo_nodeJS'
		});
}

//wrapper
module.exports = function(){
	return connectMYSQL;
}
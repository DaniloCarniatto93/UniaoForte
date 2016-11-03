function LoginDAO(connection){
	this._connection = connection;
}
LoginDAO.prototype.login = function(callback){

		this._connection.query('select * from usuarios',callback);
	
		}
module.exports = function(){
		return LoginDAO;
}
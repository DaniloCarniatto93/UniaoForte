module.exports = function(app){

app.get('/autentica/login',function(req,res){
			res.render('autentica/login');
		});
	app.post('/autentica/entra',function(req,res){

			
			var user = req.body;
			var connection = app.infra.connectionFactory();
			var loginDAO = new app.infra.LoginDAO(connection);

			console.log(user);
			var conexao2 = app.infra.connectionFirebase;

			var insecao = {
					isercao:""
			};
			//var rootRef = conexao2.database().ref().remove();
			console.log(user.login);
			console.log(user.password);
//signOut	

			//conexao2.auth().createUserWithEmailAndPassword(user.login,user.password).catch(function(error) {
  			//var errorCode = error.code;
  			//var errorMessage = error.message;
			//});

			conexao2.auth().signInWithEmailAndPassword(user.login,user.password).catch(function(error) {
  			var errorCode = error.code;
  			var errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);

			});
			console.log("teste - "+conexao2.auth().Auth);
			res.render('autentica/principal',{user:user});
		
			//loginDAO.login(function(erros,result){
			//	for (var i = 0;i<result.length;i++){
			//			if(result[i].login == user.login && result[i].senha == user.password){
			//	
			//				
			//			}
			//	}
			//});/*
 	});
}
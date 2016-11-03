module.exports = function(app){

app.post('/principal/cadastrarUsuario/cadastrar',function(req,res){

	console.log("teste");

	var cadastrar = req.body;
		console.log(cadastrar);

	var conexao = app.infra.connectionFirebase;

	conexao.auth().createUserWithEmailAndPassword(cadastrar.email, cadastrar.senha).catch(function(error) {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		});
	
	var login = { 	email: cadastrar.email,
  					senha: cadastrar.senha,
  					nome: cadastrar.nome
  				}

  		console.log(login);

  		var sessionsRef = conexao.database().ref('usuario');
		var mySessionRef = sessionsRef.push();
		mySessionRef.update(login);

		res.render('autentica/principal');
});

}
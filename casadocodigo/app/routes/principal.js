module.exports = function(app){


app.get('/principal/IniciarProcesso',function(req,res){
	
	var conexao = app.infra.connectionFirebase;

	conexao.auth().onAuthStateChanged(function(user) {
  if (user) {
  res.render('processo/iniciarProcesso');
  } else {
    res.render('autentica/login');
  }
});
});

app.post('/autentica/cadastra',function(req,res){
	console.log("post");
			var user = req.body;
			console.log(user);

			var conexao = app.infra.connectionFirebase;

			conexao.database().ref().push(user);		

				conexao.auth().createUserWithEmailAndPassword(user.login,user.senha).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  res.render('autentica/login',errorMessage,errorCode);
				  // ...
});

				res.render('autentica/principal');
});

	app.get('/autentica/sair',function(req,res){
	console.log("saindo");
		var user = req.body;
		var conexao = app.infra.connectionFirebase;
		conexao.auth().signOut().then(function() {
		  console.log("saiu");
		  res.render('autentica/login');
		}, function(error) {
		  // An error happened.
});
});

	app.get('/autentica/principal',function(req,res){

		res.render('autentica/principal');
	});




	app.get('/principal/processosEmAberto',function(req,res){

		function recebe(dados){
			res.render('processo/processosEmAberto',{dados});
		}
		
		var dados =[];

	var conexao = app.infra.connectionFirebase;

	conexao.auth().onAuthStateChanged(function(user) {
		var ref = conexao.database().ref("processos");
var cont = 0;
	ref.orderByChild("respon").equalTo(user.email).on("child_added", function(snapshot) {
		var acao = snapshot.val().acao;
		var noprocess = snapshot.val().noprocess;
		var respon= snapshot.val().respon;
		var	sta = snapshot.val().sta;
		var	tem = snapshot.val().tem;
		

		dados[cont] = { acao: acao,
					noprocess: noprocess,
					respon: respon,
					sta : sta,
					tem : tem
				};	

				console.log(cont);
		cont++;		
  	  });
	
		console.log(cont);
	console.log(dados);

	recebe(dados)

});

});


	app.get('/autentica/cadastraUser',function(req,res){

			var conexao = app.infra.connectionFirebase;
			conexao.auth().onAuthStateChanged(function(user) {
		  if (user) {
		  res.render('autentica/cadastroUsuario');
		  } else {
		    res.render('autentica/login');
		  }
		});

		

	});


	app.get('/principal/meusProcessos',function(req,res){

		function recebe(dados){
			res.render('processo/meusProcessos',{dados});
		}
		
		var dados =[];

	var conexao = app.infra.connectionFirebase;

	conexao.auth().onAuthStateChanged(function(user) {
		var ref = conexao.database().ref("processos");
var cont = 0;
	ref.orderByChild("respon").equalTo(user.email).on("child_added", function(snapshot) {
		var acao = snapshot.val().acao;
		var noprocess = snapshot.val().noprocess;
		var respon= snapshot.val().respon;
		var	sta = snapshot.val().sta;
		var	tem = snapshot.val().tem;
		
		if(sta == "Aberto"){

		dados[cont] = { acao: acao,
					noprocess: noprocess,
					respon: respon,
					sta : sta,
					tem : tem
				};	
				cont++;	
}
				console.log(cont);
			
  	  });
	
		console.log(cont);
	console.log(dados);

	recebe(dados)

});




	});

}
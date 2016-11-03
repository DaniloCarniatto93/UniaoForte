module.exports = function(app){

app.post('/principal/IniciarProcesso/parte2',function(req,res){

var dados = req.body;

console.log(dados);

var tamanho = dados.acao;

var conexao = app.infra.connectionFirebase;

conexao.storage().ref().storageRef.child("images/"+dados.arquivo).put(file).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
     
      }).catch(function(error) {
        // [START onfailure]
        console.error('Upload failed:', error);
        // [END onfailure]
      });
      // [END oncomplete]

try{


for(var x = 0;x<tamanho.length;x++){





var listaDadosAcao = dados.acao[x];
var listaDadosRespon = dados.respon[x];
var listaDadosSta = dados.sta[x];
var listaDadostem = dados.tem[x];

	var dados1 = { noprocess: dados.noprocess,
 				 	acao: listaDadosAcao,
  					respon: listaDadosRespon,
					sta: listaDadosSta,
					tem: listaDadostem,
					arquivo: dados.arquivo };
					
var sessionsRef = conexao.database().ref('processos');
var mySessionRef = sessionsRef.push();
mySessionRef.update(dados1);
}

res.render('autentica/principal');

}catch(err){
	res.render('processo/iniciarProcesso',{dados});
}


});

app.post('/realizar/processo',function(req,res){

var dados= req.body;

console.log(dados);

res.render('processo/realizarProcesso',{dados});

});

}
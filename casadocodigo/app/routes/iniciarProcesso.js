module.exports = function(app){

var multer = require('multer');

var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'app/uploads');
	},
	filename: function(req,file,cb){
		var ext = file.originalname.substr(file.originalname.lastIndexOf('.')+1);
		cb(null,file.fieldname+"-"+Date.now()+"."+ext);
	}
});

var upload = multer({storage: storage});

app.post('/principal/IniciarProcesso/parte2',upload.single('arquivo'),function(req,res){

	console.log(req.file.filename);

var dados = req.body;

console.log(dados);

var tamanho = dados.acao;

var conexao = app.infra.connectionFirebase;

try{


for(var x = 0;x<tamanho.length;x++){


var listaDadosAcao = dados.acao[x];
var listaDadosRespon = dados.respon[x];
var listaDadosSta = dados.sta[x];
var file = req.file.filename;

	var dados1 = { noprocess: dados.noprocess,
 				 	acao: listaDadosAcao,
  					respon: listaDadosRespon,
					sta: listaDadosSta,
					tem: "00:00:00",
					arquivo: file,
					causaPausa: "",
					causaCancelamento: "" };
					
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

var dados1= req.body;

console.log("veio isso : ");
console.log(dados1);

var x = dados1.tempo;

var separado = x.split(":");

console.log(separado[0]);

var dados = { processo: dados1.processo,
 			  acao: dados1.acao,
			  responsavel: dados1.responsavel,
			  status: dados1.status,
			  key: dados1.key,
			  causaPausa:dados1.causaPausa,
			  causaCancelamento:dados1.causaCancelamento,
			  hora: separado[0],
			  minuto: separado[1],
			  segundo: separado[2],
			  arquivo:dados1.arquivo }

			  console.log(dados);
	
	var firebase = app.infra.connectionFirebase; 

	firebase.database().ref('processos/' + dados.key).set({
	acao: dados.acao,
	arquivo: "",
	noprocess: dados.processo,
	respon: dados.responsavel,
 	tem: dados1.tempo,
    sta: "Em Andamento",
    causaPausa: dados.causaPausa,
    causaCancelamento: dados.causaCancelamento
  });

res.render('processo/realizarProcesso',{dados});

});

}
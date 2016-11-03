module.exports = function(app){
	var listaProdutos = function(req,res){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err,results){
			res.format({
				html: function(){
					res.render('produtos/lista',{lista:results});
				},
				json: function(){
					res.json(results);
				}
			});
			res.render('produtos/lista',{lista:results});
		});

		connection.end();
	};	
		
		app.get('/produtos',listaProdutos);

		app.get('/produtos/form',function(req,res){
			res.render('produtos/form',{errosValidacao:{},produto:{}});
		});

		app.post('/produtos',function(req,res){

			var produto = req.body;

			req.assert('titulo','Titulo é obrigatorio').notEmpty();
			req.assert('descricao','A descricao do produto e obrigatoria').notEmpty();
			req.assert('preco','Formato inválido').isFloat();

			var erros = req.validationErrors();

			if(erros){
				res.format({
				html: function(){
					res.status(400).render('produtos/form',{errosValidacao:erros,produto:produto});
				},
				json: function(){
					res.status(400).json(erros);
				}
				});

				return;
			}

			var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.salva(produto,function(erros,results){
			res.redirect('/produtos');
		});

		});

}
function ProdutosDAO(connection){
	this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback){
		this._connection.query('select * from livros',callback);
		}
ProdutosDAO.prototype.salva = function(produto,callback){
	console.log("1 - insert")
	//"insert into livros(titulo, descricao, preco) values ('Comecando com javascript', 'livro introdutório sobre javascript', 39.90);"
	this._connection.query('insert into livros set ?',produto,callback);
	console.log(produto);
	console.log("2 - insert")
}
//'insert into livros(titulo,descricao,preco) values("teste",34,00,"teste3");'
module.exports = function(){
		return ProdutosDAO;
}
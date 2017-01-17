import React from "react"
import ReceitaBox from "./ReceitaBox"
import ReceitaForm from "./ReceitaForm"

export default class ReceitaList extends React.Component{

	constructor(){
		super();

		console.log("Dando fetch receitas");
		this._fetchReceitas();
		this.state = {
			receitas: []
		};
	}

	_getReceitas(){

		return this.state.receitas.map( (receita) => {
			return (
				<ReceitaBox nome_receita= {receita.nome_receita} categoria= {receita.categoria}
				tempo_de_preparo= {receita.tempo_de_preparo} nivel_de_dificuldade= {receita.nivel_de_dificuldade}
				subpartes= {receita.subpartes}
				key= {receita.id} id= {receita.id} onDelete={this._deleteReceita.bind(this)}/>
			);
		});
	}

	_fetchReceitas(){
		console.log("Fetch Receitas");
		jQuery.get('/api/receitas/')
			.done(receitas =>{
				console.log("Recebeu receitas");
				this.setState({receitas});
			});
		console.log("Saiu fetch Receitas");
	}

	_deleteReceita(receita){

		console.log("Vou deletar receita");
		console.log(receita);

		const receitaID = receita.id;

		// Vai procurar o receita que vai ser removido na lista de receitas
		let deletedReceita = this.state.receitas.filter(receita => receita.id == receitaID)[0];
		console.log(deletedReceita);

		jQuery.ajax({
			method: 'DELETE',
			url: `/api/receitas/${deletedReceita.id}`
		}).done(function(){
			console.log("Deletou");
		});

		// Mas nao vamos esperar ate que a request pra API termine antes de atualizar o component's state.
		// We will give out user imediate visual feedback, which is known as optimistic update

		// Clonando o array existente com o Spread Operator
		const receitas = [...this.state.receitas];
		const receitaIndex = receitas.indexOf(deletedReceita);
		console.log(receitaIndex);
		// Remove the receita from the receita's array
		receitas.splice(receitaIndex, 1);

		// Updates state and the UI updates imediately
		this.setState({receitas});
	}

	_addReceita(tempo_de_preparo, nivel_de_dificuldade, nome_receita, ingredientes, modo_preparo, categoria, foto_da_receita){

		console.log("No add receita!!");

		console.log(foto_da_receita);

		let lista_ingredientes_objs = [];
		// Criando os ingredientes objects
		for(var i=0;i<ingredientes.length;i++){
			console.log(ingredientes[i]);
			lista_ingredientes_objs.push({"nome_ingrediente" : ingredientes[i]});
		}
		// console.log(lista_ingredientes_objs);
		// console.log(lista_ingredientes_objs[1]);

		let lista_modo_preparo_objs = [];
		// Criando os modo_preparo objects
		for(var i=0;i<modo_preparo.length;i++){
			lista_modo_preparo_objs.push({"descricao" : modo_preparo[i]});
		}
		// console.log(lista_modo_preparo_objs);
		// console.log(lista_modo_preparo_objs[1]);

		// lista_ingredientes_objs = JSON.stringify(lista_ingredientes_objs);
		// lista_modo_preparo_objs = JSON.stringify(lista_modo_preparo_objs);
		let subpartes_lista = [];
		let parte_receita = {"ingredientes":lista_ingredientes_objs, "modo_de_preparo":lista_modo_preparo_objs};
		// Criando as partes da receita primeiro
		console.log("Posting new recipe");

		// Tem que transformar em JSON ja que estou definindo que o Content-Type vai ser JSON e assim o request.data esta esperando
		//parte_receita = JSON.stringify(parte_receita);
		console.log(parte_receita);

		// Adicionando na lista da partes_receita
		subpartes_lista.push(parte_receita);

		/// CRIANDO O OBJETO RECEITA PARA SER MANDADO
		let receita = {"nome_receita": nome_receita, "tempo_de_preparo": tempo_de_preparo, "nivel_de_dificuldade": nivel_de_dificuldade, "subpartes": subpartes_lista, "categoria": categoria,
		"foto_da_receita": foto_da_receita}
		receita = JSON.stringify(receita);
		console.log(receita);
		jQuery.ajax({
			type: 'POST',
			url: '/api/receitas/',
			data: receita,
			contentType: 'application/json'
		}).done(newReceita => {
			console.log("New recipe posted");
			console.log(typeof(newReceita));
			console.log(newReceita);

			// Vai fazer um fetch pra ver se ta pegando certinho com o que tem de mais atual no banco
			this._fetchReceitas()
			console.log("atualizar no Add");
			this.setState({receitas: this.state.receitas.concat([newReceita]) });
		})
		.fail(function(xhr, status, error){
			console.log(error);
			console.log(xhr);
		})
		.always(recipe => {
			console.log(recipe);
		});

	}

	_addFoto(foto_da_receita){
		console.log("No add foto");
		console.log(foto_da_receita);

		// for (var [key, value] of foto_da_receita.entries()) { 
		//   console.log(key, value);
		// }

		const data = {"foto": foto_da_receita};
		jQuery.ajax({
			type: 'POST',
			url: '/api/fotos/',
			data: data,
			contentType: 'multipart/form-data',
		}).done(newFoto => {
			console.log("New foto posted");
			console.log(typeof(newFoto));
			console.log(newFoto);

			// Vai fazer um fetch pra ver se ta pegando certinho com o que tem de mais atual no banco
			// this._fetchReceitas()
			// console.log("atualizar no Add");
			// this.setState({receitas: this.state.receitas.concat([newFoto]) });
		})
		.fail(function(xhr, status, error){
			console.log(error);
			console.log(xhr);
		})
		.always(foto => {
			console.log(foto);
		});
	}

	render(){

		// Pegando as receitas
		const receitas = this._getReceitas();
		const qtdsReceitas = this.state.receitas.length;

		return (
			<div>
				<div className="col-md-8 col-md-offset-2">
					<ReceitaForm addReceita={this._addReceita.bind(this)} addFoto={this._addFoto.bind(this)}/>
				</div>				
				<div className="panel panel-default col-md-6">
					<div className="panel-heading">Existem {qtdsReceitas} receitas no banco:</div>
					<div className="panel-body">
						
						{receitas}
					</div>
				</div>
			</div>
			
		)
	}
}
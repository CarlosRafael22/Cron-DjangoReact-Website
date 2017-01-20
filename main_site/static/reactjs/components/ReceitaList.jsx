import React from "react"
import ReceitaBox from "./ReceitaBox"
import ReceitaForm from "./ReceitaForm"

import { connect } from 'react-redux';
import {getReceitas, addReceita, deleteReceita} from '../redux/action'
import store from '../redux/store'
import {loadState, saveState} from '../redux/localStorage'

class ReceitaList extends React.Component{

	//  React assigns props on the constructed instance right after the construction in addition to passing them to constructor.
	// Entao this.props vai ser undefined dentro do constructor pq o React so passa ele dps
	// Pra poder acessar o this.props dentro do constructor tem que fazer:
	// constructor(props){
	// 	super(props);
	// 	console.log(this.props);
	// }

	constructor(){
		super();

		console.log("Dando fetch receitas");
		// Setou as receitas do banco no localStorage

		//store.dispatch(getReceitas());
		//this._fetchReceitas();

		// SE TIVER COM NADA NO LOCALSTORAGE (QD TA ACESSANDO PELA PRIMEIRA VEZ) ELE VAI RETORNAR receitasList: []
		// ENTAO TEM Q FAZER UMA REQUISICAO PARA POPULAR AS RECEITAS DESSA VEZ
		if(localStorage.getItem('state') == null){
			console.log("PEGANDO AS RECEITAS PELA PRIMEIRA VEZ!!");
			store.dispatch(getReceitas());
		}

		//store.dispatch(getReceitas());

		// Tenho que comecar vazio mesmo pq senao ele nao vai conseguir entrar na pagina
		// ele vai fazer o _getReceitas e mapear do this.state.receitas sem as receitas terem sido pegas do servidor
		this.state = {
			receitas: []
		};

		console.log("Props");
		console.log(this.props);

		// Qlqr mudanca de estado no store eu salvo isso no localStorage
		store.subscribe(() => {
			console.log("Subscribe");
			console.log(store.getState());
			saveState(store.getState());
		});
	}

	_getReceitas(){

		return this.props.receitas.receitasList.map( (receita) => {
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
		console.log(receitaID);
		console.log("O props eh: ", this.props);

		// Vai procurar o receita que vai ser removido na lista de receitas
		//let deletedReceita = this.props.receitas.receitasList.filter(receita => receita.id == receitaID)[0];
		//console.log(deletedReceita);

		// jQuery.ajax({
		// 	method: 'DELETE',
		// 	url: `/api/receitas/${deletedReceita.id}`
		// }).done(function(){
		// 	console.log("Deletou");
		// });

		// Mas nao vamos esperar ate que a request pra API termine antes de atualizar o component's state.
		// We will give out user imediate visual feedback, which is known as optimistic update

		// Vou ver se atualizou o estado no store.state dizendo se o delete da receita deu certo ou nao
		// Se tiver state.deleted_recipe

		// Clonando o array existente com o Spread Operator
		// const receitas = [...this.state.receitas];
		// const receitaIndex = receitas.indexOf(deletedReceita);
		// console.log(receitaIndex);
		// // Remove the receita from the receita's array
		// receitas.splice(receitaIndex, 1);

		// // Updates state and the UI updates imediately
		// this.setState({receitas});


		console.log("Mandei pro dispatch");
		this.props.dispatch(deleteReceita(receitaID));
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

		this.props.dispatch(addReceita(receita));

		// jQuery.ajax({
		// 	type: 'POST',
		// 	url: '/api/receitas/',
		// 	data: receita,
		// 	contentType: 'application/json'
		// }).done(newReceita => {
		// 	console.log("New recipe posted");
		// 	console.log(typeof(newReceita));
		// 	console.log(newReceita);

		// 	// Vai fazer um fetch pra ver se ta pegando certinho com o que tem de mais atual no banco
		// 	//this._fetchReceitas();
		// 	store.dispatch(getReceitas());
		// 	console.log("atualizar no Add");
		// 	console.log("As receitas");
		// 	console.log(this.props.receitas.receitasList);
		// 	//this.setState({receitas: this.state.receitas.concat([newReceita]) });
		// })
		// .fail(function(xhr, status, error){
		// 	console.log(error);
		// 	console.log(xhr);
		// })
		// .always(recipe => {
		// 	console.log(recipe);
		// });

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
		console.log("Render");
		console.log(this.props.receitas);
		//this._getReceitasFromProps();
		const receitas = this._getReceitas();
		const qtdsReceitas = this.props.receitas.receitasList.length;

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


function mapStateToProps(state){
	console.log("StateProps mapeado no Receita");
	console.log(state);
	console.log(state.receitas); // state

	return {
		receitas: state.receitas
	};
}


export default connect(mapStateToProps)(ReceitaList)
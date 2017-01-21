import React from "react"

import ReceitaList from '../components/ReceitaList'
import { connect } from 'react-redux'
import {getReceitas, addReceita, deleteReceita} from '../redux/action'
import {loadState, saveState} from '../redux/localStorage'

class ReceitaListContainer extends React.Component{

	// To mandando o props pq mesmo sem eu ter setado nenhum props em <ReceitaListContainer> no ReceitaContainer
	// ao receber o props aqui eu posso acessar o dispatch que eh passado por debaixo dos panos
	constructor(props){
		super(props);

		// SE TIVER COM NADA NO LOCALSTORAGE (QD TA ACESSANDO PELA PRIMEIRA VEZ) ELE VAI RETORNAR receitasList: []
		// ENTAO TEM Q FAZER UMA REQUISICAO PARA POPULAR AS RECEITAS DESSA VEZ
		if(localStorage.getItem('state') == null){
			console.log("PEGANDO AS RECEITAS PELA PRIMEIRA VEZ!!");
			this.props.dispatch(getReceitas());
		}
	}

	_deleteReceita(receita){

		console.log("Vou deletar receita");
		console.log(receita);

		const receitaID = receita.id;
		console.log(receitaID);
		console.log("O props eh: ", this.props);

		console.log("Mandei pro dispatch");
		this.props.dispatch(deleteReceita(receitaID));


		// Mas nao vamos esperar ate que a request pra API termine antes de atualizar o component's state.
		// We will give out user imediate visual feedback, which is known as optimistic update

		// Clonando o array existente com o Spread Operator
		// const receitas = [...this.state.receitas];
		// const receitaIndex = receitas.indexOf(deletedReceita);
		// console.log(receitaIndex);
		// // Remove the receita from the receita's array
		// receitas.splice(receitaIndex, 1);

		// // Updates state and the UI updates imediately
		// this.setState({receitas});
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
		return (
			<ReceitaList receitasList={this.props.receitas.receitasList} deleteReceita={this._deleteReceita.bind(this)}
			addReceita={this._addReceita.bind(this)} addFoto={this._addFoto.bind(this)}  />
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


export default connect(mapStateToProps)(ReceitaListContainer)
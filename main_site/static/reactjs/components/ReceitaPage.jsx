import React from "react"
import {loadState, saveState} from '../redux/localStorage'
import {deleteReceita} from '../redux/action'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

import ReceitaBox from "./ReceitaBox"

class ReceitaPage extends React.Component{

	constructor(props){
		super(props);
		console.log("RECEITA PAGE");
		this.receita = this.getReceitaFromStore(this.props.params.receitaId);
	}

	//Com o ID da Receita eu pego essa Receita direto do Store ja que eu nao posso passar parametros para o objeto Link que dps acessaria aqui
	getReceitaFromStore(receitaId){
		const localState = loadState();
		const listaReceitas = localState.receitas.receitasList;
		console.log(listaReceitas[0]);
		console.log(listaReceitas[0]['id']);
		for(let i=0;i<listaReceitas.length;i++){
			if(listaReceitas[i]['id'] == receitaId)
				return listaReceitas[i];
		}
	}

	_deleteReceita(receita){

		console.log("Vou deletar receita no ReceitaPage");
		console.log(receita);

		const receitaID = receita.id;
		console.log(receitaID);
		console.log("O props eh: ", this.props);

		console.log("Mandei pro dispatch");
		this.props.dispatch(deleteReceita(receitaID));
		hashHistory.push('/receitas');
	}


	render(){
		return (
			<div>
				<h3>Receita Pgae {this.props.params.receitaId}</h3>
				<h3>{this.receita.nome_receita}</h3>
				<ReceitaBox nome_receita= {this.receita.nome_receita} categoria= {this.receita.categoria}
				tempo_de_preparo= {this.receita.tempo_de_preparo} nivel_de_dificuldade= {this.receita.nivel_de_dificuldade}
				subpartes= {this.receita.subpartes}
				key= {this.receita.id} id= {this.receita.id} onDelete={this._deleteReceita.bind(this)}/>
			</div>
			
		)
	}
}

export default connect()(ReceitaPage)
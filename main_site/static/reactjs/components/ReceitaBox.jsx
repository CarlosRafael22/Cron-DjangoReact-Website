import React from "react"
import { Link } from 'react-router'

class IngredientesSubparte extends React.Component{
		render(){
			const lista_ings = this.props.lista_ingredientes;
			const listaIngredientes = lista_ings.map( (ingrediente, idx) =>
				<p key={idx}>{ingrediente['quantidade']} {ingrediente['nome_ingrediente']} {ingrediente['id']} </p>
			);

			let nome_parte;
			if(this.props.nome_parte == null){
				nome_parte = "Subparte";
			}

			return(
				<div>
					<h3> {nome_parte} </h3>
					{listaIngredientes}
				</div>				
			);
		}		
}


class ModoPreparoSubparte extends React.Component{
		render(){
			const lista_passos = this.props.lista_modo_preparo;
			// console.log("Passo");
			// console.log(lista_passos);
			const listaPassos = lista_passos.map( (passo, idx) =>
				<p key={idx}>{passo['descricao']} {passo['id']}</p>
			);
			// console.log("PassoSubparte");
			// console.log(listaPassos);

			let nome_parte;
			if(this.props.nome_parte == null){
				nome_parte = "Subparte";
			}

			return(
				<div>
					<h3> {nome_parte} </h3>
					{listaPassos}
				</div>				
			);
		}		
}


export default class ReceitaBox extends React.Component{
	

	_handleSubparts(){
		console.log("Subpartes");
		const subpartes = this.props.subpartes;
		let listas_nomes_partes = [];
		let listas_ingredientes = [];
		let listas_modos_de_preparo = [];

		// console.log(subpartes);
		// console.log(typeof subpartes);
		for (var i=0; i<subpartes.length; i++){
			// console.log("Cada subparte");
			// console.log(subpartes[i]);
			listas_ingredientes.push(subpartes[i]['ingredientes']);
			// console.log(subpartes[i]["ingredientes"]);
			listas_modos_de_preparo.push(subpartes[i]['modo_de_preparo']);
			listas_nomes_partes.push(subpartes[i]['nome_da_parte']);
		}

		// console.log(listas_ingredientes);
		// console.log(listas_modos_de_preparo);
		// console.log(listas_nomes_partes);
		return{
			"nomes_partes": listas_nomes_partes, 
			"listas_ingredientes" : listas_ingredientes, 
			"listas_modos_de_preparo": listas_modos_de_preparo
		};

	}

	_getIngredientesView(listas_nomes_partes, listas_ingredientes){

		//console.log("No getView ingredientes");
		return listas_ingredientes.map( (lista, index) => {
			// console.log(index);
			// console.log(listas_nomes_partes[index]);
			// console.log(lista);
			return(
				<IngredientesSubparte nome_parte={listas_nomes_partes[index]} lista_ingredientes={lista}
				key={index} />
			)
		});

	}

	_getModoPreparoView(listas_nomes_partes, listas_modos_de_preparo){
		//console.log("No getView modo_de_preparo");
		return listas_modos_de_preparo.map( (lista, index) => {
			// console.log(index);
			// console.log(listas_nomes_partes[index]);
			// console.log(lista);
			return(
				<ModoPreparoSubparte nome_parte={listas_nomes_partes[index]} lista_modo_preparo={lista}
				key={index} />
			)
		});
	}

	
	_handleDelete(event){
		// Not to reload the page after submitting
		event.preventDefault();

		// Good practice of UI to ask before destructive actions
		// Show confirmation box before deleting
		if(confirm('Tem certeza que quer deletar?')){
			// Call the onDelete passed from the ReceitaList with the receita as argument
			this.props.onDelete(this.props);
		}
	}


	render(){

		const subpartesArrays = this._handleSubparts();
		// console.log("Pego no render:");
		// console.log(subpartesArrays["nomes_partes"]);

		const ingredientes = this._getIngredientesView(subpartesArrays["nomes_partes"], subpartesArrays["listas_ingredientes"]);
		const passos = this._getModoPreparoView(subpartesArrays["nomes_partes"], subpartesArrays["listas_modos_de_preparo"]);

		const receitaId = this.props.id.toString();
		const receitaLink = "/receitas/"+receitaId;
		
		return(
			<div className="well">
				<div className="row">
					<Link to={receitaLink} params={this.props}><h3 className="col-sm-6">{this.props.nome_receita} {this.props.id}</h3></Link>
					
					<a href="#" className="col-sm-6 text-center"><span className="badge">{this.props.categoria}</span></a>
				</div>
				<p>{this.props.tempo_de_preparo} minutos </p>
				<div className="row">
					<a href="#" className="col-md-6">Nivel de dificuldade: <span className="badge">{this.props.nivel_de_dificuldade}</span></a>
					<button className="btn btn-danger col-md-6" onClick={this._handleDelete.bind(this)}>Deletar</button>
				</div>
				<div>
					{ingredientes}
				</div>
				<h2>Modo de Preparo</h2>
				<div>
					{passos}
				</div>
			</div>
		)
	}

}

// Objeto que a gnt passa para o Component dizendo o que eh required para ele receber ao ser criado
// Isso eh mais uma forma de validar o Component pra ver se foi criado de maneira certa e assim fica mais facil
// do erro ser reportado no console:

// Failed propType: Required prop `onDelete` was not specified in `ReceitaBox`. Check the render method of `ReceitaList`
ReceitaBox.propTypes = {
	onDelete: React.PropTypes.func.isRequired
};
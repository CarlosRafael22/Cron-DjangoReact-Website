import React from "react"
import ReceitaBox from "./ReceitaBox"
import ReceitaForm from "./ReceitaForm"

export default class ReceitaList extends React.Component{

	//  React assigns props on the constructed instance right after the construction in addition to passing them to constructor.
	// Entao this.props vai ser undefined dentro do constructor pq o React so passa ele dps
	// Pra poder acessar o this.props dentro do constructor tem que fazer:
	// constructor(props){
	// 	super(props);
	// 	console.log(this.props);
	// }

	constructor(props){
		super(props);

		console.log("Props ReceitaList");
		console.log(this.props);
	}

	_getReceitas(){

		return this.props.receitasList.map( (receita) => {
			return (
				<ReceitaBox nome_receita= {receita.nome_receita} categoria= {receita.categoria}
				tempo_de_preparo= {receita.tempo_de_preparo} nivel_de_dificuldade= {receita.nivel_de_dificuldade}
				subpartes= {receita.subpartes}
				key= {receita.id} id= {receita.id} onDelete={this.props.deleteReceita.bind(this)}/>
			);
		});
	}

	render(){

		// Pegando as receitas
		console.log("Render");
		console.log(this.props.receitasList);
		//this._getReceitasFromProps();
		const receitas = this._getReceitas();
		const qtdsReceitas = this.props.receitasList.length;

		return (
			<div>
				<div className="col-md-8 col-md-offset-2">
					<ReceitaForm addReceita={this.props.addReceita.bind(this)} addFoto={this.props.addFoto.bind(this)}/>
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
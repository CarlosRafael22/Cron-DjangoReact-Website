import React from "react"

export default class IngredienteBox extends React.Component{

	// constructor(){
	// 	super();

	// 	this.state = {
	// 		nomeingrediente 
	// 	}
	// }

	_handleDelete(event){
		// Not to reload the page after submitting
		event.preventDefault();

		// Good practice of UI to ask before destructive actions
		// Show confirmation box before deleting
		if(confirm('Tem certeza que quer deletar?')){
			// Call the onDelete passed from the ingredienteList with the ingrediente as argument
			this.props.onDelete(this.props);
		}
	}

	render(){
		return(
			<div className="well">
				<h3>{this.props.nome_ingrediente} {this.props.id}</h3>
				<div clasName="row">
					<a href="#" className="col-sm-6">Quantidade: <span className="badge">{this.props.quantidade}</span></a>
					<button className="btn btn-danger col-sm-6" onClick={this._handleDelete.bind(this)}>Deletar</button>
				</div>
			</div>
		)
	}
}
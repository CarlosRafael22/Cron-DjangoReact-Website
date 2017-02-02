import React from "react"

export default class IngredienteForm extends React.Component{

	_handleSubmit(event){
		// Then the page doesnt reaload when the form is submitted!!
		event.preventDefault();

		// Populated from refs in JSX
		let quantidade = this._quantidade;
		let nome_ingrediente = this._nome_ingrediente;
		console.log(quantidade.value);

		this.props.addIngrediente(quantidade.value, nome_ingrediente.value);
		this._quantidade.value = "";
		this._nome_ingrediente.value = "";
	}

	render(){

		return(

			<form onSubmit={this._handleSubmit.bind(this)}>
				<div className="form-group">
					<label>Adicione novos ingredientes</label>
					<div className="form-group row">
						<label htmlFor="qtd-ingrediente" className="col-form-label col-xs-2">Quantidade:</label>
						<div className="col-xs-10">
							<input id="qtd-ingrediente" type="text" className="form-control" ref={(input) => this._quantidade = input} />
						</div>						
					</div>
					<div className="form-group row">
					  <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Ingrediente:</label>
					  <div className="col-xs-10">
					    <input className="form-control" type="text" id="example-text-input" ref={(input) => this._nome_ingrediente = input} />
					  </div>
					</div>
					<div className="form-group row">
				      <div>
				        <button type="submit" className="btn btn-primary col-md-4 col-md-offset-7">Adicione</button>
				      </div>
				    </div>
				</div>
				
			</form>
		);
	}
}
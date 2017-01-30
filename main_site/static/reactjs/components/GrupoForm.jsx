import React from "react"

export default class GrupoForm extends React.Component{


	_renderCheckBoxesPacientes(){
		return this.props.pacientes_supervisionados.map((paciente, idx) => {
			return (
				<div className="form-check" key={idx}>
				  <label className="form-check-label">
				    <input className="form-check-input" type="checkbox" value=""/>
				    {paciente.username}
				  </label>
				</div>
			);
		});
	}

	render(){

		const pacientes = this._renderCheckBoxesPacientes();

		return (
			<div className="col-md-8 col-md-offset-2">
			<form >
				<div className="form-group">
					<label>Crie um grupo</label>
					<div className="form-group row">
						<label htmlFor="qtd-ingrediente" className="col-form-label col-xs-2">Nome:</label>
						<div className="col-xs-10">
							<input id="qtd-ingrediente" type="text" className="form-control" ref={(input) => this._nome_grupo = input} />
						</div>						
					</div>
					<div className="form-group">
						<label htmlFor="example-text-input" className="col-form-label">Pacientes</label>
						{pacientes}

				      <div>
				        <button type="submit" className="btn btn-primary col-md-4 col-md-offset-7">Adicione</button>
				      </div>
				    </div>
				</div>
				
			</form>
			</div>
		)
	}
}
import React from "react"





export default class GrupoForm extends React.Component{


		componentWillMount(){
		    this.selectedCheckboxes = new Set();
		}

	  _toggleCheckbox(label){
	  	console.log("TOGGLE");
	    if (this.selectedCheckboxes.has(label)) {
	    	console.log("REMOVEU");
	      this.selectedCheckboxes.delete(label);
	    } else {
	    	console.log("ADICIONOU");
	      this.selectedCheckboxes.add(label);
	    }
	  }

	_renderCheckBoxesPacientes(){
		return this.props.pacientes_supervisionados.map((paciente, idx) => {
			return (
				<Checkbox label={paciente.username}
				      handleCheckboxChange={this._toggleCheckbox.bind(this)}
				      key={idx} />
			);
		});
	}

	
	_handleSubmit(event){
		event.preventDefault();

		const pacientesUsernames = [];
		for (const checkbox of this.selectedCheckboxes) {
	      pacientesUsernames.push(checkbox);
	    }

	    const nome_grupo = this._nome_grupo.value;
		this.props.criarGrupo(nome_grupo, pacientesUsernames);
		this._nome_grupo.value = "";
	}

	render(){

		const pacientes = this._renderCheckBoxesPacientes();

		return (
			<div className="col-md-8 col-md-offset-2 well">
			<form onSubmit={this._handleSubmit.bind(this)} >
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


class Checkbox extends React.Component {

	constructor(){
		super();
		this.state = {
		    isChecked: false
		  }
	}
  

  _toggleCheckboxChange(){
    const { handleCheckboxChange, label } = this.props;
    console.log("MUDANDO ESTADO");
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;
    console.log("CHECKBOX");
    console.log(this.props);
    return (
     <div className="form-check">
	  <label className="form-check-label">
	    <input className="form-check-input" 
	    	type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this._toggleCheckboxChange.bind(this)}/>
	    {label}
	  </label>
	</div>
    );
  }
}

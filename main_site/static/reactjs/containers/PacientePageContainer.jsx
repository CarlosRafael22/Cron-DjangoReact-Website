import React from "react"
import {connect} from "react-redux"
import {getPatient} from "../redux/actions/patients"
import PacientePage from "../components/PacientePage"

class PacientePageContainer extends React.Component{

	constructor(props){
		super(props);

		this._getPaciente();
		this.state = {
			"gettingPatient" : true
		}
	}

	componentWillReceiveProps(nextProps) {
	    
	    // MUDOU O PROPS ENTAO EU ATUALIZO TODOS OS PROFILES
	    console.log("MUDOU O PROPS");
	    console.log(this.props.loading);
	   	console.log(nextProps);

	   	// Atualizando nesse ciclo o props.loading para ta bem sincronizado
	   	this.setState({"gettingPatient" : nextProps.loading});
	   	console.log("ATUALIZEI O Loading");
	    console.log(this.props.loading);
	    console.log(nextProps.loading);
    }

	_getPaciente(){

		console.log("VOU PEGAR O PACIENTE ID ", this.props.params.pacienteId);
		this.props.dispatch(getPatient(this.props.params.pacienteId));
	}

	render(){

		console.log("RENDER DO PPCONTAINER");
		console.log(this.state.gettingPatient);
		console.log(this.props.paciente);
		return(
			<div>
				{	this.state.gettingPatient ? 
					<div>Loading ... </div>
					:
					<div>
					<div>PacientePageContainer com id {this.props.params.pacienteId}</div>
					<PacientePage paciente={this.props.paciente} />
					</div>
				}
			</div>
		)
	}
}


function mapStateToProps(state){

	return {
		usuario: state.usuario,
		paciente: state.pacientes.pacienteVisto,
		loading: state.pacientes.loading
	};
}

export default connect(mapStateToProps)(PacientePageContainer)
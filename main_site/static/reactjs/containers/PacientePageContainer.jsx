import React from "react"
import {connect} from "react-redux"
import {getPatient} from "../redux/actions/patients"
import PacientePage from "../components/PacientePage"
import {loadState, saveState} from '../redux/localStorage'

class PacientePageContainer extends React.Component{

	constructor(props){
		super(props);

		this._getPaciente();
		this.state = {
			"gettingPatient" : true
		}
		this.paciente = this.getPacienteFromStore(this.props.params.pacienteId);
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


	//Com o ID da Receita eu pego essa Receita direto do Store ja que eu nao posso passar parametros para o objeto Link que dps acessaria aqui
	getPacienteVistoFromStore(){
		const localState = loadState();
		console.log("PEGUEI DO STORE");
		console.log(localState);
		const paciente = localState.pacientes.pacienteVisto;
		console.log(paciente);
		return paciente;
	}

	//Com o ID da Receita eu pego essa Receita direto do Store ja que eu nao posso passar parametros para o objeto Link que dps acessaria aqui
	getPacienteFromStore(pacienteId){
		const localState = loadState();
		const listaPacientes = localState.pacientes.pacientesList;
		console.log(listaPacientes[0]);
		console.log(listaPacientes[0]['id']);
		for(let i=0;i<listaPacientes.length;i++){
			if(listaPacientes[i]['id'] == pacienteId){
				console.log(listaPacientes[i]);
				return listaPacientes[i];
			}
		}
	}


	render(){

		console.log("RENDER DO PPCONTAINER");
		console.log(this.state.gettingPatient);
		console.log(this.props.paciente);

		let view = (
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
		);

		let localView = (
			<div>
				<div>PacientePageContainer com id {this.props.params.pacienteId}</div>
				<PacientePage paciente={this.paciente} />
			</div>
		);
		console.log("A VIEW");
		console.log(localView);

		return(
			<div>{localView}</div>
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
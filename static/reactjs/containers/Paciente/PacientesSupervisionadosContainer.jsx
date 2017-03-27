import React from "react"
import UsuarioList from "../../components/Usuario/UsuarioList"
import {getCoachPatients} from "../../redux/actions/coachPatients"
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {addCoachPatient, deleteCoachPatient} from "../../redux/actions/coachPatients"

class PacientesSupervisionadosContainer extends React.Component{

	constructor(props){
		super(props);
		console.log("Pacientes no HomeCointaer qd Coach logado");
		console.log(this.props.pacientes);
		this._getPacientes();
	}

	// // Usado para qd ele for logar e ja estiver na view de Usuarios
	// componentWillReceiveProps(nextProps) {
	//     if (this.props.usuario.isAuthenticated !== nextProps.usuario.isAuthenticated) {
	//     	console.log("TO INDO ATUALIZAR O PROPS");

	//     	// Se eu tiver logado e for um coach eu pego os pacientes
	//     	if(nextProps.usuario.isAuthenticated && nextProps.usuario.user.isCoach){
	//     		this.props.dispatch(getCoachPatients(nextProps.usuario.user.coachId));
	//     	}else if(!nextProps.usuario.isAuthenticated){
	//     		// Se tiver deslogando entao eu mostro todos os perfis
	//     		this.props.dispatch(getProfiles());
	//     	}

	    	
	//       	//nextProps.load();
	      	
	//       	//this._getSupervisonedProfilesOfCoach(nextProps.usuario.coachId);
	//     }
 //    }

	_getPacientes(){
		console.log("PEGANDO OS Pacientes Superv");

		// VOU TER QUE CHECAR PRA VER SE ELE JA TA LOGADO E SE TIVER SE ELE EH UM COACH
		// TENHO Q FAZER AQUI TB PARA O CASO DE ELE LOGAR EM OUTRA TELA ASSIM O componentWillReceiveProps NAO VAI RODAR
		// Se eu tiver logado e for um coach eu pego os pacientes
    	if(this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach){
    		this.props.dispatch(getCoachPatients(this.props.usuario.user.coachId));
    	}
		
	}


	_tirarPacienteDosSupervisionados(coachId, paciente){
		//alert("Vou tirar");
		console.log("VOU TIRAR PACIENTE DA LISTA DOS SUPERVISONADOS DE COACH ", coachId);
		this.props.dispatch(deleteCoachPatient(coachId, paciente));
		console.log("VOLTOU DO DISPATCH");
	}

	_addPacienteNosSupervisionados(coachId, paciente){
		//alert("Vou add");
		console.log("VOU COLOCAR PACIENTE DA LISTA DOS SUPERVISONADOS DE COACH ", coachId);
		this.props.dispatch(addCoachPatient(coachId, paciente));
		console.log("VOLTOU DO DISPATCH");
	}


	render(){

		console.log("Vou RENDER O UsuarioList");
		console.log(this.props.pacientes);
		let coachRender = this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach;
		// {coachRender ? coachLoggedView : standardView}
		// Dentro da div
		const buttonText = "Quero nao!";
		console.log("A PORRA DO PROPS COM OS PACIENTES");
		console.log(this.props.pacientes);
		return(
			<div>				
				<UsuarioList profiles={this.props.pacientes} userLogado={this.props.usuario.user}
				tipoUsuario="pacientes"
				addPacienteNosSupervisionados={this._addPacienteNosSupervisionados.bind(this)}
				deletePacienteDosSupervisionados={this._tirarPacienteDosSupervisionados.bind(this)} />
			</div>
						
		)
	}
}


function mapStateToProps(state){
	console.log("StateProps mapeado PacientesSupervisionadosContainer");
  	console.log(state); // state

  	// O state.profiles vai retornar:
  	// {loading: false, profilesList: [array de Objetos]}
  	// Eu tb tenho que ver o state.usuario pra saber quem ta logado e assim se for um coach eu pego os pacientes dele
	return {
		usuario: state.usuario,
		pacientes: state.pacientes_supervisionados.coachPatientsList
	};
}

export default connect(mapStateToProps)(PacientesSupervisionadosContainer)
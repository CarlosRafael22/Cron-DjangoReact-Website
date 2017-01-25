import React from "react"
import UsuarioList from "../components/UsuarioList"
import getProfiles from "../redux/actions/profiles"
import getCoaches from "../redux/actions/coaches"
import getPatients from "../redux/actions/patients"
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {addCoachPatient, deleteCoachPatient} from "../redux/actions/coachPatients"

class UsuarioListContainer extends React.Component{

	constructor(props){
		super(props);
		console.log("Profiles");
		console.log(this.props.profiles);
		console.log("User na sessao");
		console.log(this.props.usuario);
		this._getProfiles();

		this.state = {
			all_profiles: []
		}
	}

	// Usado para qd ele for logar e ja estiver na view de Usuarios
	componentWillReceiveProps(nextProps) {
	    // if (this.props.usuario.isAuthenticated !== nextProps.usuario.isAuthenticated) {
	    // 	console.log("TO INDO ATUALIZAR O PROPS");

	    // 	// Se eu tiver logado e for um coach eu pego os pacientes
	    // 	if(nextProps.usuario.isAuthenticated && nextProps.usuario.user.isCoach){
	    // 		this.props.dispatch(getCoachPatients(nextProps.usuario.user.coachId));
	    // 	}else if(!nextProps.usuario.isAuthenticated){
	    // 		// Se tiver deslogando entao eu mostro todos os perfis
	    // 		this.props.dispatch(getProfiles());
	    // 	}

	    // MUDOU O PROPS ENTAO EU ATUALIZO TODOS OS PROFILES
	    console.log("MUDOU O PROPS");
	    // Vou ter que pegar o proximo estado do Redux e ja passar para que ele possa atualizar o state
	    this._atualizandoStateComNextProps(nextProps);
	    	
	      	//nextProps.load();
	      	
	      	//this._getSupervisonedProfilesOfCoach(nextProps.usuario.coachId);
    }

	_getProfiles(){
		console.log("PEGANDO OS PERFIS");
		this.props.dispatch(getProfiles());

		console.log("PEGANDO OS PACIENTES");
		this.props.dispatch(getPatients());

		console.log("PEGANDO OS COACHES");
		this.props.dispatch(getCoaches());

		// // VOU TER QUE CHECAR PRA VER SE ELE JA TA LOGADO E SE TIVER SE ELE EH UM COACH
		// // TENHO Q FAZER AQUI TB PARA O CASO DE ELE LOGAR EM OUTRA TELA ASSIM O componentWillReceiveProps NAO VAI RODAR
		// // Se eu tiver logado e for um coach eu pego os pacientes
  //   	if(this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach){
  //   		this.props.dispatch(getCoachPatients(this.props.usuario.user.coachId));
  //   	}else if( (!this.props.usuario.isAuthenticated) || (!this.props.usuario.user.isCoach) ){
  //   		// Se tiver deslogando entao eu mostro todos os perfis
  //   		this.props.dispatch(getProfiles());
  //   	}
		
	}

	componentDidMount(){

		this._atualizandoStateComProfiles();

	}

	_atualizandoStateComProfiles(){
		// JUNTANDO TODOS OS TIPOS DE USER PARA MANDAR PARA O USUARIOLIST
		console.log(this.props.pacientes);
		const all_profiles = this.props.pacientes.concat(this.props.coaches);
		console.log("ATUALIZANDO TODO O STATE COM OS PERFIS");
		this.setState({all_profiles:all_profiles});
	}

	_atualizandoStateComNextProps(nextProps){
		// JUNTANDO TODOS OS TIPOS DE USER PARA MANDAR PARA O USUARIOLIST
		console.log(this.props.pacientes);
		console.log("Proximo estado");
		console.log(nextProps.pacientes);
		const all_profiles = nextProps.pacientes.concat(this.props.coaches);
		console.log("ATUALIZANDO TODO O STATE COM OS PERFIS");
		this.setState({all_profiles:all_profiles});
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

	// Vou ver se ta logado, se tiver eu faco uma requisicao pegando so os perfis supervisionados e mando como props
	// Metodo so vai ser chamado se o user logado for um coach!
	// _getSupervisonedProfilesOfCoach(coachId){
	// 	console.log("MANDANDO REQUST PEGAR PACIENTES");
	// 	this.props.dispatch(getCoachPatients(coachId));
	// 	//return 
	// }


	render(){

		console.log("Vou RENDER O UsuarioList");
		console.log(this.props.pacientes);
		console.log(this.state.all_profiles);

		// Quando mudar o props ele vai vir Render de novo, porem todos os profiles estao em this.state.all_profiles
		// e como nao atualizei o state ele vai pegar e mostrar os botoes de forma desatualizada
		// Aqui eu tenho que atualizar o state tb
		//this._atualizandoStateComProfiles();
		console.log("ATUALIZEI O STATE");

		let coachRender = this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach;
		// {coachRender ? coachLoggedView : standardView}
		// Dentro da div

		// Passo o usuario logado pq ai qd for fazer o UsuarioInfoBox, cada caixa vai ver se quem ta logado eh um coach e se eh o coach do Paciente 
		// que ela representa. Assim o botao vai ser renderizado de acordo.
		return(
			<div>
				{ this.props.usuario.user != null ? 
				<UsuarioList profiles={this.state.all_profiles} userLogado={this.props.usuario.user} addPacienteNosSupervisionados={this._addPacienteNosSupervisionados.bind(this)}
				deletePacienteDosSupervisionados={this._tirarPacienteDosSupervisionados.bind(this)} />
				:
				<UsuarioList profiles={this.state.all_profiles} />
				}
			</div>
						
		)
	}
}


function mapStateToProps(state){
	console.log("StateProps mapeado UsuarioList");
  	console.log(state); // state

  	// O state.profiles vai retornar:
  	// {loading: false, profilesList: [array de Objetos]}
  	// Eu tb tenho que ver o state.usuario pra saber quem ta logado e assim se for um coach eu pego os pacientes dele
	return {
		usuario: state.usuario,
		profiles: state.profiles.profilesList,
		coaches: state.coaches.coachesList,
		pacientes: state.pacientes.pacientesList
	};
}

export default connect(mapStateToProps)(UsuarioListContainer)
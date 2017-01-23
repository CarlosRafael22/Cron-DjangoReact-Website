import React from "react"
import UsuarioList from "../components/UsuarioList"
import {getProfiles, getCoachPatients} from "../redux/action"
import { connect } from 'react-redux'

class UsuarioListContainer extends React.Component{

	constructor(props){
		super(props);
		console.log("Profiles");
		console.log(this.props.profiles);
		console.log("User na sessao");
		console.log(this.props.usuario);
		this._getProfiles();
	}

	componentWillReceiveProps(nextProps) {
	    if (this.props.usuario.isAuthenticated !== nextProps.usuario.isAuthenticated) {
	    	console.log("TO INDO ATUALIZAR O PROPS");

	    	// Se eu tiver logado e for um coach eu pego os pacientes
	    	if(nextProps.usuario.isAuthenticated && nextProps.usuario.user.isCoach){
	    		this.props.dispatch(getCoachPatients(nextProps.usuario.user.coachId));
	    	}else if(!nextProps.usuario.isAuthenticated){
	    		// Se tiver deslogando entao eu mostro todos os perfis
	    		this.props.dispatch(getProfiles());
	    	}

	    	
	      	//nextProps.load();
	      	
	      	//this._getSupervisonedProfilesOfCoach(nextProps.usuario.coachId);
	    }
    }

	_getProfiles(){
		console.log("PEGANDO OS PERFIS");

		// VOU TER QUE CHECAR PRA VER SE ELE JA TA LOGADO E SE TIVER SE ELE EH UM COACH
		// TENHO Q FAZER AQUI TB PARA O CASO DE ELE LOGAR EM OUTRA TELA ASSIM O componentWillReceiveProps NAO VAI RODAR
		// Se eu tiver logado e for um coach eu pego os pacientes
    	if(this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach){
    		this.props.dispatch(getCoachPatients(this.props.usuario.user.coachId));
    	}else if( (!this.props.usuario.isAuthenticated) || (!this.props.usuario.user.isCoach) ){
    		// Se tiver deslogando entao eu mostro todos os perfis
    		this.props.dispatch(getProfiles());
    	}
		
	}

	// Vou ver se ta logado, se tiver eu faco uma requisicao pegando so os perfis supervisionados e mando como props
	// Metodo so vai ser chamado se o user logado for um coach!
	_getSupervisonedProfilesOfCoach(coachId){
		console.log("MANDANDO REQUST PEGAR PACIENTES");
		this.props.dispatch(getCoachPatients(coachId));
		//return 
	}

	_renderUsuarioList(){
		if(this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach){
			this._getSupervisonedProfilesOfCoach.bind(this);
		}

		return (
			<UsuarioList profiles={this.props.profiles} />
		)
	}

	render(){

		console.log("Vou RENDER O UsuarioList");
		console.log(this.props.profiles);
		return(
			<UsuarioList profiles={this.props.profiles} />
		
			
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
		profiles: state.profiles.profilesList
	};
}

export default connect(mapStateToProps)(UsuarioListContainer)
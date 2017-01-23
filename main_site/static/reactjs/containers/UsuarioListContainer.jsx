import React from "react"
import UsuarioList from "../components/UsuarioList"
import {getProfiles} from "../redux/action"
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

	_getProfiles(){
		console.log("PEGANDO OS PERFIS");
		this.props.dispatch(getProfiles());
	}

	// Vou ver se ta logado, se tiver eu faco uma requisicao pegando so os perfis supervisionados e mando como props
	// Metodo so vai ser chamado se o user logado for um coach!
	_getSupervisonedProfilesOfCoach(){

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
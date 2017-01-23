import React from "react"
import UsuarioList from "../components/UsuarioList"
import {getProfiles} from "../redux/action"
import { connect } from 'react-redux'

class UsuarioListContainer extends React.Component{

	constructor(props){
		super(props);
		console.log("Profiles");
		console.log(this.props.profiles);
		this._getProfiles();
	}

	_getProfiles(){
		console.log("PEGANDO OS PERFIS");
		this.props.dispatch(getProfiles());
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
	return {
		profiles: state.profiles.profilesList
	};
}

export default connect(mapStateToProps)(UsuarioListContainer)
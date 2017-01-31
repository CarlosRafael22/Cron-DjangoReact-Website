import React from "react"
import {connect} from "react-redux"
import GrupoListContainer from "./GrupoListContainer"
import GrupoForm from "../components/GrupoForm"
import {addGrupo} from "../redux/actions/grupos"
import {createGrupo} from "../util/firebaseGruposHandler"

class GrupoContainer extends React.Component{

	_criarGrupo(nome_grupo, pacientesUsernames){
		//alert(nome_grupo);
		console.log("MANDEI CRIAR NO GRUPOCONTAINER");
		this.props.dispatch(addGrupo(nome_grupo, this.props.usuario.user.username, pacientesUsernames, createGrupo.bind(this) ) );
	}

	render(){

		console.log("GRUPO PROPS");
		console.log(this.props);
		return (
			<div>
				<GrupoForm pacientes_supervisionados={this.props.pacientes} criarGrupo={this._criarGrupo.bind(this)} />
				<GrupoListContainer />
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log("MAPEOU PRA GRUPOS");
	console.log(state);
	return {
		grupos: state.grupos,
		pacientes: state.pacientes_supervisionados.coachPatientsList,
		usuario: state.usuario
	}
}

export default connect(mapStateToProps)(GrupoContainer)
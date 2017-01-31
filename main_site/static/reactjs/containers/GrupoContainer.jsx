import React from "react"
import {connect} from "react-redux"
import GrupoListContainer from "./GrupoListContainer"
import GrupoForm from "../components/GrupoForm"

class GrupoContainer extends React.Component{

	_criarGrupo(nome_grupo, pacientesUsernames){
		alert(nome_grupo);
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
		pacientes: state.pacientes_supervisionados.coachPatientsList
	}
}

export default connect(mapStateToProps)(GrupoContainer)
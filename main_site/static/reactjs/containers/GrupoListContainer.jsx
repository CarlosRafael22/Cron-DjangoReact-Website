import React from "react"
import {connect} from "react-redux"
import GrupoList from "../components/GrupoList"

class GrupoListContainer extends React.Component{

	render(){
		const grupos = [1,2,3,4,5];
		console.log("RENDER DO GL CONTAINER");
		console.log(this.props.grupos.coachGrupos);
		return (
			<div className="col-md-12">
				<GrupoList grupos={this.props.grupos.coachGrupos} coachUsername={this.props.usuario.user.username} />
			</div>
		)
	}
}


function mapStateToProps(state){
	console.log("MAPEOU PRA GRUPOS LIST");
	console.log(state);
	return {
		grupos: state.grupos,
		usuario: state.usuario
	}
}

export default connect(mapStateToProps)(GrupoListContainer)
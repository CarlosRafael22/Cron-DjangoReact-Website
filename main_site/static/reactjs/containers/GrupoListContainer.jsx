import React from "react"
import {connect} from "react-redux"
import GrupoList from "../components/GrupoList"

class GrupoListContainer extends React.Component{

	// _renderGrupoList(){
	// 	const grupos = [1,2,3,4,5];
	// 	return grupos.map((grupo) => {
	// 		return (

	// 		)
	// 	})
	// }

	render(){
		const grupos = [1,2,3,4,5];
		return (
			<div className="col-md-12">
				<GrupoList grupos={grupos}/>
			</div>
		)
	}
}


function mapStateToProps(state){
	console.log("MAPEOU PRA GRUPOS LIST");
	console.log(state);
	return {
		grupos: state.grupos
	}
}

export default connect(mapStateToProps)(GrupoListContainer)
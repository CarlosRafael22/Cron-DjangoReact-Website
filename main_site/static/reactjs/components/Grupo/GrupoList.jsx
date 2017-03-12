import React from "react"
import GrupoBox from "./GrupoBox"

export default class GrupoList extends React.Component{

	_getGrupos(){
		return this.props.grupos.map((grupo, idx) => {
			return (
				<GrupoBox grupo={grupo} coachUsername={this.props.coachUsername} key={idx}/>
			);
		});
	}


	render(){

		const grupos = this._getGrupos();
		console.log("RENDER DO GroupList");
		console.log(this.props.grupos);

		return (
			<div>
				{grupos}
			</div>
		)
	}
}

GrupoList.propTypes = {
	coachUsername: React.PropTypes.string.isRequired,
	grupos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
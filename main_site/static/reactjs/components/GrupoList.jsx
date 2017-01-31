import React from "react"
import GrupoBox from "./GrupoBox"

export default class GrupoList extends React.Component{

	_getGrupos(){
		return this.props.grupos.map((grupo, idx) => {
			const pac = ["Joana", "Banana", "Alana"];
			return (
				<GrupoBox grupo={grupo} pacientes={pac} key={idx}/>
			);
		});
	}


	render(){

		const grupos = this._getGrupos();

		return (
			<div>
				{grupos}
			</div>
		)
	}
}
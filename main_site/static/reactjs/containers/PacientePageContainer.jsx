import React from "react"

export default class PacientePageContainer extends React.Component{

	render(){

		return(
			<div>PacientePageContainer com id {this.props.params.pacienteId}</div>
		)
	}
}
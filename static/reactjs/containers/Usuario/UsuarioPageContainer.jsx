import React from "react"

export default class UsuarioPageContainer extends React.Component{

	render(){

		return(
			<div>UsuarioPageContainer com id {this.props.params.userId}</div>
		)
	}
}
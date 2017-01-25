import React from "react"

export default class UsuarioInfoBox extends React.Component{

	// constructor(props){
	// 	super(props);
	// }

	_handleDelete(event){
		event.preventDefault();
		alert("Clicou");
	}

	render(){

		const buttonText = (this.props.profile.coaches != null ? this.props.profile.coaches[0] : "Supervisionar");
		return (
			<div className="well well-sm col-md-6" key={this.props.profile.id}>
				<h3>{this.props.profile.username} <span className="badge">{this.props.profile.id}</span></h3>
				<h4>{this.props.profile.email}</h4>
				<h4>{this.props.profile.paciente? "Paciente" : "Coach"} <button className="btn btn-danger" onClick={this._handleDelete.bind(this)}>{buttonText}</button></h4>
			</div>
		)
	}
}
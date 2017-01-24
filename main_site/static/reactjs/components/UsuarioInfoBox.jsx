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

		return (
			<div className="well well-sm col-md-6" key={this.props.profile.id}>
				<h3>{this.props.profile.username} <span className="badge">{this.props.profile.id}</span></h3>
				<h4>{this.props.profile.email}</h4>
				<h4>{this.props.profile.paciente? "Paciente" : "Coach"} <button className="btn btn-danger" onClick={this._handleDelete.bind(this)}>Supervisionar</button></h4>
			</div>
		)
	}
}
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
			<div className="well well-sm col-md-6">
				<div className="row">
					<h3 className="col-md-4">{this.props.profile.username}</h3>
					<h6 className="col-md-8">
						<span className="label label-primary">ID</span><span className="badge">{this.props.profile.id}</span>
						<span className="label label-primary">userID</span><span className="badge">{this.props.profile.userId}</span>
					</h6>
				</div>
				
				<h4>{this.props.profile.email}</h4>
				<h4>{this.props.profile.paciente? "Paciente" : "Coach"} <button className="btn btn-danger" onClick={this._handleDelete.bind(this)}>{buttonText}</button></h4>
			</div>
		)
	}
}
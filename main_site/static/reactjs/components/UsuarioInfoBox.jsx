import React from "react"
import { Link } from 'react-router'

export default class UsuarioInfoBox extends React.Component{

	// constructor(props){
	// 	super(props);
	// }

	_handleClick(event){
		event.preventDefault();
		alert("Clicou");


	}

	_tirarPacienteDosSupervisionados(){
		//alert("Vou tirar");
		console.log("InfoBox para mandar o DELETE")
		this.props.deletePacienteDosSupervisionados(this.props.userLogado.coachId, this.props.profile.id);
	}

	_addPacienteNosSupervisionados(){
		//alert("Vou add");
		console.log("InfoBox para mandar o ADD");
		this.props.addPacienteNosSupervisionados(this.props.userLogado.coachId, this.props.profile.id);
	}

	render(){

		let buttonLine;
		//const buttonText = (this.props.profile.coaches != null ? this.props.profile.coaches[0] : "Supervisionar");
		// O texto do botao varia:
		// Se quem estiver logado for o coach do Paciente entao -> "Parar de supervisionar"
		// Se o coach logado nao for o do Paciente -> "Supervisionar"
		// Se for um paciente -> Nao tem botao
		if(this.props.userLogado != null){

			// Tem alguem logado entao vou ver se eh coach ou paciente
			if(this.props.userLogado.isCoach){

				// Se o o tipo de usuario que o Box esta relacionado for um Coach entao nao mostra botao
				if(!this.props.profile.paciente){
					buttonLine = (
						<h4>{this.props.profile.paciente? "Paciente" : "Coach"}</h4>
					)
				}
				// Vou ver se o coach logado eh o coach que supervisiona esse paciente
				// The indexOf() method searches the array for the specified item, and returns its position.
				// Returns -1 if the item is not found.
				else if( (this.props.profile.coaches != null) && (this.props.profile.coaches.indexOf(this.props.userLogado.username) >= 0) ){
					buttonLine = (
						<h4>{this.props.profile.paciente? "Paciente" : "Coach"} <button className="btn btn-danger" onClick={this._tirarPacienteDosSupervisionados.bind(this)}>Nao supervisionar</button></h4>
					)
				}else{
					buttonLine = (
						<h4>{this.props.profile.paciente? "Paciente" : "Coach"} <button className="btn btn-primary" onClick={this._addPacienteNosSupervisionados.bind(this)}>Supervisionar</button></h4>
					)
				}

			}else{
				// Eh paciente entao nao vai ter botao
				buttonLine = (
						<h4>{this.props.profile.paciente? "Paciente" : "Coach"}</h4>
					)
			}
		}else{
			// Quando nao tiver logado ele so mostra a info se eh coach ou paciente
			buttonLine = (
						<h4>{this.props.profile.paciente? "Paciente" : "Coach"}</h4>
					)
		}

		// Vai ver qual eh o tipo de usuario que esta mostrando para gerar o link certo
		const tipoUsuarioId = this.props.profile.id.toString();

		const link = "/"+this.props.tipoUsuario+"/"+tipoUsuarioId;

		return (
			<div className="well well-sm col-md-6">
				<div className="row">
					<Link to={link}><h3 className="col-sm-4">{this.props.profile.username}</h3></Link>
					<h6 className="col-md-8">
						<span className="label label-primary">ID</span><span className="badge">{this.props.profile.id}</span>
						<span className="label label-primary">userID</span><span className="badge">{this.props.profile.userId}</span>
					</h6>
				</div>
				
				<h4>{this.props.profile.email}</h4>
				{buttonLine}
			</div>
		)
	}
}
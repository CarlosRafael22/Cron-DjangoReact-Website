import React from "react"
import {Link} from "react-router"

export default class GrupoBox extends React.Component{

	_renderPacientesNoGrupo(){
		console.log(this.props.grupo);
		//return this.props.grupo.usernamesPacientes.map((paciente, idx) => {
		return this.props.grupo.pacientesInfo.map((paciente, idx) => {
			return (
				<Link to={"pacientes/"+paciente.id}>
				<span className="mdl-chip mdl-chip--contact" key={idx}>
				    <span className="mdl-chip__contact mdl-color--teal mdl-color-text--white">{paciente.id}</span>
				    <span className="mdl-chip__text">{paciente.username}</span>
				</span>
				</Link>
			);
		});
	}

	render(){
		console.log("RENDER DO GrupoBox");
		console.log(this.props.grupo);

		const pacientes = this._renderPacientesNoGrupo();

		//const link = "grupos/"+this.props.coachUsername+"/"+this.props.grupo.nome_grupo.replace(/\s/g, '');
		const link = "grupos/"+this.props.coachUsername+"/"+this.props.grupo.grupo_id.toString();

		return(

			<div className="well">
				<div className="row">
					<Link to={link}><h3 className="col-sm-6">{this.props.grupo.nome_grupo}</h3></Link>
				</div>
				<h4>Pacientes no grupo</h4>
				<div>
					{pacientes}
				</div>
			</div>
		)
	}
}
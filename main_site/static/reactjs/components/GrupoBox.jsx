import React from "react"
import {Link} from "react-router"

export default class GrupoBox extends React.Component{

	_renderPacientesNoGrupo(){
		return this.props.pacientes.map((paciente, idx) => {
			return (
				<span className="mdl-chip mdl-chip--contact" key={idx}>
				    <span className="mdl-chip__contact mdl-color--teal mdl-color-text--white">A</span>
				    <span className="mdl-chip__text">Contact Chip</span>
				</span>
			);
		});
	}

	render(){

		const pacientes = this._renderPacientesNoGrupo();

		return(

			<div className="well">
				<div className="row">
					<Link to="chats/"><h3 className="col-sm-6">Nome do grupo</h3></Link>
				</div>
				<h4>Pacientes no grupo</h4>
				<div>
					{pacientes}
				</div>
			</div>
		)
	}
}
import React from "react"
import {Link} from "react-router"
import moment from 'moment'

export default class GrupoBox extends React.Component{

	_renderPacientesNoGrupo(){
		console.log(this.props.grupo);
		//return this.props.grupo.usernamesPacientes.map((paciente, idx) => {
		return this.props.grupo.pacientes.map((paciente, idx) => {
			console.log(paciente.foto_perfil);
			console.log(paciente);
			return (
				<Link to={"pacientes/"+paciente.id} >
				{/*<span className="mdl-chip mdl-chip--contact" key={idx}>
								    <span className="mdl-chip__contact mdl-color--teal mdl-color-text--white">
								    <div className="avatar">
									<img src={paciente.foto_perfil} className="img-avatar"/>
									</div>
								    </span>
								</span>*/}
				<div className="avatar">
					<img src={paciente.foto_perfil} className="img-avatar"/>
				</div>				
				</Link>
			);
		});
	}


	_renderEstagioGrupo(){
		const grupo_data_inicio = this.props.grupo.data_inicio;

		const data_inicio = moment(grupo_data_inicio);

		const estagio = moment().diff(data_inicio, 'days');

		return estagio;
	}

	render(){
		console.log("RENDER DO GrupoBox");
		console.log(this.props.grupo);

		const pacientes = this._renderPacientesNoGrupo();

		//const link = "grupos/"+this.props.coachUsername+"/"+this.props.grupo.nome_grupo.replace(/\s/g, '');
		const link = "grupos/"+this.props.coachUsername+"/"+this.props.grupo.grupo_id.toString();

		const estagio = this._renderEstagioGrupo();

		return(

			<div className="well col-md-5 mr-1">
				<div className="row">
					<Link to={link} className="col-sm-10"><h3 >{this.props.grupo.nome_grupo}</h3></Link>
				</div>
				<h4>Pacientes no grupo</h4>
				<div>
					{pacientes}
				</div>
				<h4 className="mt-1 float-right">
					<span className="label label-info">{estagio} dias</span>
				</h4>
			</div>
		)
	}
}
import React from "react"
import UsuarioInfoBox from "./UsuarioInfoBox"

export default class UsuarioList extends React.Component{

	constructor(props){
		super(props);

		console.log("Props do UsuarioList");
		console.log(this.props.profiles);
	}
	_getProfiles(){
		return this.props.profiles.map((profile) => {

			// Vendo se ele recebeu com os botoes de add ou delete ou nao
			// FAZENDO O IN-LINE CHECK PARA VER SE ELE RECEBEU AS FUNCOES COMO PROPS OU NAO
			return (
				<UsuarioInfoBox profile={profile} key={profile.userId} userLogado={this.props.userLogado}
				addPacienteNosSupervisionados={this.props.addPacienteNosSupervisionados != null ? this.props.addPacienteNosSupervisionados.bind(this) : null} 
				deletePacienteDosSupervisionados={this.props.deletePacienteDosSupervisionados != null ? this.props.deletePacienteDosSupervisionados.bind(this) : null} />
			)
		});
	}

	render(){

		const profiles = this._getProfiles();

		return(
			
			<div>
				{profiles}
			</div>
		)
	}
}
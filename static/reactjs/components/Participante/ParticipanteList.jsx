import React from "react"
import ParticipanteBox from "./ParticipanteBox"

export default class ParticipanteList extends React.Component{


	_renderParticipanteBoxList(){
		return this.props.participantes.map((paciente) => {
			return (
				<ParticipanteBox participante={paciente} />
			)
		})
	}

	render(){

		const participantes = this._renderParticipanteBoxList();

		return(
			<div>
				{participantes}
			</div>
		)
	}
}
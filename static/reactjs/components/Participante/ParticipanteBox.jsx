import React from "react"
import {Link} from "react-router"

export default class ParticipanteBox extends React.Component{

	_renderParticipanteBox(){

	}

	render(){

		return(
			<Link to={"pacientes/"+this.props.participante.id}>
			<div className="well col-sm-2 mr-1 ml-1 text-center">
				<div className="avatar">
					<img src={this.props.participante.foto_perfil} className="img-avatar"/>
				</div>	
				<h4>{this.props.participante.username}</h4>

				{/*<div className="media">
								  <div className="media-left">
								    <img src={this.props.participante.foto_perfil} className="media-object" style="width:60px"/>
								  </div>
								  <div className="media-body">
								    <h4 className="media-heading">{this.props.participante.username}</h4>
								  </div>
								</div>*/}
			</div>
			</Link>
		)
	}
}
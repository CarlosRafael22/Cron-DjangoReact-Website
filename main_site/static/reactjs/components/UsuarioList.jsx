import React from "react"

export default class UsuarioList extends React.Component{

	constructor(props){
		super(props);

		console.log("Props do UsuarioList");
		console.log(this.props.profiles);
	}
	_getProfiles(){
		return this.props.profiles.map((profile) => {
			return (
				<div className="well well-sm">
					<h3>{profile.username}</h3>
					<h4>{profile.id}</h4>
					<h4>{profile.paciente? "Paciente" : "Coach"}</h4>
				</div>
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
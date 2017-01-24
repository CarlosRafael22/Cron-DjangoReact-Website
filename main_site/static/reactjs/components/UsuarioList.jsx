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
			return (
				<UsuarioInfoBox profile={profile} key={profile.id} />
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
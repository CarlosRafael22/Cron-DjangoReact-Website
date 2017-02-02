import React from "react"
import GrupoBox from "./GrupoBox"
import {loadState, saveState} from '../../redux/localStorage'
import ChatMDL from "../Chat/ChatMDL"

export default class GrupoPage extends React.Component{

	constructor(props){
		super(props);
		console.log("GRUPO PAGE");
		this.grupo = this._getGrupoFromStore(this.props.params.grupo_id);

		this.chatID = "C"+this.props.params.coachUsername+"G"+this.props.params.grupo_id.toString();
	}

	_getGrupoFromStore(grupo_id){
		const localState = loadState();
		const listaGrupos = localState.grupos.coachGrupos;
		console.log(listaGrupos[0]);
		console.log(listaGrupos[0]['grupo_id']);
		for(let i=0;i<listaGrupos.length;i++){
			if(listaGrupos[i]['grupo_id'] == grupo_id){
				console.log(listaGrupos[i]);
				return listaGrupos[i];
			}
		}
	}

	render(){

		console.log("RENDER GRUPO PAGE");
		console.log(this.grupo);


		return (
			<div>
			<GrupoBox grupo={this.grupo} coachUsername={this.props.params.coachUsername} />
			<ChatMDL chatID = {this.chatID} />
			</div>
		)
	}
}
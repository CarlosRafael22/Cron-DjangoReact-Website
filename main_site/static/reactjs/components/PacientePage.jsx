import React from "react"
import {loadState, saveState} from '../redux/localStorage'
import {deleteReceita} from '../redux/action'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

import FriendlyChat from "../util/FirebaseChat"
import ChatBox from "./ChatBox"
import ChatContainer from "../containers/ChatContainer"

import MDLite from "material-design-lite/material"
//import componentHandler from "exports?componentHandler&MaterialRipple!material-design-lite/material.js"
import componentHandler from "exports?componentHandler!material-design-lite/material.js"
import {Button} from "react-mdl"

import ChatMDL from "./ChatMDL"
import ChatMDLContainer from "../containers/ChatMDLContainer"

import {createChat, checkChatExists} from "../util/firebaseChatHandler"

export default class PacientePage extends React.Component{

	constructor(){
		super();

		this._criarChatPaciente = this._criarChatPaciente.bind(this);
		//this.componentHandler = MDLite.componentHandler;
		//this.componentHandler = require('exports?componentHandler!material-design-lite/material');
		this.state = {
			chatCriado: false,
			chatExists: false
		};
	}


	componentDidMount(){
		console.log("Vendo se ja tem chat criado");
		const chatExists = checkChatExists(this.props.usuario.user.coachId, this.props.paciente.id);
		console.log(chatExists);
		this.setState({chatExists: true});
	}

	// componentDidUpdate(){
	// 	console.log("UPGRADING DOM");
	// 	componentHandler.upgradeAllRegistered();
	// }

	_criarChatPaciente(){
		console.log("VOU CRIAR O CHAT");
		this.chatID = createChat(this.props.usuario.user.coachId, this.props.paciente.id);
		console.log(this.chatID);
		this.setState({chatCriado: true, chatExists: true});

	}

	render(){
		console.log("CHAT PACIENTE");
		console.log(this.props);
		return (
			<div>
				<div className="well well-sm">
					<div className="row">
						<h3 className="col-sm-4">{this.props.paciente.username}</h3>
						<h6 className="col-md-8">
							<span className="label label-primary">ID</span><span className="badge">{this.props.paciente.id}</span>
							<span className="label label-primary">userID</span><span className="badge">{this.props.paciente.userId}</span>
							{	this.props.usuario.user.isCoach ?
								<Button raised ripple onClick={this._criarChatPaciente}>Criar conversa</Button>
								: null
							}
						</h6>
					</div>
					
					<h4>{this.props.paciente.email}</h4>
				</div>

				{	this.state.chatExists ? 			
					<div className="row">
						<div className="col-md-6">
							<ChatMDL chatID = {this.chatID} />
						</div>
					</div>
				: null
				}
				
			</div>
			
		)
	}
}

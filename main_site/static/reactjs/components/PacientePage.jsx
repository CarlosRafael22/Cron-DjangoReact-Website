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

export default class PacientePage extends React.Component{

	constructor(){
		super();

		//this.componentHandler = MDLite.componentHandler;
		//this.componentHandler = require('exports?componentHandler!material-design-lite/material');
	}


	componentDidMount(){
		this.FriendlyChat = new FriendlyChat();
		//this.Chat.getElements();
		
		// TENTANDO CRIAR OS ELEMENTOS DINAMICAMENTE
		// this._loadLabel();
		// this._loadElements();

		console.log("Atributos");
		console.log(this.FriendlyChat.userPic);
	}

	// componentDidUpdate(){
	// 	console.log("UPGRADING DOM");
	// 	componentHandler.upgradeAllRegistered();
	// }

	render(){
		console.log("CHAT PACIENTE");
		console.log(componentHandler);
		return (
			<div>
				<div className="well well-sm">
					<div className="row">
						<h3 className="col-sm-4">{this.props.paciente.username}</h3>
						<h6 className="col-md-8">
							<span className="label label-primary">ID</span><span className="badge">{this.props.paciente.id}</span>
							<span className="label label-primary">userID</span><span className="badge">{this.props.paciente.userId}</span>
						</h6>
					</div>
					
					<h4>{this.props.paciente.email}</h4>
				</div>
				<div className="row">
					<div className="col-md-6">
						<ChatContainer />
					</div>
				</div>
				
			</div>
			
		)
	}
}

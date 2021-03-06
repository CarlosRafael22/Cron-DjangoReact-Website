import React from "react"
import {loadState, saveState} from '../../redux/localStorage'
import {deleteReceita} from '../../redux/action'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

import FriendlyChat from "../../util/FirebaseChat"
import ChatBox from "../Chat/ChatBox"
import ChatContainer from "../../containers/Chat/ChatContainer"

//import componentHandler from "exports?componentHandler&MaterialRipple!material-design-lite/material.js"
import componentHandler from "exports?componentHandler!material-design-lite/material.js"
import {Button} from "react-mdl"

import ChatMDL from "../Chat/ChatMDL"
import ChatMDLContainer from "../../containers/Chat/ChatMDLContainer"

import {createChat} from "../../util/firebaseChatHandler"

import {checkChatExists, addChat} from "../../redux/actions/chats"

export default class PacientePage extends React.Component{

	constructor(props){
		super(props);
		console.log("PP CONSTRUCTOR");
		this._criarChatPaciente = this._criarChatPaciente.bind(this);
		//this.componentHandler = MDLite.componentHandler;
		//this.componentHandler = require('exports?componentHandler!material-design-lite/material');
		console.log(this.props.chatExiste);
		this.state = {
			chatExiste: this.props.chatExiste,
			specialRender: false
		};

					
	}


	//Com o ID da Receita eu pego essa Receita direto do Store ja que eu nao posso passar parametros para o objeto Link que dps acessaria aqui
	_getChatFromStore(chatNameID){
		const localState = loadState();
		const listaChats = localState.chats.chats;
		console.log(listaChats[0]);
		console.log(listaChats[0]['chatNameID']);
		for(let i=0;i<listaChats.length;i++){
			if(listaChats[i]['chatNameID'] == chatNameID){
				console.log(listaChats[i]);
				return listaChats[i];
			}
		}
	}

	// componentDidMount(){

	// 	// Checar pra ver se usuario ta logado e se eh coach
	// 	// So se cumprir essas duas condicoes eh que eu boto o botao de CriarChat e o ChatMDL
	// 	//const CoachRender = this.props.usuario != null && this.props.usuario.user.isCoach;
	// 	let CoachRender = false;
	// 	if(this.props.usuario.user != null){
	// 		if(this.props.usuario.user.isCoach){
	// 			CoachRender = true;
	// 		}
	// 	}
	// 	console.log("COACH RENDER NO MOUNT");
	// 	console.log(CoachRender);
	// 	if(CoachRender){
	// 		this.setState({specialRender:true});
	// 		this.chatID = "c"+this.props.usuario.user.coachId.toString()+"p"+this.props.paciente.id.toString();
	// 	}

	// 	// Se for logado e coach entao a gnt tenta pegar o chat, senao nao faz nada
	// 	console.log("DIDMOUNT RENDER");
	// 	console.log(this.state.specialRender);
	// 	if(CoachRender){
	// 		console.log("Vendo se ja tem chat criado");
	// 		// Pegando o chat do state
	// 		console.log(this.chatID);
	// 		const chat = this._getChatFromStore(this.chatID);
	// 		console.log(chat);

	// 		// Se tiver o chat com essa ID a gnt mostra o ChatMDL
	// 		if(chat != null){
	// 			this.setState({chatExists: true});
	// 		}
	// 	}
		
	// }

	_criarChatPaciente(){
		console.log("VOU CRIAR O CHAT");
		

		// createChat(this.props.usuario.user.coachId, this.props.paciente.id, this.props.usuario.user.username, this.props.paciente.username);
		// this.props.dispatch(addChat(this.chatID, this.props.usuario.user.username));

		// console.log("ATUALIZEI O PROPS DE CHAT");
		// console.log(this.props.chats);
		this.props.criarChat();

		this.setState({chatExiste: true});

	}

	componentWillReceiveProps(nextProps){
		console.log("PAC PAGE RECEIVE PROPS");
		console.log(nextProps.chatExiste);

		
		this.setState({chatExiste: nextProps.chatExiste});
		//this.setState({chatExiste:this.props.chatExiste});
		console.log(this.state.chatExiste);

		console.log("PEGOU CHAT ID");
		// Se tiver alguem logado e for coach a gnt get a ID do chat
		if(this.props.usuario.user != null ){
			if(this.props.usuario.user.isCoach)
				this.chatID = "c"+this.props.usuario.user.coachId.toString()+"p"+this.props.paciente.id.toString();
		}
		
	}

	render(){
		console.log("CHAT PACIENTE");
		console.log(this.props);

		//this.setState({chatExiste:this.props.chatExiste});
		console.log(this.state.chatExiste);

		//const ButtonCondition = ( (this.props.usuario.user !=null) && (this.props.usuario.user.isCoach) && !this.state.chatExiste );
		return (
			<div>
				<div className="well well-sm">
					<div className="row">
						<h3 className="col-sm-4">{this.props.paciente.username}</h3>
						<h6 className="col-md-8">
							<span className="label label-primary">ID</span><span className="badge">{this.props.paciente.id}</span>
							<span className="label label-primary">userID</span><span className="badge">{this.props.paciente.userId}</span>
							{	this.props.criarChat != null ?
								<Button raised ripple onClick={this._criarChatPaciente}>Criar conversa</Button>
								: null
							}
						</h6>
					</div>
					
					<h4>{this.props.paciente.email}</h4>
				</div>

				{	this.state.chatExiste ? 			
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

// function mapStateToProps(state){

// 	return {
// 		chats: state.chats,
// 		pacientes: state.pacientes_supervisionados.coachPatientsList
// 	};
// }

// export default connect(mapStateToProps)(PacientePage)

import React from "react"
import FriendlyChat from "../util/FirebaseChat"
import ChatBox from "../components/ChatBox"
import ChatMDL from "../components/ChatMDL"
import {Link} from "react-router"
import {Layout, Drawer, Content, Navigation, Header} from "react-mdl"
import componentHandler from "exports?componentHandler!material-design-lite/material.js"

import {getCoachChats} from "../util/firebaseChatHandler"
import {connect} from "react-redux"

class ChatContainer extends React.Component{

	constructor(props){
		super(props);
		this.Chat = null;
		console.log("Criou o chat");
		console.log(this);
		this.state = {
			coachChats: null,
			chatSelected: null
		}
		this.chatID = null;

		// if(this.state.coachChats != null){
		// 	this.chatNames = this._getChatNames();
		// }else{
		// 	this.chatNames = (<a className="mdl-navigation__link" href="">No chats</a>);
		// }
	}

	_getCoachChats(){
		console.log(this.props.usuario.user.username);
		 getCoachChats(this.props.usuario.user.username, this, function(coachChats, thisState){
			console.log("peguei OS CHATS");
			//return coachChats;
			thisState.setState({coachChats: coachChats});
		});
	}

	_chatSelected(chatID){
		console.log("CLICOU NO CHAT");
		this.setState({chatSelected: chatID});
		this.chatID = null;
		console.log("ATUALIZOU CHATID GERAL");
		this.chatID = chatID;
	}

	_renderChatMDL(chatID){
		return (<ChatMDL chatID={chatID} />);
	}

	_getChatNames(){
		console.log("To pegando os chat names");
		console.log(this.state.coachChats);
		return this.state.coachChats.map((coachChat, idx) => {
			const link = "/chats/"+ coachChat.chatID;
			//return (<Link to={link} className="mdl-navigation__link" key={idx} onClick={this._chatSelected.bind(this, coachChat.chatID)}>{coachChat.chatID}</Link>);
			return (<a href="#/chats/" className="mdl-navigation__link" key={idx} onClick={this._chatSelected.bind(this, coachChat.chatID)}>{coachChat.chatID}</a>);
		});
	}

	componentDidMount(){
		//this.FriendlyChat = new FriendlyChat("messages");
		//console.log(this.FriendlyChat.userPic);
		// Assim que for criar o Componente a gnt tenta pegar os chats do coach logado
		console.log("TENTANDO PEGAR OS CHATS");
		this.setState({coachChats : this._getCoachChats() });
		//this.chatNames = this._getChatNames();

		componentHandler.upgradeDom();
	}

	componentWillUnmount(){
		console.log("Terminando Chat");
	}

	// componentWillUpdate(nextProps, nextState) {
	//   if (nextState.chatID != this.state.chatID) {
	//     console.log(nextState.chatID);
	//   }
	// }

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
	// 		// this.chatID = "c"+this.props.usuario.user.coachId.toString()+"p"+this.props.paciente.id.toString();
	// 		this.chatID = "c"+this.props.usuario.user.coachId.toString()+"p"+"15";
	// 	}
		
	// }
	// componentDidUpdate(){
	// 	console.log("UPGRADING DOM CHATCONTINER");
	// 	componentHandler.upgradeAllRegistered();
	// }

//  AQUI PODE SER USADO AO CRIAR-MOS OS ELEMENTOS DINAMICAMENTE SE O CHAT NAO FOR A PAGINA INICIAL DO ROUTER!
	
	render(){

		console.log("STATE");
		console.log(this.state);
		console.log(this.state.chatSelected);
		let chatNames;
		if(this.state.coachChats != null){
			chatNames = this._getChatNames();
		}else{
			chatNames = (<a className="mdl-navigation__link" href="">No chats</a>);
		}
		
		let chat = null;
		if(this.state.chatSelected != null){
			console.log("ERA PRA CRIAR UM NOVO");
			console.log(this.state.chatSelected);
			chat = this._renderChatMDL(this.state.chatSelected);
			console.log(chat);
		}
		

		return(
		<div>
		<div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
		  <div className="mdl-layout__drawer">
		    <span className="mdl-layout-title">Chats</span>
		    <nav className="mdl-navigation">
		      {chatNames}
		    </nav>
		  </div>
		  <main className="mdl-layout__content">
		    <div className="page-content">
		    	{chat}
		    </div>
		  </main>
		</div>
		</div>
		
        )

	}

}

function mapStateToProps(state){

	return {
		usuario: state.usuario
	};
}

export default connect(mapStateToProps)(ChatContainer)
	// render(){

	// 	// console.log("loading elements");
	// 	//this._loadElements();
		
	// 	return(

	// 		<div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">

	// 		  <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
	// 			<div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
	// 			  <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
	// 				<h3><i className="material-icons">chat_bubble_outline</i> Friendly Chat</h3>
	// 			  </div>
	// 			  <div id="user-container">
	// 				<div hidden id="user-pic"></div>
	// 				<div hidden id="user-name"></div>
	// 				{/*<button hidden id="sign-out" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
	// 									  Sign-out
	// 									</button>
	// 									<button id="sign-in" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white" >
	// 									  <i className="material-icons">account_circle</i>Sign-in with Google
	// 									</button>*/}
	// 			  </div>
	// 			</div>
	// 		  </header>

	// 		  <ChatBox />
			  
	// 		</div>



	// 	)
	// }


// }

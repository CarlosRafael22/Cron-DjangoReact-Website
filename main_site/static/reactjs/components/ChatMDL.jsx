import React from "react"

import {Card, CardTitle, CardText, CardActions, CardMenu, Button, IconButton, Snackbar} from "react-mdl"

import FriendlyChat from "../util/FirebaseChat"

export default class ChatMDL extends React.Component{

	constructor(){
		super();

		this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
		this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
		this.state = { 
			isSnackbarActive: false,
			updateChatFromChatContainer: false
		};

	}

	componentDidMount(){

		// No caso de ter vindo pelo ChatContainer q tem todos os chats
		// ele vai receber this.props.params.chatID e nao this.props.chatID
		let chatRefPath;
		if(this.props.params != null){
			console.log("CRIOU O MDL COM PARAMS");
			chatRefPath = "chatMessages/"+this.props.params.chatID;
		}else{
			console.log("CRIOU O MDL COM PROPS");
			// Passando o chatID para montar a referencia do chat
			chatRefPath = "chatMessages/"+this.props.chatID;
		}
		
		this.FriendlyChat = new FriendlyChat(chatRefPath);
		console.log("FriendlyChat com ref: ", chatRefPath);

	}

	componentWillReceiveProps(nextProps){

		console.log("RECEBI PROPS NOVO");

		if(this.props.chatID != nextProps.chatID){

			console.log(this.props.chatID);
			console.log(nextProps.chatID);
			// Gambiarra pra fazer o rendeer de novo
			this.setState({updateChatFromChatContainer: true});

			const chatRefPath = "chatMessages/"+nextProps.chatID;
			console.log("PEGANDO NOVA REFERENCIA DO FIREBASE");
			// this.FriendlyChat = null;
			// console.log(this.FriendlyChat);
			// this.FriendlyChat = new FriendlyChat(chatRefPath);
			this.FriendlyChat.updateChatReference(chatRefPath);
			console.log(this.FriendlyChat.chatMsgsPath);
			console.log("FriendlyChat com ref: ", chatRefPath);
		}
	}

	componentWillUnmount(){
		console.log("UNMOUNTING O CHATMDL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		this.FriendlyChat = null;
	}


	handleTimeoutSnackbar() {
    	this.setState({ isSnackbarActive: false });
  	}

  	 handleShowSnackbar() {
  	 	console.log("handleShowSnackbar");
  	 	const showSnack = this.FriendlyChat.checkSignedInWithMessage();
	    this.setState({ isSnackbarActive: !showSnack });
	    console.log(this.state.isSnackbarActive);
	  }

	render(){

		console.log("RENDERIZANDO CHATMDL");
		return(

			<main className="mdl-layout__content mdl-color--grey-100">

				<div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">

					<Card  id="messages-card" shadow={0} style={{width: '512px', margin: 'auto'}}>
					    <CardTitle style={{ border: '5px solid red'}}>
					    	<div id="user-container">

							<div hidden id="user-pic"></div>
							<div hidden id="user-name"></div>
							{/*<button hidden id="sign-out" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
												  Sign-out
												</button>
												<button id="sign-in" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white" >
												  <i className="material-icons">account_circle</i>Sign-in with Google
												</button>*/}
						  </div>
					    </CardTitle>
					    <CardText>
					        <div id="messages">
								<span id="message-filler"></span>
						  	</div>
					    </CardText>
					    <CardActions border>
					    	<form id="message-form" action="#">
								<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
								  <input className="mdl-textfield__input" type="text" id="message"/>
								  <label className="mdl-textfield__label" htmlFor="message">Message...</label>
								</div>
							<Button colored id="submit" onClick={this.handleShowSnackbar}>Send</Button>
						  </form>
						  <form id="image-form" action="#">
							<input id="mediaCapture" type="file" accept="image/*,capture=camera"/>
							<Button colored id="submitImage" title="Add an image"> <i className="material-icons">image</i></Button>
						  </form>
					    </CardActions>
					    <CardMenu style={{color: 'black'}}>
					        <IconButton name="share" />
					    </CardMenu>
					</Card>

					 <Snackbar id="must-signin-snackbar"
					  active={this.state.isSnackbarActive}
			          onTimeout={this.handleTimeoutSnackbar}
			          action="Undo">
			          <div className="mdl-snackbar__text">You must sign-in first</div>
			          </Snackbar>

				</div>
			</main>
		)
	}
}
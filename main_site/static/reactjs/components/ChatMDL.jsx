import React from "react"

import {Card, CardTitle, CardText, CardActions, CardMenu, Button, IconButton, Snackbar} from "react-mdl"

import FriendlyChat from "../util/FirebaseChat"

export default class ChatMDL extends React.Component{

	constructor(){
		super();

		this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
		this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
		this.state = { isSnackbarActive: false };
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
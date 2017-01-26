import React from "react"
import FriendlyChat from "../util/FirebaseChat"
import ChatMDL from "../components/ChatMDL"

import {Layout, Header, Drawer, Navigation, Content} from "react-mdl"


export default class ChatMDLContainer extends React.Component{

	constructor(){
		super();
		this.Chat = null;
		console.log("Criou o chat");
		console.log(this);
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

	componentWillUnmount(){
		console.log("Terminando Chat");
	}

	// componentDidUpdate(){
	// 	console.log("UPGRADING DOM CHATCONTINER");
	// 	componentHandler.upgradeAllRegistered();
	// }

//  AQUI PODE SER USADO AO CRIAR-MOS OS ELEMENTOS DINAMICAMENTE SE O CHAT NAO FOR A PAGINA INICIAL DO ROUTER!
	_loadElements(){
	  let button = document.createElement('button');
	  let textNode = document.createTextNode('Bora!');
	  button.appendChild(textNode);
	  button.className = 'mdl-button mdl-js-button mdl-js-ripple-effect';
	  componentHandler.upgradeElement(button);
	  document.getElementById('message-form').appendChild(button);
	}

	_loadLabel(){
		let div = document.createElement('div');
		div.className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
		let input = document.createElement('input');
		input.className = "mdl-textfield__input";
		let label = document.createElement('label');
		label.className = "mdl-textfield__label";

		let msgText = document.createTextNode("Message ...");
		label.appendChild(msgText);

		div.appendChild(input);
		div.appendChild(label);

		var myNode = document.getElementById("message-form");
		while (myNode.firstChild) {
			console.log("Tirando children do form");
		    myNode.removeChild(myNode.firstChild);
		}

		componentHandler.upgradeElement(div);
		document.getElementById("message-form").appendChild(div);

	}
	// componentWillMount(){
	// 	console.log("Will mount");
	// 	this._loadElements();
	// }

	render(){

		// console.log("loading elements");
		//this._loadElements();
		
		return(

			<Layout fixedHeader>
		        <Header title={<span><span style={{ color: '#ddd' }}>Area / </span><strong>The Title</strong></span>}>
		            <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
					  <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
						<h3><i className="material-icons">chat_bubble_outline</i> Friendly Chat</h3>
					  </div>
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
					</div>
		        </Header>
		        <Drawer title="Title">
		            <Navigation>
		                <a href="">Link</a>
		                <a href="">Link</a>
		                <a href="">Link</a>
		                <a href="">Link</a>
		            </Navigation>
		        </Drawer>
		        <Content>
		        	
		        </Content>
		    </Layout>



		)
	}


}

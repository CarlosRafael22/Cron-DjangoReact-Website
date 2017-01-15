import React from "react"

import {loginUser, logoutUser, signUpUser} from '../redux/action'
import { connect } from 'react-redux'
import store from '../redux/store'
import reducer from '../redux/reducer'

class HomeContainer extends React.Component{

	constructor(){
		super();

		console.log(this.state);
		this.state = {
			logado: false,
			token: null,
			usuario: null
		};
		console.log(this.state);
		console.log("Local Storage");
		console.log(localStorage);
		console.log(this.context);
		//console.log(localStorage.user.username);
	}

	componentWillUnmount(){
		console.log("Terminando Home");
	}

	_logout(){
		console.log("Logout Home");
		store.dispatch(logoutUser());
	}

	_signup(){

		let username = this._username.value;
		let password = this._password.value;
		let email = this._email.value;

		console.log("Dispatching SignUp");
		store.dispatch(signUpUser({"username":username, "email":email, "password": password}));
	}

	_loginSubmit(event){

		let username = this._username.value;
		let password = this._password.value;

		console.log("Dispatching");
		store.dispatch(loginUser({"email_or_username":username, "password": password}));

	}

	render(){

		const ownStyle = {
			"paddingTop": "50px"
		};
		console.log("Home");
		//store.dispatch(loginUser({"username":"Carlos", "password": "Rfael"}));

		let view;
		// Vendo se o usuario esta logado. Se nao estiver vai mostrar o Login Form, se estiver mostra alguma outra coisa
		if(!this.state.logado){
			view = 
			<div className="container" style={ownStyle}>
				<form onSubmit={this._loginSubmit.bind(this)}>
				  <div className="form-group">
				    <label htmlFor="inputUsername">Username</label>
				    <input type="text" className="form-control" id="inputUsername" aria-describedby="emailHelp" placeholder="Enter username" 
				    ref={(input) => this._username = input}/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="inputEmail">Email</label>
				    <input type="text" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" 
				    ref={(input) => this._email = input}/>
				  </div>
				  
				  <div className="form-group">
				    <label htmlFor="inputPassword">Password</label>
				    <input type="password" className="form-control" id="inputPassword" placeholder="Password"
				    ref={(input) => this._password = input}/>
				  </div>
				  <button type="submit" className="btn btn-primary">Login</button>
				  <button type="button" className="btn btn-success" onClick={this._signup.bind(this)}>SignUp</button>
				  <button type="button" className="btn btn-danger" onClick={this._logout.bind(this)}>Logout</button>
				</form>
			</div>
			{/*<div>
						<ul className="nav nav-tabs">
					  <li className="active"><a data-toggle="tab" href="#home">Home</a></li>
					  <li><a data-toggle="tab" href="#menu1">Menu 1</a></li>
					  <li><a data-toggle="tab" href="#menu2">Menu 2</a></li>
					</ul>
			
					<div className="tab-content">
					  <div id="home" className="tab-pane fade in active">
					    <h3>HOME</h3>
					    <p>Some content.</p>
					  </div>
					  <div id="menu1" className="tab-pane fade">
					    <h3>Menu 1</h3>
					    <p>Some content in menu 1.</p>
					  </div>
					  <div id="menu2" className="tab-pane fade">
					    <h3>Menu 2</h3>
					    <p>Some content in menu 2.</p>
					  </div>
					</div>
					</div>*/}
		}else{
			view = 
			<div className="alert alert-success" role="alert">
			  <strong>Well done, {this.state.usuario.first_name}!</strong> You successfully logged with token <a href="#" className="alert-link">{this.state.token}</a>.
			</div>


		}


		return(
			<div>{view}</div>
		)
	}
}
HomeContainer.contextTypes = {
	store: React.PropTypes.object.isRequired
};
export default connect()(HomeContainer)
import React from "react"

import {loginUser, logoutUser, signUpUser} from '../redux/action'
import { connect } from 'react-redux'
import store from '../redux/store'
import reducer from '../redux/reducer'
import {loadState, saveState} from '../redux/localStorage'

class HomeContainer extends React.Component{

	constructor(){
		super();

		console.log(this.state);
		const localStorageState = loadState();
		this.state = {
			django_token: localStorage.getItem('id_token'),
			usuario: localStorage.getItem('user'),
			localStorageState: localStorageState
		};
		console.log(this.state);
		console.log("Home Local Storage");
		console.log(localStorage);
		console.log(this.context);

		
		//console.log(localStorage.user.username);

		// Gambiarra para qd mudar o state eu fazer o setState e ele ter que render de novo
		// store.subscribe(() => {
		// 	console.log("Subscribed");
		// 	this.setState({usuario: localStorage.getItem('user'), django_token: localStorage.getItem('id_token')});
		// });
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
		if(this.props.usuario.user == null){
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
		}else{
			view = 
			<div className="alert alert-success" role="alert">
			  <strong>Well done, {this.props.usuario.user.username}!</strong> You successfully logged with token <a href="#" className="alink">{this.props.usuario.id_token}</a>.
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

function mapStateToProps(state){

	return {
		usuario : state.usuario
	};
}

export default connect(mapStateToProps)(HomeContainer)
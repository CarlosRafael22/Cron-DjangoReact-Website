import React from "react"

import {loginUser, logoutUser} from '../redux/action'
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
		//console.log(localStorage.user.username);
	}

	componentWillUnmount(){
		console.log("Terminando Home");
	}

	_logout(){
		console.log("Logout Home");
		store.dispatch(logoutUser());
	}

	_loginSubmit(event){
		// Then the page doesnt reaload when the form is submitted!!
		// event.preventDefault();

		// let username = this._username.value;
		// let password = this._password.value;

		// console.log(username);
		// console.log(password);

		// jQuery.ajax({
		// 	type: 'POST',
		// 	url: '/api-token-auth/',
		// 	data: {"username": username, "password": password}
		// }).done(authInfo => {

		// 	// PEGUEI O TOKEN DO USUARIO
		// 	console.log("User logged");
		// 	console.log(typeof(authInfo));
		// 	console.log(authInfo);

		// 	// AGORA VOU PEGAR AS INFOS DO PROPRIO USUARIO
		// 	console.log(authInfo.user);

		// 	this.setState({logado : true, token: authInfo.token, usuario: authInfo.user});
		// })
		// .fail(function(xhr, status, error){
		// 	console.log(error);
		// 	console.log(xhr);

		// });


		let username = this._username.value;
		let password = this._password.value;

		console.log("Dispatching");
		store.dispatch(loginUser({"username":username, "password": password}));

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
				    <label htmlFor="exampleInputEmail1">Username</label>
				    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" 
				    ref={(input) => this._username = input}/>
				    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Password</label>
				    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
				    ref={(input) => this._password = input}/>
				  </div>
				  <button type="submit" className="btn btn-primary">Login</button>
				  <button type="button" className="btn btn-danger" onClick={this._logout.bind(this)}>Logout</button>
				</form>
			</div>
		}else{
			view = 
			<div className="alert alert-success" role="alert">
			  <strong>Well done, {this.state.usuario.first_name}!</strong> You successfully logged with token <a href="#" className="alert-link">{this.state.token}</a>.
			</div>


		}
		// onSubmit={dispatch(loginUser({"username": this._username.value, "password": this._password.value}))}

		// if(!this.state.logado){
		// 			view = 
		// 			<div className="container" style={ownStyle}>

		// 				<form onSubmit={store.dispatch(loginUser({"username": this._username.value, "password": this._password.value}))}>
		// 				  <div className="form-group">
		// 				    <label htmlFor="exampleInputEmail1">Username</label>
		// 				    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" 
		// 				    ref={(input) => this._username = input}/>
		// 				    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
		// 				  </div>
		// 				  <div className="form-group">
		// 				    <label htmlFor="exampleInputPassword1">Password</label>
		// 				    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
		// 				    ref={(input) => this._password = input}/>
		// 				  </div>
		// 				  <button type="submit" className="btn btn-primary">Login</button>
		// 				</form>
		// 			</div>
		// 		}else{
		// 			view = 
		// 			<div className="alert alert-success" role="alert">
		// 			  <strong>Well done, {this.state.usuario.first_name}!</strong> You successfully logged with token <a href="#" className="alert-link">{this.state.token}</a>.
		// 			</div>


		// 		}


		return(
			<div>{view}</div>
		)
	}
}

export default connect()(HomeContainer)
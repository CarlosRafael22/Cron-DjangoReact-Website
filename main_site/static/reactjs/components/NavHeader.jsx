import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
import { Link } from "react-router"
import store from '../redux/store'
import Modal from './Modal'







export default class NavHeader extends React.Component{

	constructor(props){
		super(props);

		// modalType
		// 0 : Login
		// 1 : SignUp
		this.state = {
			showModal: false,
			modalType: null,
			updateView: false
		}
		console.log("Estado ", this.state.showModal);
		console.log(store.getState());

		console.log("Props");
		console.log(this.props);
	}


	_handleHideModal(){
		this.setState({showModal: false, modalType: null});
		console.log("Estado ", this.state);
	}

	_handleShowModal(modalType){
		console.log(modalType);
		this.setState({showModal: true, modalType: modalType});
		console.log("Estado ", this.state);
	}


	_showUserInfo(){
		console.log("Props do Header logado");
		console.log(this.props.user);
		return this.props.user.username;
	}

	_handleLogin(event){
		// Then the page doesnt reaload when the form is submitted!!
		event.preventDefault();
		this.props.login(this._usernameOrEmail.value, this._password.value);
	}

	_handleSignup(event){
		// Then the page doesnt reaload when the form is submitted!!
		event.preventDefault();
		this.props.signup(this._username.value, this._email.value, this._password.value);
	}


	render(){

		let modalLogIn = (
			<Modal handleHideModal={this._handleHideModal.bind(this)} title="Log in" buttonFunction={this._handleLogin.bind(this)}>
				<div >
					<form onSubmit={this._handleLogin.bind(this)}>
					  <div className="form-group">
					    <label htmlFor="inputUsername">Username or Email</label>
					    <input type="text" className="form-control" id="inputUsername" aria-describedby="emailHelp" placeholder="Enter username" 
					    ref={(input) => this._usernameOrEmail = input}/>
					  </div>
					  <div className="form-group">
					    <label htmlFor="inputPassword">Password</label>
					    <input type="password" className="form-control" id="inputPassword" placeholder="Password"
					    ref={(input) => this._password = input}/>
					  </div>
					</form>
				</div>
			</Modal>
		)


		let modalSignUp = (
			<Modal handleHideModal={this._handleHideModal.bind(this)} title="Sign Up" buttonFunction={this._handleSignup.bind(this)}>
				<div >
					<form onSubmit={this._handleLogin.bind(this)}>
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
					</form>
				</div>
			</Modal>
		)

		// AGORA O HEADER VAI SER DIFERENTE BASEADO EM SE O USUARIO ESTA LOGADO OU NAO
		let headerUserLoggedOut = (
			<nav className="navbar navbar-inverse navbar-fixed-top">
		      <div className="container-fluid">
		        <div className="navbar-header">
		          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span className="sr-only">Toggle navigation</span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		          </button>
		          <a className="navbar-brand" href="#">Eleve</a>
		        </div>
		        <div id="navbar" className="navbar-collapse collapse">
		          <ul className="nav navbar-nav navbar-right">
		          	<li><a href="#/home">{this.props.id_token}</a></li>
		            <li><button type="button" className="btn btn-primary btn-lg" onClick={this._handleShowModal.bind(this, 0)}
		            data-toggle="modal" data-target="#myModal">
					  Login
					</button>
					</li>
		            <li><a href="#" onClick={this._handleShowModal.bind(this, 1)}>Signup</a></li>
		            {/*<Link to="/home">Profile</Link>*/}
		            <li><a href="#/home">Profile</a></li>
		          </ul>
		        </div>
		      </div>
	    	</nav>
		)

		let headerUserLoggedIn = (
			<nav className="navbar navbar-inverse navbar-fixed-top">
		      <div className="container-fluid">
		        <div className="navbar-header">
		          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span className="sr-only">Toggle navigation</span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		            <span className="icon-bar"></span>
		          </button>
		          <a className="navbar-brand" href="#">Eleve</a>
		        </div>
		        <div id="navbar" className="navbar-collapse collapse">
		          <ul className="nav navbar-nav navbar-right">
		          	<li><a href="#/home">{this.props.id_token}</a></li>
		            <li><button type="button" className="btn btn-primary btn-lg">
					  {this.props.user != null ? this._showUserInfo() : "Null"}
					</button>
					</li>
		            <li>{/*<a href="#" onClick={this.props.logout.bind(this)}>Log out</a>*/}
		            ><button type="button" className="btn btn-primary btn-lg" onClick={this.props.logout.bind(this)}
		            data-toggle="modal" data-target="#myModal">
					  Log out
					</button></li>
		            {/*<Link to="/home">Profile</Link>*/}
		            <li><a href="#/home">Profile</a></li>
		          </ul>
		        </div>
		      </div>
	    	</nav>
		)

		console.log("Storage no Header");
		console.log(localStorage);
		console.log(localStorage.getItem('user'));

		// Criando o listener do Redux state
		//let unsubscribe = store.subscribe(this._handleReduxStateChange);
		console.log("Ta autenticado?");
		console.log(this.props.usuario.isAuthenticated);
		return (
			<div>
			{this.props.usuario.isAuthenticated == true ? headerUserLoggedIn : headerUserLoggedOut}
	    	{/* PRIMEIRA PARTE VE SE TA COM O showModal E DPS DENTRO DO PRIMEIRO () VE SE EH O DE LOGIN OU SIGNUP*/}
	    	{this.state.showModal ? ( this.state.modalType==0 ? modalLogIn : modalSignUp ) : (null) }
	    	</div>
		)
	}


}
// NavHeader.contextTypes = {
// 	store: React.PropTypes.object.isRequired
// };
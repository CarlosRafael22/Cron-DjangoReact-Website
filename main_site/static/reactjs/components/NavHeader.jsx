import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
import {loginUser, logoutUser, signUpUser} from '../redux/action'
import store from '../redux/store'


class Modal extends React.Component{

	componentDidMount(){
        $(ReactDOM.findDOMNode(this)).modal('show');
        $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
    }

	render(){

		let button = (
			<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.buttonFunction}>{this.props.title}</button>
		)
		return(
			<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
			      </div>
			      <div className="modal-body">
			        {this.props.children}
			      </div>
			      <div className="modal-footer">
			       {button}
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}
Modal.propTypes = {
	handleHideModal: React.PropTypes.func.isRequired
}




class NavHeader extends React.Component{

	constructor(){
		super();

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

		// Gambiarra para qd mudar o state eu fazer o setState e ele ter que render de novo
		store.subscribe(() => {
			console.log("Subscribed");
			this.setState({updateView: true});
		});
	}

	componentWillUnmount(){
		console.log("Unmounting NavHeader");
	}

	// FUNCAO PARA MANTER UM LISTENER NO STORE E AO MUDAR O ESTADO (LOGANDO OU DESLOGANDO)
	// A GNT MUDA O HEADER TB
	_handleReduxStateChange(){
		console.log("Listener ", store.getState());
		console.log(this);
		this.setState({updateView: true});
		console.log("Deu update no state");
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

		let usernameOrEmail = this._usernameOrEmail.value;
		let password = this._password.value;

		console.log("Dispatching");
		store.dispatch(loginUser({"email_or_username":usernameOrEmail, "password": password}));

	}
	
	_showUserInfo(){
		let user = localStorage.getItem('user');
		if(user != "undefined"){
			user = JSON.parse(user);
		}else{
			user = "Undefined";
		}
		console.log(user);

		return user.username;
	}

	render(){

		let modalLogIn = (
			<Modal handleHideModal={this._handleHideModal.bind(this)} title="Log in" buttonFunction={this._loginSubmit.bind(this)}>
				<div >
					<form onSubmit={this._loginSubmit.bind(this)}>
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
			<Modal handleHideModal={this._handleHideModal.bind(this)} title="Sign Up" buttonFunction={this._signup.bind(this)}>
				<div >
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
					</form>
				</div>
			</Modal>
		)

		// AGORA O HEADER VAI SER DIFERENTE BASEADO EM SE O USUARIO ESTA LOGADO OU NAO
		let headerLoggedOut = (
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
		            <li><button type="button" className="btn btn-primary btn-lg" onClick={this._handleShowModal.bind(this, 0)}
		            data-toggle="modal" data-target="#myModal">
					  Login
					</button>
					</li>
		            <li><a href="#" onClick={this._handleShowModal.bind(this, 1)}>Signup</a></li>
		            <li><a href="#">Profile</a></li>
		          </ul>
		        </div>
		      </div>
	    	</nav>
		)

		let headerLoggedIn = (
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
		            <li><button type="button" className="btn btn-primary btn-lg">
					  {localStorage.getItem('user') != null ? this._showUserInfo() : "Null"}
					</button>
					</li>
		            <li><a href="#" onClick={this._logout.bind(this)}>Log out</a></li>
		            <li><a href="#">Profile</a></li>
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

		return (
			<div>
			{localStorage.getItem('user') != null ? headerLoggedIn : headerLoggedOut}
	    	{/* PRIMEIRA PARTE VE SE TA COM O showModal E DPS DENTRO DO PRIMEIRO () VE SE EH O DE LOGIN OU SIGNUP*/}
	    	{this.state.showModal ? ( this.state.modalType==0 ? modalLogIn : modalSignUp ) : (null) }
	    	</div>
		)
	}


}
NavHeader.contextTypes = {
	store: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	  console.log("StateProps");
	  console.log(state); // state

	  return {
	  	state: state
	  }
	}
export default connect(mapStateToProps)(NavHeader)

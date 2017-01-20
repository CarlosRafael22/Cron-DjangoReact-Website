import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
import { Link } from "react-router"
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

		// // Gambiarra para qd mudar o state eu fazer o setState e ele ter que render de novo
		// store.subscribe((state) => {
		// 	console.log("Subscribed retornou isso");
		// 	console.log(state);
		// 	//this.setState({updateView: true});
		// });

		console.log("Props");
		console.log(this.props);
	}

	componentWillReceiveProps(nextProps){
		console.log("Vai atualizar props!");
		console.log(nextProps);

		if(this.props.isAuthenticated != nextProps.isAuthenticated){
			this.setState(updateView:true);
		}
	}

	componentDidMount(){
		const usuariosRef = firebase.database().ref('usuarios');
		console.log("NavHeader mounted");
		console.log(usuariosRef);
		//const usuariosRef = rootRef.child('usuarios');
		usuariosRef.on('value', snapshot => {
			console.log("Usuario Firebase");
			console.log(snapshot);
			console.log(snapshot.val());

			// Vou pegar as infos de login do usuario no Firebase Auth

			// console.log("Firebase user connected");
			// const fireUser = firebase.auth().currentUser;

		});

		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    console.log("Firebase user connected");
		    console.log(user);
		  } else {
		    // No user is signed in.
		    console.log("Firebase user NOT connected");
		  }
		});
	}

	componentWillUnmount(){
		console.log("Unmounting NavHeader");
	}

	_validateEmail(email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	}

	_signInFirebase(emailOrUsername, password){
		console.log("Vou logar no Firebase");

		// Primeiro vendo se passou email ou username
		if(this._validateEmail(emailOrUsername)){
			const email = emailOrUsername;
			console.log("Com email");
			firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
		  	// This gives you a Google Access Token. You can use it to access the Google API.
		  	console.log("Logou Firebase");
		  	console.log(result);
			// var token = result.credential.accessToken;
			// // The signed-in user info.
			// var user = result.user;

			// let info = {
			// 	"token": token,
			// 	"user": user
			// };
			// console.log("Info");
			// console.log(info);
		  }).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  if (errorCode === 'auth/wrong-password') {
			    alert('Wrong password.');
			  } else {
			    alert(errorMessage);
			  }
			  console.log(error);
			});
		}else{
			const username = emailOrUsername;
			console.log("Com username");
			// Se passou o username a gnt vai ter q pegar o email
			const usuariosRef = firebase.database().ref('usuarios');
			usuariosRef.orderByChild('username').startAt(username).endAt(username).once('value', function(snapshot){
				// Vai ter iterar pelo snapshot que volta para com o child() ter acesso
				// a cada user e pegar o email
				// e o snapshot:
				// Object
				//  30 : Object
					// displayName : "wilton"
					// email : "wilton@hotmail.com"
					// userUID : "iha3yNACCkPNmWI1YWlWjYMAMVH2"
					// username : "wilton"
				let email;
				console.log("Email do username: ", username);
				console.log(snapshot);
				console.log(snapshot.val());
				snapshot.forEach(function(childSnapshot){

					console.log("Child snapshot");
					console.log(childSnapshot);

					email = childSnapshot.child("email").val();
					console.log(email);
					console.log("Vou logar firebase");

				})
				
				console.log("Ja to esperando pra logar");
				firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
			  	// This gives you a Google Access Token. You can use it to access the Google API.
			  	console.log("Logou Firebase");
			  	console.log(result);
			  }).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  if (errorCode === 'auth/wrong-password') {
				    alert('Wrong password.');
				  } else {
				    alert(errorMessage);
				  }
				  console.log(error);
				});
			})

		}
	}

	_addUserInFirebase(username, id){
		console.log("Vai add user na tabela Firebase");
		const usuariosRef = firebase.database().ref('usuarios');
		usuariosRef.push({
			username: username,
			djangoID: id
		}).then(function(){
			console.log("Criou o novo usuario no Firebase");
		}).catch(function(error){
			console.error(error);
		});

	}


	_signUpFirebase(email, password, username, djangoId){
		console.log("Vou signUp no Firebase");
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result){
		  	// This gives you a Google Access Token. You can use it to access the Google API.
		  	console.log("Criou no Firebase");
		  	console.log(result);
		  	console.log(result.uid);

		  	// Salvando o displayName como username pq senao ao falar no chat nao vai aparecer nome algum
		  	result.updateProfile({
		        displayName: username
		    }).then(function() {
		        // Update successful.

		        console.log("Vai add user na tabela Firebase");
				const usuariosRef = firebase.database().ref('usuarios');
				usuariosRef.child(djangoId).set({
					username: username,
					userUID: result.uid,
					email: result.email,
					displayName: result.displayName
				}).then(function(){
					console.log("Criou o novo usuario no Firebase");
				}).catch(function(error){
					console.error(error);
				});

		    }, function(error) {
		        // An error happened.
		        console.log("Deu merda no updateProfile");
		        console.log(error);
		    });        

		  	
		  })
		    .catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  if (errorCode === 'auth/wrong-password') {
		    alert('Wrong password.');
		  } else {
		    alert(errorMessage);
		  }
		  console.log(error);
		});
	}


	_signOutFirebase(){
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  console.log("Deslogou Firebase");
		  console.log(localStorage);
		}, function(error) {
		  // An error happened.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode);
		  console.log(errorMessage);
		});
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
		this.props.dispatch(logoutUser());
		this._signOutFirebase();
	}

	_signup(){

		let username = this._username.value;
		let password = this._password.value;
		let email = this._email.value;

		console.log("Dispatching SignUp");
		this.props.dispatch(signUpUser({"username":username, "email":email, "password": password}, this._signUpFirebase.bind(this), this._addUserInFirebase.bind(this)));
		//this._signUpFirebase(email, password);

		// QUANDO FIZER O SIGNUP VAMOS CRIAR UM USUARIO EM UMA TABELA NO FIREBASE
		// PQ O METODO createUserWithEmailAndPassword CRIA UM USER EM UMA TABLEA A PARTE
		// http://stackoverflow.com/questions/14673708/how-do-i-return-a-list-of-users-if-i-use-the-firebase-simple-username-password

	}

	_loginSubmit(event){

		let usernameOrEmail = this._usernameOrEmail.value;
		let password = this._password.value;

		let emailFirebase = usernameOrEmail;

		console.log("Dispatching");
		this.props.dispatch(loginUser({"email_or_username":usernameOrEmail, "password": password}));
		this._signInFirebase(emailFirebase, password);

	}
	
	_showUserInfo(){
		console.log("Props do Header logado");
		console.log(this.props.user);
		return this.props.user.username;
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
		            <li>{/*<a href="#" onClick={this._logout.bind(this)}>Log out</a>*/}
		            ><button type="button" className="btn btn-primary btn-lg" onClick={this._logout.bind(this)}
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

function mapStateToProps(state) {
	  console.log("StateProps mapeado");
	  console.log(state); // state
	  console.log(state.usuario);
	  console.log(typeof(state.usuario));
	  console.log(state.receitas);

	  return {
	  	//state: state,
	  	usuario: state.usuario,
	 	user : state.usuario.user,
		id_token : state.usuario.id_token
		// user: state.usuario.get('user'),
		// id_token: state.usuario.get('id_token')
		// user: state.getIn(['usuario', 'user']),
		// id_token: state.getIn(['usuario', 'id_token'])
	  };
	}

export default connect(mapStateToProps)(NavHeader)
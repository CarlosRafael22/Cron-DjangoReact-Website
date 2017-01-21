import React from 'react'
import { connect } from 'react-redux'

import {loginUser, logoutUser, signUpUser} from '../redux/action'
import NavHeader from '../components/NavHeader'
import * as firebaseAuth from '../util/firebase'

class NavHeaderContainer extends React.Component{

	constructor(){
		super();

		//Iniciando o objeto Firebase
		// console.log("PEGUIE O FIREBASE");
		// console.log(FirebaseObj);
		// this.firebase = Object.create(FirebaseObj);
		// console.log(this.firebase);
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

	_logout(){
		console.log("Logout Header");
		this.props.dispatch(logoutUser());
		firebaseAuth._signOutFirebase();
	}

	_signup(username, email, password){

		// let username = this._username.value;
		// let password = this._password.value;
		// let email = this._email.value;

		console.log("Dispatching SignUp");
		this.props.dispatch(signUpUser({"username":username, "email":email, "password": password}, firebaseAuth._signUpFirebase.bind(this), firebaseAuth._addUserInFirebase.bind(this)));
		//this._signUpFirebase(email, password);

		// QUANDO FIZER O SIGNUP VAMOS CRIAR UM USUARIO EM UMA TABELA NO FIREBASE
		// PQ O METODO createUserWithEmailAndPassword CRIA UM USER EM UMA TABLEA A PARTE
		// http://stackoverflow.com/questions/14673708/how-do-i-return-a-list-of-users-if-i-use-the-firebase-simple-username-password

	}

	_login(usernameOrEmail, password){

		let emailFirebase = usernameOrEmail;

		console.log("Dispatching");
		this.props.dispatch(loginUser({"email_or_username":usernameOrEmail, "password": password}));
		firebaseAuth._signInFirebase(emailFirebase, password);

	}
	

	render(){
		return (
			<NavHeader login={this._login.bind(this)} logout={this._logout.bind(this)} signup={this._signup.bind(this)} usuario={this.props.usuario}
			user={this.props.user} id_token={this.props.id_token} />
		)
	}

}


function mapStateToProps(state) {
  console.log("StateProps mapeado Header");
  console.log(state); // state

  return {
  	//state: state,
  	usuario: state.usuario,
 	user : state.usuario.user,
	id_token : state.usuario.id_token
  };
}

export default connect(mapStateToProps)(NavHeaderContainer)
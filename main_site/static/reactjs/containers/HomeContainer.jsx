import React from "react"

import {loginUser, logoutUser, signUpUser} from '../redux/actions/auth'
import { connect } from 'react-redux'
import reducer from '../redux/reducer'
import {loadState, saveState} from '../redux/localStorage'
import PacientesSupervisionadosContainer from "./Paciente/PacientesSupervisionadosContainer"

import * as firebaseAuth from '../util/firebase'

import LoginPage from '../views-dashboard/Pages/Login'
import GrupoContainer from './Grupo/GrupoContainer'
import { hashHistory } from 'react-router'

class HomeContainer extends React.Component{

	constructor(){
		super();

		console.log(this.state);
		const localStorageState = loadState();
		this.state = {
			django_token: localStorage.getItem('id_token'),
			usuario: localStorage.getItem('user'),
			localStorageState: localStorageState,
			atualizaPagina: false
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
		console.log("Logout Header");
		this.props.dispatch(logoutUser());
		firebaseAuth._signOutFirebase();
		browserHistory.push('/');
	}

	_signup(username, email, password, tipo_de_user){

		console.log("Dispatching SignUp");
		this.props.dispatch(signUpUser({"username":username, "email":email, "password": password}, firebaseAuth._signUpFirebase.bind(this), tipo_de_user ));
		//this._signUpFirebase(email, password);

		// QUANDO FIZER O SIGNUP VAMOS CRIAR UM USUARIO EM UMA TABELA NO FIREBASE
		// PQ O METODO createUserWithEmailAndPassword CRIA UM USER EM UMA TABLEA A PARTE
		// http://stackoverflow.com/questions/14673708/how-do-i-return-a-list-of-users-if-i-use-the-firebase-simple-username-password

	}

	_login(usernameOrEmail, password){

		let emailFirebase = usernameOrEmail;

		console.log("Dispatching");
		this.props.dispatch(loginUser({"email_or_username":usernameOrEmail, "password": password}, firebaseAuth._signInFirebase.bind(this)));
		//firebaseAuth._signInFirebase(emailFirebase, password);
		browserHistory.push('#/grupos');
		//this.context.router.push('#/grupos');
		//this.setState({atualizaPagina: true});

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
			view = (
				<LoginPage login={this._login.bind(this)} />
			)			

		}
		else if(this.props.usuario.user.isCoach == true){
			// view = (
			// 	<div>
			// 		<div className="alert alert-success" role="alert">
			// 		  <strong>Well done, {this.props.usuario.user.username}!</strong> You successfully logged with token <a href="#" className="alink">{this.props.usuario.id_token}</a>.
			// 		</div>
			// 		<div>
			// 			<PacientesSupervisionadosContainer />
			// 		</div>
			// 	</div>
			// )

			// view = (
			// 	<div>
			// 		<GrupoContainer />
			// 	</div>
			// )
			hashHistory.push('/grupos');
		}
			
		// }else{
		// 	view = (
		// 		<div>
		// 			<div className="alert alert-success" role="alert">
		// 			  <strong>Well done, {this.props.usuario.user.username}!</strong> You successfully logged with token <a href="#" className="alink">{this.props.usuario.id_token}</a>.
		// 			</div>
		// 		</div>
		// 	)
		// }


		return(
			<div>{view}</div>
		)
	}
}


function mapStateToProps(state){

	return {
		usuario : state.usuario
	};
}

export default connect(mapStateToProps)(HomeContainer)
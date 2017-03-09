import React from "react"

import {loginUser, logoutUser, signUpUser, getProfilePicture} from '../../redux/actions/auth'
import { connect } from 'react-redux'
import reducer from '../../redux/reducer'
import {loadState, saveState} from '../../redux/localStorage'
import PacientesSupervisionadosContainer from "../Paciente/PacientesSupervisionadosContainer"

import * as firebaseAuth from '../../util/firebase'

import LoginPage from '../../views-dashboard/Pages/Login'
import GrupoContainer from '../Grupo/GrupoContainer'
import { hashHistory } from 'react-router'

import RegisterPage from '../../views-dashboard/Pages/Register'

class AdminContainer extends React.Component{

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
		hashHistory.push('/admin/grupos');
		//this._signUpFirebase(email, password);

		// QUANDO FIZER O SIGNUP VAMOS CRIAR UM USUARIO EM UMA TABELA NO FIREBASE
		// PQ O METODO createUserWithEmailAndPassword CRIA UM USER EM UMA TABLEA A PARTE
		// http://stackoverflow.com/questions/14673708/how-do-i-return-a-list-of-users-if-i-use-the-firebase-simple-username-password

	}


	_getProfilePicture(){
		this.props.dispatch(getProfilePicture(this.props.usuario.user.username));
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
				<RegisterPage signup={this._signup.bind(this)} />
			)			

		}
		
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

export default connect(mapStateToProps)(AdminContainer)
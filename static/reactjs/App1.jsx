// import React from "react"
// import { render } from "react-dom"

// import App1Container from "./containers/App1Container"
// import Full from "./containers-dashboard/Full"

// class App1 extends React.Component {
//   render() {
//     return (
//       <Full />
//     )
//   }
// }

// render(<App1/>, document.getElementById('App1'), function(){
// 	console.timeEnd('react-app')
// })





import React from "react"
import { render } from "react-dom"
import {hashHistory, Router, Route, Redirect, IndexRoute, IndexRedirect} from "react-router"

import HomeContainer from "./containers/HomeContainer"
import App1Container from "./containers/App1Container"
import ReceitaContainer from "./containers/Receita/ReceitaContainer"
import ChatContainer from "./containers/Chat/ChatContainer"
import ReceitaPage from "./components/Receita/ReceitaPage"
import Layout from "./layouts/layout"

import UsuarioContainer from "./containers/Usuario/UsuarioContainer"
import UsuarioPageContainer from "./containers/Usuario/UsuarioPageContainer"

import PacienteContainer from "./containers/Paciente/PacienteContainer"
import PacientePageContainer from "./containers/Paciente/PacientePageContainer"

import CoachContainer from "./containers/Coach/CoachContainer"
import CoachPageContainer from "./containers/Coach/CoachPageContainer"

import GrupoContainer from "./containers/Grupo/GrupoContainer"
import GrupoPage from "./components/Grupo/GrupoPage"

import ChatMDL from "./components/Chat/ChatMDL"

import AdminContainer from "./containers/Admin/AdminContainer"
import AdminGrupoContainer from "./containers/Admin/AdminGrupoContainer"


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////									DASHBOARD CODE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Full from "./containers-dashboard/Full"
import Login from "./views-dashboard/Pages/Login"


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import reducer from './redux/reducers/reducer'
import thunk from 'redux-thunk'
import storeLocal from './redux/store'

import {loginUser, logoutUser} from './redux/action'
import {loadState, saveState} from './redux/localStorage'

import * as firebase from 'firebase'


class AppAdmin extends React.Component{
	
	constructor(){
		super();

		const logger = createLogger();
		const persistedState = loadState();
		this.store = createStore(reducer, persistedState, applyMiddleware(thunk, logger));
		console.log("Persisted data when creating store");
		console.log(persistedState);

		// // Qlqr mudanca de estado no store eu salvo isso no localStorage
		this.store.subscribe(() => {
			console.log("Subscribe do App");
			console.log(this.store.getState());
			saveState(this.store.getState());
		});
	}

	render(){

		//store.dispatch(loginUser({}));
		return (

			<Provider store={this.store}>
				<Router history={hashHistory}>
					{/*<Redirect from="/" to="/home"/>*/}

					<Route path="/" component={Full}>
						
						{/*<IndexRedirect to="/grupos" />*/}
						<IndexRoute component={AdminContainer} />

						<Route path="/grupos" component={GrupoContainer}>
							<Route path="/grupos/:coachUsername/:grupo_id" component={GrupoPage} />
						</Route>
						<Route path="/pacientes" component={PacienteContainer}>
							<Route path="/pacientes/:pacienteId" component={PacientePageContainer} />
						</Route>

						{/* PAGINA PARA ADMIN LOGAR E CRIAR NOVO COACH E GRUPOS 
						<Route path="/admin" component={AdminContainer}>
							
						</Route>*/}
						<Route path="/grupos" component={AdminGrupoContainer} />
					</Route>
				</Router>
			</Provider>
		)
	}
}

render(<AppAdmin />, document.getElementById('App1'), function(){
	console.timeEnd('react-app')
})
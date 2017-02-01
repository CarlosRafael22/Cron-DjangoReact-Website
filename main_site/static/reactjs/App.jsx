import React from "react"
import { render } from "react-dom"
import {hashHistory, Router, Route, Redirect, IndexRoute} from "react-router"

import HomeContainer from "./containers/HomeContainer"
import App1Container from "./containers/App1Container"
import ReceitaContainer from "./containers/ReceitaContainer"
import ChatContainer from "./containers/ChatContainer"
import ReceitaPage from "./components/ReceitaPage"
import Layout from "./layouts/layout"

import UsuarioContainer from "./containers/UsuarioContainer"
import UsuarioPageContainer from "./containers/UsuarioPageContainer"

import PacienteContainer from "./containers/PacienteContainer"
import PacientePageContainer from "./containers/PacientePageContainer"

import CoachContainer from "./containers/CoachContainer"
import CoachPageContainer from "./containers/CoachPageContainer"

import GrupoContainer from "./containers/GrupoContainer"
import GrupoPage from "./components/GrupoPage"

import ChatMDL from "./components/ChatMDL"


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


class AppRouter extends React.Component{
	
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

					<Route path="/" component={Layout}>
						<IndexRoute component={HomeContainer}/>
						<Route path="/home" component={HomeContainer} />
						<Route path="/pacientes" component={PacienteContainer}>
							<Route path="/pacientes/:pacienteId" component={PacientePageContainer} />
						</Route>
						<Route path="/coaches" component={CoachContainer}>
							<Route path="/coaches/:coachId" component={CoachPageContainer} />
						</Route>
						<Route path="/receitas" component={ReceitaContainer}>
							<Route path="/receitas/:receitaId" component={ReceitaPage} />
						</Route>
						<Route path="/chats" component={ChatContainer}>
							{/*<Route path="/chats/:chatID" {...ChatMDL} />*/}
						</Route>
						<Route path="/grupos" component={GrupoContainer}>
							<Route path="/grupos/:coachUsername/:grupo_id" component={GrupoPage} />
						</Route>
						{/*<Route path="chat" component={ChatContainer} onChange={this._loadElements.bind(this)}/>*/}
					</Route>
				</Router>
			</Provider>
		)
	}
}

render(<AppRouter />, document.getElementById('main_div'), function(){
	console.timeEnd('react-app')
})
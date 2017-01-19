import React from "react"
import { render } from "react-dom"
import {hashHistory, Router, Route, Redirect} from "react-router"

import HomeContainer from "./containers/HomeContainer"
import App1Container from "./containers/App1Container"
import ReceitaContainer from "./containers/ReceitaContainer"
import ChatContainer from "./containers/ChatContainer"
import Layout from "./layouts/layout"

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducer from './redux/reducer'
import thunk from 'redux-thunk'
import storeLocal from './redux/store'

import {loginUser, logoutUser} from './redux/action'
import {loadState, saveState} from './redux/localStorage'

import * as firebase from 'firebase'


class AppRouter extends React.Component{
	_loadElements(){
	  let button = document.createElement('button');
	  let textNode = document.createTextNode('App!');
	  button.appendChild(textNode);
	  button.className = 'mdl-button mdl-js-button mdl-js-ripple-effect';
	  componentHandler.upgradeElement(button);
	  document.getElementById('message-form').appendChild(button);
	}

	constructor(){
		super();

		const persistedState = loadState();
		this.store = createStore(reducer, persistedState, applyMiddleware(thunk));
		console.log("Persisted data when creating store");
		console.log(persistedState);

		// Qlqr mudanca de estado no store eu salvo isso no localStorage
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
					<Redirect from="/" to="/home"/>
					<Route path="/" component={Layout}>
						<Route path="home" component={HomeContainer} />
						<Route path="ingredientes" component={App1Container} />
						<Route path="receitas" component={ReceitaContainer} />
						<Route path="chat" component={ChatContainer}/>
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
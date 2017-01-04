import React from "react"
import { render } from "react-dom"
import {hashHistory, Router, Route, Redirect} from "react-router"

import HomeContainer from "./containers/HomeContainer"
import App1Container from "./containers/App1Container"
import ReceitaContainer from "./containers/ReceitaContainer"
import ChatContainer from "./containers/ChatContainer"
import Layout from "./layouts/layout"

class AppRouter extends React.Component{
	render(){
		return (
			<Router history={hashHistory}>
				<Redirect from="/" to="/home"/>
				<Route path="/" component={Layout}>
					<Route path="home" component={HomeContainer} />
					<Route path="ingredientes" component={App1Container} />
					<Route path="receitas" component={ReceitaContainer} />
					<Route path="chat" component={ChatContainer} />
				</Route>
			</Router>	
		)
	}
}

const app = (
	<Router>
		<Route path="/" component={Layout} />
	</Router>
)

console.log(app)

render(<AppRouter />, document.getElementById('main_div'), function(){
	console.timeEnd('react-app')
})
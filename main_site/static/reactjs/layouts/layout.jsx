import React from "react"
import { Link } from "react-router"

export default class Layout extends React.Component{

	render(){
		return(

			<div>
				<ul className="nav nav-tabs">
				  <li role="presentation" activeClassName="active">
				  	<Link to="/home">Home</Link>
				  </li>
				  <li role="presentation">
				  	<Link to="/ingredientes">Ingredientes</Link>
				  </li>
				  <li role="presentation">
				  	<Link to="/receitas">Receitas</Link>
				  </li>
				  <li role="presentation">
				  	<Link to="/chat">Chat</Link>
				  </li>
				</ul>

				{this.props.children}
			</div>
		)
	}
}
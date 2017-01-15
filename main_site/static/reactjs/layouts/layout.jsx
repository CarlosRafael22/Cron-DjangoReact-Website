import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router"
import NavHeader from "../components/NavHeader"



export default class Layout extends React.Component{

	render(){
		return(
		<div id="wrapper">

		<NavHeader />
        
        <div id="sidebar-wrapper">
           
            <ul className="sidebar-nav">
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
        </div>
        
        <div id="page-content-wrapper">
            <div className="container-fluid">
                {this.props.children}
            </div>
        </div>
        {/*<!-- /#page-content-wrapper -->*/}

            <script>
		    {
		    	`$("#menu-toggle").click(function(e) {
		    				        e.preventDefault();
		    				        $("#wrapper").toggleClass("toggled");
		    				    });`
			}
		    </script>
    </div>

		)
	}
}
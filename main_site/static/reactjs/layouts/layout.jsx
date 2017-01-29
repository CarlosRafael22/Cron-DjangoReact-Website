import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router"
import NavHeaderContainer from "../containers/NavHeaderContainer"



export default class Layout extends React.Component{

	render(){
		return(
		<div id="wrapper">

		<NavHeaderContainer />
        
        <div id="sidebar-wrapper">
           
            <ul className="sidebar-nav">
				  <li role="presentation">
				  	<Link to="/home" activeStyle={{ color: 'red' }}>Home</Link>
				  </li>
				 <li role="presentation">
				  	<Link to="/pacientes" activeStyle={{ color: 'green' }}>Pacientes</Link>
				  </li>
				   <li role="presentation">
				  	<Link to="/coaches" activeStyle={{ color: 'green' }}>Coaches</Link>
				  </li>
				  <li role="presentation">
				  	<Link to="/receitas" activeStyle={{ color: 'blue' }}>Receitas</Link>
				  </li>
				  <li role="presentation">
				  	<Link to="/chats" activeStyle={{ color: 'yellow' }}>Chats</Link>
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
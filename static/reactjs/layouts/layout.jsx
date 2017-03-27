import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router"
import NavHeaderContainer from "../containers/NavHeaderContainer"
import {connect} from "react-redux"


class Layout extends React.Component{

	render(){

		const chatAba = (
			<li role="presentation">
			  	<Link to="/chats" activeStyle={{ color: 'yellow' }}>Chats</Link>
			</li>
		);

		const grupoAba = (
			<li role="presentation">
				<Link to="/grupos" activeStyle={{ color: 'blue' }}>Grupos</Link>
			</li>
		);

		let CoachRender = false;
		if(this.props.usuario.user != null){
			if(this.props.usuario.user.isCoach)
				CoachRender = true;
		}

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
				  {	CoachRender?
				  	chatAba
				  	:
				  	null
				  }
				  {	CoachRender?
				  	grupoAba
				  	:
				  	null
				  }
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

// PEGANDO O USUARIO DO REDUX PARA SABER SE QUEM TA LOGADO EH UM COACH
// SE FOR EU MOSTRO A ABA GRUPOS E CHATS

function mapStateToProps(state){

	return {
		usuario: state.usuario
	};
}

export default connect(mapStateToProps)(Layout)

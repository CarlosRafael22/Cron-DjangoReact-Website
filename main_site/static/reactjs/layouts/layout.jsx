import React from "react"
import { Link } from "react-router"

export default class Layout extends React.Component{

	render(){
		return(

		<div id="wrapper">

        
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

                {/*<div className="row">
                                    <div className="col-lg-12">
                                        <h1>Simple Sidebar</h1>
                                        <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                                        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
                                        <button className="btn btn-default" id="menu-toggle">Toggle Menu</button>
                                    </div>
                                </div>*/}
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
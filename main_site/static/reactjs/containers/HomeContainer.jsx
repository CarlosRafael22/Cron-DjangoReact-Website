import React from "react"


export default class HomeContainer extends React.Component{

	componentWillUnmount(){
		console.log("Terminando Home");
	}

	render(){

		const ownStyle = {
			"paddingTop": "50px"
		};

		return(

			<div className="container" style={ownStyle}>
				<form>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Email address</label>
				    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
				    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Password</label>
				    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
				  </div>
				</form>
			</div>

		)
	}
}
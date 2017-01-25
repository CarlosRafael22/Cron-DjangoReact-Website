import React from "react"
import {loadState, saveState} from '../redux/localStorage'
import {deleteReceita} from '../redux/action'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

export default class PacientePage extends React.Component{

	// constructor(props){
	// 	super(props);
	// 	console.log("PACIENTE PAGE");
	// }

	render(){
		return (
			<div className="well well-sm col-md-6">
				<div className="row">
					<h3 className="col-sm-4">{this.props.paciente.username}</h3>
					<h6 className="col-md-8">
						<span className="label label-primary">ID</span><span className="badge">{this.props.paciente.id}</span>
						<span className="label label-primary">userID</span><span className="badge">{this.props.paciente.userId}</span>
					</h6>
				</div>
				
				<h4>{this.props.paciente.email}</h4>
			</div>
			
		)
	}
}

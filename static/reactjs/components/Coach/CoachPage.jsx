import React from "react"

export default class CoachPage extends React.Component{

	render(){
		return (
			<div className="well well-sm col-md-6">
				<div className="row">
					<h3 className="col-sm-4">{this.props.coach.username}</h3>
					<h6 className="col-md-8">
						<span className="label label-primary">ID</span><span className="badge">{this.props.coach.id}</span>
						<span className="label label-primary">userID</span><span className="badge">{this.props.coach.userId}</span>
					</h6>
				</div>
				
				<h4>{this.props.coach.email}</h4>
			</div>
			
		)
	}
}

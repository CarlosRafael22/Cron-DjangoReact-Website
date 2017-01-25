import React from "react"

export default class CoachPageContainer extends React.Component{

	render(){

		return(
			<div>CoachPageContainer com id {this.props.params.coachId}</div>
		)
	}
}
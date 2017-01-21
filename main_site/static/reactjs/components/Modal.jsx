import React from "react"
import ReactDOM from "react-dom"

export default class Modal extends React.Component{

	componentDidMount(){
	    $(ReactDOM.findDOMNode(this)).modal('show');
	    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
	}

	render(){

		let button = (
			<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.buttonFunction}>{this.props.title}</button>
		)
		return(
			<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
			      </div>
			      <div className="modal-body">
			        {this.props.children}
			      </div>
			      <div className="modal-footer">
			       {button}
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}
Modal.propTypes = {
	handleHideModal: React.PropTypes.func.isRequired
}
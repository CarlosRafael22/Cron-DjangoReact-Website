import React from "react"
import {connect} from "react-redux"
import {getCoach} from "../redux/actions/coaches"
import CoachPage from "../components/CoachPage"
import {loadState, saveState} from '../redux/localStorage'

class CoachPageContainer extends React.Component{

	constructor(props){
		super(props);

		this._getCoach();
		this.state = {
			"gettingCoach" : true
		}
		this.coach = this.getCoachFromStore(this.props.params.coachId);
	}

	componentWillReceiveProps(nextProps) {
	    
	    // MUDOU O PROPS ENTAO EU ATUALIZO TODOS OS PROFILES
	    console.log("MUDOU O PROPS");
	    console.log(this.props.loading);
	   	console.log(nextProps);

	   	// Atualizando nesse ciclo o props.loading para ta bem sincronizado
	   	this.setState({"gettingCoach" : nextProps.loading});
	   	console.log("ATUALIZEI O Loading");
	    console.log(this.props.loading);
	    console.log(nextProps.loading);
    }

	_getCoach(){

		console.log("VOU PEGAR O Coach ID ", this.props.params.coachId);
		this.props.dispatch(getCoach(this.props.params.coachId));
	}

	//Com o ID da Receita eu pego essa Receita direto do Store ja que eu nao posso passar parametros para o objeto Link que dps acessaria aqui
	getCoachFromStore(coachId){
		const localState = loadState();
		const listaCoaches = localState.coaches.coachesList;
		console.log(listaCoaches[0]);
		console.log(listaCoaches[0]['id']);
		for(let i=0;i<listaCoaches.length;i++){
			if(listaCoaches[i]['id'] == coachId){
				console.log(listaCoaches[i]);
				return listaCoaches[i];
			}
		}
	}


	render(){

		console.log("RENDER DO CPCONTAINER");
		console.log(this.state.gettingCoach);
		console.log(this.props.coach);

		let view = (
			<div>
				{	this.state.gettingCoach ? 
					<div>Loading ... </div>
					:
					<div>
					<div>CoachPageContainer com id {this.props.params.coachId}</div>
					<CoachPage coach={this.props.coach} />
					</div>
				}
			</div>
		);

		let localView = (
			<div>
				<div>CoachPageContainer com id {this.props.params.coachId}</div>
				<CoachPage coach={this.coach} />
			</div>
		);

		console.log("A VIEW");
		console.log(this.coach);

		return(
			<div>{localView}</div>
		)
	}
}


function mapStateToProps(state){

	return {
		usuario: state.usuario,
		coach: state.coaches.coachVisto,
		loading: state.coaches.loading
	};
}

export default connect(mapStateToProps)(CoachPageContainer)
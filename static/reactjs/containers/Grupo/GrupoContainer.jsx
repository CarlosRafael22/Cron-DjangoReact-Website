import React from "react"
import {connect} from "react-redux"
import GrupoListContainer from "./GrupoListContainer"
import GrupoForm from "../../components/Grupo/GrupoForm"
import {addGrupo} from "../../redux/actions/grupos"
import {getCoachPatients} from "../../redux/actions/coachPatients"
import {createGrupo} from "../../util/firebaseGruposHandler"
import {getCoachGrupos} from "../../redux/actions/grupos"

import Sidebar from '../../components-dashboard/Sidebar/'
import {Spinner} from "react-mdl"

class GrupoContainer extends React.Component{


	constructor(props){
		super(props);

		this.state = {
			coachGrupos: null,
			grupoSelected: null,
			loading: true
		}

		// Ja pegando os chats desse coach para assim poder ver se esse paciente tem chat com o coach ou nao
		// if(this.props.usuario.user != null && this.props.usuario.user.isCoach){
		// 	console.log("DISPACHANDO GET GRUPOS");
		// 	this.props.dispatch(getCoachGrupos(this.props.usuario.user.username));
		// }

		// Pegando os pacientes supervisionados para colocar os checkboxes
		// Isso servia para fazer o GrupoForm mas agora nao tem pra que fazer essa requisicao
		//this._getPacientes();
		
	}


	componentDidMount(){
		
		// Assim que for criar o Componente a gnt tenta pegar os chats do coach logado
		console.log("TENTANDO PEGAR OS GRUPOS");
		//this.setState({coachGrupos : this._getCoachGrupos() });

		componentHandler.upgradeDom();
	}

	// componentWillReceiveProps(nextProps){

	// 	console.log("GRUPO CONTAINER RECEBEU PROPS");
	// 	// Se houve alguma alteracao nos grupos desse paciente entao a gnt pega de novo
	// 	if(this.props.grupos != nextProps.grupos){
	// 		console.log(nextProps.grupos);

	// 		console.log("PEGANDO O NOVO GRUPO");
	// 		//Atualizando o state que vai chamar o render 
	// 		this.setState({coachGrupos : this._getCoachGrupos() });
	// 	}
	// }

	_getPacientes(){
		console.log("PEGANDO OS Pacientes Superv");

		// VOU TER QUE CHECAR PRA VER SE ELE JA TA LOGADO E SE TIVER SE ELE EH UM COACH
		// TENHO Q FAZER AQUI TB PARA O CASO DE ELE LOGAR EM OUTRA TELA ASSIM O componentWillReceiveProps NAO VAI RODAR
		// Se eu tiver logado e for um coach eu pego os pacientes
    	if(this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach){
    		this.props.dispatch(getCoachPatients(this.props.usuario.user.coachId));
    	}
		
	}


	_getCoachGrupos(){
		console.log("GRUPO");
		console.log(this.props.usuario.user.username);
		// Se ainda nao pegou os grupos entao ele pega
		if(!this.props.grupos.gruposFetched){

			// this.props.dispatch(getCoachGrupos(this.props.usuario.user.username, this, function(coachGrupos, thisState){
			// console.log("peguei OS GRUPOS");
			// //return coachGrupos;
			// thisState.setState({coachGrupos: coachGrupos});
			// }));

			this.props.dispatch(getCoachGrupos(this.props.usuario.user.username));

		}
		 
	}

	_criarGrupo(nome_grupo, pacientesUsernames){
		console.log("MANDEI CRIAR NO GRUPOCONTAINER");
		this.props.dispatch(addGrupo(nome_grupo, this.props.usuario.user.username, pacientesUsernames, createGrupo.bind(this) ) );

		// Pegando os grupos de novo
		this.setState({coachGrupos : this._getCoachGrupos() });
	}

	render(){

		console.log("GRUPO PROPS");
		console.log(this.props);


		let view;
		console.log("GRUPO LOADING " + this.props.grupos.loading);
		if(!this.props.grupos.loading){

			view = (

			<div>
			
			{	this.props.children != null ?
				this.props.children
				:		
				<div>
					
					{/*<GrupoForm pacientes_supervisionados={this.props.pacientes} criarGrupo={this._criarGrupo.bind(this)} />*/}
					<GrupoListContainer  />
				</div>
			}
			</div>
			);
		}else{

			view = (
				<Spinner />
			);
		}

		return (
			<div>
				{view}
			</div>
		)
	}
}

function mapStateToProps(state){
	console.log("MAPEOU PRA GRUPOS");
	console.log(state);
	return {
		grupos: state.grupos,
		pacientes: state.pacientes_supervisionados.coachPatientsList,
		usuario: state.usuario
	}
}

export default connect(mapStateToProps)(GrupoContainer)
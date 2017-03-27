import React from "react"
import {connect} from "react-redux"
import GrupoListContainer from "../Grupo/GrupoListContainer"
import GrupoForm from "../../components/Grupo/GrupoForm"
import GrupoFormAdmin from "../../components/Admin/GrupoFormAdmin"
import {addGrupo} from "../../redux/actions/grupos"
import {getCoachPatients} from "../../redux/actions/coachPatients"
import {getCoaches} from "../../redux/actions/coaches"
import {createGrupo} from "../../util/firebaseGruposHandler"
import {getCoachGrupos} from "../../redux/actions/grupos"

import Sidebar from '../../components-dashboard/Sidebar/'

class AdminGrupoContainer extends React.Component{


	constructor(props){
		super(props);

		this.state = {
			coachGrupo: null,
			grupoSelected: null
		}

		// Ja pegando os chats desse coach para assim poder ver se esse paciente tem chat com o coach ou nao
		// if(this.props.usuario.user != null && this.props.usuario.user.isCoach){
		// 	console.log("DISPACHANDO GET COACHES");
		// 	this.props.dispatch(getCoachGrupos(this.props.usuario.user.username));
		// }

		// Pegando os pacientes supervisionados para colocar os checkboxes
		this._getPacientes();
		this._getCoaches();
		
	}


	// componentDidMount(){
	// 	//this.FriendlyChat = new FriendlyChat("messages");
	// 	//console.log(this.FriendlyChat.userPic);
	// 	// Assim que for criar o Componente a gnt tenta pegar os chats do coach logado
	// 	console.log("TENTANDO PEGAR OS CHATS");
	// 	//this.setState({coachGrupos : this._getCoachGrupos() });
	// 	//this.chatNames = this._getChatNames();

	// 	componentHandler.upgradeDom();
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

	_getCoaches(){

		this.props.dispatch(getCoaches());
	}


	// _getCoachGrupos(){
	// 	console.log(this.props.usuario.user.username);
	// 	 getCoachGrupos(this.props.usuario.user.username, this, function(coachGrupos, thisState){
	// 		console.log("peguei OS GRUPOS");
	// 		//return coachGrupos;
	// 		thisState.setState({coachGrupos: coachGrupos});
	// 	});
	// }

	_criarGrupo(nome_grupo, coachUsername, pacientesUsernames){
		console.log("MANDEI CRIAR NO GRUPOCONTAINER");
		this.props.dispatch(addGrupo(nome_grupo, coachUsername, pacientesUsernames, createGrupo.bind(this) ) );

		// Pegando os grupos de novo
		//this.setState({coachGrupos : this._getCoachGrupos() });
		alert("Criou grupo");
	}

	render(){

		console.log("GRUPO PROPS");
		console.log(this.props);
		return (
			<div>

				<GrupoFormAdmin pacientes={this.props.todos_pacientes} coaches={this.props.coaches.coachesList} criarGrupo={this._criarGrupo.bind(this)} />
					{/*<GrupoListContainer />*/}
			
			{/*{	this.props.children != null ?
							this.props.children
							:		
							<div>
								
								<GrupoForm pacientes_supervisionados={this.props.pacientes} criarGrupo={this._criarGrupo.bind(this)} />
								<GrupoListContainer />
							</div>
						}*/}
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
		todos_pacientes: state.pacientes.pacientesList,
		usuario: state.usuario,
		coaches: state.coaches
	}
}

export default connect(mapStateToProps)(AdminGrupoContainer)
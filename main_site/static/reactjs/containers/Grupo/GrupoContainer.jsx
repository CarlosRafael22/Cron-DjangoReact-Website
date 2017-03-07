import React from "react"
import {connect} from "react-redux"
import GrupoListContainer from "./GrupoListContainer"
import GrupoForm from "../../components/Grupo/GrupoForm"
import {addGrupo} from "../../redux/actions/grupos"
import {createGrupo} from "../../util/firebaseGruposHandler"
import {getCoachGrupos} from "../../redux/actions/grupos"

import Sidebar from '../../components-dashboard/Sidebar/'

class GrupoContainer extends React.Component{


	constructor(props){
		super(props);

		this.state = {
			coachGrupo: null,
			grupoSelected: null
		}

		// Ja pegando os chats desse coach para assim poder ver se esse paciente tem chat com o coach ou nao
		if(this.props.usuario.user != null && this.props.usuario.user.isCoach){
			console.log("DISPACHANDO GET COACHES");
			this.props.dispatch(getCoachGrupos(this.props.usuario.user.username));
		}
		
	}


	componentDidMount(){
		//this.FriendlyChat = new FriendlyChat("messages");
		//console.log(this.FriendlyChat.userPic);
		// Assim que for criar o Componente a gnt tenta pegar os chats do coach logado
		console.log("TENTANDO PEGAR OS CHATS");
		this.setState({coachGrupos : this._getCoachGrupos() });
		//this.chatNames = this._getChatNames();

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


	_getCoachGrupos(){
		console.log(this.props.usuario.user.username);
		 getCoachGrupos(this.props.usuario.user.username, this, function(coachGrupos, thisState){
			console.log("peguei OS GRUPOS");
			//return coachGrupos;
			thisState.setState({coachGrupos: coachGrupos});
		});
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
		return (
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
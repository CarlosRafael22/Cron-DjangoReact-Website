import React from "react"
import {connect} from "react-redux"
import {getPatient} from "../redux/actions/patients"
import PacientePage from "../components/PacientePage"
import {loadState, saveState} from '../redux/localStorage'

import {createChat} from "../util/firebaseChatHandler"

import {checkChatExists, addChat, getCoachChats} from "../redux/actions/chats"

class PacientePageContainer extends React.Component{

	constructor(props){
		super(props);

		this._getPaciente();
		this.state = {
			gettingPatient : true,
			chatExiste: false,
			chatCriado: false,
			specialRender: false
		}
		this.paciente = this.getPacienteFromStore(this.props.params.pacienteId);

		// Ja pegando os chats desse coach para assim poder ver se esse paciente tem chat com o coach ou nao
		if(this.props.usuario.user != null && this.props.usuario.user.isCoach){
			console.log("DISPACHANDO GET CHATS");
			this.props.dispatch(getCoachChats(this.props.usuario.user.username));
		}
		
	}

	// Para que ele atualize a pagina mesmo se so for mudar o id fdo Paciente na url
	// componentWillMount(){
	// 	console.log("ATUALIZANDO NO WILLMOUNT");
	// 	this._getPaciente();
	// 	this.paciente = this.getPacienteVistoFromStore(this.props.params.pacienteId);
	// }
	// componentWillUpdate(nextProps, nextState){
	// 	console.log("ATUALIZANDO NO WILLMOUNT");
	// 	this._getPaciente();
	// 	this.paciente = this.getPacienteVistoFromStore(this.props.params.pacienteId);
	// }

	componentDidMount(){

		// Checar pra ver se usuario ta logado e se eh coach
		// So se cumprir essas duas condicoes eh que eu boto o botao de CriarChat e o ChatMDL
		//const CoachRender = this.props.usuario != null && this.props.usuario.user.isCoach;
		let CoachRender = false;
		if(this.props.usuario.user != null){
			if(this.props.usuario.user.isCoach){
				CoachRender = true;
			}
		}
		console.log("COACH RENDER NO MOUNT");
		console.log(CoachRender);
		if(CoachRender){
			this.setState({specialRender:true});
			this.chatID = "c"+this.props.usuario.user.coachId.toString()+"p"+this.paciente.id.toString();
		}

		// Se for logado e coach entao a gnt tenta pegar o chat, senao nao faz nada
		console.log("DIDMOUNT RENDER");
		console.log(this.state.specialRender);
		if(CoachRender){
			console.log("Vendo se ja tem chat criado");
			// Pegando o chat do state
			console.log(this.chatID);
			//const chat = this._getChatFromStore(this.chatID);
			const chat = this._getChatFromProps(this.chatID);
			console.log(chat);

			// Se tiver o chat com essa ID a gnt mostra o ChatMDL
			if(chat != null){
				this.setState({chatExiste: true});
			}
		}
		
	}

	componentWillReceiveProps(nextProps) {
	    
	    // MUDOU O PROPS ENTAO EU ATUALIZO TODOS OS PROFILES
	    console.log("MUDOU O PROPS");
	    console.log(this.props.loading);
	   	console.log(nextProps);

	   	// Atualizando nesse ciclo o props.loading para ta bem sincronizado
	   	this.setState({"gettingPatient" : nextProps.loading});
	   	console.log("ATUALIZEI O Loading");
	    console.log(this.props.loading);
	    console.log(nextProps.loading);
    }

	_getPaciente(){

		console.log("VOU PEGAR O PACIENTE ID ", this.props.params.pacienteId);
		this.props.dispatch(getPatient(this.props.params.pacienteId));
	}


	//Com o ID da Receita eu pego essa Receita direto do Store ja que eu nao posso passar parametros para o objeto Link que dps acessaria aqui
	getPacienteVistoFromStore(){
		const localState = loadState();
		console.log("PEGUEI DO STORE");
		console.log(localState);
		const paciente = localState.pacientes.pacienteVisto;
		console.log(paciente);
		return paciente;
	}

	//Com o ID da Receita eu pego essa Receita direto do Store ja que eu nao posso passar parametros para o objeto Link que dps acessaria aqui
	getPacienteFromStore(pacienteId){
		const localState = loadState();
		const listaPacientes = localState.pacientes.pacientesList;
		console.log(listaPacientes[0]);
		console.log(listaPacientes[0]['id']);
		for(let i=0;i<listaPacientes.length;i++){
			if(listaPacientes[i]['id'] == pacienteId){
				console.log(listaPacientes[i]);
				return listaPacientes[i];
			}
		}
	}


	// Vendo se o paciente ta na lista de pacientes supervisionados pelo coach
	// Se tiver entao ele vai poder criar o chat com esse paciente
	checkPacienteSupervisionadoFromProps(pacienteUsername){
		const listaPacientes = this.props.pacientes_supervisionados;

		// Primeiro eu tenho que ver se ele tem algum paciente supervisionado, se tiver ai sim eu procuro ele nessa lista
		if(listaPacientes.length > 0){
			console.log(listaPacientes);
			console.log(listaPacientes[0]['id']);
			for(let i=0;i<listaPacientes.length;i++){
				if(listaPacientes[i]['username'] == pacienteUsername){
					console.log(listaPacientes[i]);
					return listaPacientes[i];
				}
			}
		}
		
		// se nao tiver entao retorna null para nao retornar undefined
		return null;
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Com o ID da Receita eu pego essa Receita direto do Store ja que eu nao posso passar parametros para o objeto Link que dps acessaria aqui
	_getChatFromStore(chatNameID){
		console.log("PEGANDO CHAT DO STORE");
		const localState = loadState();
		const listaChats = localState.chats.chats;
		console.log(listaChats);
		console.log(listaChats[0]);
		// console.log(listaChats[0]['chatNameID']);
		for(let i=0;i<listaChats.length;i++){
			if(listaChats[i]['chatNameID'] == chatNameID){
				console.log(listaChats[i]);
				return listaChats[i];
			}
		}
	}

	_getChatFromProps(chatNameID){
		console.log("PEGANDO CHAT DO PROPS");
		const listaChats = this.props.chats.coachChats;
		console.log(listaChats);
		console.log(listaChats[0]);
		// console.log(listaChats[0]['chatNameID']);
		for(let i=0;i<listaChats.length;i++){
			if(listaChats[i]['chatNameID'] == chatNameID){
				console.log(listaChats[i]);
				return listaChats[i];
			}
		}
	}	


	_criarChatPaciente(){
		console.log("VOU CRIAR O CHAT");
		
		console.log(this.props);
		createChat(this.props.usuario.user.coachId, this.props.paciente.id, this.props.usuario.user.username, this.props.paciente.username);

		// AGORA O ADDCHAT ESTA RECEBENDO UMA LISTA DE USERNAMES DOS PACIENTES PARA NO CASO DE EU CRIAR UM CHAT PARA O GRUPO TB
		// ENTAO AQUI A GNT BOTA O USERNAME NUMA LISTA
		pacUsernameArray = [this.props.paciente.username];
		this.props.dispatch(addChat(this.chatID, this.props.usuario.user.username, pacUsernameArray));

		console.log("ATUALIZEI O PROPS DE CHAT");
		console.log(this.props.chats);

		this.setState({chatCriado: true, chatExiste: true});

	}

	render(){

		console.log("RENDER DO PPCONTAINER");
		console.log(this.state.gettingPatient);
		console.log(this.props.paciente);

		let view = (
			<div>
				{	this.state.gettingPatient ? 
					<div>Loading ... </div>
					:
					<div>
					<div>PacientePageContainer com id {this.props.params.pacienteId}</div>
					<PacientePage paciente={this.props.paciente} usuario={this.props.usuario}
					criarChat={this._criarChatPaciente.bind(this)} />
					</div>
				}
			</div>
		);

		let viewVisto = (
			<div>
				{	this.state.gettingPatient ? 
					<div>Loading ... </div>
					:
					<div>
					<div>PacientePageContainer com id {this.props.params.pacienteId}</div>
					<PacientePage paciente={this.props.paciente} usuario={this.props.usuario}
					criarChat={this._criarChatPaciente.bind(this)} />
					</div>
				}
			</div>
		);

		// Vou verificar aqui se vai ter o botao de criar o chat na pagina do paciente, isso depende de:
		// Usuario logado eh coach
		// coach ja tem esse paciente na lista de supervisionados

		// Pegando pra ver se paciente eh supervisionado
		console.log(this.paciente);

		// Se quem tiver logado for coach eu vou ver se ele tem esse paciente como supervisionado
		let paciente = null;
		if((this.props.usuario.user !=null) && (this.props.usuario.user.isCoach)){
			paciente = this.checkPacienteSupervisionadoFromProps(this.paciente.username);
		}
		
		console.log(paciente);
		console.log(this.state.chatExiste);
		const ButtonCondition = ( (this.props.usuario.user !=null) && (this.props.usuario.user.isCoach) && (paciente != null) && !this.state.chatExiste );
		console.log("CONDICAO DO BOTAO");
		console.log(ButtonCondition);
		console.log(this.state.chatExiste);
		let localView;

		if(ButtonCondition){
			console.log("VOU MANDAR COM CRIARCHAT");
			localView = (
			<div>
				<div>PacientePageContainer com id {this.props.params.pacienteId}</div>
				<PacientePage paciente={this.paciente} usuario={this.props.usuario} 
				criarChat={this._criarChatPaciente.bind(this)}/>
			</div>
			);
		}else{
			console.log("VOU MANDAR SEM BOTAO");
			localView = (
			<div>
				<div>PacientePageContainer com id {this.props.params.pacienteId}</div>
				<PacientePage paciente={this.paciente} usuario={this.props.usuario}
				chatExiste={this.state.chatExiste} />
			</div>
			);
		}
		// let localView = (
		// 	<div>
		// 		<div>PacientePageContainer com id {this.props.params.pacienteId}</div>
		// 		<PacientePage paciente={this.paciente} usuario={this.props.usuario} 
		// 		criarChat={this._criarChatPaciente.bind(this)}/>
		// 	</div>
		// );

		

		console.log("A VIEW");
		console.log(this.paciente);

		return(
			<div>{localView}</div>
		)
	}
}


function mapStateToProps(state){

	return {
		usuario: state.usuario,
		paciente: state.pacientes.pacienteVisto,
		loading: state.pacientes.loading,
		chats: state.chats,
		pacientes_supervisionados: state.pacientes_supervisionados.coachPatientsList
	};
}

export default connect(mapStateToProps)(PacientePageContainer)
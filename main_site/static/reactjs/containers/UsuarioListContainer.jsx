import React from "react"
import UsuarioList from "../components/UsuarioList"
import getProfiles from "../redux/actions/profiles"
import getCoaches from "../redux/actions/coaches"
import getPatients from "../redux/actions/patients"
import { connect } from 'react-redux'
import { Link } from 'react-router'

class UsuarioListContainer extends React.Component{

	constructor(props){
		super(props);
		console.log("Profiles");
		console.log(this.props.profiles);
		console.log("User na sessao");
		console.log(this.props.usuario);
		this._getProfiles();

		this.state = {
			all_profiles: []
		}
	}

	// // Usado para qd ele for logar e ja estiver na view de Usuarios
	// componentWillReceiveProps(nextProps) {
	//     if (this.props.usuario.isAuthenticated !== nextProps.usuario.isAuthenticated) {
	//     	console.log("TO INDO ATUALIZAR O PROPS");

	//     	// Se eu tiver logado e for um coach eu pego os pacientes
	//     	if(nextProps.usuario.isAuthenticated && nextProps.usuario.user.isCoach){
	//     		this.props.dispatch(getCoachPatients(nextProps.usuario.user.coachId));
	//     	}else if(!nextProps.usuario.isAuthenticated){
	//     		// Se tiver deslogando entao eu mostro todos os perfis
	//     		this.props.dispatch(getProfiles());
	//     	}

	    	
	//       	//nextProps.load();
	      	
	//       	//this._getSupervisonedProfilesOfCoach(nextProps.usuario.coachId);
	//     }
 //    }

	_getProfiles(){
		console.log("PEGANDO OS PERFIS");
		this.props.dispatch(getProfiles());

		console.log("PEGANDO OS PACIENTES");
		this.props.dispatch(getPatients());

		console.log("PEGANDO OS COACHES");
		this.props.dispatch(getCoaches());

		// // VOU TER QUE CHECAR PRA VER SE ELE JA TA LOGADO E SE TIVER SE ELE EH UM COACH
		// // TENHO Q FAZER AQUI TB PARA O CASO DE ELE LOGAR EM OUTRA TELA ASSIM O componentWillReceiveProps NAO VAI RODAR
		// // Se eu tiver logado e for um coach eu pego os pacientes
  //   	if(this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach){
  //   		this.props.dispatch(getCoachPatients(this.props.usuario.user.coachId));
  //   	}else if( (!this.props.usuario.isAuthenticated) || (!this.props.usuario.user.isCoach) ){
  //   		// Se tiver deslogando entao eu mostro todos os perfis
  //   		this.props.dispatch(getProfiles());
  //   	}
		
	}

	componentDidMount(){

		// JUNTANDO TODOS OS TIPOS DE USER PARA MANDAR PARA O USUARIOLIST
		const all_profiles = this.props.pacientes.concat(this.props.coaches);
		console.log("ATUALIZANDO TODO O STATE COM OS PERFIS");
		this.setState({all_profiles:all_profiles});

	}

	// Vou ver se ta logado, se tiver eu faco uma requisicao pegando so os perfis supervisionados e mando como props
	// Metodo so vai ser chamado se o user logado for um coach!
	// _getSupervisonedProfilesOfCoach(coachId){
	// 	console.log("MANDANDO REQUST PEGAR PACIENTES");
	// 	this.props.dispatch(getCoachPatients(coachId));
	// 	//return 
	// }

	_getView(){
		const coachLoggedView = (

			<div>
				<ul class="nav nav-tabs">
				  <li role="presentation" class="active"><a href="#">Home</a></li>
				  <li role="presentation"><a href="#">Profile</a></li>
				  <li role="presentation"><a href="#">Messages</a></li>
				</ul>
				<UsuarioList profiles={this.props.profiles} />
			</div>
		);

		const standardView = (
			<UsuarioList profiles={this.props.profiles} />
		);

		let usuarioListView;
		if(this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach){
			usuarioListView = coachLoggedView;
		}else{
			usuarioListView = standardView;
		}

		return usuarioListView;

	}

	render(){


		const coachLoggedView = (

			<div>
				<ul className="nav nav-tabs">
				  <li role="presentation" className="active"><a href="#">Home</a></li>
				  <li role="presentation"><a href="#">Messages</a></li>
				</ul>
				<UsuarioList profiles={this.props.profiles} />
			</div>
		);

		const standardView = (
			<UsuarioList profiles={this.props.profiles} />
		);

		let usuarioListView;
		if(this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach){
			usuarioListView = coachLoggedView;
		}else{
			usuarioListView = standardView;
		}

		console.log("Vou RENDER O UsuarioList");
		console.log(this.props.profiles);
		let coachRender = this.props.usuario.isAuthenticated && this.props.usuario.user.isCoach;
		// {coachRender ? coachLoggedView : standardView}
		// Dentro da div

		// Passo o usuario logado pq ai qd for fazer o UsuarioInfoBox, cada caixa vai ver se quem ta logado eh um coach e se eh o coach do Paciente 
		// que ela representa. Assim o botao vai ser renderizado de acordo.
		return(
			<div>
				{ this.props.usuario.user != null ? 
				<UsuarioList profiles={this.state.all_profiles} userLogado={this.props.usuario.user} />
				:
				<UsuarioList profiles={this.state.all_profiles} />
				}
			</div>
						
		)
	}
}


function mapStateToProps(state){
	console.log("StateProps mapeado UsuarioList");
  	console.log(state); // state

  	// O state.profiles vai retornar:
  	// {loading: false, profilesList: [array de Objetos]}
  	// Eu tb tenho que ver o state.usuario pra saber quem ta logado e assim se for um coach eu pego os pacientes dele
	return {
		usuario: state.usuario,
		profiles: state.profiles.profilesList,
		coaches: state.coaches.coachesList,
		pacientes: state.pacientes.pacientesList
	};
}

export default connect(mapStateToProps)(UsuarioListContainer)
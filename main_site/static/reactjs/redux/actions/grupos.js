import {addChat} from "./chats"


export const ADD_GRUPO_REQUEST = 'ADD_GRUPO_REQUEST'
export const ADD_GRUPO_SUCCESS = 'ADD_GRUPO_SUCCESS'
export const ADD_GRUPO_FAILURE = 'ADD_GRUPO_FAILURE'


function addGrupoRequest(){
  console.log("Indo add Grupo do coach no action!");
  return {
    type: ADD_GRUPO_REQUEST,
    loading: true 
  }
}

function addGrupoSuccess(coachGrupos){
  console.log("Adicionar Grupo no action");
  return {
    type: ADD_GRUPO_SUCCESS,
    loading: false,
    coachGrupos: coachGrupos
  }
}

function addGrupoFailure(errorMessage){
  console.log("Deu merda no add coach Grupo no action");
  return {
    type: ADD_GRUPO_FAILURE,
    loading: false,
    errorMessage
  }
}

export function addGrupo(grupoName, coachUsername, pacientesUsernames, firebaseCallback){

  console.log("Indo add grupo no action");
  return dispatch => {

    // Nao pode mandar array para a request entao tenho que stringify
    const pacUsernamesSTR = JSON.stringify(pacientesUsernames);

    const data = {"nome_grupo": grupoName, "coachUsername": coachUsername, "pacientesUsernames": pacUsernamesSTR}
    console.log(data);
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(addGrupoRequest());


    jQuery.ajax({
      type: 'POST',
      url: '/api/grupos/',
      data: data
    }).done(gruposInfo => {

      console.log("TODOS OS GrupoS DESSE COACH");
      console.log(gruposInfo);

      // Vou criar o chat no Firebase aqui pq eu uso o ID do Django

      // Ele vai retornar as infos de todos os chats
      // Pra pegar o recem criado e criar no Firebase eu pego o ultimo da lista retornada
      console.log("ULTIMO CHAT ADICIONADO");
      const new_added_grupo = gruposInfo[gruposInfo.length-1];
      console.log(new_added_grupo);
      console.log("INDO ADICIONAR NO FIREBASE");
      firebaseCallback(new_added_grupo['grupo_id'], new_added_grupo['nome_grupo'], new_added_grupo['coach'], new_added_grupo['pacientesUsernames']);

      // Dispatch the success action
      dispatch(addGrupoSuccess(gruposInfo));

      // Criando um chat tb para esse grupo no Django
      const chatID = "C"+coachUsername+"G"+new_added_grupo['grupo_id'].toString();
      console.log("INDO CRIAR CHAT NO DJANGO");
      dispatch(addChat(chatID, coachUsername, pacientesUsernames));
      
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(addGrupoFailure(error));

    });

  }
}


export const GET_COACH_GRUPOS_REQUEST = 'GET_COACH_GRUPOS_REQUEST'
export const GET_COACH_GRUPOS_SUCCESS = 'GET_COACH_GRUPOS_SUCCESS'
export const GET_COACH_GRUPOS_FAILURE = 'GET_COACH_GRUPOS_FAILURE'

function getCoachGruposRequest(){
  console.log("Pegando Grupos do coach no action!");
  return {
    type: GET_COACH_GRUPOS_REQUEST,
    loading: true 
  }
}

function getCoachGruposSuccess(coachGrupos){
  console.log("Pegou Grupos do coach no action");
  return {
    type: GET_COACH_GRUPOS_SUCCESS,
    loading: false,
    coachGrupos: coachGrupos
  }
}

function getCoachGruposFailure(errorMessage){
  console.log("Deu merda Grupos do coach no action");
  return {
    type: GET_COACH_GRUPOS_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getCoachGrupos(coachUsername){

  console.log("Tentando pegar Grupos do coach no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(getCoachGruposRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/grupos/coach/'+coachUsername
    }).done(gruposInfo => {

      console.log("TODOS OS GrupoS DESSE COACH");
      console.log(gruposInfo);
      // Dispatch the success action
      dispatch(getCoachGruposSuccess(gruposInfo));
      
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(getCoachGruposFailure(error));

    });

  }
}
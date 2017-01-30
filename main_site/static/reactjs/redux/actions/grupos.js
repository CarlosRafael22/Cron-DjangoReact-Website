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

export function addGrupo(grupoNameID, coachUsername, pacienteUsername){

  console.log("checando se Grupo existe no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(addGrupoRequest());

    const data = {"grupoNameID":grupoNameID, "coachUsername":coachUsername, "pacienteUsername": pacienteUsername}
    jQuery.ajax({
      type: 'POST',
      url: '/api/grupos/',
      data: data
    }).done(gruposInfo => {

      console.log("TODOS OS GrupoS DESSE COACH");
      console.log(gruposInfo);
      // Dispatch the success action
      dispatch(addGrupoSuccess(gruposInfo));
      
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
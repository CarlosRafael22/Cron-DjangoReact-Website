// There are three possible states for our login
// process and we need actions for each of them
export const COACHES_REQUEST = 'COACHES_REQUEST'
export const COACHES_SUCCESS = 'COACHES_SUCCESS'
export const COACHES_FAILURE = 'COACHES_FAILURE'

function coachesRequest(){
  console.log("Pegando os coaches no action!");
  return {
    type: COACHES_REQUEST,
    loading: true 
  }
}

function coachesSuccess(coachesList){
  console.log("Pegou os coaches no action");
  return {
    type: COACHES_SUCCESS,
    loading: false,
    coachesList: coachesList
  }
}

function coachesFailure(errorMessage){
  console.log("Deu merda nos coaches no action");
  return {
    type: COACHES_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getCoaches(){

  console.log("getCoaches no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(coachesRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/coaches/',
      contentType: 'application/json'
    }).done(coaches => {

      console.log(coaches);
      // Dispatch the success action
      dispatch(coachesSuccess(coaches));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(coachesFailure(error))

    });

  }
}


export const GET_COACH_REQUEST = 'GET_COACH_REQUEST'
export const GET_COACH_SUCCESS = 'GET_COACH_SUCCESS'
export const GET_COACH_FAILURE = 'GET_COACH_FAILURE'

function getCoachRequest(){
  console.log("Pegando os coach no action!");
  return {
    type: GET_COACH_REQUEST,
    loading: true 
  }
}

function getCoachSuccess(coach){
  console.log("Pegou os coach no action");
  return {
    type: GET_COACH_SUCCESS,
    loading: false,
    coachVisto: coach
  }
}

function getCoachFailure(errorMessage){
  console.log("Deu merda nos coach no action");
  return {
    type: GET_COACH_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getCoach(coachId){

  console.log("getCoach no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(getCoachRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/coaches/'+coachId.toString(),
      contentType: 'application/json'
    }).done(coach => {

      console.log(coach);
      // Dispatch the success action
      dispatch(getCoachSuccess(coach));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(getCoachFailure(error))

    });

  }
}


export const GET_COACH_PROFILE_PICTURE_REQUEST = 'GET_COACH_PROFILE_PICTURE_REQUEST'
export const GET_COACH_PROFILE_PICTURE_SUCCESS = 'GET_COACH_PROFILE_PICTURE_SUCCESS'
export const GET_COACH_PROFILE_PICTURE_FAILURE = 'GET_COACH_PROFILE_PICTURE_FAILURE'

function getCoachProfilePictureRequest(){
  console.log("Pegando a foto do coach no action!");
  return {
    type: GET_COACH_PROFILE_PICTURE_REQUEST,
    loading: true 
  }
}

function getCoachProfilePictureSuccess(coach){
  console.log("Pegou a foto do coach no action");
  return {
    type: GET_COACH_PROFILE_PICTURE_SUCCESS,
    loading: false,
    coachVisto: coach
  }
}

function getCoachProfilePictureFailure(errorMessage){
  console.log("Deu merda na foto do coach no action");
  return {
    type: GET_COACH_PROFILE_PICTURE_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getCoachProfilePicture(coachUsername){

  console.log("getCoachProfilePicture no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(getCoachProfilePictureRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/fotos_perfis/'+coachUsername.toString(),
      contentType: 'application/json'
    }).done(coach => {

      console.log(coach);
      // Dispatch the success action
      dispatch(getCoachProfilePictureSuccess(coach));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(getCoachProfilePictureFailure(error))

    });

  }
}
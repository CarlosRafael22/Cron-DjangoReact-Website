// There are three possible states for our login
// process and we need actions for each of them
export const PATIENTS_REQUEST = 'PATIENTS_REQUEST'
export const PATIENTS_SUCCESS = 'PATIENTS_SUCCESS'
export const PATIENTS_FAILURE = 'PROFILES_FAILURE'

function patientsRequest(){
  console.log("Pegando os profiles no action!");
  return {
    type: PATIENTS_REQUEST,
    loading: true 
  }
}

function patientsSuccess(profilesList){
  console.log("Pegou os profiles no action");
  return {
    type: PATIENTS_SUCCESS,
    loading: false,
    profilesList: profilesList
  }
}

function patientsFailure(errorMessage){
  console.log("Deu merda nos profiles no action");
  return {
    type: PROFILES_FAILURE,
    loading: false,
    errorMessage
  }
}

export default function getPatients(){

  console.log("getPatients no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(patientsRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/pacientes/',
      contentType: 'application/json'
    }).done(pacientes => {

      console.log(pacientes);
      // Dispatch the success action
      dispatch(patientsSuccess(pacientes));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(patientsFailure(error))

    });

  }
}
// There are three possible states for our login
// process and we need actions for each of them
export const PATIENTS_REQUEST = 'PATIENTS_REQUEST'
export const PATIENTS_SUCCESS = 'PATIENTS_SUCCESS'
export const PATIENTS_FAILURE = 'PATIENTS_FAILURE'

function patientsRequest(){
  console.log("Pegando os profiles no action!");
  return {
    type: PATIENTS_REQUEST,
    loading: true 
  }
}

function patientsSuccess(pacientesList){
  console.log("Pegou os profiles no action");
  return {
    type: PATIENTS_SUCCESS,
    loading: false,
    pacientesList: pacientesList
  }
}

function patientsFailure(errorMessage){
  console.log("Deu merda nos profiles no action");
  return {
    type: PATIENTS_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getPatients(){

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


export const GET_PATIENT_REQUEST = 'GET_PATIENT_REQUEST'
export const GET_PATIENT_SUCCESS = 'GET_PATIENT_SUCCESS'
export const GET_PATIENT_FAILURE = 'GET_PATIENT_FAILURE'

function getPatientRequest(){
  console.log("Pegando os profiles no action!");
  return {
    type: GET_PATIENT_REQUEST,
    loading: true 
  }
}

function getPatientSuccess(paciente){
  console.log("Pegou os profiles no action");
  return {
    type: GET_PATIENT_SUCCESS,
    loading: false,
    pacienteVisto: paciente
  }
}

function getPatientFailure(errorMessage){
  console.log("Deu merda nos profiles no action");
  return {
    type: GET_PATIENT_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getPatient(pacienteId){

  console.log("getPatient no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(getPatientRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/pacientes/'+pacienteId.toString(),
      contentType: 'application/json'
    }).done(paciente => {

      console.log(paciente);
      // Dispatch the success action
      dispatch(getPatientSuccess(paciente));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(getPatientFailure(error))

    });

  }
}
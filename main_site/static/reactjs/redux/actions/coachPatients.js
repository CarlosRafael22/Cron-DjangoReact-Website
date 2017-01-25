import getPatients from "./patients"
// TO IMPORTANDO PQ AO ATUALIZAR A LISTA DE PACIENTES SUPERVISIONADOS EU TENHO QUE ATUALIZAR A LISTA DOS PACIENTES QUE SERAM
// MOSTRADOS NO USUARIOLISTCONTAINER, MAS PARA ATUALIZA-LO EU TENHO QUE ATUALIZAR O REDUCER DO PACIENTE



// There are three possible states for our login
// process and we need actions for each of them
export const COACH_PATIENTS_REQUEST = 'COACH_PATIENTS_REQUEST'
export const COACH_PATIENTS_SUCCESS = 'COACH_PATIENTS_SUCCESS'
export const COACH_PATIENTS_FAILURE = 'COACH_PATIENTS_FAILURE'

function coachPatientsRequest(){
  console.log("Pegando os pacientes do coach no action!");
  return {
    type: COACH_PATIENTS_REQUEST,
    loading: true 
  }
}

function coachPatientsSuccess(coachPatientsList){
  console.log("Pegou os pacientes do coach no action");
  return {
    type: COACH_PATIENTS_SUCCESS,
    loading: false,
    coachPatientsList: coachPatientsList
  }
}

function coachPatientsFailure(errorMessage){
  console.log("Deu merda nos pacientes do coach no action");
  return {
    type: COACH_PATIENTS_FAILURE,
    loading: false,
    errorMessage
  }
}

export function getCoachPatients(coachId){

  console.log("getCoachPatients no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(coachPatientsRequest());

    jQuery.ajax({
      type: 'GET',
      url: '/api/coaches/'+coachId.toString()+'/pacientes_supervisionados/',
      contentType: 'application/json'
    }).done(pacientes_supervisionados => {
      console.log("PAC SUPERVISIONADOS");
      console.log(pacientes_supervisionados);
      // Dispatch the success action
      dispatch(coachPatientsSuccess(pacientes_supervisionados));
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(coachPatientsFailure(error))

    });

  }
}


export const ADD_COACH_PATIENTS_REQUEST = 'ADD_COACH_PATIENTS_REQUEST'
export const ADD_COACH_PATIENTS_SUCCESS = 'ADD_COACH_PATIENTS_SUCCESS'
export const ADD_COACH_PATIENTS_FAILURE = 'ADD_COACH_PATIENTS_FAILURE'

function addCoachPatientsRequest(){
  console.log("Pegando os pacientes do coach no action!");
  return {
    type: ADD_COACH_PATIENTS_REQUEST,
    loading: true 
  }
}

function addCoachPatientsSuccess(coachPatientsList){
  console.log("Pegou os pacientes do coach no action");
  return {
    type: ADD_COACH_PATIENTS_SUCCESS,
    loading: false,
    coachPatientsList: coachPatientsList
  }
}

function addCoachPatientsFailure(errorMessage){
  console.log("Deu merda nos pacientes do coach no action");
  return {
    type: ADD_COACH_PATIENTS_FAILURE,
    loading: false,
    errorMessage
  }
}

export function addCoachPatient(coachId, pacienteId){

  console.log("getCoachPatients no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(addCoachPatientsRequest());

    // You need to send the payload as a serialized json object.
    // Otherwise what happens is that DRF will actually complain about:
    let paciente = {"idPaciente" : pacienteId};
    paciente = JSON.stringify(paciente);
    jQuery.ajax({
      type: 'POST',
      url: '/api/coaches/'+coachId.toString()+'/pacientes_supervisionados/',
      data: paciente,
      contentType: 'application/json'
    }).done(pacientes_supervisionados => {
      console.log("NOVOS PAC SUPERVISIONADOS");
      console.log(pacientes_supervisionados);
      // Dispatch the success action
      dispatch(addCoachPatientsSuccess(pacientes_supervisionados));

      //aTUALIZANDO A LISTA DOS PACIENTES
      dispatch(getPatients());
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(addCoachPatientsFailure(error))

    });

  }
}


export const DELETE_COACH_PATIENTS_REQUEST = 'DELETE_COACH_PATIENTS_REQUEST'
export const DELETE_COACH_PATIENTS_SUCCESS = 'DELETE_COACH_PATIENTS_SUCCESS'
export const DELETE_COACH_PATIENTS_FAILURE = 'DELETE_COACH_PATIENTS_FAILURE'

function deleteCoachPatientsRequest(){
  console.log("Pegando os pacientes do coach no action!");
  return {
    type: DELETE_COACH_PATIENTS_REQUEST,
    loading: true 
  }
}

function deleteCoachPatientsSuccess(coachPatientsList){
  console.log("Pegou os pacientes do coach no action");
  return {
    type: DELETE_COACH_PATIENTS_SUCCESS,
    loading: false,
    coachPatientsList: coachPatientsList
  }
}

function deleteCoachPatientsFailure(errorMessage){
  console.log("Deu merda nos pacientes do coach no action");
  return {
    type: DELETE_COACH_PATIENTS_FAILURE,
    loading: false,
    errorMessage
  }
}

export function deleteCoachPatient(coachId, pacienteId){

  console.log("deleteCoachPatients no action");
  return dispatch => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(deleteCoachPatientsRequest());

    let paciente = {"idPaciente" : pacienteId};
    paciente = JSON.stringify(paciente);
    jQuery.ajax({
      type: 'DELETE',
      url: '/api/coaches/'+coachId.toString()+'/pacientes_supervisionados/',
      data: paciente,
      contentType: 'application/json'
    }).done(pacientes_supervisionados => {
      console.log("PAC SUPERVISIONADOS DPS DO DELETE");
      console.log(pacientes_supervisionados);
      // Dispatch the success action
      dispatch(deleteCoachPatientsSuccess(pacientes_supervisionados));

      //aTUALIZANDO A LISTA DOS PACIENTES
      dispatch(getPatients());
    })
    .fail(function(xhr, status, error){
      console.log(error);
      console.log(xhr);

      // console.log(response);
      dispatch(deleteCoachPatientsFailure(error))

    });

  }
}
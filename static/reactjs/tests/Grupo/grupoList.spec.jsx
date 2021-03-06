import React from "react"
import {shallow, mount, render} from "enzyme"
import {expect} from "chai"

import { sinon, spy } from "sinon"

import GrupoBox from "../../components/Grupo/GrupoBox"
import GrupoList from "../../components/Grupo/GrupoList"

describe('<GrupoList/>', () => {
	const pacientes1 = [
	{"id": 1, "foto_perfil": "http://localhost:8000/media/fad260e3-c530-48ec-ad0a-d546e6ebd2e2.jpg"},
	{"id": 2, "foto_perfil": "http://localhost:8000/media/fad260e3-c530-48ec-ad0a-d546e6ebd2e2.jpg"}];

	const grupo1 = {
		"nome_grupo": "Grupo 1",
		"grupo_id": 2,
		"pacientes": pacientes1,
		"data_inicio": "2017-02-24"
	};


  const pacientes2 = [
  {"id": 3, "foto_perfil": "http://localhost:8000/media/fad260e3-c530-48ec-ad0a-d546e6ebd2e2.jpg"},
  {"id": 4, "foto_perfil": "http://localhost:8000/media/fad260e3-c530-48ec-ad0a-d546e6ebd2e2.jpg"}];

  const grupo2 = {
    "nome_grupo": "Grupo 1",
    "grupo_id": 3,
    "pacientes": pacientes2,
    "data_inicio": "2017-02-24"
  };

  const grupos = [grupo1, grupo2];

	const coachUsername = "debora";

	it('should have props grupos and coachUsername', function () {
    	const wrapper = shallow(<GrupoList grupos={grupos} coachUsername={coachUsername} />);
    	expect(wrapper.props().grupos).to.be.defined;
    	expect(wrapper.props().coachUsername).to.be.defined;
    	//expect(wrapper.props().src).to.be.defined;
  	});

  	it('should have <GrupoBox /> components', function () {
    	const wrapper = shallow(<GrupoList grupos={grupos} coachUsername={coachUsername} />);
    	expect(wrapper.find(GrupoBox)).to.have.length(2);
    	//expect(wrapper.props().src).to.be.defined;
  	});

});
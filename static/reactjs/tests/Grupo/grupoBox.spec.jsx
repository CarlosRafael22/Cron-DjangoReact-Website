import React from "react"
import {shallow, mount, render} from "enzyme"
import {expect} from "chai"

import { sinon, spy } from "sinon"

import GrupoBox from "../../components/Grupo/GrupoBox"
import {Link} from "react-router"

describe('<GrupoBox/>', () => {
	const pacientes = [
	{"id": 1, "foto_perfil": "http://localhost:8000/media/fad260e3-c530-48ec-ad0a-d546e6ebd2e2.jpg"},
	{"id": 2, "foto_perfil": "http://localhost:8000/media/fad260e3-c530-48ec-ad0a-d546e6ebd2e2.jpg"}];

	const grupo = {
		"nome_grupo": "Grupo 1",
		"grupo_id": 2,
		"pacientes": pacientes,
		"data_inicio": "2017-02-24"
	};

	const coachUsername = "debora";

	it('should have props grupo and coachUsername', function () {
    	const wrapper = shallow(<GrupoBox grupo={grupo} coachUsername={coachUsername} />);
    	expect(wrapper.props().grupo).to.be.defined;
    	expect(wrapper.props().coachUsername).to.be.defined;
    	//expect(wrapper.props().src).to.be.defined;
  	});

    it("should have <Link /> component to the coach's group page", function () {
      const wrapper = shallow(<GrupoBox grupo={grupo} coachUsername={coachUsername} />);
      console.log(wrapper.debug());
      const grupo_link = wrapper.find(Link).get(0);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(grupo_link.props);
      expect(grupo_link.props.to).to.equal('grupos/'+coachUsername+'/'+grupo['grupo_id']);
      //expect(wrapper.props().src).to.be.defined;
    });

  	it('should have imgs for profile pictures', function () {
    	const wrapper = shallow(<GrupoBox grupo={grupo} coachUsername={coachUsername} />);
    	expect(wrapper.find('img')).to.have.length(2);
    	//expect(wrapper.props().src).to.be.defined;
  	});

    it("should have 2 <Link /> components for the participants photos", function () {
      const wrapper = shallow(<GrupoBox grupo={grupo} coachUsername={coachUsername} />);
      const photos_div = wrapper.find('.participants-photos');
      expect(photos_div.find(Link)).to.have.length(2);
      
    });

    it("should have <Link /> components to the participants' pages", function () {
      const wrapper = shallow(<GrupoBox grupo={grupo} coachUsername={coachUsername} />);
      const photos_div = wrapper.find('.participants-photos');
      // photos_div.find(Link).forEach((link, idx) => {
      //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      //   console.log(link.debug());
      //   console.log(link.props);
      //   expect(link.props.to).to.equal('pacientes/'+grupo['pacientes'][idx]['id']);
      // });
      expect(wrapper.find(Link).get(1).props.to).to.equal('pacientes/'+grupo['pacientes'][0]['id']);
    });

  	it('should have span with grupo_estagio info', function () {
    	const wrapper = shallow(<GrupoBox grupo={grupo} coachUsername={coachUsername} />);
    	expect(wrapper.find('span.label-info')).to.have.length(1);
    	//expect(wrapper.props().src).to.be.defined;
  	});

});
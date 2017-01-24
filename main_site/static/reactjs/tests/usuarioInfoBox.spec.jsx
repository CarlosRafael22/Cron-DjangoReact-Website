import React from "react"
import {shallow, mount, render} from "enzyme"
import {expect} from "chai"

import { sinon, spy } from "sinon"

import UsuarioInfoBox from "../components/UsuarioInfoBox"

describe('<UsuarioInfoBox/>', () => {
	const profile = [
	{"id": 1, "username": "Jose", "paciente": true}];

	it('should have props profile', function () {
    	const wrapper = shallow(<UsuarioInfoBox profile={profile}/>);
    	expect(wrapper.props().profile).to.be.defined;
    	//expect(wrapper.props().src).to.be.defined;
  	});

	it('should be a div item', () => {
		const wrapper = shallow(<UsuarioInfoBox profile={profile} />);
		expect(wrapper.type()).to.eql('div');
		//expect(true).to.be.true;
	});

	it('should have 3 children', () => {
		const wrapper = shallow(<UsuarioInfoBox profile={profile} />);
		expect(wrapper.children()).to.have.length(3);
		//expect(true).to.be.true;
	});

	it('should have id, username and paciente as props', () => {
		const wrapper = shallow(<UsuarioInfoBox profile={profile} />);
		expect(wrapper.props().profile.key).to.be.defined;
		expect(wrapper.props().profile.username).to.be.defined;
		expect(wrapper.props().profile.paciente).to.be.defined;
		//expect(true).to.be.true;
	});
	
	it('should have h3/h4/h4 inside the div', () => {
		const wrapper = shallow(<UsuarioInfoBox profile={profile} />);
		// Indo em cada um dos elementos dentro do <div> e vendo se bate
		expect(wrapper.find('div').childAt(0).type()).to.equal('h3');
		expect(wrapper.find('div').childAt(1).type()).to.equal('h4');
		expect(wrapper.find('div').childAt(2).type()).to.equal('h4');
		//expect(true).to.be.true;
	});

	it('should show the props inside the div', () => {
		const wrapper = shallow(<UsuarioInfoBox profile={profile} />);
		// Indo em cada um dos elementos dentro do <div> e vendo se bate
		expect(wrapper.find('div').childAt(0).text()).to.equal('Jose');
		expect(wrapper.find('div').childAt(1).text()).to.equal('1');
		expect(wrapper.find('div').childAt(2).text()).to.equal('Paciente');
		//expect(true).to.be.true;
	});

});
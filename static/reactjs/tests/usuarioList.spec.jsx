import React from "react"
import {shallow, mount, render} from "enzyme"
import {expect} from "chai"

import { sinon, spy } from "sinon"

import UsuarioList from "../components/Usuario/UsuarioList"

describe('<UsuarioList/>', () => {
	const profiles = [
	{"id": 1, "username": "Jose", "paciente": true},
	{"id": 2, "username": "Maria", "paciente": false},
	{"id": 3, "username": "Gabriel", "paciente": true}];

	it('should have props profiles', function () {
    	const wrapper = shallow(<UsuarioList profiles={profiles}/>);
    	expect(wrapper.props().profiles).to.be.defined;
    	//expect(wrapper.props().src).to.be.defined;
  	});

	// it('should create 3 divs from the profiles passed', () => {
	// 	const wrapper = shallow(<UsuarioList profiles={profiles} />);
	// 	expect(wrapper.find('div')).to.have.length(3);
	// 	//expect(true).to.be.true;
	// });
});
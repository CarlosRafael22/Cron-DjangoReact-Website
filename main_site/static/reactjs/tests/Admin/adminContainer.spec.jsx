import React from "react"
import {shallow, mount, render} from "enzyme"
import {expect} from "chai"

import { sinon, spy } from "sinon"

import {AdminContainer} from "../../containers/Admin/AdminContainer"
import RegisterPage from "../../views-dashboard/Pages/Register"

describe('<AdminContainer/>', () => {

  /**
   * Mock out the top level Redux store with all the required 
   * methods and have it return the provided state by default.
   * @param {Object} state State to populate in store
   * @return {Object} Mock store
   */
  function createMockStore(state) {
    return {
      subscribe: () => {},
      dispatch: () => {},
      getState: () => {
        return {...state};
      }
    };
  }

  const storeStateMock = {
    myReducer:{
      someState: 'ABC'
    }
  };


	// it('should render RegisterPage', function () {
 //    	const wrapper = shallow(<AdminContainer />);
 //    	expect(wrapper.props().grupos).to.be.defined;
 //    	expect(wrapper.props().coachUsername).to.be.defined;
 //    	//expect(wrapper.props().src).to.be.defined;
 //  	});

  	it('should have <RegisterPage /> components', function () {
    	const wrapper = shallow(<AdminContainer />);
      console.log(wrapper.debug());
    	expect(wrapper.find(RegisterPage)).to.have.length(1);
    	//expect(wrapper.props().src).to.be.defined;
  	});

});
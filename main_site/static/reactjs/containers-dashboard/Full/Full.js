import React, { Component } from 'react';
import Header from '../../components-dashboard/Header/';
import Sidebar from '../../components-dashboard/Sidebar/';
import Aside from '../../components-dashboard/Aside/';
import Footer from '../../components-dashboard/Footer/';

import NavHeaderContainer from "../../containers/NavHeaderContainer"

//import Breadcrumbs from 'react-breadcrumbs';

class Full extends Component {

  constructor(){
    super();
    this.state = {
      sidebarTab: null
    }

  }


  _updateSidebar(tab){
      //alert(tab);
      const tabName = (tab == 'grupos'? "Grupos" : "Chats");
      this.setState({sidebarTab: tabName});
  }

  componentWillReceiveProps(nextProps){

    // Qd ele for receber um props eh pq pode ser que ele tenha o props.children atualizado, ou seja, ido para a aba de Grupos ou de Chats
    // Entao eu vou checar e tentar atualizar o Sidebar
    console.log("ATUALIZOU PROPS FULL");
    console.log(nextProps.location);
    const locationSplit = nextProps.location.pathname.split("/");
    const location = locationSplit[1];
    console.log(locationSplit);

    this._updateSidebar(location);
    
  }


  render() {
    return (
      <div className="app">
        <NavHeaderContainer updateSidebar={this._updateSidebar.bind(this)} />
        <div className="app-body">
          <Sidebar {...this.props} sidebarTab={this.state.sidebarTab} />
          <main className="main">
            
            <div className="container-fluid">
              {this.props.children}
            </div>
          </main>
          {/*<Aside />*/}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;

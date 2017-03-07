import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {

    const adminImg = require('../../../img/avatars/6.jpg');


    let dropdown;

    if(this.props.isLogged){
      dropdown = (

        <DropdownMenu className="dropdown-menu-right">
          <DropdownItem header className="text-center"><strong>Account</strong></DropdownItem>

          <DropdownItem><i className="fa fa-bell-o"></i> Updates<span className="badge badge-info">42</span></DropdownItem>
          <DropdownItem><i className="fa fa-envelope-o"></i> Messages<span className="badge badge-success">42</span></DropdownItem>
          <DropdownItem><i className="fa fa-tasks"></i> Tasks<span className="badge badge-danger">42</span></DropdownItem>
          <DropdownItem><i className="fa fa-comments"></i> Comments<span className="badge badge-warning">42</span></DropdownItem>

          <DropdownItem header className="text-center"><strong>Settings</strong></DropdownItem>

          <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
          <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
          <DropdownItem><i className="fa fa-usd"></i> Payments<span className="badge badge-default">42</span></DropdownItem>
          <DropdownItem><i className="fa fa-file"></i> Projects<span className="badge badge-primary">42</span></DropdownItem>
          <DropdownItem divider />
          <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
          <DropdownItem onClick={this.props.logOut.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>

        </DropdownMenu>
      );
    }else{
      dropdown = (

        <DropdownMenu className="dropdown-menu-right">
          <DropdownItem header className="text-center"><strong>Account</strong></DropdownItem>

          <DropdownItem header className="text-center"><strong>Settings</strong></DropdownItem>
          <DropdownItem divider />
          <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
          <DropdownItem onClick={this.props.logIn.bind(this)}><i className="fa fa-lock"></i> Login</DropdownItem>

        </DropdownMenu>

      );
      
    }


    let headerView;

    if(this.props.isLogged){
      headerView = (

        <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler hidden-lg-up" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav hidden-md-down">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarToggle} href="#">&#9776;</a>
          </li>
          <li className="nav-item px-1" id="gruposTab">
            <Link to={'/grupos'} className="nav-link" activeClassName="active" ><i className="icon-puzzle"></i> Grupos</Link>
          </li>
          <li className="nav-item px-1" id="chatsTab">
            <Link to={'/chats'} className="nav-link" activeClassName="active"><i className="icon-puzzle" ></i> Chats</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item hidden-md-down">
            <a className="nav-link" href="#"><i className="icon-bell"></i><span className="badge badge-pill badge-danger">5</span></a>
          </li>
          <li className="nav-item hidden-md-down">
            <a className="nav-link" href="#"><i className="icon-list"></i></a>
          </li>
          <li className="nav-item hidden-md-down">
            <a className="nav-link" href="#"><i className="icon-location-pin"></i></a>
          </li>
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <a onClick={this.toggle} className="nav-link dropdown-toggle nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src="http://localhost:8000/media/1f671e21-2dfb-415a-b8e8-a3f90b3a567b.jpg" className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="hidden-md-down">admin</span>
              </a>
            <DropdownMenu className="dropdown-menu-right">
              <DropdownItem header className="text-center"><strong>Account</strong></DropdownItem>

              <DropdownItem><i className="fa fa-bell-o"></i> Updates<span className="badge badge-info">42</span></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<span className="badge badge-success">42</span></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<span className="badge badge-danger">42</span></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<span className="badge badge-warning">42</span></DropdownItem>

              <DropdownItem header className="text-center"><strong>Settings</strong></DropdownItem>

              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<span className="badge badge-default">42</span></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<span className="badge badge-primary">42</span></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={this.props.logOut.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>

            </DropdownMenu>
            </Dropdown>
          </li>
          {/*<li className="nav-item hidden-md-down">
                      <a className="nav-link navbar-toggler aside-menu-toggler" onClick={this.asideToggle} href="#">&#9776;</a>
                    </li>*/}
        </ul>
      </header>

      );
    }else{

      headerView = (

        <header className="app-header navbar">
          <button className="navbar-toggler mobile-sidebar-toggler hidden-lg-up" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
          <a className="navbar-brand" href="#"></a>
        </header>

      );

    }

    return (
      <div>
        {headerView}
      </div>
      
    )
  }
}

export default Header;

import React, { Component } from 'react';

class Register extends Component {

  _handleSignUpCoach(){

    let username = this._username.value;
    let email = this._email.value;
    let password = this._password.value;

    this.props.signup(username, email, password, "coach");
  }


  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mx-2">
              <div className="card-block p-2">
                <h1>Register</h1>
                <p className="text-muted">Criar novo Coach</p>
                <div className="input-group mb-1">
                  <span className="input-group-addon"><i className="icon-user"></i></span>
                  <input type="text" className="form-control" placeholder="Username" ref={(input) => this._username = input}/>
                </div>

                <div className="input-group mb-1">
                  <span className="input-group-addon">@</span>
                  <input type="text" className="form-control" placeholder="Email" ref={(input) => this._email = input}/>
                </div>

                <div className="input-group mb-1">
                  <span className="input-group-addon"><i className="icon-lock"></i></span>
                  <input type="password" className="form-control" placeholder="Password" ref={(input) => this._password = input}/>
                </div>

                {/*<div className="input-group mb-2">
                                  <span className="input-group-addon"><i className="icon-lock"></i></span>
                                  <input type="password" className="form-control" placeholder="Repeat password"/>
                                </div>*/}

                <button type="button" className="btn btn-block btn-success" onClick={this._handleSignUpCoach.bind(this)}>Criar Coach</button>
              </div>
              {/*<div className="card-footer p-2">
                              <div className="row">
                                <div className="col-6">
                                  <button className="btn btn-block btn-facebook" type="button"><span>facebook</span></button>
                                </div>
                                <div className="col-6">
                                  <button className="btn btn-block btn-twitter" type="button"><span>twitter</span></button>
                                </div>
                              </div>
                            </div>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

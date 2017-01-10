import React from "react"

import Headline from "../components/Headline"
import ReceitaList from "../components/ReceitaList"

export default class App1Container extends React.Component {

  componentWillUnmount(){
    console.log("Terminando Receita");
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 jumbotron">
            <Headline>Aqui tem todos as receitas!</Headline>
          </div>
          <ReceitaList/>
        </div>
      </div>
    )
  }
}
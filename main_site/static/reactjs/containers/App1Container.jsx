import React from "react"

import Headline from "../components/Headline"
import ReceitaList from "../components/ReceitaList"
import IngredienteList from "../components/IngredienteList"

export default class App1Container extends React.Component {

  componentWillUnmount(){
    console.log("Terminando Ingred");
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 jumbotron">
            <Headline>Aqui tem todos os ingredientes!</Headline>
          </div>
          <IngredienteList/>
        </div>
      </div>
    )
  }
}
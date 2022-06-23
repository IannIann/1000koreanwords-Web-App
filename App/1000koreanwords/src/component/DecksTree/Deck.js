import React from "react";
import { Link } from "react-router-dom";

export default class Deck extends React.Component {

  render() {
    return (
      <div className="component-deck">

        <Link to={"/learn/quizz/" + this.props.id}> 
          <button>{this.props.name}</button>
        </Link>
        
      </div>
    );
  }
}
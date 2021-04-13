import './App.css';
import React from 'react';
    

  
class Buttons extends React.Component {
  constructor(id,floor) {
    super(id);
    this.state = {msg : "call"};
    this.id=id;
    this.floor=floor;
    this.handleClick = this.handleClick.bind(this);
  }
  

  handleClick(me) {
    if (this.text !== "call"){
      return;
    }
    this.setState.msg("wait");

  }



  render() {
    return (
      
      <button class='button' data-floor={this.floor}>
        {this.state.msg}
      </button>
    );
  }


}

 


export default Buttons;


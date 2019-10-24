import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='fields'>
        <label htmlFor='task'>Enter Your Task</label>
        <input type='text' id='task' placeholder='Task Name' />
        <button id='get_time' onClick={this.props.data}>
          Let's Find Out
        </button>
      </div>
    );
  }
}

export default Form;

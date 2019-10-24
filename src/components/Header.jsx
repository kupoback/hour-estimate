import React, { Component } from "react";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      task: ""
    };
  }

  buttonClick = () => {
    this.setState({
      time: Math.floor(Math.random() * 100 + 1) * 20,
      task: document.getElementById("task").value
    });
  };

  render() {
    return (
      <header>
        <span className="avatar">
          <FontAwesomeIcon icon={faBriefcase} />
        </span>
        <h1>How long will this take?</h1>
        <div className="hours" id="est">
          <h2>
            <span data-task>{this.state.task}</span>
            {console.log(this.state.task)}
          </h2>
          <h2>
            <CountUp
              start={0}
              end={this.state.time}
              duration={1}
              suffix=" Hours"
            />
          </h2>
        </div>
        <Form data={this.buttonClick} />
      </header>
    );
  }
}

export default Header;

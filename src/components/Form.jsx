import React, { Component } from 'react'

class Form extends Component {
    render() {
        return (
            <div className="fields">
                <label htmlFor="task">Enter Your Task</label>
                <input type="text" id="task" placeholder="Task Name" />
                <button id="get_time">Let's Find Out</button>
            </div>
        )
    }
}

export default Form;
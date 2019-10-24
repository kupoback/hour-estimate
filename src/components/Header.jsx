import React, { Component } from 'react'
import Form from './Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'

class Header extends Component {
    render() {
        return (
            <header>
                <span className="avatar"><FontAwesomeIcon icon={faBriefcase} /></span>
                <img src={this.props.data} className="App-logo" alt="logo" />
                <h1>How long will this take?</h1>
                <div className="hours" id="est">
                    <h2><span data-task></span></h2>
                    <h2><span data-time>0</span> Hours</h2>
                </div>
                <Form />
            </header>
        )
    }
}

export default Header;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../redux/actions';
let axios = require('axios');

class Logout extends Component {
    /**
     * Redirect to login
     */
    componentDidMount = () => {

        axios.post('/logout');

        // emit the event
        this.props.logoutUser(this.props.history);
    };

    render() {
        return <React.Fragment></React.Fragment>;
    }
}

export default withRouter(
    connect(
        null,
        { logoutUser }
    )(Logout)
);

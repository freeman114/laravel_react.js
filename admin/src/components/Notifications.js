// @flow
import React, { Component } from 'react';
import {UncontrolledAlert} from "reactstrap";


class Notifications extends Component {

    render() {
        const msg = this.props.msg;
        const status = this.props.status;
        if(!msg) return null;
        return (
            <React.Fragment>
                <UncontrolledAlert color={status}>
                    {msg}
                </UncontrolledAlert>
            </React.Fragment>
        );
    }
}

export default Notifications;

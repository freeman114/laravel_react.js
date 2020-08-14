import React, {Component} from 'react';
import { Row } from 'reactstrap';
import { UsersTable } from './UsersTable';

// Internal Admin
class InternalAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <div className="page-title-box">
                        <h4 className="page-title">
                            Admin
                        </h4>
                    </div>
                    <UsersTable/>
                </Row>
            </React.Fragment>
        );
    }
}

export default InternalAdmin;

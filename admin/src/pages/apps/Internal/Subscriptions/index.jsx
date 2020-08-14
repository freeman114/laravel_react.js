import React, {Component} from 'react';
import { Row } from 'reactstrap';
import { Table } from './table';


// Internal Subscriptions
class InternalSubscriptions extends Component {
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
                            Subscriptions
                        </h4>
                    </div>
                    <Table/>
                </Row>
            </React.Fragment>
        );
    }
}

export default InternalSubscriptions;

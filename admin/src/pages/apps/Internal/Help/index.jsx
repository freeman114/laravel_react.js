import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';


// Internal Help
class InternalHelp extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col xl={8}>
                        <div className="page-title-box">
                            <h4 className="page-title">
                                Help
                            </h4>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default InternalHelp;

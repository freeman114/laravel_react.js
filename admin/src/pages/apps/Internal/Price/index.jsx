import React, {Component} from 'react';
import { Row } from 'reactstrap';
import { Table } from './table';


// Internal Price
class InternalPrice extends Component {
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
                            Price
                        </h4>
                    </div>
                    <Table/>
                </Row>
            </React.Fragment>
        );
    }
}

export default InternalPrice;

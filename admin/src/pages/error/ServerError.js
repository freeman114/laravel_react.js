// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import notFoundImg from '../../assets/images/startman.svg';

const ServerError = () => {
    return (
        <React.Fragment>
            <div className="mt-5"></div>

            <Row className="justify-content-center">
                <Col lg={4}>
                    <div className="text-center">
                        <img src={notFoundImg} height="90" alt="" />
                        <h1 className="text-error mt-4">500</h1>
                        <h4 className="text-uppercase text-danger mt-3">Internal Server Error</h4>
                        <p className="text-muted mt-3">Why not try refreshing your page? or you can contact</p>

                        <Link className="btn btn-info mt-3" to="/">
                            <i className="mdi mdi-reply"></i> Contact Support
                        </Link>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ServerError;

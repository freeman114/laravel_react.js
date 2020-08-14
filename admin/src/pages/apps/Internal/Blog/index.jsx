import React, {Component} from 'react';
import {
    Row,
    Col,
} from 'reactstrap';


// Internal Blog
class InternalBlog extends Component {
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
                                <a href="https://www.care-steps.com/blog_admin">Go to Edit/Create Blog</a>
                            </h4>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default InternalBlog;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Container, Row, Col, Card, CardBody, Label, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import { loginUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import LoaderWidget from '../../components/Loader';
import logo from '../../assets/images/logo.png';

class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        this.props.loginUser(values.email, values.password, this.props.history);
    };

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to="/" />;
        }
    };

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages mt-5 mb-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={5}>
                                    <Card>
                                        <div className="card-header pt-4 pb-4 text-center bg-primary">
                                            <Link to="/">
                                                <span>
                                                    <img src={logo} alt="" height="18" />
                                                </span>
                                            </Link>
                                        </div>

                                        <CardBody className="p-4 position-relative">
                                            {/* preloader */}
                                            {this.props.loading && <LoaderWidget />}

                                            <div className="text-center w-75 m-auto">
                                                <h4 className="text-dark-50 text-center mt-0 font-weight-bold">
                                                    Sign In
                                                </h4>
                                                <p className="text-muted mb-4">
                                                    Enter your email and password to access admin panel.
                                                </p>
                                            </div>

                                            {this.props.error && (
                                                <Alert color="danger" isOpen={!!this.props.error}>
                                                    <div>{this.props.error}</div>
                                                </Alert>
                                            )}

                                            <AvForm onValidSubmit={this.handleValidSubmit}>
                                                <AvField
                                                    name="email"
                                                    label="Email"
                                                    placeholder="Enter your email"
                                                    value={this.state.email}
                                                    required
                                                />

                                                <AvGroup>
                                                    <Label for="password">Password</Label>
                                                    <a
                                                        href="/account/forget-password"
                                                        className="text-muted float-right">
                                                        <small>Forgot your password?</small>
                                                    </a>
                                                    <AvInput
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Enter your password"
                                                        value={this.state.password}
                                                        required
                                                    />
                                                    <AvFeedback>This field is invalid</AvFeedback>
                                                </AvGroup>

                                                <FormGroup>
                                                    <Button color="success">Submit</Button>
                                                </FormGroup>

                                            </AvForm>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="mt-1">
                                <Col className="col-12 text-center">
                                    <p className="text-muted">
                                        Don't have an account?{' '}
                                        <Link to="/account/register" className="text-muted ml-1">
                                            <b>Register</b>
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);

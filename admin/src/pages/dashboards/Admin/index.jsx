import React, { Component } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    NavLink,
    CardHeader,
    UncontrolledCollapse
} from "reactstrap";
import { Cookies } from 'react-cookie';

import PageTitle from "../../../components/PageTitle";
import Invite from "./Invite/Invite";
import Levels from "./Levels/Levels";
import Onboarding from "./Onboarding";
import { fetchAuthJSON } from "../../../helpers/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
const cookies = new Cookies();

const stripePromise = loadStripe("pk_test_UQHSjLPSvMxT2AYOFLDdkHTN00IrfI2NTm");
let register = false;

// Admin
class Admin extends Component {
    constructor(props) {
        super(props);

        if (cookies.get('register')){
            register = true;
            cookies.remove('register');
        }
        this.state = {
            response: null,
            levels_data: {
                levels: [],
                user_levels: [],
                roles: []
            }
        };
    }

    componentDidMount() {
        fetchAuthJSON("/levels", {
            body: JSON.stringify({}),
            method: "POST"
        })
            .then(json => {
                if (json.levels.length) {
                    this.setState({
                        levels_data: {
                            levels: json.levels,
                            roles: json.roles,
                            user_levels: json.user_levels
                        }
                    });
                }
            })
            .catch(error => {
                this.setState({ response: { ...error } });
            });
    }

    render() {
        return (
            <React.Fragment>
                <PageTitle
                    breadCrumbItems={[
                        { label: "Dashboard", path: "/dashboard/admin" },
                        {
                            label: "Admin",
                            path: "/dashboard/admin",
                            active: true
                        }
                    ]}
                    title={"Admin"}
                />

                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col lg={8}>
                                        <Card className="mb-0">
                                            <CardHeader>
                                                <h5 className="m-0">
                                                    <NavLink
                                                        className="custom-accordion-title d-block pt-2 pb-2"
                                                        id="staffSection"
                                                        href="#"
                                                    >
                                                        Staff Access
                                                        <span className="float-right">
                                                            <i className="mdi mdi-chevron-right font-18 accordion-arrow" />
                                                        </span>
                                                    </NavLink>
                                                </h5>
                                            </CardHeader>
                                            <UncontrolledCollapse toggler="#staffSection">
                                                <CardBody>
                                                    <Invite
                                                        {...this.state
                                                            .levels_data}
                                                    />
                                                </CardBody>
                                            </UncontrolledCollapse>
                                        </Card>
                                        <Card className="mb-0">
                                            <CardHeader>
                                                <h5 className="m-0">
                                                    <NavLink
                                                        className="custom-accordion-title d-block pt-2 pb-2"
                                                        id="profileSection"
                                                        href="#"
                                                    >
                                                        Profile
                                                        <span className="float-right">
                                                            <i className="mdi mdi-chevron-right font-18 accordion-arrow" />
                                                        </span>
                                                    </NavLink>
                                                </h5>
                                            </CardHeader>
                                            <UncontrolledCollapse
                                                toggler="#profileSection"
                                                defaultOpen={register}
                                            >
                                                <CardBody>
                                                    <Elements
                                                        stripe={stripePromise}
                                                    >
                                                        <Onboarding />
                                                    </Elements>
                                                </CardBody>
                                            </UncontrolledCollapse>
                                        </Card>
                                        <Card className="mb-0">
                                            <CardHeader>
                                                <h5 className="m-0">
                                                    <NavLink
                                                        className="custom-accordion-title d-block pt-2 pb-2"
                                                        id="levelsSection"
                                                        href="#"
                                                    >
                                                        Levels
                                                        <span className="float-right">
                                                            <i className="mdi mdi-chevron-right font-18 accordion-arrow" />
                                                        </span>
                                                    </NavLink>
                                                </h5>
                                            </CardHeader>
                                            <UncontrolledCollapse toggler="#levelsSection">
                                                <CardBody>
                                                    <Levels
                                                        {...this.state
                                                            .levels_data}
                                                    />
                                                </CardBody>
                                            </UncontrolledCollapse>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Admin;

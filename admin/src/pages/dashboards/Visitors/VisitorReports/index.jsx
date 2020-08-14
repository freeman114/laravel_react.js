import React, { Component } from 'react';
import { Row, Col, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Link, Redirect} from 'react-router-dom';
import Flatpickr from 'react-flatpickr';

import PageTitle from '../../../../components/PageTitle';

import {fetchAuthFILE, fetchAuthJSON, getAPIServer, getAuthRequestHeaders} from "../../../../helpers/api";

import Notifications from "../../../../components/Notifications";
import {ReportTable} from "./ReportTable";
const DATE_FORMATER = require( 'dateformat' );

class VisitorReports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            dueDate: new Date(),
            success: false,
            isLoading: false,
            rowData: null
        };
    }

    componentDidMount() {
        fetchAuthJSON('/visitor_project_instances/report', {
            body: JSON.stringify({}),
            method: 'POST'
        }).then(json => {
            this.setState({
                startDate: new Date(json.min_created_at),
                rowData: json.report,
            });

        }).catch(error => {
            this.setState({response: {...error}});
        });

    }

    /**
     * Update values
     */
    updateValues = (field, fieldValue) => {
        const state = { ...this.state.state };
        state[field] = fieldValue;
        this.setState(state);
    };

    /**
     * Update dates
     */
    updateDate = (field, fieldValue) => {
        const state = { ...this.state.state };
        state[field] = fieldValue[0];
        this.setState(state);
    };

    /**
     * Handle the form submission
     */
    handleValidSubmit = (e, values) => {

        fetchAuthJSON('/visitor_project_instances/report', {
            body: JSON.stringify({
                start_date: DATE_FORMATER(this.state.startDate, "yyyy-mm-dd HH:MM:ss"),
                due_date: DATE_FORMATER(this.state.dueDate, "yyyy-mm-dd HH:MM:ss")
            }),
            method: 'POST'
        }).then(json => {
            this.setState({
                rowData: json.report,
            });

        }).catch(error => {
            this.setState({response: {...error}});
        });
    };



    render() {

        return (
            <React.Fragment>
                <PageTitle
                    breadCrumbItems={[
                        {label: 'Visitors', path: '/dashboard/visitors/list', active: false},
                        { label: 'Visitor Reports', path: '/dashboard/visitors/reports', active: true },
                    ]}
                    title={'Visitor Reports'}
                />

                <Card>
                    <CardBody>
                        <Row>
                            <Notifications {...this.state.response}/>
                            <Col>
                                <AvForm onValidSubmit={this.handleValidSubmit}>
                                    <Row>
                                        <Col>

                                            <FormGroup>
                                                <Label>Start Date</Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    value={this.state.startDate}
                                                    onChange={date => {
                                                        this.updateDate('startDate', date);
                                                    }}
                                                />
                                            </FormGroup>

                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label>Due Date</Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    value={this.state.dueDate}
                                                    onChange={date => {
                                                        this.updateDate('dueDate', date);
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col className="pull-right">
                                            <Button disabled={this.state.isLoading} type="submit" color="success">
                                                Submit
                                            </Button>
                                        </Col>
                                        <Col>
                                            <a href="/visitor_project_instances/report" className="btn btn-link btn-lg text-muted float-right">
                                                Download <i className="dripicons-download"></i>
                                            </a>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            {
                                                this.state.rowData &&
                                                <ReportTable rowData={this.state.rowData}/>
                                            }
                                        </Col>
                                    </Row>
                                </AvForm>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default VisitorReports;

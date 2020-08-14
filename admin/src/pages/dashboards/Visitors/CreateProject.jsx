import React, { Component } from 'react';
import { Row, Col, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Link, Redirect} from 'react-router-dom';
import Flatpickr from 'react-flatpickr';

import PageTitle from '../../../components/PageTitle';
import FileUploader from '../../../components/FileUploader';
import {fetchAuthFILE, getAPIServer, getAuthRequestHeaders} from "../../../helpers/api";
import AvResourceSelect from "@availity/reactstrap-validation-select/AvResourceSelect";
import AvApi from "@availity/api-axios";
import Notifications from "../../../components/Notifications";

const avCustomResource = new AvApi({
    url: getAPIServer() + '/users/search',
    headers: getAuthRequestHeaders(),
    api: false,
});

class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            dueDate: new Date(),
            success: false,
            isLoading: false,
            selectedUsers: [],
        };
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
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('config', values.config);
        formData.append('overview', values.overview);
        formData.append('start_date', this.state.startDate.toLocaleDateString("sv"));
        formData.append('due_date', this.state.dueDate.toLocaleDateString("sv"));
        formData.append('avatar', this.state.avatar);

        const userIds = values.user_ids || [];

        for (let i = 0; i < userIds.length; i++) {
            formData.append('user_ids[]', userIds[i].value);
        }

        this.setState({
            isLoading: true
        });


        fetchAuthFILE('/visitor-projects/create', {
            body: formData,
            method: 'POST',
        }).then(json => {
            this.setState({
                success: true,
                isLoading: false,
            })
        }).catch(error => {
            this.setState({
                response: {...error},
                isLoading: false
            });
        });
    };

    handleSelectedUserIds = (values) => {
        this.setState({
            selectedUsers: values
        })
    };

    filterUserIds = (values) => {
        return values.filter(u => this.state.selectedUsers.findIndex(s => s.value === u.value) === -1)
    };

    render() {
        const { success } = this.state;

        if (success) {
            return <Redirect to='/dashboard/visitors/list'/>;
        }

        return (
            <React.Fragment>
                <PageTitle
                    breadCrumbItems={[
                        {label: 'Visitors', path: '/dashboard/visitors/list', active: false},
                        { label: 'Create Project', path: '/dashboard/visitors/new', active: true },
                    ]}
                    title={'Create Project'}
                />

                <Card>
                    <CardBody>
                        <Row>
                            <Notifications {...this.state.response}/>
                            <Col>
                                <AvForm onValidSubmit={this.handleValidSubmit}>
                                    <Row>
                                        <Col>
                                            <AvField
                                                name="name"
                                                label="Name"
                                                required
                                                placeholder="Enter project name"
                                            />

                                            <AvField
                                                name="config"
                                                label="Survey Configuration"
                                                placeholder="Enter survey configuration"
                                                type="textarea"
                                                rows="5"
                                            />

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

                                            <AvField
                                                name="overview"
                                                label="Overview"
                                                placeholder="Enter some brief about project.."
                                                type="textarea"
                                                required
                                                rows="5"
                                            />

                                            <FormGroup>
                                                <AvResourceSelect
                                                    resource={avCustomResource}
                                                    method="POST"
                                                    name="user_ids"
                                                    label="Team Members"
                                                    type="text"
                                                    placeholder="Start enter name for autocomplete"
                                                    parameters={(params) => ({ text: params.q })}
                                                    getResult={(response) => this.filterUserIds(response.users.map(s => ({
                                                        label: `${s.first_name} ${s.last_name} - ${s.email}`,
                                                        value: s.id
                                                    })))}
                                                    onChange={this.handleSelectedUserIds}
                                                    isMulti
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label>Avatar</Label>
                                                <p className="text-muted font-14">
                                                    Recommended thumbnail size 800x400 (px).
                                                </p>
                                                <FileUploader
                                                    onFileUpload={files => {
                                                        this.updateValues('avatar', files[0]);
                                                    }}
                                                />
                                            </FormGroup>

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
                                        <Col>
                                            <Button disabled={this.state.isLoading} type="submit" color="success">
                                                Submit
                                            </Button>
                                            <Link to={`/dashboard/visitors/list`}>
                                                <Button color="danger" style={{marginLeft: 10}}>
                                                    Cancel
                                                </Button>
                                            </Link>
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

export default CreateProject;

import React, { Component } from 'react';
import {Row, Col, Card, CardBody, FormGroup, Label, Button, DropdownItem, DropdownMenu} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Link, Redirect} from 'react-router-dom';
import Flatpickr from 'react-flatpickr';

import PageTitle from '../../../components/PageTitle';
import FileUploader from '../../../components/FileUploader';
import {fetchAuthFILE, fetchAuthJSON, getAPIServer, getAuthRequestHeaders} from "../../../helpers/api";
import AvResourceSelect from "@availity/reactstrap-validation-select/AvResourceSelect";
import AvApi from "@availity/api-axios";
import Notifications from "../../../components/Notifications";
import AvSelectField from "@availity/reactstrap-validation-select/AvSelectField";

const avCustomResource = new AvApi({
    url: getAPIServer() + '/users/search',
    headers: getAuthRequestHeaders(),
    api: false,
});

class EditProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            dueDate: new Date(),
            name: '',
            overview: '',
            config: '',
            success: false,
            isLoading: false,
            selectedUsers: [],
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        fetchAuthJSON('/visitor-projects/get', {
            body: JSON.stringify({
               project_id: params['projectId']
            }),
            method: 'POST'
        }).then(json => {
            const p = json.project;
            this.setState({
                startDate: new Date(p.start_date),
                dueDate: new Date(p.due_date),
                name: p.name,
                config: JSON.stringify(p.config),
                overview: p.overview,
                status: p.status,
                selectedUsers: p.team.map((u) => ({
                    label: `${u.first_name} ${u.last_name} - ${u.email}`,
                    value: u.id
                })),

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
        const formData = new FormData();
        const { match: { params } } = this.props;

        formData.append('project_id', params.projectId);
        formData.append('name', values.name);
        formData.append('config', values.config);
        formData.append('overview', values.overview);
        formData.append('start_date', this.state.startDate.toLocaleDateString("sv"));
        formData.append('due_date', this.state.dueDate.toLocaleDateString("sv"));

        formData.append('status', this.state.status);

        if (this.state.avatar) {
            formData.append('avatar', this.state.avatar);
        }

        const userIds = values.user_ids || [];

        for (let i = 0; i < userIds.length; i++) {
            formData.append('user_ids[]', userIds[i].value);
        }

        this.setState({
            isLoading: true
        });


        fetchAuthFILE('/visitor-projects/update', {
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

    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleStatusChange = (status) => {
        this.setState({
            status
        })
    };


    filterUserIds = (values) => {
        return values.filter(u => this.state.selectedUsers.findIndex(s => s.value === u.value) === -1)
    };

    render() {
        const { success, name, config, overview, selectedUsers } = this.state;

        if (success) {
            return <Redirect to='/dashboard/visitors/list'/>;
        }

        return (
            <React.Fragment>
                <PageTitle
                    breadCrumbItems={[
                        {label: 'Visitors', path: '/dashboard/visitors/list', active: false},
                        { label: 'Edit Project', path: '', active: true },
                    ]}
                    title="Edit Project"
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
                                                value={name}
                                                onChange={this.handleValueChange}
                                                placeholder="Enter project name"
                                            />

                                            <AvField
                                                name="config"
                                                label="Survey Configuration"
                                                placeholder="Enter survey configuration"
                                                type="textarea"
                                                rows="5"
                                                value={config}
                                                onChange={this.handleValueChange}
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
                                                value={overview}
                                                onChange={this.handleValueChange}
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
                                                    value={selectedUsers}
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

                                            <FormGroup>
                                                <AvSelectField
                                                    name="status"
                                                    label="Status"
                                                    options={[{
                                                        label: 'Ongoing',
                                                        value: 0
                                                    }, {
                                                        label: 'Finished',
                                                        value: 1
                                                    }]}
                                                    value={this.state.status}
                                                    onChange={this.handleStatusChange}
                                                    required
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

export default EditProject;

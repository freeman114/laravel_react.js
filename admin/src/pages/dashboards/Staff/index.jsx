import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
} from 'reactstrap';

import PageTitle from '../../../components/PageTitle';
import FileUploader from "../../../components/FileUploader";
import {fetchAuthFILE, fetchAuthJSON} from "../../../helpers/api";
import DataGrid, {
    Column,
    FormItem,
    Editing,
    Paging,
    Lookup,
    RequiredRule,
    EmailRule
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Notifications from "../../../components/Notifications";

// Staff
class Staff extends Component {


    constructor() {
        super();

        this.state = {
            staff: [],
            statuses: [],
            types: []
        };
    }

    componentDidMount() {
        fetchAuthJSON('/staff', {
            body: JSON.stringify({}),
            method: 'POST'
        }).then(json => {

            let statuses = Object.keys(json.statuses).map((id) => ({id: parseInt(id), name: json.statuses[id]}));
            let types = Object.keys(json.types).map((id) => ({id: parseInt(id), name: json.types[id]}));

            this.setState({
                staff: json.staff,
                statuses,
                types
            });

        }).catch(error => {
            this.setState({response: {...error}});
        });
    }

    render() {
        return (
            <React.Fragment>
                <PageTitle
                    breadCrumbItems={[
                        {label: 'Dashboard', path: '/dashboard/staff'},
                        {label: 'Staff', path: '/dashboard/staff', active: true},
                    ]}
                    title={'Staff'}
                />

                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <a href="/staff/template" className="btn btn-link btn-lg text-muted float-right">
                                    Template <i className="dripicons-download"></i>
                                </a>

                                <h4 className="header-title mb-3">File Upload</h4>

                                <p className="text-muted font-13 m-b-30">
                                    Bulk import of staff people (xls,xlsx,csv), bold headers required to fill.
                                    Columns can be in any order.
                                </p>

                                <Notifications {...this.state.response}/>

                                <FileUploader multiple={false} onFileUpload={files => {

                                        const formData = new FormData();
                                        formData.append('file', files[files.length - 1], 'staff');

                                        fetchAuthFILE('/staff/import', {
                                            body: formData,
                                            method: 'POST'
                                        }).then(json => {
                                            this.setState({staff: json.staff, response: {}});
                                        }).catch(error => {
                                            files.pop();
                                            this.setState({response: {...error}});
                                        });
                                    }}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <h4>Staff List</h4>
                <Row>
                    <Col>
                        <DataGrid
                            dataSource={this.state.staff}
                            keyExpr="id"
                            showBorders={true}
                            onRowInserted={this.onRowInserted}
                            onRowUpdated={this.onRowUpdated}
                            onRowRemoved={this.onRowRemoved}
                        >
                            <Paging enabled={true} />
                            <Editing
                                mode="form"
                                allowUpdating={true}
                                allowDeleting={true}
                                allowAdding={true}
                            />
                            <Column dataField="first_name" caption="FirstName"> <RequiredRule /> </Column>
                            <Column dataField="last_name" caption="LastName"> <RequiredRule /> </Column>
                            <Column dataField="email" caption="Email"> <RequiredRule /> <EmailRule/> </Column>
                            <Column dataField="cell" caption="Cell" visible={false}/>
                            <Column dataField="title" caption="Title"> <RequiredRule /> </Column>

                            <Column dataField="status" caption="Status" width={125}>
                                <Lookup
                                    dataSource={this.state.statuses}
                                    valueExpr="id"
                                    displayExpr="name"
                                />
                                <RequiredRule />
                            </Column>
                            <Column dataField="type" caption="Type" width={125}>
                                <Lookup
                                    dataSource={this.state.types}
                                    valueExpr="id"
                                    displayExpr="name"
                                />
                                <RequiredRule />
                            </Column>

                            <Column dataField="home_phone" caption="Home phone" visible={false}/>
                            <Column dataField="home_street_number" caption="Home street number" visible={false}/>
                            <Column dataField="home_street_name" caption="Home street name" visible={false}/>
                            <Column dataField="home_city" caption="Home city" visible={false}/>
                            <Column dataField="home_state" caption="Home state" visible={false}/>
                            <Column dataField="home_zip" caption="Home zip" visible={false}/>
                            <Column dataField="image_url" caption="Image url" visible={false}/>

                            <Column dataField="notes" caption="Notes" visible={false}>
                                <FormItem colSpan={2} editorType="dxTextArea" editorOptions={{ height: 100 }} />
                            </Column>
                        </DataGrid>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

    onRowInserted(e) {

        fetchAuthJSON('/staff/add', {
            body: JSON.stringify({...e.data}),
            method: 'POST'
        }).then(json => {
        }).catch(error => {
        });

    }

    onRowUpdated(e) {

        fetchAuthJSON('/staff/update', {
            body: JSON.stringify({...e.data}),
            method: 'POST'
        }).then(json => {
        }).catch(error => {
        });

    }

    onRowRemoved(e) {

        fetchAuthJSON('/staff/delete', {
            body: JSON.stringify({id: e.data.id}),
            method: 'POST'
        }).then(json => {
        }).catch(error => {
        });

    }
}

export default Staff;

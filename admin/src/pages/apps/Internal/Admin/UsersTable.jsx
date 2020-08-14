import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {fetchAuthJSON} from "../../../../helpers/api";
import { logoutUser } from '../../../../redux/actions';
import {Cookies} from "react-cookie";
import {getLoggedInUser} from "../../../../helpers/authUtils";

const colWidthSmall = 50;
const colWidthMedium = 125;
const colWidthLarge = 150;

const defaultColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: colWidthSmall,
    resizable: true
};

export class UsersTable extends Component {
    gridApi = null;

    columns = [{
        headerName: "#",
        field: "id",
        width: colWidthSmall
    }, {
        headerName: "Email",
        field: "email",
        width: colWidthMedium,
        filter: true
    }, {
        headerName: "Creator",
        field: "is_creator",
        width: colWidthMedium,
        filter: true
    }, {
        headerName: "First Name",
        field: "first_name",
        width: colWidthMedium,
        filter: true
    }, {
        headerName: "Last Name",
        field: "last_name",
        width: colWidthMedium,
        filter: true
    }, {
        headerName: "Organization",
        field: "organization",
        width: colWidthMedium,
        filter: true
    }, {
        headerName: "Role",
        field: "roles",
        width: colWidthMedium,
        filter: true
    }, {
        headerName: "Created at",
        field: "created_at",
        width: colWidthMedium,
        filter: true
    }, {
        headerName: "Action",
        field: "action",
        width: colWidthMedium,
        editable: false,
        cellRendererFramework: params => {
            return <button className="btn btn-primary" style={{padding: '0px 10px'}} onClick={() => this.goToAccount(params)}> Go to Account </button>
        }
    }];

    constructor(props) {
        super(props);

        this.state = {
            rowData: [],
            defaultColDef: defaultColDef
        };
    }

    componentDidMount() {
        fetchAuthJSON('/users/get_all', {
            body: JSON.stringify({}),
            method: 'POST'
        }).then(json => {
            this.setState({
                rowData: json.users,
            });

        }).catch(error => {
            this.setState({response: {...error}});
        });
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
    };

    goToAccount = (params) => {

        const loggedInUser = getLoggedInUser();

        let options = {
            body: JSON.stringify(params.data),
            method: 'POST'
        };
        if(loggedInUser.admin_token) {
            options = {...options, headers: {'Authorization': 'Bearer ' + loggedInUser.admin_token}}
        }

        fetchAuthJSON('/users/go_to_account', options).then(json => {
            let cookies = new Cookies();
            cookies.remove('user', { path: '/' })
            cookies.set('user', JSON.stringify(json.user), { path: '/' });

            window.location.href = "/admin/dashboard/ecommerce";
        }).catch(error => {
            this.setState({response: {...error}});
        });
    };

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{width: '100%', height: 500}}
            >

                <AgGridReact
                    columnDefs={this.columns}
                    rowData={this.state.rowData}
                    defaultColDef={this.state.defaultColDef}
                    animateRows={true}
                    onGridReady={this.onGridReady}
                    onCellValueChanged={this.onCellChange}
                    getRowNodeId={data => data.id}
                    singleClickEdit
                >
                </AgGridReact>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

const colWidthSmall = 50;
const colWidthMedium = 125;
const colWidthLarge = 150;

const mockedData = [{
    id: 1,
    company: 'Test LLC',
    email: 'manager@test.com',
    monthlyResidents: 30,
    monthlyValue: 400,
    createdAt: '10/04/2020',
    recurrenceAt: '10/04/2020',
    recurrence: 'data',
    status: 'active',
    amountForNextMonth: 2300,
    campaigns: 3,
}];

const defaultColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: colWidthSmall,
    resizable: true
};

export class Table extends Component {
    gridApi = null;

    columns = [{
        headerName: "#",
        field: "id",
        width: colWidthSmall
    }, {
        headerName: "Company",
        field: "company",
        width: colWidthMedium,
    }, {
        headerName: "Email",
        field: "email",
        width: colWidthMedium,
    }, {
        headerName: "Monthly residents",
        field: "monthlyResidents",
        width: colWidthMedium,
    }, {
        headerName: "Monthly Value",
        field: "monthlyValue",
        width: colWidthLarge,
    }, {
        headerName: "Created At",
        field: "createdAt",
        width: colWidthMedium,
    }, {
        headerName: "Recurrence At",
        field: "recurrenceAt",
        width: colWidthLarge,
    }, {
        headerName: "Recurrence",
        field: "recurrence",
        width: colWidthMedium,
    }, {
        headerName: "Status",
        field: "status",
        width: colWidthMedium,
    }, {
        headerName: "Amount For Next Month",
        field: "amountForNextMonth",
        width: colWidthMedium,
    }, {
        headerName: "Campaigns",
        field: "campaigns",
        width: colWidthMedium,
    }, {
        headerName: "Account",
        field: "account",
        width: colWidthMedium,
        editable: false,
        cellRendererFramework: params => {
            return <a href="#">Account</a>
        }
    }, {
        headerName: "",
        field: "action",
        width: colWidthMedium,
        editable: false,
        cellRendererFramework: params => {
            return <button onClick={() => this.removeRow(params)}> Remove </button>
        }
    }];

    constructor(props) {
        super(props);
        this.state = {
            rowData: mockedData,
            defaultColDef: defaultColDef,
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
    };

    removeRow = (params) => {
        if(window.confirm('Are you sure that you want to remove it?')) {
            this.gridApi.updateRowData({ remove: [params.data] });
        }
    };

    addRow = () => {
        const newItems = [{...mockedData[0], id: this.gridApi.getDisplayedRowCount() + 1 }];
        this.gridApi.updateRowData({ add: newItems });
    };

    onCellChange = (params) => {
        // const oldValue = params.oldValue;
        // const newValue = params.newValue;
        // const id = params.data.id;

        // send request to server and set row value with response or keep old value
    };

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{width: '100%', height: 500}}
            >
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.addRow}
                    style={{ marginBottom: 10 }}
                >
                    Add Subscription
                </button>
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

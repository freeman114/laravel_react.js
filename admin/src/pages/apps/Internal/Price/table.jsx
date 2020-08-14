import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {fetchAuthJSON} from "../../../../helpers/api";

const colWidthSmall = 50;
const colWidthMedium = 125;
const colWidthLarge = 150;

const mockedData = [{
    count_min: 1000,
    count_max: 5000,
    sum_minimum: 10,
    record_cost: 1,
    currency: 'USD',
    note: 'Example note',
    discount: 10,
    days_in_month: 15,
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
        headerName: "Low limit count",
        field: "count_min",
        width: colWidthMedium,
    }, {
        headerName: "High limit count",
        field: "count_max",
        width: colWidthMedium,
    }, {
        headerName: "Minimum cost",
        field: "sum_minimum",
        width: colWidthMedium,
    }, {
        headerName: "Cost of one record",
        field: "record_cost",
        width: colWidthLarge,
    }, {
        headerName: "Currency",
        field: "currency",
        width: colWidthMedium,
    }, {
        headerName: "Note",
        field: "note",
        width: colWidthLarge,
    }, {
        headerName: "Discount",
        field: "discount",
        width: colWidthMedium,
    }, {
        headerName: "Day in month",
        field: "days_in_month",
        width: colWidthMedium,
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
            rowData: [],
            defaultColDef: defaultColDef,
        }
    }

    componentDidMount() {

        fetchAuthJSON('/prices', {
            body: JSON.stringify({}),
            method: 'POST'
        }).then(json => {
            this.setState({rowData: json.prices});
        }).catch(error => {
        });
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
    };

    removeRow = (params) => {
        if(window.confirm('Are you sure that you want to remove it?')) {
            this.gridApi.updateRowData({ remove: [params.data] });

            fetchAuthJSON('/prices/delete', {
                body: JSON.stringify({id: params.data.id}),
                method: 'POST'
            }).then(json => {
            }).catch(error => {
            });
        }
    };

    addRow = () => {
        fetchAuthJSON('/prices/add', {
            body: JSON.stringify({...mockedData[0]}),
            method: 'POST'
        }).then(json => {
            this.gridApi.updateRowData({ add: [json.price] });
        }).catch(error => {
        });
    };

    onCellChange = (params) => {
        fetchAuthJSON('/prices/update', {
            body: JSON.stringify({...params.data}),
            method: 'POST'
        }).then(json => {
        }).catch(error => {
        });
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
                    Add Price
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

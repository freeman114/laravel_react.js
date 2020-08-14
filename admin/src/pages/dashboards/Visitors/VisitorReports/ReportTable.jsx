import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

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

export class ReportTable extends Component {
    gridApi = null;

    columns = [{
        headerName: "Question Id",
        field: "question_id",
        width: colWidthMedium,
        filter: true
    }, {
        headerName: "Question Text",
        field: "question_text",
        width: colWidthLarge,
        filter: true
    }, {
        headerName: "Answer",
        field: "answer",
        width: colWidthLarge,
        filter: true
    }];

    constructor(props) {
        super(props);
        this.state = {
            defaultColDef: defaultColDef,
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
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

                <AgGridReact
                    columnDefs={this.columns}
                    rowData={this.props.rowData}
                    defaultColDef={this.state.defaultColDef}
                    animateRows={true}
                    onGridReady={this.onGridReady}
                    onCellValueChanged={this.onCellChange}
                    getRowNodeId={data => data.id}
                >
                </AgGridReact>
            </div>
        );
    }
}

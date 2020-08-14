import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
} from 'reactstrap';

import DataGrid, {
    Column,
    Editing,
    Paging,
    RequiredRule,
    EmailRule, FilterRow,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import {fetchAuthJSON, getWebServer} from "../../../../helpers/api";

// ApiList
class ApiList extends Component {


    constructor() {
        super();

        this.state = {
            api_list: [],
        };
    }

    componentDidMount() {
        fetchAuthJSON('/api_list', {
            body: JSON.stringify({}),
            method: 'POST'
        }).then(json => {
            this.setState({
                api_list: json.api_list,
            });

        }).catch(error => {
            this.setState({response: {...error}});
        });
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col xl={8}>
                        <div className="page-title-box">
                            <h4 className="page-title">
                                Api List
                            </h4>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <DataGrid
                            dataSource={this.state.api_list}
                            keyExpr="id"
                            showBorders={true}
                        >
                            <FilterRow visible={true} />
                            <Paging enabled={true} />
                            <Column dataField="uri" caption="Uri">
                                <RequiredRule />
                            </Column>
                        </DataGrid>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

}

export default ApiList;

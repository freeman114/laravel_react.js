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
    EmailRule,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import {fetchAuthJSON, getWebServer} from "../../../../helpers/api";

// NewsLetter
class NewsLetter extends Component {


    constructor() {
        super();

        this.state = {
            subscriptions: [],
        };
    }

    componentDidMount() {
        fetchAuthJSON('/news_subscribe', {
            body: JSON.stringify({}),
            method: 'POST'
        }).then(json => {
            this.setState({
                subscriptions: json.subscriptions,
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
                                News Letter
                            </h4>
                            <a href={getWebServer() + '/news-letter-subs/csv'}>
                                <Button color="primary" type="submit">
                                    Export to CSV
                                </Button>
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataGrid
                            dataSource={this.state.subscriptions}
                            keyExpr="id"
                            showBorders={true}
                            onRowInserted={this.onRowInserted}
                            onRowRemoved={this.onRowRemoved}
                        >
                            <Paging enabled={true} />
                            <Editing
                                mode="form"
                                allowUpdating={false}
                                allowDeleting={true}
                                allowAdding={true}
                            />
                            <Column dataField="name" caption="Name"> <RequiredRule /> </Column>
                            <Column dataField="email" caption="Email"> <RequiredRule /> <EmailRule/> </Column>
                            <Column dataField="ip" caption="IP" allowEditing={false} />
                            <Column dataField="created_at" caption="Created At" allowEditing={false} />
                            <Column dataField="updated_at" caption="Updated At" allowEditing={false} />
                        </DataGrid>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

    onRowInserted = (e) => {
        fetchAuthJSON('/news_subscribe/create', {
            body: JSON.stringify({...e.data}),
            method: 'POST'
        }).then(json => {
            const subscriptions = this.state.subscriptions.filter(s => s.email !== json.subscription.email);
            this.setState({
                subscriptions: [json.subscription, ...subscriptions]
            });
        }).catch(error => {
        });
    }

    onRowRemoved = (e) => {

        fetchAuthJSON('/news_subscribe/delete', {
            body: JSON.stringify({id: e.data.id}),
            method: 'POST'
        }).then(json => {
        }).catch(error => {
        });

    }
}

export default NewsLetter;

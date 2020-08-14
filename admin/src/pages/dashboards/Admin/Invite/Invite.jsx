// flow
import React, {Component} from 'react';
import {Row, Col, Button} from 'reactstrap';
import {AvForm} from 'availity-reactstrap-validation';
import AvApi from '@availity/api-axios';
import { AvSelectField, AvResourceSelect } from '@availity/reactstrap-validation-select';
import {fetchAuthJSON, getAPIServer, getAuthRequestHeaders} from '../../../../helpers/api';
import Notifications from '../../../../components/Notifications';
import CheckboxTree from 'react-checkbox-tree';

import './styles.scss';

const avCustomResource = new AvApi({
    url: getAPIServer() + '/users/search',
    headers: getAuthRequestHeaders(),
    api: false,
});

const levelsToTreeRepresentation = (levels) => {
    return levels.map(p => {
        return {
            label: p.title,
            value: p.id,
            children: p.children.length ? levelsToTreeRepresentation(p.children) : null
        }
    });
};

function getChildrenForId(tree, nodeId, foundNode=false) {
    let ids = [];

    if (!tree) {
        return [];
    }

    tree.forEach(({ value, children }) => {
        if (foundNode) {
            ids = [...ids, value, ...getChildrenForId(children, nodeId, true)];
        }
        else {
            ids = [...ids, ...getChildrenForId(children, nodeId, value === nodeId)];
        }
    });

    return ids;
}

function getChildrenNodeIds(tree, previousNodes, childrenForNodes, excludeIds) {
    let ids = [...childrenForNodes, ...previousNodes];

    childrenForNodes.forEach((node) => {
        ids = [...ids, ...getChildrenForId(tree, parseInt(node))];
    });

    const strIds = ids.map(id => id.toString());

    return [...new Set(strIds.filter(id => !excludeIds.includes(id)))];
}

// Invite
class Invite extends Component {

    constructor(props) {
        super(props);

        this.state = {
            response: null,
            levels: [],
            levelsExpanded: [],
            levelsChecked: [],
            levelValues: [],
            userInitiatedLevels: false,
        };
    }

    componentDidMount() {
        fetchAuthJSON('/levels', {
            body: JSON.stringify({}),
            method: 'POST'
        }).then(json => {
            if (json.levels.length) {
                this.setState({
                    levels: levelsToTreeRepresentation(json.user_levels),
                });
            }
        }).catch(error => {
            this.setState({response: {...error}});
        });
    }

    /**
     * Handle the form submission
     */
    handleValidSubmit = (e, values) => {
        fetchAuthJSON('/users/grant_access', {
            body: JSON.stringify({
                ...values,
                user_ids: values.user_ids.map(u => u.value),
                user_level_ids: this.state.levelsChecked,
            }),
            method: 'POST'
        }).then(json => {
            this.resetForm();
            this.setState({response: {...json}});
        }).catch(error => {
            this.setState({response: {...error}});
        });
    };

    resetForm = () => {
        this.setState({
            levelsChecked: [],
            userInitiatedLevels: false,
        });
        this.form.reset();
    };

    handleUserSelect = (users) => {
        if (users.length !== 1) {
            if (!this.state.userInitiatedLevels) {
                this.setState({
                    userInitiatedLevels: false,
                    levelsChecked: []
                })
            }
            return;
        }

        fetchAuthJSON('/users/permissions', {
            body: JSON.stringify({
                user_id: users[0].value,
            }),
            method: 'POST'
        }).then(json => {
            this.setState({
                levelsChecked: json.permissions.map(p => p.user_level_id),
                userInitiatedLevels: false
            });
        }).catch(error => {
            this.setState({response: {...error}});
        });
    };

    render() {
        const { levelsChecked, levelsExpanded, levels } = this.state;

        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <h4 className="mt-2">Grant Staff Access</h4>
                        <p className="text-muted mb-4">
                            Grant access to one or more staff individuals by typing their name or email and selecting it.
                        </p>

                        <Notifications {...this.state.response}/>

                        <AvForm ref={c => (this.form = c)} onValidSubmit={this.handleValidSubmit}>
                            <Row>
                                <Col md={12}>
                                    <AvResourceSelect
                                        resource={avCustomResource}
                                        method="POST"
                                        name="user_ids"
                                        label="Name"
                                        type="text"
                                        placeholder="Start enter name for autocomplete"
                                        parameters={(params) => ({ text: params.q })}
                                        getResult={(response) => response.users.map(s => ({
                                            label: `${s.first_name} ${s.last_name} - ${s.email}`,
                                            value: s.id
                                        }))}
                                        required
                                        isMulti
                                        onChange={this.handleUserSelect}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <AvSelectField
                                        name="role"
                                        label="Choose role"
                                        options={this.props.roles}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <label>Choose levels</label>
                                    <div className="levels-tree">
                                        <CheckboxTree
                                            nodes={levels}
                                            checked={levelsChecked}
                                            onCheck={newLevelsChecked => this.setState({
                                                levelsChecked: getChildrenNodeIds(
                                                    levels,
                                                    levelsChecked,
                                                    newLevelsChecked.filter((el) => !levelsChecked.includes(el)),
                                                    levelsChecked.filter((el) => !newLevelsChecked.includes(el))
                                                ),
                                                userInitiatedLevels: true
                                            })}
                                            expanded={levelsExpanded}
                                            onExpand={levelsExpanded => this.setState({ levelsExpanded })}
                                            iconsClass="fa5"
                                            showExpandAll
                                            noCascade
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}></Col>
                                <Col sm={6} className="text-sm-right">
                                    <Button color="primary" type="submit">
                                        <i className="mdi mdi-truck-fast mr-1"></i> Submit
                                    </Button>
                                </Col>
                            </Row>
                        </AvForm>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
};

export default Invite;

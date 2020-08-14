// flow
import React, {Component} from 'react';
import {Row, Col, Button} from 'reactstrap';
import {fetchAuthJSON} from "../../../../helpers/api";
import {AvForm, AvField } from 'availity-reactstrap-validation';
import AvSelectField from "@availity/reactstrap-validation-select/AvSelectField";
import CheckboxTree from "react-checkbox-tree";
import { TreeLevelItem } from './treeLevelItem';
import states from './states';

import './styles.scss';

function getNodeIds(nodes) {
    let ids = [];

    if (!nodes) {
        return [];
    }

    nodes.forEach(({ value, children }) => {
        ids = [...ids, value, ...getNodeIds(children)];
    });

    return ids;
}

function removeNodeFromTree(tree, nodeId) {
    if (!tree) {
        return;
    }

    tree.forEach((node) => {
        const index = node.children.findIndex(l => l.id === nodeId);
        if (index !== -1) {
            node.children.splice(index, 1);
        } else {
            removeNodeFromTree(node.children, nodeId);
        }
    });
}

function renameNodeInTree(tree, nodeId, newTitle) {
    if (!tree) {
        return;
    }

    tree.forEach((node) => {
        const index = node.children.findIndex(l => l.id === nodeId);
        if (index !== -1) {
            node.children[index].title = newTitle;
        } else {
            renameNodeInTree(node.children, nodeId, newTitle);
        }
    });
}

class Levels extends Component {

    constructor(props) {
        super(props);

        this.state = {
            levels: [],
            levelsExpanded: [],
            user_levels: [],
            values: {
                level_id: '',
                parent_id: '',
            },
            errors: {
                name: ''
            }
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.levels.length > this.props.levels.length) {
            this.setState({
                levels: nextProps.levels,
                user_levels: nextProps.user_levels,
            });
        }
    }

    appendChildByParentId = (tree, child) => {
        tree.forEach(n => {
            if (n.id === child.parent_id) {
                n.children = n.children.length > 0 ? [...n.children, child] : [child];
                return;
            } else {
                this.appendChildByParentId(n.children, child);
            };
        })
    };

    /**
     * Handle the form submission
     */
    handleSubmit = (e, values) => {
        e.preventDefault();

        fetchAuthJSON('/levels/add', {
            body: JSON.stringify({...values}),
            method: 'POST'
        }).then(json => {
            const user_levels = this.state.user_levels;
            const newNode = {
                ...json.user_level,
                children: [],
                title: json.user_level.value,
            };
            this.appendChildByParentId(user_levels, newNode);
            this.setState({
                user_levels,
                levelsExpanded: getNodeIds(this.levelsToTreeRepresentation(user_levels))
            });
            this.handleReset();
        }).catch(error => {
            this.setState({
                errors: {
                    name: error.msg
                }
            });
        });
    };

    getParentsOptionsForLevel = (level, user_levels, order=1) => {
        const parentsOrder = level.order - 1;
        if (order === parentsOrder) {
            return user_levels;
        }
        let result = [];
        user_levels.forEach(ul => {
            result = [...result, ...this.getParentsOptionsForLevel(level, ul.children || [], order + 1)]
        });
        return result;
    };

    handleLevelSelect = (e, value) => {
        this.setState({
            values: {
                ...this.state.values,
                level_id: parseInt(value),
            }
        })
    };

    handleParentSelect = (e, value) => {
        this.setState({
            values: {
                ...this.state.values,
                parent_id: parseInt(value),
            }
        })
    };

    handleTreeLevelClick = (level) => {
        this.setState({
            values: {
                ...this.state.values,
                level_id: parseInt(level.level_id) + 1,
                parent_id: level.id,
            }
        })
    };

    handleNameChange = () => {
      this.setState({
          errors: {
              ...this.state.errors,
              name: ''
          }
      })
    };

    levelsToTreeRepresentation = (levels) => {
        return levels.map(l => {
            return {
                label: <TreeLevelItem
                    onClick={this.handleTreeLevelClick}
                    level={l}
                    error={this.state.errors.treeErrorNodeId === l.id ? this.state.errors.treeError : null}
                    onEdit={this.onRowUpdated}
                    onRemove={this.onRowRemoved}
                />,
                value: l.id,
                children: l.children.length ? this.levelsToTreeRepresentation(l.children) : null
            }
        });
    };

    handleReset = () => {
        this.setState({
            values: {},
            errors: {}
        });
        this.form.reset();
    };

    render() {
        const { values, levels, user_levels, levelsExpanded, errors } = this.state;
        const selectedLevel = levels.find(l => l.id === values.level_id);
        const parents = selectedLevel ? this.getParentsOptionsForLevel(selectedLevel, user_levels) : [];
        const parentsOptions = parents.map(p => ({
            value: p.id,
            label: p.title,
        }));
        const levelsOptions = levels.filter(l => l.order > 1).map(l => ({
            value: l.id,
            label: l.name,
        }));
        const statesOptions = states.map(s => ({
            value: s.name,
            label: s.name,
        }));
        const treeLevels = this.levelsToTreeRepresentation(user_levels);
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <h4 className="mt-2">Create level</h4>
                        <AvForm ref={c => (this.form = c)} onValidSubmit={this.handleSubmit}>
                            <Row>
                                <Col md={12}>
                                    <AvSelectField
                                        name="level_id"
                                        label="Choose Level"
                                        options={levelsOptions}
                                        value={values.level_id}
                                        onChange={this.handleLevelSelect}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <AvSelectField
                                        name="parent_id"
                                        label="Choose Parent"
                                        value={values.parent_id}
                                        options={parentsOptions}
                                        onChange={this.handleParentSelect}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    {values.level_id === 2 ? (
                                        <AvSelectField
                                            name="level_value"
                                            label="Name"
                                            options={statesOptions}
                                            onChange={this.handleNameChange}
                                            validate={{
                                                hasError: () => errors.name || true,
                                            }}
                                            required
                                        />
                                    ) : (
                                        <AvField
                                            name="level_value"
                                            label="Name"
                                            type="text"
                                            onChange={this.handleNameChange}
                                            validate={{
                                                hasError: () => errors.name || true,
                                            }}
                                            placeholder="Enter level name"
                                            required
                                        />
                                    )}
                                </Col>
                            </Row>
                            <Button color="primary" type="submit">
                                Submit
                            </Button>
                            <Button color="ghost" onClick={this.handleReset}>
                                Clear
                            </Button>
                        </AvForm>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 className="mt-2">Levels</h4>
                        <div className="levels-tree-wrapper">
                            <CheckboxTree
                                nodes={treeLevels}
                                expanded={levelsExpanded}
                                onExpand={levelsExpanded => this.setState({ levelsExpanded })}
                                iconsClass="fa5"
                                showExpandAll
                            />
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }


    onRowUpdated = (id, value) => {
        fetchAuthJSON('/levels/update', {
            body: JSON.stringify({id, value}),
            method: 'POST'
        }).then(json => {
            const tree = this.state.user_levels;
            renameNodeInTree(tree, id, value);
            this.setState({
                user_levels: tree,
                errors: {
                    treeErrorNodeId: '',
                    treeError: ''
                }
            })
        }).catch(error => {
           this.setState({
               errors: {
                   treeErrorNodeId: id,
                   treeError: error.msg
               }
           })
        });
    };

    onRowRemoved = (id) => {
        fetchAuthJSON('/levels/delete', {
            body: JSON.stringify({ id }),
            method: 'POST'
        }).then(json => {
            const tree = this.state.user_levels;
            removeNodeFromTree(tree, id);
            this.setState({
                user_levels: tree,
            })
        }).catch(error => {
        });

    }
}

export default Levels;

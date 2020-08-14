import React, { Component } from 'react';
import { Button } from "reactstrap";

export class TreeLevelItem extends Component {
    state = {
        editMode: false,
        editValue: this.props.level.title,
    };

    handleEdit = () => {
        const { onEdit, level: { title, id } } = this.props;
        const { editValue } = this.state;

        if (editValue === title || !editValue) {
            return this.setState({ editMode: false })
        }

        onEdit(id, editValue);
        this.setState({ editMode: false })
    };

    handleRemove = () => {
        const { onRemove, level: { title, id } } = this.props;
        if (window.confirm(`Are you sure that you want to remove ${title}`)) {
            onRemove(id)
        }
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleEdit();
        }
    };

    render() {
        const { level, onClick, error } = this.props;
        const { title, parent_id } = level;
        const { editMode, editValue } = this.state;
        return (
            <div className="tree-level-item">
                {editMode ? (
                    <input
                        ref={i => this.input = i}
                        className="node-edit-input"
                        value={editValue}
                        onKeyDown={this.handleKeyDown}
                        onChange={(e) => this.setState({ editValue: e.target.value })}
                        autoFocus
                    />
                ) : <div onClick={() => onClick(level)}>{title}</div>}
                {parent_id ? (
                    <>
                        {editMode ? (
                            <Button
                                color="success"
                                type="button"
                                onClick={this.handleEdit}
                            >
                                <i className="mdi mdi-update"/>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    color="primary"
                                    type="button"
                                    onClick={this.handleRemove}
                                >
                                    <i className="mdi mdi-delete"/>
                                </Button>
                                <Button
                                    color="primary"
                                    type="button"
                                    onClick={() => this.setState({ editMode: true })}
                                >
                                    <i className="mdi mdi-pencil"/>
                                </Button>
                            </>
                        )}
                    </>
                ) : null}
                <div className="tree-level-item__error">{error}</div>
            </div>
        )
    }
}

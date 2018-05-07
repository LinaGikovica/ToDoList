import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Glyphicon,
  ButtonToolbar,
  ButtonGroup
} from "react-bootstrap";
import { Checkbox } from "react-bootstrap";
import API from "./Api.js";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = { completed: props.task.completed };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleDelete() {
    this.props.onTaskDelete(this.props.task);
  }

  async handleCheck(e) {
    const api = new API();
    const checked = e.target.checked;

    await api.MarkCompleted(this.props.task.id, checked);
    this.setState({completed: checked});
  }

  render() {
    const task = this.props.task;
    return (
      <Row>
        <Col xs={10}>
          <Checkbox
            inline
            checked={this.state.completed}
            onChange={this.handleCheck}
          >
            {task.content}
          </Checkbox>
        </Col>
        <Col xs={2}>
          <ButtonToolbar>
            <ButtonGroup>
              <Button onClick={this.handleDelete}>
                <Glyphicon glyph="trash" /> Delete
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }
}

export default Task;

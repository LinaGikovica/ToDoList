import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel
} from "react-bootstrap";
import { Row, Grid } from "react-bootstrap";
import { withRouter } from "react-router-dom"
import API from "./Api.js";
import _ from "lodash";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class NewTask extends Component {
  constructor(props) {
    super(props);

    this.saveTask = this.saveTask.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  state = {
    users: [],
    selected: 1
  };

  async componentDidMount() {
    const api = new API();
    const users = await api.GetUsers();

    this.setState({ users: users.data });
  }

  async saveTask() {
    const api = new API();
    await api.CreateTask(this.state.selected, this.state.content);
    this.props.history.push("/tasks");  
  }

  handleUserSelect(e) {
    this.setState({ selected: e.target.value });
  }

  handleContentChange(e){
    this.setState({ content: e.target.value });
  }

  render() {
    const options = _.map(this.state.users, u => (
      <option value={u.id} key={u.id}>
        {u.name}
      </option>
    ));

    return (
      <Grid>
        <Row>
          <form>
            <FieldGroup
              id="fContent"
              type="text"
              label="Task Content"
              placeholder="Lorem ipsum..."
              onChange={this.handleContentChange}
            />

            <FormGroup controlId="fAsignee">
              <ControlLabel>Asignee</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.handleUserSelect}
              >
                {options}
              </FormControl>
            </FormGroup>

            <Button bsStyle="primary" onClick={this.saveTask}>
              Create
            </Button>
          </form>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(NewTask);
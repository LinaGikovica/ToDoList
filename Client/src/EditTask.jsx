import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

class EditTask extends Component {
    state = {  };

    constructor(props) {
        super(props);
        
        this.api = new API();
    }

    componentDidMount() {
        const taskId = match.params.id;
        const task = this.api.GetTasks(taskId);
    }
    

    render() {
        return (
            "Edit here!"
        );
    }
}

export default EditTask;
import React, { Component } from "react";
import { Grid, Row, Button } from "react-bootstrap";
import Task from "./Task.jsx";
import API from "./Api.js";
import _ from "lodash";
import { LinkContainer } from "react-router-bootstrap";

class Tasks extends Component {
  constructor(props) {
    super(props);  

    this.handleTaskDeleted = this.handleTaskDeleted.bind(this);

    this.api = new API();
    this.state = {
      tasks: []
    };
  }

  async handleTaskDeleted(task) {
    await this.api.DeleteTask(task.id);
    const tasksWithoutRemoved = _.filter(this.state.tasks, t => t.id !== task.id);
    this.setState({tasks: tasksWithoutRemoved});
  }

  render() {
    var tasks = [];
    this.state.tasks.forEach(task => {
      tasks.push(<Task key={task.id} task={task} onTaskDelete={this.handleTaskDeleted}/>);
    });

    return (
      <div>
        <Grid>
          <Row>
            <LinkContainer to="/tasks/new">
              <Button bsStyle="primary">Add Task</Button>
            </LinkContainer>
          </Row>
          <br />
          {tasks}
        </Grid>
      </div>
    );
  }

  async loadTasks() {
    const api = new API();
    const tasks = await api.GetTasks();
    this.setState({ tasks: tasks.data });
  }

  componentDidMount() {
    this.loadTasks();
  }
}

export default Tasks;

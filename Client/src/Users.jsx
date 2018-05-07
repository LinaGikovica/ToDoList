import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import _ from "lodash";
import API from "./Api.js";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.api = new API();
  }

  async componentDidMount() {
    const users = await this.api.GetUsers();
    this.setState({ users: users.data });
  }

  render() {
    const users = _.map(this.state.users, u => (
      <Row key={u.id}>
        {u.name} ({u.username})
      </Row>
    ));
    return <Grid>{users}</Grid>;
  }
}

export default Users;

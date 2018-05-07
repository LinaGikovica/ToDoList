import React from "react";
import { Grid, Row, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { fakeAuth } from "./Auth";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    };

    this.login = this.login.bind(this);
  }

  login() {
    fakeAuth.authenticate();
    this.setState({
      redirectToReferrer: true
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <Grid>
        <Row>You must be logged in to view this page</Row>
        <Row>
          <Button onClick={this.login}>Log in</Button>
        </Row>
      </Grid>
    );
  }
}

export default Login;

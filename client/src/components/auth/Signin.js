import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
  }

  render() {
    return (
      <div className="container">
        <h2>Sign Up now</h2>
        <p>The easiest thing to do is post on our. </p>

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Button>Submit</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Signin;

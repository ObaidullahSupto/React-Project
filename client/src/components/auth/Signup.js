import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      file: ""    
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      file: this.state.file
    };
    axios
      .post("/api/user/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
    // console.log(newUser);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <h2>Sign Up now</h2>
        <p>The easiest thing to do is post on our. </p>

        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input
            className={form-controll form-controll-lg is-invalid}
              type="text"
              name="name"
              value={this.state.name}
              id="exampleName"
              placeholder="Full Name"
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              value={this.state.email}
              id="exampleEmail"
              placeholder="Email"
              onChange={this.onChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              id="examplePassword"
              onChange={this.onChange}
              placeholder="Password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Confirm Password</Label>
            <Input
              type="password"
              name="password2"
              value={this.state.password2}
              id="exampleconfirmPassword"
              onChange={this.onChange}
              placeholder="Confirm password"
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={this.onChange}
              value={this.state.file}
            />
            <FormText color="muted">Choose Avater</FormText>
          </FormGroup>
          <FormGroup>
            <Button>Submit</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Signup;

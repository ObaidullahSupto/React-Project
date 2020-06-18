//API
//==================================

import React from "react";
import { Table } from "reactstrap";
import "../App.css";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      item: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("/api/user/all-user")
      .then(response => response.json())
      .then(data => {
        let items = data.map(item => {
          return (
            <tr key={item._id}>
              <td className="CSSDemo">{item._id}</td>
              <td className="CSSDemo">{item.name}</td>
              <td className="CSSDemo">{item.email}</td>
              <td className="CSSDemo">{item.createDate}</td>
            </tr>
          );
        });

        this.setState({
          loading: false,
          items: items
        });
        console.log("state", this.state.item);
      });
  }

  render() {
    return (
      <div className="container">
        {this.state.loading}

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Create Date</th>
            </tr>
          </thead>
          <tbody>{this.state.items}</tbody>
        </Table>
      </div>
    );
  }

  // constructor() {
  //   super();
  //   this.state = {
  //     items: [],
  //     loading: false
  //   };
  // }

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch("https://swapi.co/api/people/1")
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         loading: false,
  //         items: data
  //       });
  //     });
  // }

  // render() {
  //   const text = this.state.loading ? "loading..." : this.state.items.name;

  //   return (
  //     <div className="container">
  //       <h1>{text}</h1>
  //       {this.state.loading}
  //       {this.state.items.name}
  //     </div>
  //   );
  // }
}

export default Users;

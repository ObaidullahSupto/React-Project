//API
//==================================

import React from "react";
import { Table } from "reactstrap";
import "../App.css";

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      item: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("https://randomuser.me/api/?results=10")
      .then(response => response.json())
      .then(data => {
        let items = data.results.map(pic => {
          return (
            <tr key={pic.results}>
              <td className="CSSDemo">
                {pic.name.title} {pic.name.first} {pic.name.last}
              </td>
              <td className="CSSDemo">
                <img src={pic.picture.thumbnail} alt="" />
              </td>
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
              <th>Full Name</th>
              <th>Image</th>
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

export default View;

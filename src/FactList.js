import React from 'react';
import { BrowserRouter, Link, Route } from "react-router-dom";

class FactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch("/facts")
      .then(res => res.json)
      .then(result => {
        console.log(result[0]._id);
        this.setState({
          items: result
        });
      });
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <h1>items</h1>
        <ul>
          {items.map(item => (
            <Link to={'/singlefact/${item._id}'}>
              {" "}
              <li key={item._id}>
                TIL: {item.text}
                <br />When: {item.when}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  };
}

export default FactList;
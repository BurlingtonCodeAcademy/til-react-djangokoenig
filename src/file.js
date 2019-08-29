import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      facts: [],
      input: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    evt.preventDefault();
    this.setState({ input: evt.target.value })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    console.log('something')
    // Send the data to the backend, as JSON
    // Change the facts in the state
    //  ---> rerender the components
  }
  componentDidMount() {
    console.log('fetching those facts...')
    fetch('/facts')
      .then(response => response.json())
      .then(json => this.setState({ facts: json }))
  }
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Today I Learned</h1>
          <li><Link to='/'>Go Home</Link></li>
          <li><Link to='/facts'>List all entries (JSON)</Link></li>
          <Route path="/">
            <h2>Add a fact</h2>
            <form method="POST" action="/facts">
              <input type="text" name="text" placeholder="Today I learned"></input>
              <input type="submit"></input>
            </form>
          </Route>
          <Route path="/facts" render={() => <FactList facts={this.state.facts} />}></Route>
        </div>
      </Router >
    );
  }
}
function FactList(props) {
  return (
    props.facts.length === 0 ? <p>No facts!</p> : (
      <div>
        <h3>Facts</h3>
        <ul>
          {props.facts.map((fact) => {
            return <li key={fact._id}>{fact.when} <br /> {fact.text}</li>
          })}
        </ul>
      </div>
    )
  )
}
export default App;